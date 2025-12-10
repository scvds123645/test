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

interface ToastState {
  id: number;      // 用于强制重渲染动画的唯一ID
  msg: string;
  visible: boolean;
}

// --- 图标组件 (SVG Paths) ---
const ICON_PATHS: Record<string, React.ReactElement> = {
  check: <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>,
  chevronRight: <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>,
  close: <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>,
  sparkles: <path d="M7 11v2l-4 1 4 1v2l1-4-1-4zm5-7v4l-3 1 3 1v4l2-5-2-5zm5.66 2.94L15 6.26l.66-2.94L18.34 6l2.66.68-2.66.68-.68 2.58-.66-2.94zM15 18l-2-3 2-3 2 3-2 3z"/>,
  search: <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>,
  inbox: <path d="M19 3H4.99c-1.11 0-1.98.89-1.98 2L3 19c0 1.1.89 2 1.99 2H19c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 12h-4c0 1.66-1.35 3-3 3s-3-1.34-3-3H4.99V5H19v10z"/>,
  link: <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/>,
  copy: <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
};

const Icon = memo(({ name, className = "w-6 h-6" }: { name: string; className?: string }) => {
  return (<svg className={className} viewBox="0 0 24 24" fill="currentColor">{ICON_PATHS[name]}</svg>);
});
Icon.displayName = 'Icon';

// --- 工具函数 ---
const haptic = () => { 
  if (typeof navigator !== 'undefined' && 'vibrate' in navigator) { 
    navigator.vibrate(15); // 稍微增加一点震动反馈，更清晰
  } 
};

// --- 组件: 信息行 ---
const InfoRow = memo(({ label, value, onCopy, isLast = false }: {
  label: string;
  value: string;
  onCopy: () => void;
  isLast?: boolean;
}) => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = useCallback(() => {
    setIsActive(true);
    onCopy();
    setTimeout(() => setIsActive(false), 200);
  }, [onCopy]);

  return (
    <div 
      onClick={handleClick}
      className={`group relative flex items-center justify-between py-4 pl-5 pr-5 cursor-pointer transition-colors duration-200 touch-manipulation ${
        isActive ? 'bg-gray-100/80' : 'bg-transparent hover:bg-gray-50/50'
      }`}
    >
      <span className="text-[15px] font-medium text-gray-400 w-20 shrink-0 tracking-tight">{label}</span>
      <div className="flex items-center gap-3 min-w-0 flex-1 justify-end">
        <span className={`text-[17px] font-medium truncate select-all tracking-tight transition-transform duration-200 ${
          isActive ? 'scale-[0.98] text-gray-600' : 'text-gray-900'
        }`}>
          {value || '---'}
        </span>
      </div>
      {!isLast && <div className="absolute bottom-0 left-5 right-0 h-[0.5px] bg-gray-200/80" />}
    </div>
  );
});
InfoRow.displayName = 'InfoRow';

