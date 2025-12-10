'use client';

import { useState, useEffect, useCallback, memo, useRef, useMemo } from 'react';
import { countries, CountryConfig } from '@/lib/countryData';
import {
  generateName,
  generateBirthday,
  generatePhone,
  generatePassword,
  generateEmail,
  getCountryConfig,
  getAllDomains
} from '@/lib/generator';

interface UserInfo {
  firstName: string;
  lastName: string;
  birthday: string;
  phone: string;
  password: string;
  email: string;
}

// 优化1: 提取 SVG 图标为静态对象,避免重复创建
const ICON_PATHS: Record<string, React.ReactElement> = {
  refresh: <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>,
  copy: <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>,
  check: <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>,
  location: <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>,
  email: <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>,
  link: <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/>,
  expand: <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/>,
  close: <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>,
  sparkles: <path d="M7 11v2l-4 1 4 1v2l1-4-1-4zm5-7v4l-3 1 3 1v4l2-5-2-5zm5.66 2.94L15 6.26l.66-2.94L18.34 6l2.66.68-2.66.68-.68 2.58-.66-2.94zM15 18l-2-3 2-3 2 3-2 3z"/>,
};

// 优化2: 使用 memo 缓存 Icon 组件
const Icon = memo(({ name, className = "w-6 h-6" }: { name: string; className?: string }) => {
  return (<svg className={className} viewBox="0 0 24 24" fill="currentColor">{ICON_PATHS[name]}</svg>);
});
Icon.displayName = 'Icon';

const haptic = () => { if (typeof navigator !== 'undefined' && 'vibrate' in navigator) { navigator.vibrate(10); } };

// 优化3: 使用 memo 缓存 InfoRow 组件
const InfoRow = memo(({ label, value, onCopy }: {
  label: string;
  value: string;
  onCopy: () => void;
}) => (
  <div className="flex items-center justify-between py-4">
    <span className="text-base text-gray-500">{label}</span>
    <div className="flex items-center gap-4">
      <span className="text-base font-medium text-gray-900 text-right break-all">{value || '---'}</span>
      <button onClick={onCopy} className="p-2 -m-2 text-sf-blue opacity-60 hover:opacity-100 transition-opacity">
        <Icon name="copy" className="w-5 h-5" />
      </button>
    </div>
  </div>
));
InfoRow.displayName = 'InfoRow';

