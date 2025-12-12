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

// --- 类型定义 ---
interface UserInfo {
  firstName: string;
  lastName: string;
  birthday: string;
  phone: string;
  password: string;
  email: string;
}

// --- 图标组件 ---
const ICON_PATHS: Record<string, React.ReactElement> = {
  check: <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>,
  chevronRight: <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>,
  close: <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 17.59 13.41 12z"/>,
  sparkles: <path d="M7 11v2l-4 1 4 1v2l1-4-1-4zm5-7v4l-3 1 3 1v4l2-5-2-5zm5.66 2.94L15 6.26l.66-2.94L18.34 6l2.66.68-2.66.68-.68 2.58-.66-2.94zM15 18l-2-3 2-3 2 3-2 3z"/>,
  search: <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>,
  inbox: <path d="M19 3H4.99c-1.11 0-1.98.89-1.98 2L3 19c0 1.1.89 2 1.99 2H19c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 12h-4c0 1.66-1.35 3-3 3s-3-1.34-3-3H4.99V5H19v10z"/>,
  link: <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/>,
  copy: <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>,
  open: <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/>
};

const Icon = memo(({ name, className = "w-6 h-6" }: { name: string; className?: string }) => {
  return (<svg className={className} viewBox="0 0 24 24" fill="currentColor">{ICON_PATHS[name]}</svg>);
});
Icon.displayName = 'Icon';

// --- 震动反馈 ---
const haptic = (duration: number = 10) => { 
  if (typeof navigator !== 'undefined' && 'vibrate' in navigator) { 
    navigator.vibrate(duration);
  } 
};

// --- 组件: 信息行 ---
const InfoRow = memo(({ label, value, onCopy, isCopied, isLast = false, extraAction }: {
  label: string;
  value: string;
  onCopy: () => void;
  isCopied: boolean;
  isLast?: boolean;
  extraAction?: React.ReactNode;
}) => {
  return (
    <div className="relative">
        <div 
        onClick={onCopy}
        className={`group relative flex items-center justify-between py-4 pl-4 pr-4 cursor-pointer transition-colors duration-200 active:bg-white/10 ${isLast ? '' : ''}`}
        >
        {/* Label */}
        <span className="text-[14px] font-medium text-white/40 w-16 shrink-0 tracking-tight">{label}</span>
        
        <div className="flex items-center gap-3 min-w-0 flex-1 justify-end relative h-7">
            {/* Value */}
            <span 
            className={`text-[17px] font-medium truncate select-all tracking-tight transition-all duration-300 ${
                isCopied ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0 text-white/90'
            }`}
            >
            {value || '---'}
            </span>

            {/* 复制成功反馈 */}
            <div 
            className={`absolute right-0 flex items-center gap-1.5 transition-all duration-300 ${
                isCopied ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-2 scale-90 pointer-events-none'
            }`}
            >
            <div className="bg-[#34C759] rounded-full p-0.5 shadow-[0_0_10px_rgba(52,199,89,0.4)]">
                <Icon name="check" className="w-3 h-3 text-white stroke-[3px]" />
            </div>
            <span className="text-[14px] font-semibold text-[#34C759]">已复制</span>
            </div>
        </div>
        </div>
        
        {/* 额外操作 (如: 查看收件箱) */}
        {extraAction && (
            <div className="px-4 pb-4 pt-0 flex justify-end">
                {extraAction}
            </div>
        )}

        {/* 分隔线 */}
        {!isLast && <div className="absolute bottom-0 left-4 right-0 h-[0.5px] bg-white/10" />}
    </div>
  );
});
InfoRow.displayName = 'InfoRow';

