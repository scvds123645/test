import { NextRequest, NextResponse } from 'next/server';

// 优化1: 保持 Edge Runtime
export const runtime = 'edge';

// --- 类型定义 (优化4: 移除 any) ---

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

interface CacheEntry {
  data: GeoData;
  expiresAt: number;
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

interface IpApiComResponse {
  status: string;
  query: string;
  countryCode: string;
  country: string;
  regionName: string;
  city: string;
  timezone: string;
  lat: number;
  lon: number;
}

// --- 常量与正则 (优化2 & 7: 完善正则) ---

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

// --- 全局状态 (Edge 环境下可能在实例间复用，但不保证) ---

// 优化2: 内存缓存 Map
const ipCache = new Map<string, CacheEntry>();
// 优化10: 请求去重 Map (存储正在进行的 Promise)
const inflightRequests = new Map<string, Promise<GeoData>>();
// 优化6: 性能指标
const metrics: Record<string, ServiceMetrics> = {};

const CACHE_TTL_MS = 1000 * 60 * 5; // 5分钟缓存

// --- 工具函数 ---

// 优化7: 增强的公网 IP 验证
const isValidPublicIP = (ip: string | null | undefined): boolean => {
  if (!ip || ip === '未知') return false;
  // 简单的格式校验，排除明显非 IP 的字符串
  if (!ip.includes('.') && !ip.includes(':')) return false;
  return !PRIVATE_IP_RANGES.some(pattern => pattern.test(ip));
};

// 优化6: 指标记录
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

// 优化3 & 9: 通用 Fetch，带超时清理和泛型
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
      // 强制不缓存外部 API 请求，确保数据新鲜度由我们自己的逻辑控制
      cache: 'no-store' 
    });
    
    if (!res.ok) throw new Error(`Status ${res.status}`);
    
    const data = await res.json() as T;
    recordMetric(sourceName, Date.now() - startTime, true);
    return data;
  } catch (error) {
    recordMetric(sourceName, Date.now() - startTime, false);
    // 仅在开发环境打印详细错误，生产环境减少噪音
    if (process.env.NODE_ENV === 'development') {
      console.warn(`[GeoIP] ${sourceName} failed:`, error instanceof Error ? error.message : 'Unknown error');
    }
    return null;
  } finally {
    clearTimeout(timeoutId);
  }
}

// 优化4: 标准化响应构建器
function createResponse(data: GeoData, status: number = 200) {
  return NextResponse.json(data, {
    status,
    headers: {
      // 优化8: Edge 缓存控制
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
    countryName: data.country, // ipinfo only gives code usually
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

// 兜底服务 (HTTP)
async function queryIpApiCom(ip: string): Promise<GeoData> {
  const data = await fetchService<IpApiComResponse>(
    'ip-api', 
    `http://ip-api.com/json/${ip}?fields=status,country,countryCode,region,regionName,city,timezone,lat,lon,query`
  );
  if (!data || data.status !== 'success') throw new Error('Invalid response');

  return {
    source: 'ip-api',
    ip: data.query || ip,
    country: data.countryCode,
    countryName: data.country,
    city: data.city,
    region: data.regionName,
    timezone: data.timezone,
    latitude: data.lat,
    longitude: data.lon,
    accurate: true
  };
}

// --- 主逻辑 ---

export async function GET(request: NextRequest) {
  const now = Date.now();

  // 优化5: 改进 IP 提取逻辑 (优先从 XFF 中找第一个公网 IP)
  let ip = '未知';
  
  const xff = request.headers.get('x-forwarded-for');
  const cfIp = request.headers.get('cf-connecting-ip');
  const realIp = request.headers.get('x-real-ip');

  if (xff) {
    const ips = xff.split(',').map(s => s.trim());
    // 找到第一个非内网的 IP
    const publicIp = ips.find(i => isValidPublicIP(i));
    if (publicIp) ip = publicIp;
  }
  
  // 如果 XFF 没找到有效 IP，尝试其他头
  if (!isValidPublicIP(ip)) {
    if (isValidPublicIP(cfIp)) ip = cfIp!;
    else if (isValidPublicIP(realIp)) ip = realIp!;
  }

  // 1. 校验 IP 有效性
  if (!isValidPublicIP(ip)) {
    // 优化5: 结构化错误日志
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
    }, 200); // 保持 200 响应，但在 body 中标记 error
  }

  // 2. 检查缓存
  const cached = ipCache.get(ip);
  if (cached && cached.expiresAt > now) {
    return createResponse({ ...cached.data, source: `${cached.data.source} (cache)` });
  }

  // 3. 检查是否有正在进行的请求 (去重)
  let fetchPromise = inflightRequests.get(ip);

  if (!fetchPromise) {
    // 优化1: 使用 Promise.any 并行请求
    // 注意: Promise.any 需要 Node.js 15+ 或现代浏览器环境 (Edge Runtime 支持)
    const strategies = [
      queryIpApiCo(ip),
      queryIpInfo(ip),
      queryIpWhoIs(ip)
    ];

    fetchPromise = Promise.any(strategies)
      .catch(async (aggregateError) => {
        // 如果 HTTPS 服务都失败了，尝试 HTTP 兜底
        console.warn(`[GeoIP] All primary services failed for ${ip}, trying fallback.`);
        try {
          return await queryIpApiCom(ip);
        } catch (e) {
          throw aggregateError; // 如果兜底也失败，抛出原始错误
        }
      })
      .then(data => {
        // 写入缓存
        ipCache.set(ip, {
          data,
          expiresAt: Date.now() + CACHE_TTL_MS
        });
        
        // 简单的缓存清理策略 (防止内存无限增长)
        if (ipCache.size > 1000) {
          const firstKey = ipCache.keys().next().value;
          if (firstKey) ipCache.delete(firstKey);
        }
        
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
    // 优化5: 结构化错误日志
    console.error(JSON.stringify({
      level: 'error',
      event: 'geoip_lookup_failed',
      ip,
      error: error instanceof Error ? error.message : 'Unknown',
      metrics: metrics, // 附带性能指标
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