export default function AppleStylePage() {
  const [selectedCountry, setSelectedCountry] = useState<CountryConfig>(countries[0]);
  const [selectedDomain, setSelectedDomain] = useState<string>('random');
  const [userInfo, setUserInfo] = useState<UserInfo>({
    firstName: '', lastName: '', birthday: '', phone: '', password: '', email: ''
  });
  const [showCountrySheet, setShowCountrySheet] = useState(false);
  const [showDomainSheet, setShowDomainSheet] = useState(false);
  const [domainSearchQuery, setDomainSearchQuery] = useState('');
  const [toast, setToast] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const [ipInfo, setIpInfo] = useState({ ip: '检测中...', country: 'US' });
  const [isGenerating, setIsGenerating] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  
  const toastTimerRef = useRef<NodeJS.Timeout | null>(null);

  const showToast = useCallback((msg: string) => {
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }
    
    if (toastVisible) {
      setToastVisible(false);
      setTimeout(() => {
        setToast(msg);
        setToastVisible(true);
        
        toastTimerRef.current = setTimeout(() => {
          setToastVisible(false);
          setTimeout(() => setToast(''), 300);
        }, 2000);
      }, 150);
    } else {
      setToast(msg);
      setToastVisible(true);
      
      toastTimerRef.current = setTimeout(() => {
        setToastVisible(false);
        setTimeout(() => setToast(''), 300);
      }, 2000);
    }
  }, [toastVisible]);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) {
        clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  const copyToClipboard = useCallback(async (text: string, label: string) => {
    haptic();
    try {
      await navigator.clipboard.writeText(text);
      showToast(`${label} 已复制`);
    } catch {
      showToast('复制失败');
    }
  }, [showToast]);

  // 优化4: 使用 useCallback 缓存 generate 函数
  const generate = useCallback(() => {
    if (isGenerating) return;
    
    haptic();
    setIsGenerating(true);
    
    // 优化5: 使用 requestIdleCallback 在浏览器空闲时生成数据
    const generateData = () => {
      try {
        const { firstName, lastName } = generateName(selectedCountry.code);
        const birthday = generateBirthday();
        const phone = generatePhone(selectedCountry);
        const password = generatePassword();
        
        const customDomain = selectedDomain === 'random' ? undefined : selectedDomain;
        const email = generateEmail(firstName, lastName, customDomain);
        
        setUserInfo({
          firstName,
          lastName,
          birthday,
          phone,
          password,
          email
        });
        
        showToast('已生成新信息');
      } catch (error) {
        console.error('生成失败:', error);
        showToast('生成失败,请重试');
      } finally {
        setIsGenerating(false);
      }
    };

    // 使用 requestIdleCallback 或 setTimeout 作为回退
    if ('requestIdleCallback' in window) {
      requestIdleCallback(generateData, { timeout: 100 });
    } else {
      setTimeout(generateData, 0);
    }
  }, [selectedCountry, selectedDomain, showToast, isGenerating]);

  // 优化6: 初始化逻辑优化
  useEffect(() => {
    let isMounted = true;
    
    const initializeApp = async () => {
      try {
        const response = await fetch('/api/ip-info');
        const data = await response.json();
        
        if (!isMounted) return;
        
        console.log('IP 检测结果:', data);
        setIpInfo({ ip: data.ip || '未知', country: data.country || 'US' });
        
        if (data.country && data.accurate) {
          const detectedCountry = getCountryConfig(data.country);
          if (detectedCountry) {
            console.log('自动选择国家:', detectedCountry.name);
            setSelectedCountry(detectedCountry);
            await new Promise(resolve => setTimeout(resolve, 100));
          }
        }
        
        setIsInitialized(true);
        
      } catch (error) {
        console.error('IP 检测失败:', error);
        if (isMounted) {
          setIpInfo({ ip: '检测失败', country: 'US' });
          setIsInitialized(true);
        }
      }
    };
    
    initializeApp();
    
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (isInitialized && !userInfo.firstName) {
      console.log('首次生成,使用国家:', selectedCountry.name);
      generate();
    }
  }, [isInitialized, selectedCountry.code, userInfo.firstName, generate]);

  useEffect(() => {
    if (isInitialized && userInfo.firstName) {
      console.log('国家已更改为:', selectedCountry.name);
      generate();
    }
  }, [selectedCountry.code]); // eslint-disable-line react-hooks/exhaustive-deps

  // 优化7: 使用 useMemo 缓存计算结果
  const allDomains = useMemo(() => getAllDomains(), []);
  const displayDomain = selectedDomain === 'random' ? '随机域名' : selectedDomain;

  const filteredDomains = useMemo(() => {
    if (!domainSearchQuery) return allDomains;
    const lowerQuery = domainSearchQuery.toLowerCase();
    return allDomains.filter(domain => 
      domain.toLowerCase().includes(lowerQuery)
    );
  }, [allDomains, domainSearchQuery]);

  return (
    <div className="min-h-screen bg-sf-gray-50 font-sf">
      
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-b border-sf-gray-200 z-40">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="location" className="w-5 h-5 text-sf-blue" />
            <span className="text-xs text-gray-500">{ipInfo.ip}</span>
          </div>
          <h1 className="text-lg font-semibold text-gray-900">脸书小助手</h1>
          <div className="w-20"></div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 pt-20 pb-24">
        
        {!isInitialized ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center space-y-3">
              <div className="w-12 h-12 border-4 border-sf-blue border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="text-sm text-gray-500">正在检测位置...</p>
            </div>
          </div>
        ) : (
          <>
            <div className="bg-white rounded-xl shadow-sm border border-sf-gray-100 overflow-hidden">
              <div className="px-4 divide-y divide-sf-gray-100">
                <InfoRow label="姓氏" value={userInfo.lastName} onCopy={() => copyToClipboard(userInfo.lastName, '姓氏')} />
                <InfoRow label="名字" value={userInfo.firstName} onCopy={() => copyToClipboard(userInfo.firstName, '名字')} />
                <InfoRow label="生日" value={userInfo.birthday} onCopy={() => copyToClipboard(userInfo.birthday, '生日')} />
                <InfoRow label="手机号" value={userInfo.phone} onCopy={() => copyToClipboard(userInfo.phone, '手机号')} />
                <InfoRow label="密码" value={userInfo.password} onCopy={() => copyToClipboard(userInfo.password, '密码')} />
              </div>
            </div>

            <div className="mt-4 bg-white rounded-xl shadow-sm border border-sf-gray-100 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-base text-gray-500">临时邮箱</span>
                <span className="text-sm font-sf-mono font-medium text-gray-800 bg-sf-gray-50 rounded-md px-2 py-1 break-all max-w-[200px]">{userInfo.email}</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => { haptic(); copyToClipboard(userInfo.email, '邮箱'); }}
                  className="w-full py-2.5 text-sm font-semibold text-sf-blue bg-sf-blue/10 hover:bg-sf-blue/20 rounded-lg transition-all active:scale-95"
                >
                  复制邮箱
                </button>
                <button
                  onClick={() => { 
                    haptic(); 
                    const emailName = userInfo.email.split('@')[0];
                    window.open(`https://yopmail.com/?login=${emailName}`, '_blank');
                  }}
                  className="w-full py-2.5 text-sm font-semibold text-sf-blue bg-sf-blue/10 hover:bg-sf-blue/20 rounded-lg transition-all active:scale-95"
                >
                  打开接码
                </button>
              </div>
            </div>
            
            <div className="mt-8 space-y-4">
              <button
                onClick={generate}
                disabled={isGenerating}
                className="w-full bg-sf-blue hover:bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-500/30 active:scale-[0.98] transition-all p-4 text-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="text-lg font-semibold tracking-wide">
                  {isGenerating ? '生成中...' : '随机生成'}
                </span>
              </button>

              <button
                onClick={() => { haptic(); setShowCountrySheet(true); }}
                className="w-full flex justify-between items-center bg-white rounded-xl shadow-sm border border-sf-gray-100 p-4 active:bg-sf-gray-50 transition-colors"
              >
                <span className="text-base text-gray-500">选择地区</span>
                <div className="flex items-center gap-2">
                  <span className="text-base font-medium">{selectedCountry.name}</span>
                  <Icon name="expand" className="w-5 h-5 text-sf-gray-300" />
                </div>
              </button>
              
              <button
                onClick={() => { haptic(); setShowDomainSheet(true); }}
                className="w-full flex justify-between items-center bg-white rounded-xl shadow-sm border border-sf-gray-100 p-4 active:bg-sf-gray-50 transition-colors"
              >
                <span className="text-base text-gray-500">邮箱域名</span>
                <div className="flex items-center gap-2">
                  <span className="text-base font-medium">{displayDomain}</span>
                  <Icon name="expand" className="w-5 h-5 text-sf-gray-300" />
                </div>
              </button>
            </div>

            <div className="mt-12 text-center space-y-2">
              <a 
                href="https://t.me/fang180" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-sf-blue text-sm hover:underline inline-flex items-center gap-1"
              >
                <Icon name="link" className="w-4 h-4" />
                Telegram 频道
              </a>
              <p className="text-xs text-sf-gray-300">版本 2.1 • 支持自选域名</p>
              <p className="text-xs text-gray-400">支持 {countries.length} 个国家 • {allDomains.length} 个域名</p>
            </div>
          </>
        )}
      </main>

      {/* Toast */}
      {toast && (
        <div 
          className={`fixed bottom-20 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ease-out ${
            toastVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-2'
          }`}
        >
          <div className="bg-black/80 backdrop-blur-md text-white px-5 py-2.5 rounded-full shadow-lg text-sm font-semibold flex items-center gap-2">
            <Icon name="check" className="w-4 h-4 text-sf-green" />
            {toast}
          </div>
        </div>
      )}

      {/* 国家选择器 */}
      {showCountrySheet && (
        <div className="fixed inset-0 z-50 flex items-end">
          <div 
            className="absolute inset-0 bg-black/40 animate-[fadeIn_0.2s_ease-out]"
            onClick={() => { haptic(); setShowCountrySheet(false); }}
          />
          <div className="relative w-full bg-sf-gray-50 rounded-t-2xl max-h-[70vh] flex flex-col animate-[slideUp_0.3s_ease-out]">
            <div className="p-4 text-center border-b border-sf-gray-200">
              <div className="w-8 h-1.5 bg-sf-gray-300 rounded-full mx-auto my-1"></div>
              <h3 className="text-lg font-semibold text-gray-900 pt-2">选择地区</h3>
              <p className="text-xs text-gray-500 mt-1">共 {countries.length} 个国家/地区</p>
            </div>
            <div className="flex-1 overflow-y-auto">
              <div className="m-4 bg-white rounded-xl overflow-hidden">
                {countries.map((country) => (
                  <button
                    key={country.code}
                    onClick={() => {
                      haptic();
                      setSelectedCountry(country);
                      setShowCountrySheet(false);
                    }}
                    className="w-full flex items-center justify-between px-4 py-3 hover:bg-sf-gray-50 active:bg-sf-gray-100 transition-colors border-b border-sf-gray-100 last:border-b-0"
                  >
                    <div className="text-left">
                      <div className="text-base font-medium text-gray-900">{country.name}</div>
                      <div className="text-xs text-gray-500">{country.phonePrefix}</div>
                    </div>
                    {selectedCountry.code === country.code && (
                      <Icon name="check" className="w-5 h-5 text-sf-blue" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 域名选择器 */}
      {showDomainSheet && (
        <div className="fixed inset-0 z-50 flex items-end">
          <div 
            className="absolute inset-0 bg-black/40 animate-[fadeIn_0.2s_ease-out]"
            onClick={() => { 
              haptic(); 
              setShowDomainSheet(false);
              setDomainSearchQuery('');
            }}
          />
          <div className="relative w-full bg-sf-gray-50 rounded-t-2xl max-h-[75vh] flex flex-col animate-[slideUp_0.3s_ease-out]">
            <div className="p-4 border-b border-sf-gray-200">
              <div className="w-8 h-1.5 bg-sf-gray-300 rounded-full mx-auto mb-3"></div>
              <h3 className="text-lg font-semibold text-gray-900 text-center">选择邮箱域名</h3>
              <p className="text-xs text-gray-500 text-center mt-1">
                {domainSearchQuery ? `找到 ${filteredDomains.length} 个域名` : `共 ${allDomains.length + 1} 个选项`}
              </p>
              
              <div className="mt-3 relative">
                <input
                  type="text"
                  value={domainSearchQuery}
                  onChange={(e) => setDomainSearchQuery(e.target.value)}
                  placeholder="搜索域名 (例如: gmail, yahoo)"
                  className="w-full px-4 py-2.5 bg-white border border-sf-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sf-blue/20 focus:border-sf-blue transition-all"
                />
                {domainSearchQuery && (
                  <button
                    onClick={() => setDomainSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-sf-gray-100 rounded-full transition-colors"
                  >
                    <Icon name="close" className="w-4 h-4 text-gray-400" />
                  </button>
                )}
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              <div className="m-4 bg-white rounded-xl overflow-hidden">
                {!domainSearchQuery && (
                  <button
                    onClick={() => {
                      haptic();
                      setSelectedDomain('random');
                      setShowDomainSheet(false);
                      setDomainSearchQuery('');
                    }}
                    className="w-full flex items-center justify-between px-4 py-3 hover:bg-sf-gray-50 active:bg-sf-gray-100 transition-colors border-b border-sf-gray-100"
                  >
                    <div className="text-left">
                      <div className="text-base font-medium text-gray-900 flex items-center gap-2">
                        <Icon name="sparkles" className="w-4 h-4 text-sf-orange" />
                        随机域名
                      </div>
                      <div className="text-xs text-gray-500">每次生成时随机选择域名</div>
                    </div>
                    {selectedDomain === 'random' && (
                      <Icon name="check" className="w-5 h-5 text-sf-blue" />
                    )}
                  </button>
                )}
                
                {filteredDomains.length > 0 ? (
                  filteredDomains.map((domain) => (
                    <button
                      key={domain}
                      onClick={() => {
                        haptic();
                        setSelectedDomain(domain);
                        setShowDomainSheet(false);
                        setDomainSearchQuery('');
                      }}
                      className="w-full flex items-center justify-between px-4 py-3 hover:bg-sf-gray-50 active:bg-sf-gray-100 transition-colors border-b border-sf-gray-100 last:border-b-0"
                    >
                      <div className="text-left">
                        <div className="text-base font-medium text-gray-900">{domain}</div>
                      </div>
                      {selectedDomain === domain && (
                        <Icon name="check" className="w-5 h-5 text-sf-blue" />
                      )}
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-12 text-center">
                    <div className="text-gray-400 mb-2">
                      <Icon name="email" className="w-12 h-12 mx-auto opacity-30" />
                    </div>
                    <p className="text-sm text-gray-500">未找到匹配的域名</p>
                    <p className="text-xs text-gray-400 mt-1">试试其他关键词</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </div>
  );
}