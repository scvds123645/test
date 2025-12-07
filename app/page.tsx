'use client';

import { useState, useEffect, useRef } from 'react';
// ✅ 从 lib 导入所有函数和数据 (保持不变)
import { 
  generateName, 
  generateBirthday, 
  generatePhone, 
  generatePassword, 
  generateEmail,
  getCountryConfig 
} from '@/lib/generator';
import { countries, CountryConfig } from '@/lib/countryData';

// ==================== 类型定义 (保持不变) ====================

interface UserInfo {
  firstName: string;
  lastName: string;
  birthday: string;
  phone: string;
  password: string;
  email: string;
}

interface ToastConfig {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface IPInfo {
  ip: string;
  country: string;
  countryName: string;
  city: string;
  region: string;
  accurate: boolean;
}

// ==================== 主组件 ====================

export default function FBAssistant() {
  const [selectedCountry, setSelectedCountry] = useState<CountryConfig>(countries[0]);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    firstName: '', lastName: '', birthday: '', phone: '', password: '', email: ''
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [toasts, setToasts] = useState<ToastConfig[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCountrySelect, setShowCountrySelect] = useState(false);
  const toastIdRef = useRef(0);
  
  // ✅ IP 信息状态
  const [ipInfo, setIpInfo] = useState<IPInfo | null>(null);
  const [ipLoading, setIpLoading] = useState(true);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = ++toastIdRef.current;
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 2500);
  };

  const copyToClipboard = async (text: string, label: string) => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      // 触觉反馈 (仅移动端支持)
      if (navigator.vibrate) navigator.vibrate(50);
      showToast(`${label} 已复制`);
    } catch (e) {
      showToast('复制失败', 'error');
    }
  };

  // ✅ 获取 IP 信息 (保持不变)
  const fetchIPInfo = async () => {
    try {
      setIpLoading(true);
      const response = await fetch('/api/ip-info');
      const data = await response.json();
      
      console.log('=== IP API 返回完整数据 ===', data);
      
      setIpInfo({
        ip: data.ip || '未知',
        country: data.country || 'US',
        countryName: data.countryName || '未知',
        city: data.city || '',
        region: data.region || '',
        accurate: data.accurate || false,
      });

      if (data.country) {
        const matchedCountry = countries.find(c => c.code === data.country);
        if (matchedCountry) {
          setSelectedCountry(matchedCountry);
        }
      }
    } catch (error) {
      console.error('获取 IP 信息失败:', error);
      setIpInfo({
        ip: '获取失败',
        country: 'US',
        countryName: '未知',
        city: '',
        region: '',
        accurate: false,
      });
    } finally {
      setIpLoading(false);
    }
  };

  // ✅ 使用导入的函数 (保持不变)
  const generate = () => {
    const name = generateName(selectedCountry.code);
    setUserInfo({
      firstName: name.firstName,
      lastName: name.lastName,
      birthday: generateBirthday(),
      phone: generatePhone(selectedCountry),
      password: generatePassword(),
      email: generateEmail(name.firstName, name.lastName),
    });
  };

  useEffect(() => {
    const init = async () => {
      await fetchIPInfo();
      setIsLoading(false);
    };
    init();
  }, []);

  useEffect(() => {
    if (!isLoading && selectedCountry) {
      generate();
    }
  }, [selectedCountry, isLoading]);

  // Loading 界面优化
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F2F2F7] flex flex-col items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#007AFF]/20 border-t-[#007AFF] rounded-full animate-spin mb-4"></div>
        <p className="text-gray-500 text-sm font-medium animate-pulse">正在准备环境...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F2F2F7] pb-20 selection:bg-[#007AFF]/20 selection:text-[#007AFF] font-sans">
      
      {/* iOS 风格大标题导航栏 */}
      <header className="pt-14 pb-2 px-5 sticky top-0 bg-[#F2F2F7]/80 backdrop-blur-xl z-30 transition-all border-b border-transparent">
        <div className="max-w-md mx-auto flex justify-between items-end">
          <div>
            <h1 className="text-[34px] font-bold tracking-tight text-black leading-tight">
              脸书小助手
            </h1>
            <p className="text-gray-500 text-[15px] font-medium mt-1">
              注册辅助工具
            </p>
          </div>
          <div className="mb-2">
            <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-full bg-blue-100 text-[#007AFF] text-[11px] font-bold uppercase tracking-wide">
              v1.0
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 space-y-6 mt-4">
        
        {/* 环境信息卡片 (iOS Inset Grouped List 风格) */}
        <section>
          <div className="pl-4 mb-2 text-[13px] font-medium text-gray-500 uppercase tracking-wider">
            当前环境
          </div>
          <div className="bg-white rounded-[20px] overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.03)] ring-1 ring-black/5">
            
            {/* IP 信息行 */}
            <div className="flex items-center justify-between p-4 bg-white active:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-lg flex-shrink-0">
                  {ipLoading ? '⏳' : '📡'}
                </div>
                <div className="flex-1 min-w-0">
                  {ipLoading ? (
                    <div className="space-y-1">
                      <div className="h-4 bg-gray-100 rounded w-24 animate-pulse"></div>
                      <div className="h-3 bg-gray-50 rounded w-16 animate-pulse"></div>
                    </div>
                  ) : (
                    <>
                      <div className="text-[16px] font-semibold text-gray-900 truncate">
                        {ipInfo?.ip || '未知'}
                      </div>
                      <div className="text-[13px] text-gray-500 truncate">
                        {ipInfo?.city && ipInfo?.region 
                          ? `${ipInfo.city}, ${ipInfo.region}` 
                          : ipInfo?.countryName || '未知位置'
                        }
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-1.5 flex-shrink-0 bg-gray-50 px-2 py-1 rounded-md">
                <div className={`w-2 h-2 rounded-full ${ipInfo?.accurate ? 'bg-[#34C759]' : 'bg-orange-400'} animate-pulse`}></div>
                <span className={`text-[11px] font-semibold ${ipInfo?.accurate ? 'text-[#34C759]' : 'text-orange-500'}`}>
                  {ipLoading ? '检测中' : (ipInfo?.accurate ? '已验证' : '未验证')}
                </span>
              </div>
            </div>

            {/* 分割线 (左侧留白) */}
            <div className="ml-[56px] h-[0.5px] bg-gray-200"></div>

            {/* 国家选择行 */}
            <button 
              onClick={() => setShowCountrySelect(true)}
              className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 active:bg-gray-100 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-xl shadow-sm">
                  {selectedCountry.flag}
                </div>
                <div className="text-left">
                  <div className="text-[16px] font-semibold text-gray-900 group-hover:text-[#007AFF] transition-colors">
                    {selectedCountry.name}
                  </div>
                  <div className="text-[13px] text-gray-500 font-mono tracking-tight">
                    {selectedCountry.phonePrefix}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <span className="text-[15px] text-gray-400 group-active:text-gray-600">更改</span>
                <svg className="w-4 h-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          </div>
        </section>

        {/* 身份信息卡片 */}
        <section>
          <div className="flex items-center justify-between px-4 mb-2">
            <h3 className="text-[13px] font-medium text-gray-500 uppercase tracking-wider">生成信息</h3>
            <button 
              onClick={generate}
              className="text-[#007AFF] text-[13px] font-semibold active:opacity-50 transition-opacity"
            >
              刷新全部
            </button>
          </div>
          
          <div className="bg-white rounded-[20px] overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.03)] ring-1 ring-black/5">
            <InfoRow 
              label="姓名" 
              value={`${userInfo.lastName} ${userInfo.firstName}`} 
              icon="👤"
              onCopy={() => copyToClipboard(`${userInfo.lastName} ${userInfo.firstName}`, '姓名')} 
            />
            <InfoRow 
              label="生日" 
              value={userInfo.birthday} 
              icon="🎂"
              onCopy={() => copyToClipboard(userInfo.birthday, '生日')} 
            />
            <InfoRow 
              label="手机" 
              value={userInfo.phone} 
              icon="📱"
              isMono
              onCopy={() => copyToClipboard(userInfo.phone, '手机号')} 
            />
            <InfoRow 
              label="密码" 
              value={userInfo.password} 
              icon="🔑"
              isMono
              onCopy={() => copyToClipboard(userInfo.password, '密码')} 
            />
            
            <div className="ml-[52px] h-[0.5px] bg-gray-200"></div>
            
            {/* 邮箱行 (特殊布局) */}
            <div className="flex items-center justify-between p-3 pl-4 pr-3 bg-white group hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-7 h-7 rounded-[7px] bg-indigo-50 text-indigo-500 flex items-center justify-center text-sm">
                  📧
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[11px] text-gray-500 font-medium mb-0.5">邮箱</div>
                  <div className="text-[16px] text-gray-900 font-mono tracking-tight truncate select-all">
                    {userInfo.email}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {/* 复制邮箱 */}
                <button 
                  onClick={() => copyToClipboard(userInfo.email, '邮箱')}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-50 text-gray-400 hover:bg-blue-50 hover:text-[#007AFF] active:scale-90 transition-all"
                  title="复制邮箱"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
                {/* 复制接码地址 */}
                <button 
                  onClick={() => copyToClipboard(`https://yopmail.com?${userInfo.email}`, '接码地址')}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-50 text-gray-400 hover:bg-purple-50 hover:text-purple-600 active:scale-90 transition-all"
                  title="复制接码地址"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 底部操作按钮 */}
        <section className="pt-4 pb-8">
          <button 
            onClick={generate}
            className="w-full h-[52px] bg-[#007AFF] hover:bg-[#0062CC] active:scale-[0.98] transition-all rounded-full flex items-center justify-center gap-2 text-white font-semibold text-[17px] shadow-lg shadow-[#007AFF]/25"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            生成新身份
          </button>
          
          <a 
            href="https://t.me/fang180" 
            target="_blank" 
            className="mt-4 w-full h-[52px] bg-white ring-1 ring-black/5 hover:bg-gray-50 active:scale-[0.98] transition-all rounded-full flex items-center justify-center gap-2 text-[#0088CC] font-semibold text-[16px]"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .24z"/>
            </svg>
            加入 Telegram 频道
          </a>
          
          <div className="mt-8 text-center">
            <p className="text-[11px] text-gray-400 font-medium">Designed by Fang180</p>
          </div>
        </section>

      </main>

      {/* Toast Notification (灵动岛风格) */}
      <div className="fixed top-4 left-0 right-0 z-50 flex flex-col items-center gap-2 pointer-events-none px-4">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            style={{
              animation: 'slideDownFade 0.5s cubic-bezier(0.19, 1, 0.22, 1)'
            }}
            className="bg-black/80 backdrop-blur-xl px-4 py-3 rounded-[24px] shadow-[0_8px_20px_rgba(0,0,0,0.15)] flex items-center gap-3 min-w-[180px] max-w-[90%] justify-center border border-white/10"
          >
            {toast.type === 'success' && <div className="w-5 h-5 rounded-full bg-[#34C759] flex items-center justify-center text-white text-[10px]">✓</div>}
            {toast.type === 'error' && <div className="w-5 h-5 rounded-full bg-[#FF3B30] flex items-center justify-center text-white text-[10px]">✕</div>}
            <span className="text-white text-[14px] font-medium tracking-wide">{toast.message}</span>
          </div>
        ))}
      </div>

      {/* Country Selection Modal (iOS Sheet 风格) */}
      {showCountrySelect && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
          <div 
            className="absolute inset-0 bg-black/20 backdrop-blur-[2px] transition-opacity" 
            onClick={() => setShowCountrySelect(false)}
          ></div>
          <div 
            className="relative w-full max-w-md bg-[#F2F2F7] rounded-t-[20px] sm:rounded-[20px] shadow-2xl overflow-hidden h-[85vh] flex flex-col"
            style={{
              animation: 'slideUpFade 0.4s cubic-bezier(0.32, 0.725, 0, 1)'
            }}
          >
            {/* Modal Header */}
            <div className="px-4 py-3 bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-10 flex items-center justify-between">
              <button 
                onClick={() => setShowCountrySelect(false)}
                className="text-[#007AFF] text-[16px] font-regular px-2 active:opacity-50 transition-opacity"
              >
                取消
              </button>
              <span className="font-semibold text-[17px]">选择地区</span>
              <div className="w-[40px]"></div> {/* Spacer for centering */}
            </div>
            
            {/* Search Bar */}
            <div className="p-3 bg-white border-b border-gray-100">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400 group-focus-within:text-gray-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                  <input 
                  type="text" 
                  placeholder="搜索国家或代码" 
                  className="block w-full bg-[#767680]/10 rounded-[10px] py-2 pl-9 pr-4 text-[16px] placeholder-gray-500 focus:outline-none focus:bg-[#767680]/15 focus:ring-0 transition-all caret-[#007AFF]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* List */}
            <div className="overflow-y-auto flex-1 bg-white">
              {countries.filter(c => c.name.includes(searchQuery) || c.code.includes(searchQuery)).map((country) => (
                <button
                  key={country.code}
                  onClick={() => {
                    setSelectedCountry(country);
                    setShowCountrySelect(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3.5 border-b border-gray-100 last:border-0 hover:bg-gray-50 active:bg-gray-100 transition-colors"
                >
                  <span className="text-2xl shadow-sm rounded-sm overflow-hidden">{country.flag}</span>
                  <span className="flex-1 text-left text-[17px] text-gray-900">{country.name}</span>
                  <span className="text-gray-400 text-[15px] font-mono">{country.phonePrefix}</span>
                  {selectedCountry.code === country.code && (
                    <svg className="w-5 h-5 text-[#007AFF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideDownFade {
          0% { opacity: 0; transform: translateY(-20px) scale(0.95); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes slideUpFade {
          0% { transform: translateY(100%); }
          100% { transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

// 提取的行组件，保持代码整洁
function InfoRow({ label, value, icon, isMono = false, isLast = false, onCopy }: any) {
  return (
    <>
      <div className="flex items-center justify-between p-3 pl-4 pr-3 bg-white hover:bg-gray-50 transition-colors group">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="w-7 h-7 rounded-[7px] bg-gray-100 text-gray-500 flex items-center justify-center text-sm">
            {icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[11px] text-gray-500 font-medium mb-0.5">{label}</div>
            <div className={`text-[16px] text-gray-900 truncate select-all ${isMono ? 'font-mono tracking-tight' : ''}`}>
              {value}
            </div>
          </div>
        </div>
        <button 
          onClick={onCopy}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-50 text-gray-400 hover:bg-white hover:shadow-sm hover:text-[#007AFF] active:scale-90 transition-all ring-1 ring-transparent hover:ring-gray-100"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </button>
      </div>
      {!isLast && <div className="ml-[52px] h-[0.5px] bg-gray-200"></div>}
    </>
  );
}