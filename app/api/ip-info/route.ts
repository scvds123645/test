import { NextRequest, NextResponse } from 'next/server';

// 优化1: 保持 Edge Runtime
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

interface ServiceMetrics {
  success: number;
  failure: number;
  totalTime: number;
}

// 外部 API 响应接口定义
interface IpApiCoResponse {
  ip?: string;
  country_code?: string;
  country_name?: string;
  city?: string;
  region?: string;
  timezone?: string;
  latitude?: number;
  longitude?: number;
  error?: boolean;
  reason?: string;
}

interface IpInfoResponse {
  ip?: string;
  city?: string;
  region?: string;
  country?: string;
  loc?: string;
  timezone?: string;
}

interface IpWhoIsResponse {
  success?: boolean;
  ip?: string;
  country_code?: string;
  country?: string;
  region?: string;
  city?: string;
  latitude?: number;
  longitude?: number;
  timezone?: { id: string };
}

// 新增: FreeIPAPI 响应接口
interface FreeIpApiResponse {
  ipVersion: number;
  ipAddress: string;
  latitude: number;
  longitude: number;
  countryName: string;
  countryCode: string;
  timeZone: string;
  zipCode: string;
  cityName: string;
  regionName: string;
  isProxy: boolean;
}

// --- 常量与正则 ---

// 包含 IPv4 私有段, localhost, 以及 IPv6 私有/本地链路/唯一本地地址
const PRIVATE_IP_RANGES = [
  /^127\./,
  /^10\./,
  /^172\.(1[6-9]|2[0-9]|3[0-1])\./,
  /^192\.168\./,
  /^::1$/,
  /^fd[0-9a-f]{2}:.+/i, // IPv6 Unique Local
  /^fe80:.+/i,          // IPv6 Link Local
  /^localhost$/i
];

const COMMON_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Edge-Runtime-GeoIP/1.0)',
  'Accept': 'application/json'
};

// --- LRU 缓存实现 (优化1) ---

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

    // 检查过期
    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return null;
    }

    // LRU 核心逻辑: 访问即刷新位置
    // 删除并重新设置，使其移动到 Map 的末尾（最近使用）
    this.cache.delete(key);
    this.cache.set(key, entry);
    
    return entry.value;
  }

  set(key: string, value: V): void {
    // 如果已存在，先删除以便更新位置
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } 
    // 如果不存在且已满，淘汰最久未使用的（Map 的第一个元素）
    else if (this.cache.size >= this.maxEntries) {
      const firstKey = this.cache.keys().next().value;
      if (firstKey) this.cache.delete(firstKey);
    }

    this.cache.set(key, {
      value,
      expiresAt: Date.now() + this.ttlMs
    });
  }
}

// --- 全局状态 ---

// 优化1: 使用自定义 LRU 缓存 (Max 1000, 5分钟 TTL)
const ipCache = new LRUCache<GeoData>(1000, 1000 * 60 * 5);

// 请求去重 Map (存储正在进行的 Promise)
const inflightRequests = new Map<string, Promise<GeoData>>();

// 性能指标
const metrics: Record<string, ServiceMetrics> = {};

// --- 工具函数 ---

const isValidPublicIP = (ip: string | null | undefined): boolean => {
  if (!ip || ip === '未知') return false;
  // 简单的格式校验，排除明显非 IP 的字符串
  if (!ip.includes('.') && !ip.includes(':')) return false;
  return !PRIVATE_IP_RANGES.some(pattern => pattern.test(ip));
};

const recordMetric = (source: string, timeMs: number, isSuccess: boolean) => {
  if (!metrics[source]) {
    metrics[source] = { success: 0, failure: 0, totalTime: 0 };
  }
  if (isSuccess) {
    metrics[source].success++;
    metrics[source].totalTime += timeMs;
  } else {
    metrics[source].failure++;
  }
};

async function fetchService<T>(
  sourceName: string,
  url: string,
  timeout: number = 3000
): Promise<T | null> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  const startTime = Date.now();

  try {
    const res = await fetch(url, {
      headers: COMMON_HEADERS,
      signal: controller.signal,
      cache: 'no-store' 
    });
    
    if (!res.ok) throw new Error(`Status ${res.status}`);
    
    const data = await res.json() as T;
    recordMetric(sourceName, Date.now() - startTime, true);
    return data;
  } catch (error) {
    recordMetric(sourceName, Date.now() - startTime, false);
    if (process.env.NODE_ENV === 'development') {
      console.warn(`[GeoIP] ${sourceName} failed:`, error instanceof Error ? error.message : 'Unknown error');
    }
    return null;
  } finally {
    clearTimeout(timeoutId);
  }
}

function createResponse(data: GeoData, status: number = 200) {
  return NextResponse.json(data, {
    status,
    headers: {
      'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=60',
      'X-Geo-Source': data.source
    }
  });
}

// --- 服务提供商逻辑 ---

