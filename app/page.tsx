'use client';

import { useState, useCallback, useMemo, memo, useEffect } from 'react';
import { 
  generateName, 
  generateBirthday, 
  generatePhone, 
  generatePassword, 
  generateEmail,
} from '@/lib/generator';
import { countries, CountryConfig } from '@/lib/countryData';
import { getCountryFlag, facebookIcon, docIcon } from '@/svg/tubiao';

interface UserInfo {
  firstName: string;
  lastName: string;
  birthday: string;
  phone: string;
  password: string;
  email: string;
}

interface IPInfo {
  ip: string;
  country: string;
  accurate: boolean;
}

// 轻量级国旗组件
const FlagIcon = memo(({ countryCode }: { countryCode: string }) => {
  const svgContent = getCountryFlag(countryCode);
  
  return (
    <div 
      className="w-7 h-5 rounded overflow-hidden border border-gray-200 flex-shrink-0" 
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
});

FlagIcon.displayName = 'FlagIcon';

// SVG图标组件
const Icon = memo(({ type, className = "w-5 h-5" }: { type: string; className?: string }) => {
  const paths: Record<string, string> = {
    check: "M5 13l4 4L19 7",
    copy: "M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z",
    refresh: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15",
    chevron: "M19 9l-7 7-7-7",
    close: "M6 18L18 6M6 6l12 12",
    email: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
    link: "M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1",
    doc: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
    play: "M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  };
  
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d={paths[type] || ""} />
    </svg>
  );
});

Icon.displayName = 'Icon';

// 🔧 修复:加载动画组件 - 确保旋转效果正确显示
const LoadingSpinner = memo(() => {
  return (
    <svg 
      className="w-5 h-5 spinner-animation" 
      viewBox="0 0 24 24"
      style={{ display: 'inline-block' }}
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="3"
        fill="none"
        strokeDasharray="31.4 31.4"
        strokeLinecap="round"
      />
    </svg>
  );
});

LoadingSpinner.displayName = 'LoadingSpinner';

// 简化的数据字段组件 - 移动端优化
const DataField = memo(({ label, value, color, mono, onCopy }: {
  label: string;
  value: string;
  color: string;
  mono?: boolean;
  onCopy: () => void;
}) => {
  const gradients: Record<string, string> = {
    indigo: 'from-indigo-500 to-indigo-600',
    purple: 'from-purple-500 to-purple-600',
    pink: 'from-pink-500 to-pink-600',
    blue: 'from-blue-500 to-blue-600',
    emerald: 'from-emerald-500 to-emerald-600',
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 active:bg-gray-50 transition-colors">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <div className={`w-6 h-6 bg-gradient-to-br ${gradients[color]} rounded-lg flex items-center justify-center flex-shrink-0`}>
              <Icon type="check" className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-xs text-gray-600 font-semibold uppercase tracking-wide">{label}</span>
          </div>
          <div className={`text-gray-900 text-[15px] leading-snug break-all ${mono ? 'font-mono bg-gray-50 rounded px-2.5 py-1.5' : 'font-semibold'}`}>
            {value}
          </div>
        </div>
        <button 
          onClick={onCopy} 
          className="p-2.5 bg-gray-50 border border-gray-200 rounded-lg active:scale-95 active:bg-gray-100 transition-all flex-shrink-0"
        >
          <Icon type="copy" className="w-4 h-4 text-gray-600" />
        </button>
      </div>
    </div>
  );
});

DataField.displayName = 'DataField';

// 虚拟滚动国家选择项 - 移动端优化
const CountryItem = memo(({ country, isSelected, isLast, onSelect }: { 
  country: CountryConfig; 
  isSelected: boolean; 
  isLast: boolean;
  onSelect: () => void;
}) => (
  <button
    onClick={onSelect}
    className={`w-full flex items-center gap-3 px-5 py-4 active:bg-gray-100 transition-colors ${!isLast ? 'border-b border-gray-100' : ''}`}
  >
    <FlagIcon countryCode={country.code} />
    <div className="flex-1 text-left min-w-0">
      <div className="font-semibold text-[15px] text-gray-900 truncate">{country.name}</div>
      <div className="text-sm text-gray-500 mt-0.5">{country.phonePrefix}</div>
    </div>
    {isSelected && (
      <div className="w-5 h-5 bg-indigo-500 rounded-full flex items-center justify-center flex-shrink-0">
        <Icon type="check" className="w-3 h-3 text-white" />
      </div>
    )}
  </button>
));

CountryItem.displayName = 'CountryItem';

export default function FakerGenerator() {
  const [selectedCountry, setSelectedCountry] = useState<CountryConfig>(countries[0]);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    firstName: '', lastName: '', birthday: '', phone: '', password: '', email: ''
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [toast, setToast] = useState('');
  const [showCountrySelect, setShowCountrySelect] = useState(false);
  const [ipInfo, setIpInfo] = useState<IPInfo | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);

  // 防止滚动穿透
  useEffect(() => {
    if (showCountrySelect) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showCountrySelect]);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 1500);
  }, []);

  const copyToClipboard = useCallback(async (text: string, label: string) => {
    if (!text) {
      showToast('内容为空');
      return;
    }

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        showToast(`${label} 已复制`);
        return;
      }

      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      try {
        const successful = document.execCommand('copy');
        if (successful) {
          showToast(`${label} 已复制`);
        } else {
          throw new Error('execCommand failed');
        }
      } finally {
        document.body.removeChild(textArea);
      }
    } catch (err) {
      console.error('复制失败:', err);
      showToast('复制失败,请手动复制');
    }
  }, [showToast]);

  const fetchIPInfo = useCallback(async () => {
    try {
      const res = await fetch('/api/ip-info');
      const data = await res.json();
      setIpInfo({
        ip: data.ip || 'Unknown',
        country: data.country || 'US',
        accurate: data.accurate || false,
      });
      if (data.country) {
        const matched = countries.find(c => c.code === data.country);
        if (matched) setSelectedCountry(matched);
      }
    } catch (err) {
      console.error('IP detection failed:', err);
    }
  }, []);

  const generate = useCallback(async () => {
    setIsGenerating(true);
    
    // 首次生成时检测IP
    if (!hasGenerated) {
      await fetchIPInfo();
      setHasGenerated(true);
    }
    
    const name = generateName(selectedCountry.code);
    const birthday = generateBirthday();
    const phone = generatePhone(selectedCountry);
    const password = generatePassword();
    const email = generateEmail(name.firstName, name.lastName);
    
    setUserInfo({ firstName: name.firstName, lastName: name.lastName, birthday, phone, password, email });
    setIsGenerating(false);
  }, [selectedCountry, hasGenerated, fetchIPInfo]);

  const filteredCountries = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return countries;
    return countries.filter(c => 
      c.name.toLowerCase().includes(q) || 
      c.code.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const handleClose = useCallback(() => {
    setShowCountrySelect(false);
    setSearchQuery('');
  }, []);

  const handleSelect = useCallback((country: CountryConfig) => {
    setSelectedCountry(country);
    handleClose();
  }, [handleClose]);

  const copyActions = useMemo(() => ({
    lastName: () => copyToClipboard(userInfo.lastName, '姓氏'),
    firstName: () => copyToClipboard(userInfo.firstName, '名字'),
    birthday: () => copyToClipboard(userInfo.birthday, '生日'),
    phone: () => copyToClipboard(userInfo.phone, '手机号'),
    password: () => copyToClipboard(userInfo.password, '密码'),
    email: () => copyToClipboard(userInfo.email, '邮箱'),
    link: () => copyToClipboard(`https://yopmail.net?${userInfo.email}`, '接码地址'),
  }), [userInfo, copyToClipboard]);

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* 顶部导航栏 - 移动端优化 */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 safe-area-top">
        <div className="max-w-5xl mx-auto px-4 py-3.5">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <div 
                className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0"
                dangerouslySetInnerHTML={{ __html: facebookIcon }}
              />
              <div className="min-w-0">
                <h1 className="text-base font-bold text-gray-900 leading-tight whitespace-nowrap">脸书小助手</h1>
                <p className="text-xs text-gray-500 mt-0.5">@fang180</p>
              </div>
            </div>
            {ipInfo && (
              <div className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-full flex-shrink-0">
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${ipInfo.accurate ? 'bg-green-500' : 'bg-amber-500'}`}></div>
                <span className="text-xs text-gray-700 font-mono whitespace-nowrap">{ipInfo.ip}</span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* 主内容区 - 移动端优化 */}
      <main className="max-w-5xl mx-auto px-4 py-5 pb-24 safe-area-bottom">
        
        {!hasGenerated ? (
          // 初始欢迎页面 - 移动端优化
          <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] gap-8 px-4">
            <div className="text-center space-y-4">
              <div 
                className="w-24 h-24 mx-auto"
                dangerouslySetInnerHTML={{ __html: facebookIcon }}
              />
            </div>
            
            <div className="w-full max-w-sm">
              <button
                onClick={generate}
                disabled={isGenerating}
                className="w-full bg-[#1877F2] hover:bg-[#166FE5] text-white rounded-xl px-6 py-4 font-semibold text-base flex items-center justify-center gap-2.5 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-blue-500/30"
              >
                {isGenerating ? (
                  <>
                    <LoadingSpinner />
                    <span>创号中...</span>
                  </>
                ) : (
                  <>
                    <Icon type="play" className="w-5 h-5" />
                    <span>开始创号</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* 操作区 - 移动端优化 - 标题和按钮对齐 */}
            <div className="mb-5">
              {/* 标题行 */}
              <div className="grid grid-cols-2 gap-3 mb-3 px-1">
                <h3 className="text-base font-bold text-gray-900">选择地区</h3>
                <h3 className="text-base font-bold text-gray-900">快速操作</h3>
              </div>
              
              {/* 按钮行 - 两列布局 */}
              <div className="grid grid-cols-2 gap-3">
                {/* 选择地区按钮 */}
                <button
                  onClick={() => setShowCountrySelect(true)}
                  className="w-full bg-white border border-gray-200 rounded-xl px-3 py-3 flex flex-col items-center justify-center active:scale-[0.98] active:bg-gray-50 transition-all min-h-[80px]"
                >
                  <FlagIcon countryCode={selectedCountry.code} />
                  <div className="text-center mt-2">
                    <div className="font-bold text-sm text-gray-900">{selectedCountry.name}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{selectedCountry.code}</div>
                  </div>
                  <Icon type="chevron" className="w-4 h-4 text-gray-400 mt-1" />
                </button>

                {/* 快速操作按钮 */}
                <button
                  onClick={generate}
                  disabled={isGenerating}
                  className="w-full bg-[#1877F2] hover:bg-[#166FE5] text-white rounded-xl px-3 py-3 font-bold text-base flex flex-col items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-50 transition-all shadow-lg shadow-blue-500/20 min-h-[80px]"
                >
                  {isGenerating ? (
                    <>
                      <LoadingSpinner />
                      <span>生成中</span>
                    </>
                  ) : (
                    <>
                      <Icon type="refresh" className="w-5 h-5" />
                      <span>随机生成</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* 数据展示区 - 移动端优化 */}
            <div className="space-y-3">
              <DataField label="姓氏" value={userInfo.lastName} color="indigo" onCopy={copyActions.lastName} />
              <DataField label="名字" value={userInfo.firstName} color="purple" onCopy={copyActions.firstName} />
              <DataField label="生日" value={userInfo.birthday} color="pink" onCopy={copyActions.birthday} />
              <DataField label="手机号" value={userInfo.phone} color="blue" mono onCopy={copyActions.phone} />
              <DataField label="密码" value={userInfo.password} color="emerald" mono onCopy={copyActions.password} />
              
              {/* 邮箱区块 - 移动端优化 */}
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <div className="flex flex-col gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center">
                        <Icon type="email" className="w-3.5 h-3.5 text-white" />
                      </div>
                      <span className="text-xs text-gray-600 font-semibold uppercase tracking-wide">临时邮箱</span>
                    </div>
                    <div className="text-[15px] text-gray-900 break-all leading-relaxed font-mono bg-gray-50 rounded-lg px-2.5 py-2">
                      {userInfo.email || '请点击生成按钮'}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2.5">
                    <button 
                      onClick={copyActions.email} 
                      disabled={!userInfo.email} 
                      className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50 active:scale-95 active:bg-gray-100 transition-all"
                    >
                      <Icon type="copy" className="w-4 h-4 text-gray-600" />
                      <span className="text-sm font-semibold text-gray-700">复制</span>
                    </button>
                    <button 
                      onClick={copyActions.link} 
                      disabled={!userInfo.email} 
                      className="px-4 py-3 bg-[#1877F2] hover:bg-[#166FE5] text-white rounded-lg flex items-center justify-center gap-2 disabled:opacity-50 active:scale-95 transition-all"
                    >
                      <Icon type="link" className="w-4 h-4" />
                      <span className="text-sm font-semibold">接码</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* 底部信息 - 移动端优化 - 只在已生成后显示 */}
        {hasGenerated && (
          <div className="mt-8 text-center space-y-4">
            <a 
              href="https://t.me/fang180" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-2.5 px-6 py-3 bg-[#0088CC] text-white rounded-xl font-semibold text-[15px] active:scale-95 transition-transform shadow-lg shadow-blue-500/20"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .24z"/>
              </svg>
              <span>Telegram 频道</span>
            </a>
            <p className="text-gray-400 text-xs">版本 1.0 • @fang180</p>
          </div>
        )}
      </main>

      {/* Toast 提示 - 移动端优化 */}
      {toast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-gray-900 text-white px-5 py-3 rounded-xl shadow-2xl animate-fade-in">
          <span className="text-sm font-medium">{toast}</span>
        </div>
      )}

      {/* 国家选择弹窗 - 移动端优化 */}
      {showCountrySelect && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center sm:justify-center">
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm" 
            onClick={handleClose}
          ></div>
          <div className="relative w-full sm:max-w-lg bg-white rounded-t-3xl sm:rounded-2xl border-t border-x sm:border border-gray-200 max-h-[85vh] sm:max-h-[80vh] flex flex-col mx-auto animate-slide-up">
            <div className="p-5 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">选择地区</h3>
                <button 
                  onClick={handleClose} 
                  className="p-2 rounded-lg hover:bg-gray-100 active:scale-95 transition-all"
                >
                  <Icon type="close" className="w-5 h-5 text-gray-400" />
                </button>
              </div>
              <input
                type="search"
                placeholder="搜索国家或地区..."
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[15px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoComplete="off"
              />
            </div>
            <div className="flex-1 overflow-y-auto overscroll-contain">
              {filteredCountries.map((country, i) => (
                <CountryItem
                  key={country.code}
                  country={country}
                  isSelected={selectedCountry.code === country.code}
                  isLast={i === filteredCountries.length - 1}
                  onSelect={() => handleSelect(country)}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}