// --- 组件: 底部弹窗 ---
const BottomSheet = memo(({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  rightAction 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  title: string; 
  children: React.ReactNode;
  rightAction?: React.ReactNode;
}) => {
  const [render, setRender] = useState(false);
  
  useEffect(() => {
    if (isOpen) setRender(true);
    else setTimeout(() => setRender(false), 300);
  }, [isOpen]);

  if (!render) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-end justify-center sm:items-center isolate transition-all duration-300 ${isOpen ? 'visible' : 'invisible'}`}>
      {/* 背景遮罩 */}
      <div 
        className={`absolute inset-0 bg-black/60 backdrop-blur-[2px] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose} 
      />
      {/* 弹窗主体 */}
      <div 
        className={`relative w-full max-w-md bg-[#161b22] border-t border-white/10 rounded-t-[20px] sm:rounded-[20px] max-h-[85vh] flex flex-col shadow-2xl overflow-hidden transform transition-transform duration-300 cubic-bezier-spring ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}
      >
        {/* Drag Handle Area */}
        <div className="absolute top-0 left-0 right-0 h-6 flex items-center justify-center pointer-events-none z-20">
             <div className="w-10 h-1 bg-white/20 rounded-full mt-2"></div>
        </div>

        {/* Title Bar */}
        <div className="px-4 pt-5 pb-3 border-b border-white/5 bg-[#161b22] sticky top-0 z-10 flex items-center justify-between">
             <h3 className="text-[17px] font-semibold text-white tracking-tight">{title}</h3>
             {rightAction ? (
               rightAction
             ) : (
               <button 
                 onClick={onClose}
                 className="bg-white/10 p-1.5 rounded-full text-white/60 hover:bg-white/20 active:scale-95 transition-all"
               >
                 <Icon name="close" className="w-4 h-4" />
               </button>
             )}
        </div>
        
        {/* Content */}
        <div className="flex-1 overflow-y-auto overscroll-contain pb-safe">
          {children}
        </div>
      </div>
    </div>
  );
});
BottomSheet.displayName = 'BottomSheet';

// --- 组件: 列表项 ---
const ListItem = memo(({ 
  label, 
  isSelected, 
  onClick, 
  icon 
}: { 
  label: string; 
  isSelected: boolean; 
  onClick: () => void; 
  icon?: string 
}) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center justify-between px-4 py-4 active:bg-white/5 transition-colors duration-150 touch-manipulation border-b border-white/5 last:border-0`}
  >
    <div className="flex items-center gap-3.5">
      {icon && (
        <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-[#0A84FF]/20' : 'bg-white/5'}`}>
          <Icon name={icon} className={`w-4.5 h-4.5 ${isSelected ? 'text-[#0A84FF]' : 'text-white/40'}`} />
        </div>
      )}
      <span className={`text-[16px] tracking-tight text-left ${isSelected ? 'text-[#0A84FF] font-semibold' : 'text-white/80'}`}>{label}</span>
    </div>
    {isSelected && <Icon name="check" className="w-5 h-5 text-[#0A84FF]" />}
  </button>
));
ListItem.displayName = 'ListItem';

// --- 组件: 国家选择列表 ---
const CountryList = memo(({ 
  countries, 
  selectedCode, 
  onSelect 
}: { 
  countries: CountryConfig[]; 
  selectedCode: string; 
  onSelect: (c: CountryConfig) => void; 
}) => {
  return (
    <div className="flex flex-col">
      {countries.map((country) => (
        <ListItem
          key={country.code}
          label={country.name}
          isSelected={selectedCode === country.code}
          onClick={() => onSelect(country)}
        />
      ))}
    </div>
  );
});
CountryList.displayName = 'CountryList';

// --- 组件: 域名选择列表 ---
const DomainList = memo(({ 
  allDomains, 
  selectedDomain, 
  onSelect 
}: { 
  allDomains: string[]; 
  selectedDomain: string; 
  onSelect: (d: string) => void; 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredDomains = useMemo(() => {
    if (!searchQuery) return allDomains;
    const lowerQuery = searchQuery.toLowerCase();
    return allDomains.filter(d => d.toLowerCase().includes(lowerQuery));
  }, [allDomains, searchQuery]);

  return (
    <div className="flex flex-col h-full min-h-[50vh]">
      <div className="px-4 py-2 sticky top-0 z-10 bg-[#161b22]">
         <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon name="search" className="w-4 h-4 text-white/40" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索域名"
              // text-base (16px) 防止 iOS 自动放大
              className="w-full pl-9 pr-8 py-2.5 bg-black/20 border border-white/10 rounded-[10px] text-base text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-[#0A84FF]/50 focus:bg-black/40 transition-all caret-[#0A84FF]"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute inset-y-0 right-0 pr-3 flex items-center touch-manipulation">
                <div className="bg-white/20 rounded-full p-0.5"><Icon name="close" className="w-3 h-3 text-white" /></div>
              </button>
            )}
          </div>
      </div>
      
      <div className="flex-1">
        {!searchQuery && (
          <ListItem
            label="随机域名"
            isSelected={selectedDomain === 'random'}
            onClick={() => onSelect('random')}
            icon="sparkles"
          />
        )}
        {filteredDomains.map((domain) => (
          <ListItem
            key={domain}
            label={domain}
            isSelected={selectedDomain === domain}
            onClick={() => onSelect(domain)}
          />
        ))}
        {filteredDomains.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-white/30 space-y-2">
            <Icon name="search" className="w-8 h-8 opacity-20" />
            <span className="text-sm">未找到结果</span>
          </div>
        )}
      </div>
    </div>
  );
});
DomainList.displayName = 'DomainList';


