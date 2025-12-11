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

// --- 图标组件 (SVG Paths) ---
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

// --- 工具函数: 震动反馈 ---
const haptic = (duration: number = 15) => { 
  if (typeof navigator !== 'undefined' && 'vibrate' in navigator) { 
    navigator.vibrate(duration);
  } 
};

// --- 组件: 信息行 (Glassmorphism Style) ---
const InfoRow = memo(({ label, value, onCopy, isCopied, isLast = false }: {
  label: string;
  value: string;
  onCopy: () => void;
  isCopied: boolean;
  isLast?: boolean;
}) => {
  return (
    <div 
      onClick={onCopy}
      className={`group relative flex items-center justify-between py-4 pl-5 pr-5 cursor-pointer transition-colors duration-200 touch-manipulation ${
        isCopied ? 'bg-blue-500/10' : 'bg-transparent hover:bg-white/5 active:bg-white/10'
      }`}
    >
      {/* Label: Reduced opacity white */}
      <span className="text-[15px] font-medium text-white/50 w-20 shrink-0 tracking-tight">{label}</span>
      
      <div className="flex items-center gap-3 min-w-0 flex-1 justify-end h-6 relative overflow-hidden">
        {/* Value: High opacity white */}
        <span 
          className={`absolute right-0 text-[17px] font-medium truncate select-all tracking-tight transition-all duration-300 ${
            isCopied ? 'opacity-0 translate-y-4 scale-95' : 'opacity-100 translate-y-0 scale-100 text-white/90'
          }`}
        >
          {value || '---'}
        </span>

        {/* 复制成功反馈 */}
        <div 
          className={`absolute right-0 flex items-center gap-1.5 transition-all duration-300 cubic-bezier-bounce ${
            isCopied ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-4 scale-90 pointer-events-none'
          }`}
        >
          <div className="bg-[#34C759] rounded-full p-0.5 shadow-[0_0_10px_rgba(52,199,89,0.4)]">
            <Icon name="check" className="w-3 h-3 text-white stroke-[3px]" />
          </div>
          <span className="text-[15px] font-semibold text-[#34C759]">已复制</span>
        </div>
      </div>
      
      {/* Separator: Very subtle white line */}
      {!isLast && <div className="absolute bottom-0 left-5 right-0 h-[0.5px] bg-white/10" />}
    </div>
  );
});
InfoRow.displayName = 'InfoRow';

// --- 组件: 通用底部弹窗 (Glassmorphism BottomSheet) ---
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
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center isolate">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-[2px] transition-opacity duration-300" 
        onClick={onClose} 
      />
      <div 
        className="relative w-full max-w-md bg-[#0f172a]/80 backdrop-blur-xl border border-white/10 rounded-t-[24px] sm:rounded-[24px] max-h-[85vh] flex flex-col shadow-2xl animate-slide-up overflow-hidden will-change-transform transform-gpu"
        style={{ boxShadow: '0 -10px 40px rgba(0,0,0,0.5)' }}
      >
        <div className="p-4 border-b border-white/10 sticky top-0 z-10 shrink-0 bg-inherit">
          <div className="w-10 h-1.5 bg-white/20 rounded-full mx-auto mb-4"></div>
          <div className="relative flex items-center justify-center min-h-[24px]">
             <h3 className="text-[17px] font-semibold text-white tracking-tight">{title}</h3>
             {rightAction ? (
               <div className="absolute right-0 top-1/2 -translate-y-1/2">{rightAction}</div>
             ) : (
               <button 
                 onClick={onClose}
                 className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/10 p-1.5 rounded-full text-white/60 hover:bg-white/20 transition-colors"
               >
                 <Icon name="close" className="w-4 h-4" />
               </button>
             )}
          </div>
        </div>
        <div className="flex-1 overflow-y-auto overscroll-contain">
          {children}
        </div>
      </div>
    </div>
  );
});
BottomSheet.displayName = 'BottomSheet';

