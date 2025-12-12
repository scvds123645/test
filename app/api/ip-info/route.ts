import { NextRequest, NextResponse } from 'next/server';

// 1. 启用 Edge Runtime 以获得最佳性能和最低延迟
export const runtime = 'edge';

// --- 类型定义 ---

interface GeoData {
  source: string;
  ip: string;
  country: string;
  countryName: string;
  city: string;
  region: string;
  timezone: string;
  latitude: number | null;
  longitude: number | null;
  accurate: boolean;
  error?: string;
}

// 外部 API 响应接口简化定义
interface AnyApiResponse {
  [key: string]: any;
}

// --- 常量配置 ---

// 私有 IP 和本地地址正则 (用于过滤)
const PRIVATE_IP_RANGES = [
  /^127\./,
  /^10\./,
  /^172\.(1[6-9]|2[0-9]|3[0-1])\./,
  /^192\.168\./,
  /^::1$/,
  /^fd[0-9a-f]{2}:.+/i,
  /^fe80:.+/i,
  /^localhost$/i
];

const COMMON_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Edge-Runtime-GeoIP/2.0)',
  'Accept': 'application/json'
};

// --- LRU 缓存实现 (内存优化) ---
// 在 Edge 环境中，全局变量在实例存活期间是持久的 (Warm Start)

class LRUCache<V> {
  private cache: Map<string, { value: V; expiresAt: number }>;
  private readonly maxEntries: number;
  private readonly ttlMs: number;

  constructor(maxEntries: number, ttlMs: number) {
    this.cache = new Map();
    this.maxEntries = maxEntries;
    this.ttlMs = ttlMs;
  }

  get(key: string): V | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return null;
    }

    // 刷新位置 (最近使用)
    this.cache.delete(key);
    this.cache.set(key, entry);
    return entry.value;
  }

  set(key: string, value: V): void {
    if (this.cache.has(key)) this.cache.delete(key);
    else if (this.cache.size >= this.maxEntries) {
      // 删除最早插入的 (Map 的第一个键)
      const firstKey = this.cache.keys().next().value;
      if (firstKey) this.cache.delete(firstKey);
    }

    this.cache.set(key, { value, expiresAt: Date.now() + this.ttlMs });
  }
}

// 全局缓存实例 (最大1000条，缓存10分钟)
const ipCache = new LRUCache<GeoData>(1000, 1000 * 60 * 10);

// 请求去重 Map (存储正在进行的 Promise)
const inflightRequests = new Map<string, Promise<GeoData>>();

// --- 辅助工具 ---

const isValidPublicIP = (ip: string | null | undefined): boolean => {
  if (!ip || ip === '未知' || ip === '127.0.0.1') return false;
  if (!ip.includes('.') && !ip.includes(':')) return false;
  return !PRIVATE_IP_RANGES.some(pattern => pattern.test(ip));
};

async function fetchService<T>(
  sourceName: string,
  url: string,
  timeout: number = 2000 // 激进的超时设置，确保快速失败切换
): Promise<T | null> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const res = await fetch(url, {
      headers: COMMON_HEADERS,
      signal: controller.signal,
      cache: 'no-store', // 禁止内部 Fetch 缓存，完全依赖我们的 LRU
      next: { revalidate: 0 }
    });
    
    if (!res.ok) throw new Error(`Status ${res.status}`);
    const data = await res.json();
    return data as T;
  } catch (error) {
    return null; // 静默失败，由上层处理
  } finally {
    clearTimeout(timeoutId);
  }
}

// --- 具体服务查询逻辑 ---

async function queryIpApiCo(ip: string): Promise<GeoData> {
  const data = await fetchService<AnyApiResponse>('ipapi.co', `https://ipapi.co/${ip}/json/`);
  if (!data || data.error || !data.country_code) throw new Error('Invalid');
  return {
    source: 'ipapi.co',
    ip: data.ip || ip,
    country: data.country_code,
    countryName: data.country_name,
    city: data.city,
    region: data.region,
    timezone: data.timezone,
    latitude: data.latitude,
    longitude: data.longitude,
    accurate: true
  };
}