export default function MobileOptimizedPage() {
  const [selectedCountry, setSelectedCountry] = useState<CountryConfig>(countries[0]);
  const [selectedDomain, setSelectedDomain] = useState<string>('random');
  const [userInfo, setUserInfo] = useState<UserInfo>({
    firstName: '', lastName: '', birthday: '', phone: '', password: '', email: ''
  });
  const [showCountrySheet, setShowCountrySheet] = useState(false);
  const [showDomainSheet, setShowDomainSheet] = useState(false);
  const [ipInfo, setIpInfo] = useState({ ip: '...', country: 'US' });
  const [isInitialized, setIsInitialized] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [inboxStatus, setInboxStatus] = useState<'idle' | 'opening'>('idle');
  
  const buttonRef = useRef<HTMLButtonElement>(null);
  const copyTimerRef = useRef<NodeJS.Timeout | null>(null);
  const inboxTimerRef = useRef<NodeJS.Timeout | null>(null);

  const copyToClipboard = useCallback(async (text: string, label: string) => {
    haptic(15);
    try {
      await navigator.clipboard.writeText(text);
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
      setCopiedField(label);
      copyTimerRef.current = setTimeout(() => {
        setCopiedField(null);
      }, 1500);
    } catch {
      haptic(50);
    }
  }, []);

  const triggerAnimation = useCallback(() => {
    const btn = buttonRef.current;
    if (btn) {
      btn.classList.remove('anim-pop');
      void btn.offsetWidth; 
      btn.classList.add('anim-pop');
    }
  }, []);

  const generate = useCallback(() => {
    haptic(25);
    setCopiedField(null);
    triggerAnimation();

    try {
      const { firstName, lastName } = generateName(selectedCountry.code);
      const birthday = generateBirthday();
      const phone = generatePhone(selectedCountry);
      const password = generatePassword();
      const customDomain = selectedDomain === 'random' ? undefined : selectedDomain;
      const email = generateEmail(firstName, lastName, customDomain);
      setUserInfo({ firstName, lastName, birthday, phone, password, email });
    } catch (error) {
      console.error(error);
    }
  }, [selectedCountry, selectedDomain, triggerAnimation]);

  const handleInboxClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (inboxStatus === 'opening') return;

    haptic(20);
    setInboxStatus('opening');

    const emailName = userInfo.email.split('@')[0];
    
    inboxTimerRef.current = setTimeout(() => {
        window.open(`https://yopmail.com/?login=${emailName}`, '_blank');
        setInboxStatus('idle');
    }, 500);
  }, [userInfo.email, inboxStatus]);

  // 初始化
  useEffect(() => {
    let isMounted = true;
    const initializeApp = async () => {
      try {
        const response = await fetch('/api/ip-info');
        const data = await response.json();
        if (!isMounted) return;
        
        setIpInfo({ ip: data.ip || '未知', country: data.country || 'US' });
        if (data.country && data.accurate) {
          const detectedCountry = getCountryConfig(data.country);
          if (detectedCountry) setSelectedCountry(detectedCountry);
        }
        setIsInitialized(true);
      } catch (error) {
        if (isMounted) {
          setIpInfo({ ip: '检测失败', country: 'US' });
          setIsInitialized(true);
        }
      }
    };
    initializeApp();
    return () => { isMounted = false; };
  }, []);

  useEffect(() => {
    if (isInitialized && !userInfo.firstName) {
        generate();
    }
  }, [isInitialized]); 
  
  // 切换国家自动刷新
  useEffect(() => {
      if(isInitialized) generate();
  }, [selectedCountry]);

  const allDomains = useMemo(() => getAllDomains(), []);
  const displayDomain = selectedDomain === 'random' ? '随机' : selectedDomain;

  // --- Render ---
  return (
    <div className="min-h-screen bg-[#000000] text-white font-sans overflow-x-hidden selection:bg-[#0A84FF]/30 pb-safe">
      
      {/* 动态背景 */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#0A84FF]/20 rounded-full blur-[100px] opacity-40 mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-[#5E5CE6]/20 rounded-full blur-[100px] opacity-30 mix-blend-screen" />
      </div>

      {/* 顶部导航 */}
      <header className="fixed top-0 left-0 right-0 h-[56px] pt-safe bg-[#000000]/80 backdrop-blur-lg border-b border-white/5 z-40 flex items-center justify-between px-5 transition-all duration-300">
        <h1 className="text-[19px] font-bold text-white tracking-tight">脸书小助手</h1>
        
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/5">
          <div className="w-2 h-2 rounded-full bg-[#30D158] shadow-[0_0_8px_rgba(48,209,88,0.6)]"></div>
          <span className="text-[12px] font-medium text-white/80 font-mono tracking-tight">{ipInfo.ip}</span>
        </div>
      </header>

      <main className="relative z-10 max-w-[460px] mx-auto px-4 pt-[calc(56px+20px)] pb-10 space-y-6">
        
        {!isInitialized ? (
          <div className="flex flex-col items-center justify-center py-40 space-y-4 animate-pulse">
            <div className="w-10 h-10 border-[3px] border-white/10 border-t-[#0A84FF] rounded-full animate-spin"></div>
            <div className="text-white/40 text-sm font-medium">正在初始化环境...</div>
          </div>
        ) : (
          <>
            {/* 核心信息卡片 */}
            <section className="bg-[#1C1C1E]/70 backdrop-blur-xl rounded-[22px] overflow-hidden border border-white/10 shadow-lg ring-1 ring-black/5">
              <InfoRow label="姓氏" value={userInfo.lastName} onCopy={() => copyToClipboard(userInfo.lastName, '姓氏')} isCopied={copiedField === '姓氏'} />
              <InfoRow label="名字" value={userInfo.firstName} onCopy={() => copyToClipboard(userInfo.firstName, '名字')} isCopied={copiedField === '名字'} />
              <InfoRow label="生日" value={userInfo.birthday} onCopy={() => copyToClipboard(userInfo.birthday, '生日')} isCopied={copiedField === '生日'} />
              <InfoRow label="手机号" value={userInfo.phone} onCopy={() => copyToClipboard(userInfo.phone, '手机号')} isCopied={copiedField === '手机号'} />
              <InfoRow label="密码" value={userInfo.password} onCopy={() => copyToClipboard(userInfo.password, '密码')} isCopied={copiedField === '密码'} />
              
              <InfoRow 
                label="邮箱" 
                value={userInfo.email} 
                onCopy={() => copyToClipboard(userInfo.email, '邮箱')} 
                isCopied={copiedField === '邮箱'}
                isLast={true}
                extraAction={
                  <button
                    onClick={handleInboxClick}
                    className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-[15px] font-semibold transition-all duration-200 active:scale-[0.98] touch-manipulation overflow-hidden relative border ${
                        inboxStatus === 'opening' 
                        ? 'bg-[#30D158]/10 border-[#30D158]/20 text-[#30D158]' 
                        : 'bg-[#0A84FF]/10 border-[#0A84FF]/20 text-[#0A84FF] hover:bg-[#0A84FF]/20'
                    }`}
                  >
                     {inboxStatus === 'opening' ? (
                        <>
                          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"/>
                          <span>正在打开...</span>
                        </>
                     ) : (
                        <>
                          <Icon name="inbox" className="w-4 h-4" />
                          <span>查看收件箱</span>
                        </>
                     )}
                  </button>
                }
              />
            </section>

            {/* 主要操作按钮 */}
            <button
              ref={buttonRef}
              onClick={generate}
              disabled={!isInitialized}
              className="w-full h-[56px] rounded-[18px] shadow-[0_4px_20px_rgba(10,132,255,0.3)] border border-white/10 flex items-center justify-center gap-2 transform-gpu touch-manipulation relative active:scale-[0.96] active:brightness-90 bg-[#007AFF] hover:bg-[#0071eb] transition-all duration-200 group"
            >
                <Icon name="sparkles" className="w-5 h-5 text-white/90 group-active:rotate-12 transition-transform" />
                <span className="text-[17px] font-bold tracking-tight text-white">
                    一键生成新身份
                </span>
            </button>

            {/* 设置区域 */}
            <section className="space-y-2">
              <div className="px-4 text-[13px] font-medium text-white/40 uppercase tracking-wide">生成偏好</div>
              <div className="bg-[#1C1C1E]/70 backdrop-blur-xl rounded-[18px] overflow-hidden border border-white/10">
                <button
                  onClick={() => { haptic(15); setShowCountrySheet(true); }}
                  className="w-full flex items-center justify-between py-4 pl-4 pr-3 hover:bg-white/5 active:bg-white/10 transition-colors duration-200 group touch-manipulation"
                >
                  <span className="text-[16px] text-white/90">选择地区</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[16px] text-white/50">{selectedCountry.name}</span>
                    <Icon name="chevronRight" className="w-4 h-4 text-white/20" />
                  </div>
                </button>
                <div className="ml-4 h-[0.5px] bg-white/10" />
                <button
                  onClick={() => { haptic(15); setShowDomainSheet(true); }}
                  className="w-full flex items-center justify-between py-4 pl-4 pr-3 hover:bg-white/5 active:bg-white/10 transition-colors duration-200 group touch-manipulation"
                >
                  <span className="text-[16px] text-white/90">邮箱域名</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[16px] text-white/50">{displayDomain}</span>
                    <Icon name="chevronRight" className="w-4 h-4 text-white/20" />
                  </div>
                </button>
              </div>
            </section>

            {/* 底部信息 */}
            <footer className="pt-6 pb-4 text-center">
              <a 
                href="https://t.me/fang180" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-2 text-[14px] text-[#0A84FF] font-semibold py-2.5 px-6 rounded-full bg-[#0A84FF]/10 active:bg-[#0A84FF]/20 active:scale-95 transition-all touch-manipulation"
              >
                <Icon name="link" className="w-4 h-4" />
                加入 Telegram 频道
              </a>
              <p className="mt-4 text-[12px] text-white/20 font-medium">
                当前数据库: {countries.length} 个国家 / {allDomains.length} 个域名
              </p>
            </footer>
          </>
        )}
      </main>

      {/* 国家选择 Sheet */}
      <BottomSheet 
        isOpen={showCountrySheet} 
        onClose={() => setShowCountrySheet(false)} 
        title="选择地区"
      >
        <CountryList 
          countries={countries} 
          selectedCode={selectedCountry.code} 
          onSelect={(c) => {
            haptic(15);
            setSelectedCountry(c);
            setShowCountrySheet(false);
          }} 
        />
      </BottomSheet>

      {/* 域名选择 Sheet */}
      <BottomSheet 
        isOpen={showDomainSheet} 
        onClose={() => setShowDomainSheet(false)} 
        title="选择域名"
        rightAction={
          <button onClick={() => setShowDomainSheet(false)} className="text-[#0A84FF] font-bold text-[15px] active:opacity-60 transition-opacity">
            完成
          </button>
        }
      >
        <DomainList 
          allDomains={allDomains} 
          selectedDomain={selectedDomain} 
          onSelect={(d) => {
             haptic(15);
             setSelectedDomain(d);
             setShowDomainSheet(false);
          }} 
        />
      </BottomSheet>

      <style jsx global>{`
        .pb-safe { padding-bottom: env(safe-area-inset-bottom); }
        .pt-safe { padding-top: env(safe-area-inset-top); }
        
        .cubic-bezier-spring {
          transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.1); /* 轻微回弹 */
        }
        
        @keyframes pop {
          0% { transform: scale(1); }
          40% { transform: scale(0.97); }
          100% { transform: scale(1); }
        }
        .anim-pop {
          animation: pop 0.3s cubic-bezier(0.25, 1, 0.5, 1);
        }
      `}</style>
    </div>
  );
}
