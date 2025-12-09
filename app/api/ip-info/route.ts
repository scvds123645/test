import { NextRequest, NextResponse } from 'next/server';

// export const runtime = 'edge';

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

// 优化：将静态正则和数组移出处理函数，避免重复创建
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

export async function GET(request: NextRequest) {
  const forwardedFor = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  const cfConnectingIP = request.headers.get('cf-connecting-ip');
  
  const ip = cfConnectingIP || 
             (forwardedFor ? forwardedFor.split(',')[0].trim() : null) || 
             realIP || 
             '未知';

  console.log('检测到的 IP 地址:', ip);

  if (!isValidPublicIP(ip)) {
    console.warn('检测到内网 IP 或无效 IP:', ip);
    return NextResponse.json({
      source: 'header',
      ip: ip,
      country: 'US',
      countryName: 'United States',
      city: '',
      region: '',
      timezone: '',
      latitude: null,
      longitude: null,
      accurate: false,
      error: '无法检测到有效的公网 IP 地址 (可能在本地环境或内网)'
    });
  }

  // 方案 1: ipapi.co (第一优先级)
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    
    const response = await fetch(`https://ipapi.co/${ip}/json/`, {
      headers: COMMON_HEADERS,
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    if (response.ok) {
      const data: any = await response.json();
      
      if (data.country_code && !data.error) {
        return NextResponse.json({
          source: 'ipapi.co',
          ip: data.ip || ip,
          country: data.country_code,
          countryName: data.country_name,
          city: data.city || '',
          region: data.region || '',
          timezone: data.timezone || '',
          latitude: data.latitude || null,
          longitude: data.longitude || null,
          accurate: true
        });
      }
    }
  } catch (error) {
    console.error('ipapi.co 请求失败:', error);
  }

  // 方案 2: ipinfo.io (第二优先级)
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    
    const response = await fetch(`https://ipinfo.io/${ip}/json`, {
      headers: COMMON_HEADERS,
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    if (response.ok) {
      const data: IPInfoResponse = await response.json();
      
      if (data.country) {
        const [lat, lon] = data.loc?.split(',').map(Number) || [null, null];
        
        return NextResponse.json({
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
        });
      }
    }
  } catch (error) {
    console.error('ipinfo.io 请求失败:', error);
  }

  // 方案 3: ipwho.is (第三优先级)
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    
    const response = await fetch(`https://ipwho.is/${ip}`, {
      headers: COMMON_HEADERS,
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    if (response.ok) {
      const data: IPWhoIsResponse = await response.json();
      
      if (data.success && data.country_code) {
        return NextResponse.json({
          source: 'ipwhois',
          ip: data.ip || ip,
          country: data.country_code,
          countryName: data.country,
          city: data.city || '',
          region: data.region || '',
          timezone: data.timezone?.id || '',
          latitude: data.latitude || null,
          longitude: data.longitude || null,
          accurate: true
        });
      }
    }
  } catch (error) {
    console.error('ipwho.is 请求失败:', error);
  }

  // 方案 4: ip-api.com (第四优先级/兜底)
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    
    const response = await fetch(`http://ip-api.com/json/${ip}?fields=status,country,countryCode,region,regionName,city,zip,lat,lon,timezone,query`, {
      headers: COMMON_HEADERS,
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    if (response.ok) {
      const data: IPApiResponse = await response.json();
      
      if (data.status === 'success' && data.countryCode) {
        return NextResponse.json({
          source: 'ip-api',
          ip: data.query || ip,
          country: data.countryCode,
          countryName: data.country,
          city: data.city || '',
          region: data.regionName || data.region || '',
          timezone: data.timezone || '',
          latitude: data.lat || null,
          longitude: data.lon || null,
          accurate: true
        });
      }
    }
  } catch (error) {
    console.error('ip-api.com 请求失败:', error);
  }

  return NextResponse.json({
    source: 'fallback',
    ip: ip,
    country: 'US',
    countryName: 'United States',
    city: '',
    region: '',
    timezone: '',
    latitude: null,
    longitude: null,
    accurate: false,
    error: '所有 IP 检测服务暂时不可用,请稍后重试'
  });
}