async function queryIpApiCo(ip: string): Promise<GeoData> {
  const data = await fetchService<IpApiCoResponse>('ipapi.co', `https://ipapi.co/${ip}/json/`);
  if (!data || data.error || !data.country_code) throw new Error('Invalid response');
  
  return {
    source: 'ipapi.co',
    ip: data.ip || ip,
    country: data.country_code,
    countryName: data.country_name || data.country_code,
    city: data.city || '',
    region: data.region || '',
    timezone: data.timezone || '',
    latitude: data.latitude || null,
    longitude: data.longitude || null,
    accurate: true
  };
}

async function queryIpInfo(ip: string): Promise<GeoData> {
  const data = await fetchService<IpInfoResponse>('ipinfo', `https://ipinfo.io/${ip}/json`);
  if (!data || !data.country) throw new Error('Invalid response');
  
  const [lat, lon] = data.loc ? data.loc.split(',').map(Number) : [null, null];
  return {
    source: 'ipinfo',
    ip: data.ip || ip,
    country: data.country,
    countryName: data.country,
    city: data.city || '',
    region: data.region || '',
    timezone: data.timezone || '',
    latitude: lat,
    longitude: lon,
    accurate: true
  };
}

async function queryIpWhoIs(ip: string): Promise<GeoData> {
  const data = await fetchService<IpWhoIsResponse>('ipwhois', `https://ipwho.is/${ip}`);
  if (!data || !data.success || !data.country_code) throw new Error('Invalid response');

  return {
    source: 'ipwhois',
    ip: data.ip || ip,
    country: data.country_code,
    countryName: data.country || data.country_code,
    city: data.city || '',
    region: data.region || '',
    timezone: data.timezone?.id || '',
    latitude: data.latitude || null,
    longitude: data.longitude || null,
    accurate: true
  };
}

// 优化2: 新的 HTTPS 兜底服务 (FreeIPAPI)
async function queryFreeIpApi(ip: string): Promise<GeoData> {
  const data = await fetchService<FreeIpApiResponse>('freeipapi', `https://freeipapi.com/api/json/${ip}`);
  if (!data || !data.countryCode) throw new Error('Invalid response');

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

// --- 主逻辑 ---

export async function GET(request: NextRequest) {
  // IP 提取逻辑
  let ip = '未知';
  
  const xff = request.headers.get('x-forwarded-for');
  const cfIp = request.headers.get('cf-connecting-ip');
  const realIp = request.headers.get('x-real-ip');

  if (xff) {
    const ips = xff.split(',').map(s => s.trim());
    const publicIp = ips.find(i => isValidPublicIP(i));
    if (publicIp) ip = publicIp;
  }
  
  if (!isValidPublicIP(ip)) {
    if (isValidPublicIP(cfIp)) ip = cfIp!;
    else if (isValidPublicIP(realIp)) ip = realIp!;
  }

  // 1. 校验 IP 有效性
  if (!isValidPublicIP(ip)) {
    console.error(JSON.stringify({
      level: 'warn',
      event: 'invalid_ip',
      ip,
      headers: { xff, cfIp, realIp },
      timestamp: new Date().toISOString()
    }));

    return createResponse({
      source: 'internal',
      ip,
      country: 'US',
      countryName: 'United States',
      city: '',
      region: '',
      timezone: '',
      latitude: null,
      longitude: null,
      accurate: false,
      error: 'Invalid or Private IP address detected'
    }, 200);
  }

  // 2. 检查缓存 (LRU)
  const cachedData = ipCache.get(ip);
  if (cachedData) {
    return createResponse({ ...cachedData, source: `${cachedData.source} (cache)` });
  }

  // 3. 检查是否有正在进行的请求 (去重)
  let fetchPromise = inflightRequests.get(ip);

  if (!fetchPromise) {
    // 竞速策略
    const strategies = [
      queryIpApiCo(ip),
      queryIpInfo(ip),
      queryIpWhoIs(ip)
    ];

    fetchPromise = Promise.any(strategies)
      .catch(async (aggregateError) => {
        // 优化2: 替换为 HTTPS 兜底服务
        console.warn(`[GeoIP] All primary services failed for ${ip}, trying fallback (freeipapi).`);
        try {
          return await queryFreeIpApi(ip);
        } catch (e) {
          throw aggregateError; // 如果兜底也失败，抛出原始错误
        }
      })
      .then(data => {
        // 写入 LRU 缓存
        ipCache.set(ip, data);
        return data;
      })
      .finally(() => {
        // 请求结束，移除去重标记
        inflightRequests.delete(ip);
      });

    inflightRequests.set(ip, fetchPromise);
  }

  try {
    const result = await fetchPromise;
    return createResponse(result);
  } catch (error) {
    console.error(JSON.stringify({
      level: 'error',
      event: 'geoip_lookup_failed',
      ip,
      error: error instanceof Error ? error.message : 'Unknown',
      metrics: metrics,
      timestamp: new Date().toISOString()
    }));

    return createResponse({
      source: 'fallback',
      ip,
      country: 'US',
      countryName: 'United States',
      city: '',
      region: '',
      timezone: '',
      latitude: null,
      longitude: null,
      accurate: false,
      error: 'All IP geolocation services failed'
    });
  }
}