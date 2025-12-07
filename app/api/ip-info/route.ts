import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge'; // 使用 Edge Runtime 获得最快响应

// Vercel 原生 IP 检测 - 最快最准确
export async function GET(request: NextRequest) {
  try {
    // 1. 从 Vercel Edge 网络直接获取真实 IP
    const ip = 
      request.headers.get('x-real-ip') || 
      request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      'Unknown';

    // 2. 从 Vercel 地理位置头部获取国家信息（最快）
    const country = request.geo?.country || 'US';
    const city = request.geo?.city || '';
    const region = request.geo?.region || '';
    
    // 3. 国家名称映射（无需外部API）
    const countryNames: Record<string, string> = {
      'CN': '中国', 'HK': '香港', 'TW': '台湾', 'MO': '澳门',
      'SG': '新加坡', 'US': '美国', 'JP': '日本', 'GB': '英国',
      'DE': '德国', 'FR': '法国', 'KR': '韩国', 'CA': '加拿大',
      'AU': '澳大利亚', 'IT': '意大利', 'ES': '西班牙',
      'BR': '巴西', 'RU': '俄罗斯', 'IN': '印度', 'MX': '墨西哥',
      'NL': '荷兰', 'SE': '瑞典', 'CH': '瑞士', 'PL': '波兰',
      'TR': '土耳其', 'TH': '泰国', 'MY': '马来西亚',
      'ID': '印尼', 'PH': '菲律宾', 'VN': '越南'
    };

    const countryName = countryNames[country] || country;

    // 4. Vercel geo 数据存在即为准确
    const accurate = !!(request.geo?.country);

    // 5. 立即返回（无需等待外部API）
    return NextResponse.json({
      ip,
      country,
      countryName,
      city,
      region,
      accurate,
      // 额外信息（可选）
      latitude: request.geo?.latitude || null,
      longitude: request.geo?.longitude || null,
      timezone: request.geo?.timezone || null,
    }, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      }
    });

  } catch (error) {
    console.error('IP Detection Error:', error);
    
    // 降级方案
    return NextResponse.json({
      ip: 'Unknown',
      country: 'US',
      countryName: '未知',
      city: '',
      region: '',
      accurate: false,
    });
  }
}