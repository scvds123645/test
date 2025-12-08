import { NextRequest, NextResponse } from 'next/server';

// 移除 edge runtime 限制,使用 Node.js runtime
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

export async function GET(request: NextRequest) {
  // 获取真实 IP 地址
  const forwardedFor = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  const cfConnectingIP = request.headers.get('cf-connecting-ip');
  
  const ip = cfConnectingIP || 
             (forwardedFor ? forwardedFor.split(',')[0].trim() : null) || 
             realIP || 
             '未知';

  console.log('检测到的 IP 地址:', ip);
  console.log('请求头信息:', {
    'x-forwarded-for': forwardedFor,
    'x-real-ip': realIP,
    'cf-connecting-ip': cfConnectingIP
  });

  // 检查是否为有效的公网 IP
  const isValidPublicIP = (ipAddr: string): boolean => {
    if (ipAddr === '未知' || !ipAddr) return false;
    
    // 排除内网 IP
    const privateRanges = [
      /^10\./,
      /^172\.(1[6-9]|2[0-9]|3[0-1])\./,
      /^192\.168\./,
      /^127\./,
      /^localhost$/i,
      /^::1$/,
      /^fe80:/i
    ];
    
    return !privateRanges.some(pattern => pattern.test(ipAddr));
  };

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

  // 方案 1: ipwho.is (完全免费,无需 API key,推荐)
  try {
    console.log('尝试使用 ipwho.is API...');
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    
    const response = await fetch(`https://ipwho.is/${ip}`, {
      headers: { 
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'application/json'
      },
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    if (response.ok) {
      const data: IPWhoIsResponse = await response.json();
      console.log('ipwho.is 返回数据:', data);
      
      if (data.success && data.country_code) {
        console.log('ipwho.is 成功返回:', {
          ip: data.ip,
          country_code: data.country_code,
          country: data.country
        });
        
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

  // 方案 2: ip-api.com (免费,限制:每分钟 45 次请求)
  try {
    console.log('尝试使用 ip-api.com API...');
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    
    const response = await fetch(`http://ip-api.com/json/${ip}?fields=status,country,countryCode,region,regionName,city,zip,lat,lon,timezone,query`, {
      headers: { 
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'application/json'
      },
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    if (response.ok) {
      const data: IPApiResponse = await response.json();
      console.log('ip-api.com 返回数据:', data);
      
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

  // 方案 3: ipapi.co (免费,限制:每天 1000 次请求)
  try {
    console.log('尝试使用 ipapi.co API...');
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    
    const response = await fetch(`https://ipapi.co/${ip}/json/`, {
      headers: { 
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'application/json'
      },
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    if (response.ok) {
      const data: any = await response.json();
      console.log('ipapi.co 返回数据:', data);
      
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

  // 方案 4: ipinfo.io (免费,限制:每月 50000 次请求)
  try {
    console.log('尝试使用 ipinfo.io API...');
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    
    const response = await fetch(`https://ipinfo.io/${ip}/json`, {
      headers: { 
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'application/json'
      },
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    if (response.ok) {
      const data: IPInfoResponse = await response.json();
      console.log('ipinfo.io 返回数据:', data);
      
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

  // 所有方案都失败,返回基础信息
  console.error('所有 IP 检测 API 都失败了');
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