// --- 组件: 通用底部弹窗 (BottomSheet) ---
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
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <div 
        className="absolute inset-0 bg-black/30 backdrop-blur-[2px] transition-opacity duration-300" 
        onClick={onClose} 
      />
      <div 
        className="relative w-full max-w-md bg-[#F2F2F7] rounded-t-[24px] sm:rounded-[24px] max-h-[85vh] flex flex-col shadow-2xl animate-slide-up overflow-hidden ring-1 ring-white/20 will-change-transform transform-gpu"
      >
        <div className="p-4 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-10 shrink-0">
          <div className="w-10 h-1.5 bg-gray-300/60 rounded-full mx-auto mb-4"></div>
          <div className="relative flex items-center justify-center min-h-[24px]">
             <h3 className="text-[17px] font-semibold text-gray-900 tracking-tight">{title}</h3>
             {rightAction ? (
               <div className="absolute right-0 top-1/2 -translate-y-1/2">{rightAction}</div>
             ) : (
               <button 
                 onClick={onClose}
                 className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-200/80 p-1.5 rounded-full text-gray-500 hover:bg-gray-300 transition-colors"
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

// --- 组件: 列表项 (ListItem) ---
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
    className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-200 active:scale-[0.98] touch-manipulation ${
      isSelected 
        ? 'bg-white shadow-sm text-[#007AFF] font-semibold ring-1 ring-black/5' 
        : 'bg-white/50 text-gray-900 hover:bg-white active:bg-white'
    }`}
  >
    <div className="flex items-center gap-3">
      {icon && (
        <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-[#007AFF]/10' : 'bg-gray-200'}`}>
          <Icon name={icon} className={`w-4 h-4 ${isSelected ? 'text-[#007AFF]' : 'text-gray-500'}`} />
        </div>
      )}
      <span className="text-[16px] tracking-tight text-left">{label}</span>
    </div>
    {isSelected && <Icon name="check" className="w-5 h-5" />}
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
      <div className="px-4 pb-2 sticky top-0 z-10 bg-[#F2F2F7]">
         <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon name="search" className="w-4 h-4 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索域名"
              className="w-full pl-9 pr-8 py-2 bg-[#767680]/10 border-none rounded-[10px] text-[16px] text-gray-900 placeholder-gray-500 focus:ring-0 focus:bg-[#767680]/20 transition-colors caret-[#007AFF]"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute inset-y-0 right-0 pr-3 flex items-center touch-manipulation">
                <div className="bg-gray-400 rounded-full p-0.5"><Icon name="close" className="w-3 h-3 text-white" /></div>
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
          <div className="text-center py-8 text-gray-400 text-sm">无匹配结果</div>
        )}
      </div>
    </div>
  );
});
DomainList.displayName = 'DomainList';