// --- 组件: 列表项 (ListItem - Dark Mode) ---
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
    className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-200 active:scale-[0.98] touch-manipulation border ${
      isSelected 
        ? 'bg-white/10 border-white/10 shadow-lg shadow-black/10 text-[#409CFF] font-semibold' 
        : 'bg-transparent border-transparent text-white/80 hover:bg-white/5 active:bg-white/10'
    }`}
  >
    <div className="flex items-center gap-3">
      {icon && (
        <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-[#007AFF]/20' : 'bg-white/10'}`}>
          <Icon name={icon} className={`w-4 h-4 ${isSelected ? 'text-[#409CFF]' : 'text-white/50'}`} />
        </div>
      )}
      <span className="text-[16px] tracking-tight text-left">{label}</span>
    </div>
    {isSelected && <Icon name="check" className="w-5 h-5 text-[#409CFF]" />}
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
    <div className="p-4 space-y-2">
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
    <div className="flex flex-col h-full">
      {/* Search Bar - Glass Style */}
      <div className="px-4 pb-2 sticky top-0 z-10 bg-inherit">
         <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon name="search" className="w-4 h-4 text-white/40" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索域名"
              className="w-full pl-9 pr-8 py-2 bg-black/20 border border-white/5 rounded-[10px] text-[16px] text-white placeholder-white/30 focus:ring-1 focus:ring-white/20 focus:bg-black/30 transition-colors caret-[#007AFF]"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute inset-y-0 right-0 pr-3 flex items-center touch-manipulation">
                <div className="bg-white/20 rounded-full p-0.5"><Icon name="close" className="w-3 h-3 text-white" /></div>
              </button>
            )}
          </div>
      </div>
      
      <div className="p-4 pt-2 space-y-2">
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
          <div className="text-center py-8 text-white/30 text-sm">无匹配结果</div>
        )}
      </div>
    </div>
  );
});
DomainList.displayName = 'DomainList';


