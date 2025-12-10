import { NextRequest, NextResponse } from 'next/server';

// 优化1: 使用 edge runtime 以获得更快的冷启动和全球分发
export const runtime = 'edge';

interface IPApiResponse {
  status?: string;
  country?: string;
  countryCode?: string;
  region?: string;
  regionName?: string;
  city?: string;
  zip?: string;
  lat?: number;
  lon?: number;
  timezone?: string;
  query?: string;
}

interface IPWhoIsResponse {
  success?: boolean;
  ip?: string;
  country?: string;
  country_code?: string;
  region?: string;
  city?: string;
  latitude?: number;
  longitude?: number;
  timezone?: {
    id?: string;
  };
}

interface IPInfoResponse {
  ip?: string;
  city?: string;
  region?: string;
  country?: string;
  loc?: string;
  timezone?: string;
}

// 优化2: 使用静态正则,避免重复创建
const PRIVATE_IP_RANGES = [
  /^10\./,
  /^172\.(1[6-9]|2[0-9]|3[0-1])\./,
  /^192\.168\./,
  /^127\./,
  /^localhost$/i,
  /^::1$/,
  /^fe80:/i
];

const isValidPublicIP = (ipAddr: string): boolean => {
  if (ipAddr === '未知' || !ipAddr) return false;
  return !PRIVATE_IP_RANGES.some(pattern => pattern.test(ipAddr));
};

const COMMON_HEADERS = { 
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
  'Accept': 'application/json'
};

// 优化3: 提取通用的 fetch 逻辑,减少代码重复
async function fetchWithTimeout(
  url: string, 
  timeout: number = 5000
): Promise<Response | null> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    
    const response = await fetch(url, {
      headers: COMMON_HEADERS,
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    return response.ok ? response : null;
  } catch (error) {
    console.error(`Fetch error for ${url}:`, error);
    return null;
  }
}

// 优化4: 创建标准化的响应格式函数
function createIPResponse(data: {
  source: string;
  ip: string;
  country: string;
  countryName?: string;
  city?: string;
  region?: string;
  timezone?: string;
  latitude?: number | null;
  longitude?: number | null;
  accurate: boolean;
  error?: string;
}) {
  return NextResponse.json({
    source: data.source,
    ip: data.ip,
    country: data.country,
    countryName: data.countryName || data.country,
    city: data.city || '',
    region: data.region || '',
    timezone: data.timezone || '',
    latitude: data.latitude || null,
    longitude: data.longitude || null,
    accurate: data.accurate,
    ...(data.error && { error: data.error })
  });
}

export async function GET(request: NextRequest) {
  // 优化5: 简化 IP 提取逻辑
  const ip = request.headers.get('cf-connecting-ip') || 
             request.headers.get('x-forwarded-for')?.split(',')[0].trim() || 
             request.headers.get('x-real-ip') || 
             '未知';

  console.log('检测到的 IP 地址:', ip);

  if (!isValidPublicIP(ip)) {
    console.warn('检测到内网 IP 或无效 IP:', ip);
    return createIPResponse({
      source: 'header',
      ip,
      country: 'US',
      countryName: 'United States',
      accurate: false,
      error: '无法检测到有效的公网 IP 地址 (可能在本地环境或内网)'
    });
  }

  // 优化6: 使用 Promise.race 并行请求多个服务,取最快返回的结果
  const servicePromises = [
    // 服务1: ipapi.co
    fetchWithTimeout(`https://ipapi.co/${ip}/json/`, 4000).then(async (response) => {
      if (!response) return null;
      const data: any = await response.json();
      if (data.country_code && !data.error) {
        return createIPResponse({
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
        });
      }
      return null;
    }),

    // 服务2: ipinfo.io
    fetchWithTimeout(`https://ipinfo.io/${ip}/json`, 4000).then(async (response) => {
      if (!response) return null;
      const data: IPInfoResponse = await response.json();
      if (data.country) {
        const [lat, lon] = data.loc?.split(',').map(Number) || [null, null];
        return createIPResponse({
          source: 'ipinfo',
          ip: data.ip || ip,
          country: data.country,
          countryName: data.country,
          city: data.city,
          region: data.region,
          timezone: data.timezone,
          latitude: lat,
          longitude: lon,
          accurate: true
        });
      }
      return null;
    }),

    // 服务3: ipwho.is
    fetchWithTimeout(`https://ipwho.is/${ip}`, 4000).then(async (response) => {
      if (!response) return null;
      const data: IPWhoIsResponse = await response.json();
      if (data.success && data.country_code) {
        return createIPResponse({
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
        });
      }
      return null;
    })
  ];

  // 优化7: 使用 Promise.race 获取最快的成功响应
  try {
    const result = await Promise.race(
      servicePromises.map(p => p.then(r => r ? Promise.resolve(r) : Promise.reject()))
    );
    if (result) return result;
  } catch {
    // 如果所有快速服务都失败,等待所有服务完成
  }

  // 如果 race 失败,等待所有服务
  const results = await Promise.all(servicePromises);
  const successResult = results.find(r => r !== null);
  if (successResult) return successResult;

  // 兜底: ip-api.com (HTTP)
  try {
    const response = await fetchWithTimeout(
      `http://ip-api.com/json/${ip}?fields=status,country,countryCode,region,regionName,city,zip,lat,lon,timezone,query`,
      5000
    );
    
    if (response) {
      const data: IPApiResponse = await response.json();
      if (data.status === 'success' && data.countryCode) {
        return createIPResponse({
          source: 'ip-api',
          ip: data.query || ip,
          country: data.countryCode,
          countryName: data.country,
          city: data.city,
          region: data.regionName || data.region,
          timezone: data.timezone,
          latitude: data.lat,
          longitude: data.lon,
          accurate: true
        });
      }
    }
  } catch (error) {
    console.error('ip-api.com 请求失败:', error);
  }

  // 最终兜底
  return createIPResponse({
    source: 'fallback',
    ip,
    country: 'US',
    countryName: 'United States',
    accurate: false,
    error: '所有 IP 检测服务暂时不可用,请稍后重试'
  });
}