export default function AppleStylePage() {
  // --- State ---
  const [selectedCountry, setSelectedCountry] = useState<CountryConfig>(countries[0]);
  const [selectedDomain, setSelectedDomain] = useState<string>('random');
  const [userInfo, setUserInfo] = useState<UserInfo>({
    firstName: '', lastName: '', birthday: '', phone: '', password: '', email: ''
  });
  const [showCountrySheet, setShowCountrySheet] = useState(false);
  const [showDomainSheet, setShowDomainSheet] = useState(false);
  
  // 优化后的 Toast 状态
  const [toastState, setToastState] = useState<ToastState>({ id: 0, msg: '', visible: false });
  
  const [ipInfo, setIpInfo] = useState({ ip: '...', country: 'US' });
  const [isInitialized, setIsInitialized] = useState(false);
  const [isButtonActive, setIsButtonActive] = useState(false);
  
  const toastTimerRef = useRef<NodeJS.Timeout | null>(null);
  const buttonTimerRef = useRef<NodeJS.Timeout | null>(null);

  // --- Logic ---
  
  // 核心优化：支持快速点击的 Toast 逻辑
  const showToast = useCallback((msg: string) => {
    // 1. 清除之前的定时器，防止旧的关闭操作影响新的 Toast
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    
    // 2. 立即更新状态，使用 Date.now() 作为 ID 确保每次都是全新的渲染
    // 这会触发 React 的 Key 变化，从而强制重启动画
    setToastState({
      id: Date.now(),
      msg,
      visible: true
    });

    // 3. 设置新的自动关闭定时器
    toastTimerRef.current = setTimeout(() => {
      setToastState(prev => ({ ...prev, visible: false }));
    }, 2000);
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

  const generate = useCallback(() => {
    if (buttonTimerRef.current) clearTimeout(buttonTimerRef.current);
    setIsButtonActive(true);
    buttonTimerRef.current = setTimeout(() => setIsButtonActive(false), 150);

    haptic();
    
    // 使用 setTimeout 将计算任务推迟到下一个事件循环，让 UI 先响应点击动画
    setTimeout(() => {
      try {
        const { firstName, lastName } = generateName(selectedCountry.code);
        const birthday = generateBirthday();
        const phone = generatePhone(selectedCountry);
        const password = generatePassword();
        const customDomain = selectedDomain === 'random' ? undefined : selectedDomain;
        const email = generateEmail(firstName, lastName, customDomain);
        
        setUserInfo({ firstName, lastName, birthday, phone, password, email });
        showToast('已生成新身份');
      } catch (error) {
        console.error(error);
        showToast('生成失败');
      }
    }, 10);
  }, [selectedCountry, selectedDomain, showToast]);

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

  // 初始生成
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

  // 国家改变时自动生成
  useEffect(() => {
    if (isInitialized && userInfo.firstName) generate();
  }, [selectedCountry.code]);

  const allDomains = useMemo(() => getAllDomains(), []);
  const displayDomain = selectedDomain === 'random' ? '随机' : selectedDomain;

  // 处理 Sheet 选择
  const handleCountrySelect = useCallback((country: CountryConfig) => {
    haptic();
    setSelectedCountry(country);
    setShowCountrySheet(false);
  }, []);

  const handleDomainSelect = useCallback((domain: string) => {
    haptic();
    setSelectedDomain(domain);
    setShowDomainSheet(false);
  }, []);

  // --- Render ---
  return (
    <div className="min-h-screen bg-[#F2F2F7] font-sans text-slate-900 pb-10 selection:bg-blue-200/50 overflow-x-hidden touch-pan-y">
      
      {/* 顶部导航 */}
      <header className="fixed top-0 left-0 right-0 h-[52px] bg-white/80 backdrop-blur-xl border-b border-gray-200/50 z-40 flex items-center justify-center transition-all duration-300 supports-[backdrop-filter]:bg-white/60">
        <h1 className="text-[17px] font-semibold text-gray-900 tracking-tight">脸书小助手</h1>
        
        <div className="absolute right-4 flex items-center gap-1.5 pl-2 pr-2.5 py-1 rounded-full bg-white/50 border border-black/5 backdrop-blur-md shadow-sm">
          <div className="w-1.5 h-1.5 rounded-full bg-[#34C759] shadow-[0_0_6px_rgba(52,199,89,0.4)]"></div>
          <span className="text-[11px] font-semibold text-gray-500 font-mono tracking-tight">{ipInfo.ip}</span>
        </div>
      </header>

      <main className="max-w-[420px] mx-auto px-5 pt-24 pb-10 space-y-6">
        
        {!isInitialized ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-4">
            <div className="w-8 h-8 border-[3px] border-gray-200 border-t-[#007AFF] rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            {/* 核心信息卡片 */}
            <section className="bg-white rounded-[20px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-black/5 transform-gpu">
              <InfoRow label="姓氏" value={userInfo.lastName} onCopy={() => copyToClipboard(userInfo.lastName, '姓氏')} />
              <InfoRow label="名字" value={userInfo.firstName} onCopy={() => copyToClipboard(userInfo.firstName, '名字')} />
              <InfoRow label="生日" value={userInfo.birthday} onCopy={() => copyToClipboard(userInfo.birthday, '生日')} />
              <InfoRow label="手机号" value={userInfo.phone} onCopy={() => copyToClipboard(userInfo.phone, '手机号')} />
              <InfoRow label="密码" value={userInfo.password} onCopy={() => copyToClipboard(userInfo.password, '密码')} />
              
              <div className="relative flex flex-col py-4 pl-5 pr-5 group active:bg-gray-50 transition-colors duration-200 touch-manipulation">
                <div 
                  className="flex items-center justify-between mb-3 cursor-pointer" 
                  onClick={() => copyToClipboard(userInfo.email, '邮箱')}
                >
                  <span className="text-[15px] font-medium text-gray-400 w-20 shrink-0 tracking-tight">邮箱</span>
                  <span className="text-[17px] font-medium text-gray-900 truncate select-all flex-1 text-right tracking-tight">{userInfo.email}</span>
                </div>
                
                <div className="flex justify-end pt-1">
                  <button
                    onClick={(e) => { 
                      e.stopPropagation();
                      haptic(); 
                      const emailName = userInfo.email.split('@')[0];
                      window.open(`https://yopmail.com/?login=${emailName}`, '_blank');
                    }}
                    className="inline-flex items-center gap-1.5 py-1.5 px-4 bg-[#007AFF]/10 hover:bg-[#007AFF]/20 text-[#007AFF] rounded-full text-[13px] font-semibold transition-all active:scale-95 active:bg-[#007AFF]/25 touch-manipulation"
                  >
                    <Icon name="inbox" className="w-3.5 h-3.5" />
                    查看收件箱
                  </button>
                </div>
              </div>
            </section>

            {/* 主要操作按钮 */}
            <button
              onClick={generate}
              disabled={!isInitialized}
              className={`w-full py-4 bg-gradient-to-b from-[#007AFF] to-[#0062CC] text-white rounded-[18px] shadow-[0_4px_14px_rgba(0,118,255,0.39)] border-t border-white/20 transition-all duration-200 cubic-bezier(0.25, 0.1, 0.25, 1) flex items-center justify-center gap-2.5 transform-gpu touch-manipulation ${
                isButtonActive 
                  ? 'scale-[0.96] brightness-90 shadow-none' 
                  : 'scale-100 hover:scale-[1.01] hover:brightness-105'
              }`}
            >
              <Icon name="sparkles" className="w-5 h-5 text-white/90" />
              <span className="text-[17px] font-semibold tracking-tight text-white drop-shadow-sm">
                生成新身份
              </span>
            </button>

            {/* 设置区域 */}
            <section>
              <div className="pl-5 mb-2 text-[13px] font-medium text-gray-400 uppercase tracking-wide">生成设置</div>
              <div className="bg-white rounded-[18px] overflow-hidden shadow-sm ring-1 ring-black/5 transform-gpu">
                <button
                  onClick={() => { haptic(); setShowCountrySheet(true); }}
                  className="w-full flex items-center justify-between py-4 pl-5 pr-4 active:bg-gray-100 transition-colors group touch-manipulation"
                >
                  <span className="text-[16px] font-medium text-gray-900 tracking-tight">选择地区</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[16px] text-gray-500 tracking-tight">{selectedCountry.name}</span>
                    <Icon name="chevronRight" className="w-4 h-4 text-gray-300 group-active:text-gray-400 transition-colors" />
                  </div>
                </button>
                <div className="ml-5 h-[0.5px] bg-gray-200/80" />
                <button
                  onClick={() => { haptic(); setShowDomainSheet(true); }}
                  className="w-full flex items-center justify-between py-4 pl-5 pr-4 active:bg-gray-100 transition-colors group touch-manipulation"
                >
                  <span className="text-[16px] font-medium text-gray-900 tracking-tight">邮箱域名</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[16px] text-gray-500 tracking-tight">{displayDomain}</span>
                    <Icon name="chevronRight" className="w-4 h-4 text-gray-300 group-active:text-gray-400 transition-colors" />
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
                className="inline-flex items-center gap-1.5 text-[14px] text-[#007AFF] hover:text-[#0056b3] font-medium transition-colors active:opacity-60 py-2 px-4 rounded-full hover:bg-blue-50/50 touch-manipulation"
              >
                <Icon name="link" className="w-4 h-4" />
                加入 Telegram 频道
              </a>
              <p className="text-[12px] text-gray-400 font-medium tracking-tight">
                支持 {countries.length} 个国家 • {allDomains.length} 个域名
              </p>
            </footer>
          </>
        )}
      </main>

      {/* 
        Toast 容器 
        使用 key={toastState.id} 确保每次 id 变化时，React 都会卸载旧的 Toast 并挂载新的。
        这会强制 CSS 动画从头开始播放，实现“连击”效果。
      */}
      {toastState.visible && (
        <div 
          key={toastState.id}
          className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 pointer-events-none animate-toast-pop origin-center"
        >
          <div className="bg-gray-900/90 backdrop-blur-2xl text-white pl-4 pr-5 py-3 rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.25)] flex items-center gap-3 min-w-[140px] justify-center border border-white/10 ring-1 ring-black/20">
            <div className="bg-[#34C759] rounded-full p-0.5 shadow-[0_0_10px_rgba(52,199,89,0.4)]">
              <Icon name="check" className="w-3.5 h-3.5 text-white stroke-[3px]" />
            </div>
            <span className="text-[15px] font-semibold tracking-tight whitespace-nowrap">{toastState.msg}</span>
          </div>
        </div>
      )}

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
          <button onClick={() => setShowDomainSheet(false)} className="text-[#007AFF] font-medium text-[15px] p-2 -mr-2 touch-manipulation">
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
        
        /* 新增：Toast 弹跳动画 (Spring Physics) */
        @keyframes toast-pop {
          0% { transform: translate(-50%, 20px) scale(0.9); opacity: 0; }
          40% { transform: translate(-50%, 0) scale(1.05); opacity: 1; }
          100% { transform: translate(-50%, 0) scale(1); opacity: 1; }
        }
        .animate-toast-pop {
          animation: toast-pop 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
      `}</style>
    </div>
  );
}