export default function GlassStylePage() {
  // --- State ---
  const [selectedCountry, setSelectedCountry] = useState<CountryConfig>(countries[0]);
  const [selectedDomain, setSelectedDomain] = useState<string>('random');
  const [userInfo, setUserInfo] = useState<UserInfo>({
    firstName: '', lastName: '', birthday: '', phone: '', password: '', email: ''
  });
  const [showCountrySheet, setShowCountrySheet] = useState(false);
  const [showDomainSheet, setShowDomainSheet] = useState(false);
  
  const [ipInfo, setIpInfo] = useState({ ip: '...', country: 'US' });
  const [isInitialized, setIsInitialized] = useState(false);
  
  // 内联反馈状态
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [inboxStatus, setInboxStatus] = useState<'idle' | 'opening'>('idle');
  
  // 动画 Refs
  const buttonRef = useRef<HTMLButtonElement>(null);
  const successContentRef = useRef<HTMLDivElement>(null);
  const normalContentRef = useRef<HTMLDivElement>(null);

  const copyTimerRef = useRef<NodeJS.Timeout | null>(null);
  const inboxTimerRef = useRef<NodeJS.Timeout | null>(null);

  // --- Logic ---
  
  const copyToClipboard = useCallback(async (text: string, label: string) => {
    haptic(30);
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
    const successEl = successContentRef.current;
    const normalEl = normalContentRef.current;

    if (btn && successEl && normalEl) {
      btn.classList.remove('anim-bg-success');
      successEl.classList.remove('anim-slide-success');
      normalEl.classList.remove('anim-slide-normal');
      void btn.offsetWidth; 
      btn.classList.add('anim-bg-success');
      successEl.classList.add('anim-slide-success');
      normalEl.classList.add('anim-slide-normal');
    }
  }, []);

  const generate = useCallback(() => {
    haptic(50);
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

    haptic(30);
    setInboxStatus('opening');

    const emailName = userInfo.email.split('@')[0];
    
    inboxTimerRef.current = setTimeout(() => {
        window.open(`https://yopmail.com/?login=${emailName}`, '_blank');
        setInboxStatus('idle');
    }, 600);
  }, [userInfo.email, inboxStatus]);

  // 初始化逻辑
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
        try {
            const { firstName, lastName } = generateName(selectedCountry.code);
            const birthday = generateBirthday();
            const phone = generatePhone(selectedCountry);
            const password = generatePassword();
            const customDomain = selectedDomain === 'random' ? undefined : selectedDomain;
            const email = generateEmail(firstName, lastName, customDomain);
            setUserInfo({ firstName, lastName, birthday, phone, password, email });
        } catch (e) { console.error(e); }
    }
  }, [isInitialized, userInfo.firstName, selectedCountry, selectedDomain]);

  useEffect(() => {
    if (isInitialized && userInfo.firstName) generate();
  }, [selectedCountry.code]);

  const allDomains = useMemo(() => getAllDomains(), []);
  const displayDomain = selectedDomain === 'random' ? '随机' : selectedDomain;

  const handleCountrySelect = useCallback((country: CountryConfig) => {
    haptic(20);
    setSelectedCountry(country);
    setShowCountrySheet(false);
  }, []);

  const handleDomainSelect = useCallback((domain: string) => {
    haptic(20);
    setSelectedDomain(domain);
    setShowDomainSheet(false);
  }, []);

  // --- Render ---
  return (
    // Global Background: Dark Gradient
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#312e81] font-sans text-white pb-10 selection:bg-blue-400/30 overflow-x-hidden touch-pan-y">
      
      {/* 顶部导航: Glass Effect */}
      <header className="fixed top-0 left-0 right-0 h-[52px] bg-[#0f172a]/60 backdrop-blur-md border-b border-white/10 z-40 flex items-center justify-center transition-all duration-300 isolate">
        <h1 className="text-[17px] font-semibold text-white/90 tracking-tight drop-shadow-md">脸书小助手</h1>
        
        <div className="absolute right-4 flex items-center gap-1.5 pl-2 pr-2.5 py-1 rounded-full bg-white/10 border border-white/10 backdrop-blur-md shadow-sm">
          <div className="w-1.5 h-1.5 rounded-full bg-[#34C759] shadow-[0_0_6px_rgba(52,199,89,0.8)]"></div>
          <span className="text-[11px] font-semibold text-white/70 font-mono tracking-tight">{ipInfo.ip}</span>
        </div>
      </header>

      <main className="max-w-[420px] mx-auto px-5 pt-24 pb-10 space-y-6">
        
        {!isInitialized ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-4">
            <div className="w-8 h-8 border-[3px] border-white/10 border-t-[#007AFF] rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            {/* 核心信息卡片: Glassmorphism */}
            <section className="bg-white/5 backdrop-blur-md rounded-[20px] overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.2)] border border-white/10 transform-gpu isolate">
              <InfoRow label="姓氏" value={userInfo.lastName} onCopy={() => copyToClipboard(userInfo.lastName, '姓氏')} isCopied={copiedField === '姓氏'} />
              <InfoRow label="名字" value={userInfo.firstName} onCopy={() => copyToClipboard(userInfo.firstName, '名字')} isCopied={copiedField === '名字'} />
              <InfoRow label="生日" value={userInfo.birthday} onCopy={() => copyToClipboard(userInfo.birthday, '生日')} isCopied={copiedField === '生日'} />
              <InfoRow label="手机号" value={userInfo.phone} onCopy={() => copyToClipboard(userInfo.phone, '手机号')} isCopied={copiedField === '手机号'} />
              <InfoRow label="密码" value={userInfo.password} onCopy={() => copyToClipboard(userInfo.password, '密码')} isCopied={copiedField === '密码'} />
              
              {/* 邮箱行 */}
              <div className="relative flex flex-col py-4 pl-5 pr-5 group transition-colors duration-200">
                <div 
                  className="flex items-center justify-between mb-3 cursor-pointer touch-manipulation" 
                  onClick={() => copyToClipboard(userInfo.email, '邮箱')}
                >
                  <span className="text-[15px] font-medium text-white/50 w-20 shrink-0 tracking-tight">邮箱</span>
                  
                  <div className="flex items-center gap-3 min-w-0 flex-1 justify-end h-6 relative overflow-hidden">
                    <span 
                      className={`absolute right-0 text-[17px] font-medium truncate select-all tracking-tight transition-all duration-300 ${
                        copiedField === '邮箱' ? 'opacity-0 translate-y-4 scale-95' : 'opacity-100 translate-y-0 scale-100 text-white/90'
                      }`}
                    >
                      {userInfo.email}
                    </span>
                    <div 
                      className={`absolute right-0 flex items-center gap-1.5 transition-all duration-300 cubic-bezier-bounce ${
                        copiedField === '邮箱' ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-4 scale-90 pointer-events-none'
                      }`}
                    >
                      <div className="bg-[#34C759] rounded-full p-0.5 shadow-[0_0_10px_rgba(52,199,89,0.4)]">
                        <Icon name="check" className="w-3 h-3 text-white stroke-[3px]" />
                      </div>
                      <span className="text-[15px] font-semibold text-[#34C759]">已复制</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end pt-1">
                  <button
                    onClick={handleInboxClick}
                    className={`inline-flex items-center gap-1.5 py-1.5 px-4 rounded-full text-[13px] font-semibold transition-all duration-300 active:scale-95 touch-manipulation overflow-hidden relative border ${
                        inboxStatus === 'opening' 
                        ? 'bg-[#34C759]/20 border-[#34C759]/30 text-[#4ADE80]' 
                        : 'bg-[#007AFF]/20 border-[#007AFF]/30 hover:bg-[#007AFF]/30 text-[#409CFF] active:bg-[#007AFF]/40'
                    }`}
                  >
                    <div className={`flex items-center gap-1.5 transition-all duration-300 ${inboxStatus === 'opening' ? '-translate-y-8 opacity-0' : 'translate-y-0 opacity-100'}`}>
                        <Icon name="inbox" className="w-3.5 h-3.5" />
                        查看收件箱
                    </div>
                    <div className={`absolute inset-0 flex items-center justify-center gap-1.5 transition-all duration-300 ${inboxStatus === 'opening' ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                        <Icon name="open" className="w-3.5 h-3.5" />
                        已打开
                    </div>
                  </button>
                </div>
              </div>
            </section>

            {/* 主要操作按钮: Glassy Gradient */}
            <button
              ref={buttonRef}
              onClick={generate}
              disabled={!isInitialized}
              className="w-full py-4 rounded-[18px] shadow-[0_0_20px_rgba(0,122,255,0.3)] border border-white/20 flex items-center justify-center gap-2.5 transform-gpu touch-manipulation overflow-hidden relative active:scale-[0.96] active:brightness-90 bg-gradient-to-b from-[#007AFF] to-[#0055b3] hover:scale-[1.01] hover:brightness-110 transition-transform duration-100"
            >
              {/* 正常状态内容 */}
              <div 
                ref={normalContentRef}
                className="absolute flex items-center gap-2.5 translate-y-0 opacity-100 scale-100"
              >
                  <Icon name="sparkles" className="w-5 h-5 text-white/90" />
                  <span className="text-[17px] font-semibold tracking-tight text-white drop-shadow-sm">
                    生成新身份
                  </span>
              </div>

              {/* 成功状态内容 */}
              <div 
                ref={successContentRef}
                className="absolute flex items-center gap-2.5 translate-y-8 opacity-0 scale-100"
              >
                   <div className="bg-white/20 rounded-full p-1">
                      <Icon name="check" className="w-5 h-5 text-white stroke-[3px]" />
                   </div>
                   <span className="text-[17px] font-semibold tracking-tight text-white">
                    已生成
                  </span>
              </div>
              
              {/* 占位符 */}
              <div className="opacity-0 pointer-events-none flex items-center gap-2.5">
                  <Icon name="sparkles" className="w-5 h-5" />
                  <span className="text-[17px] font-semibold">生成新身份</span>
              </div>
            </button>

            {/* 设置区域: Glassmorphism */}
            <section>
              <div className="pl-5 mb-2 text-[13px] font-medium text-white/40 uppercase tracking-wide">生成设置</div>
              <div className="bg-white/5 backdrop-blur-md rounded-[18px] overflow-hidden shadow-lg shadow-black/10 border border-white/10 transform-gpu isolate">
                <button
                  onClick={() => { haptic(20); setShowCountrySheet(true); }}
                  className="w-full flex items-center justify-between py-4 pl-5 pr-4 hover:bg-white/5 active:bg-white/10 transition-colors duration-200 group touch-manipulation"
                >
                  <span className="text-[16px] font-medium text-white/90 tracking-tight">选择地区</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[16px] text-white/60 tracking-tight">{selectedCountry.name}</span>
                    <Icon name="chevronRight" className="w-4 h-4 text-white/30 group-active:text-white/50 transition-transform duration-300 group-active:rotate-90" />
                  </div>
                </button>
                <div className="ml-5 h-[0.5px] bg-white/10" />
                <button
                  onClick={() => { haptic(20); setShowDomainSheet(true); }}
                  className="w-full flex items-center justify-between py-4 pl-5 pr-4 hover:bg-white/5 active:bg-white/10 transition-colors duration-200 group touch-manipulation"
                >
                  <span className="text-[16px] font-medium text-white/90 tracking-tight">邮箱域名</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[16px] text-white/60 tracking-tight">{displayDomain}</span>
                    <Icon name="chevronRight" className="w-4 h-4 text-white/30 group-active:text-white/50 transition-transform duration-300 group-active:rotate-90" />
                  </div>
                </button>
              </div>
            </section>

            {/* 底部信息 */}
            <footer className="pt-4 pb-8 text-center space-y-4">
              <a 
                href="https://t.me/fang180" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-1.5 text-[14px] text-[#409CFF] hover:text-[#60aeff] font-medium transition-colors active:opacity-60 py-2 px-4 rounded-full hover:bg-white/5 touch-manipulation"
              >
                <Icon name="link" className="w-4 h-4" />
                加入 Telegram 频道
              </a>
              <p className="text-[12px] text-white/30 font-medium tracking-tight">
                支持 {countries.length} 个国家 • {allDomains.length} 个域名
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
          onSelect={handleCountrySelect} 
        />
      </BottomSheet>

      {/* 域名选择 Sheet */}
      <BottomSheet 
        isOpen={showDomainSheet} 
        onClose={() => setShowDomainSheet(false)} 
        title="选择域名"
        rightAction={
          <button onClick={() => setShowDomainSheet(false)} className="text-[#409CFF] font-medium text-[15px] p-2 -mr-2 touch-manipulation hover:text-white transition-colors">
            完成
          </button>
        }
      >
        <DomainList 
          allDomains={allDomains} 
          selectedDomain={selectedDomain} 
          onSelect={handleDomainSelect} 
        />
      </BottomSheet>

      <style jsx global>{`
        @keyframes slide-up { from { transform: translateY(100%); } to { transform: translateY(0); } }
        .animate-slide-up { animation: slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
        
        .cubic-bezier-bounce {
          transition-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        /* --- 按钮动画 Keyframes --- */
        
        @keyframes btn-bg-success {
          0% { 
            background-image: linear-gradient(to bottom, #34C759, #28a745); 
            box-shadow: 0 0 20px rgba(52,199,89,0.4); 
          }
          70% { 
            background-image: linear-gradient(to bottom, #34C759, #28a745); 
            box-shadow: 0 0 20px rgba(52,199,89,0.4); 
          }
          100% { 
            background-image: linear-gradient(to bottom, #007AFF, #0055b3); 
            box-shadow: 0 0 20px rgba(0,122,255,0.3);
          }
        }
        .anim-bg-success {
          animation: btn-bg-success 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        @keyframes slide-normal-cycle {
          0% { transform: translateY(0) scale(1); opacity: 1; }
          20% { transform: translateY(-20px) scale(0.95); opacity: 0; }
          80% { transform: translateY(20px) scale(0.95); opacity: 0; }
          100% { transform: translateY(0) scale(1); opacity: 1; }
        }
        .anim-slide-normal {
          animation: slide-normal-cycle 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        @keyframes slide-success-cycle {
          0% { transform: translateY(20px) scale(0.9); opacity: 0; }
          25% { transform: translateY(0) scale(1.05); opacity: 1; }
          35% { transform: translateY(0) scale(1); opacity: 1; }
          75% { transform: translateY(0) scale(1); opacity: 1; }
          100% { transform: translateY(-20px) scale(0.95); opacity: 0; }
        }
        .anim-slide-success {
          animation: slide-success-cycle 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
      `}</style>
    </div>
  );
}