async function queryIpInfo(ip: string): Promise<GeoData> {
  const data = await fetchService<AnyApiResponse>('ipinfo', `https://ipinfo.io/${ip}/json`);
  if (!data || !data.country) throw new Error('Invalid');
  const [lat, lon] = data.loc ? data.loc.split(',').map(Number) : [null, null];
  return {
    source: 'ipinfo',
    ip: data.ip || ip,
    country: data.country,
    countryName: data.country, // ipinfo free doesn't always give full name
    city: data.city,
    region: data.region,
    timezone: data.timezone,
    latitude: lat,
    longitude: lon,
    accurate: true
  };
}

async function queryIpWhoIs(ip: string): Promise<GeoData> {
  const data = await fetchService<AnyApiResponse>('ipwhois', `https://ipwho.is/${ip}`);
  if (!data || !data.success || !data.country_code) throw new Error('Invalid');
  return {
    source: 'ipwhois',
    ip: data.ip || ip,
    country: data.country_code,
    countryName: data.country,
    city: data.city,
    region: data.region,
    timezone: data.timezone?.id,
    latitude: data.latitude,
    longitude: data.longitude,
    accurate: true
  };
}

// 兜底服务 (HTTPS)
async function queryFreeIpApi(ip: string): Promise<GeoData> {
  const data = await fetchService<AnyApiResponse>('freeipapi', `https://freeipapi.com/api/json/${ip}`);
  if (!data || !data.countryCode) throw new Error('Invalid');
  return {
    source: 'freeipapi',
    ip: data.ipAddress || ip,
    country: data.countryCode,
    countryName: data.countryName,
    city: data.cityName,
    region: data.regionName,
    timezone: data.timeZone,
    latitude: data.latitude,
    longitude: data.longitude,
    accurate: true
  };
}

// --- 主处理函数 ---

export async function GET(request: NextRequest) {
  // 1. 获取 IP
  let ip = '未知';
  const xff = request.headers.get('x-forwarded-for');
  const cfIp = request.headers.get('cf-connecting-ip');
  const realIp = request.headers.get('x-real-ip');

  if (xff) ip = xff.split(',')[0].trim();
  else if (cfIp) ip = cfIp;
  else if (realIp) ip = realIp;

  // 2. 校验 IP
  if (!isValidPublicIP(ip)) {
    return NextResponse.json({
      source: 'internal',
      ip,
      country: 'US', // 默认回落
      accurate: false,
      error: 'Private or Invalid IP'
    });
  }

  // 3. 检查缓存 (LRU)
  const cached = ipCache.get(ip);
  if (cached) {
    return NextResponse.json(
      { ...cached, source: `${cached.source} (cache)` },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=60',
          'X-Cache-Status': 'HIT'
        }
      }
    );
  }

  // 4. 并发去重 + 竞速请求
  let fetchPromise = inflightRequests.get(ip);

  if (!fetchPromise) {
    // 定义主要策略
    const primaryStrategies = [
      queryIpApiCo(ip),
      queryIpInfo(ip),
      queryIpWhoIs(ip)
    ];

    fetchPromise = Promise.any(primaryStrategies)
      .catch(async () => {
        // 如果主策略全部失败，尝试兜底
        console.warn(`[GeoIP] All primaries failed for ${ip}, using fallback.`);
        return await queryFreeIpApi(ip);
      })
      .then(data => {
        // 写入缓存
        ipCache.set(ip, data);
        return data;
      })
      .finally(() => {
        // 移除正在进行的标记
        inflightRequests.delete(ip);
      });

    inflightRequests.set(ip, fetchPromise);
  }

  // 5. 等待结果并返回
  try {
    const result = await fetchPromise;
    return NextResponse.json(result, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=60',
        'X-Cache-Status': 'MISS'
      }
    });
  } catch (error) {
    // 全面失败，返回默认值，防止前端报错
    return NextResponse.json({
      source: 'fallback_error',
      ip,
      country: 'US',
      countryName: 'United States',
      accurate: false,
      error: 'All services failed'
    });
  }
}
