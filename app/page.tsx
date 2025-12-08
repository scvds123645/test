'use client';

import { useState, useEffect, useRef, useMemo, useCallback, memo } from 'react';
import { 
  generateName, 
  generateBirthday, 
  generatePhone, 
  generatePassword, 
  generateEmail,
} from '@/lib/generator';
import { countries, CountryConfig } from '@/lib/countryData';

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

// 轻量级国旗组件 - 优化:只在需要时加载
const FlagIcon = memo(({ countryCode }: { countryCode: string }) => {
  const [FlagComponent, setFlagComponent] = useState<any>(null);
  
  useEffect(() => {
    let mounted = true;
    import('country-flag-icons/react/3x2').then(module => {
      if (mounted) {
        const Flag = (module as any)[countryCode];
        setFlagComponent(() => Flag);
      }
    });
    return () => { mounted = false; };
  }, [countryCode]);

  if (!FlagComponent) {
    return <div className="w-8 h-6 bg-gray-200 rounded text-xs flex items-center justify-center">{countryCode}</div>;
  }
  
  return <div className="w-8 h-6 rounded overflow-hidden border border-gray-200"><FlagComponent className="w-full h-full" /></div>;
});

FlagIcon.displayName = 'FlagIcon';

// SVG图标组件 - 使用静态路径减少对象创建
const Icon = memo(({ type, className = "w-4 h-4" }: { type: string; className?: string }) => {
  const getPath = (t: string) => {
    switch(t) {
      case 'check': return "M5 13l4 4L19 7";
      case 'copy': return "M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z";
      case 'refresh': return "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15";
      case 'chevron': return "M19 9l-7 7-7-7";
      case 'close': return "M6 18L18 6M6 6l12 12";
      case 'email': return "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z";
      case 'link': return "M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1";
      case 'doc': return "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z";
      default: return "";
    }
  };
  
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d={getPath(type)} />
    </svg>
  );
});

Icon.displayName = 'Icon';

// 优化:使用静态颜色映射
const gradients: Record<string, string> = {
  indigo: 'from-indigo-500 to-indigo-600',
  purple: 'from-purple-500 to-purple-600',
  pink: 'from-pink-500 to-pink-600',
  blue: 'from-blue-500 to-blue-600',
  emerald: 'from-emerald-500 to-emerald-600',
};

// 简化的数据字段组件
const DataField = memo(({ label, value, color, mono, onCopy }: {
  label: string;
  value: string;
  color: string;
  mono?: boolean;
  onCopy: () => void;
}) => (
  <div className="bg-white border border-gray-200 rounded-xl p-4">
    <div className="flex items-center justify-between gap-3">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-2">
          <div className={`w-7 h-7 bg-gradient-to-br ${gradients[color]} rounded-lg flex items-center justify-center`}>
            <Icon type="check" className="w-4 h-4 text-white" />
          </div>
          <span className="text-xs text-gray-600 font-semibold uppercase">{label}</span>
        </div>
        <div className={`text-gray-900 text-sm truncate ${mono ? 'font-mono bg-gray-50 rounded px-2 py-1' : 'font-semibold'}`}>
          {value}
        </div>
      </div>
      <button onClick={onCopy} className="p-2 bg-gray-50 border border-gray-200 rounded-lg active:scale-95">
        <Icon type="copy" className="w-4 h-4 text-gray-600" />
      </button>
    </div>
  </div>
));

DataField.displayName = 'DataField';

// 虚拟滚动国家选择项
const CountryItem = memo(({ country, isSelected, isLast, onSelect }: { 
  country: CountryConfig; 
  isSelected: boolean; 
  isLast: boolean;
  onSelect: () => void;
}) => (
  <button
    onClick={onSelect}
    className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 ${!isLast ? 'border-b border-gray-100' : ''}`}
  >
    <FlagIcon countryCode={country.code} />
    <div className="flex-1 text-left min-w-0">
      <div className="font-semibold text-sm text-gray-900 truncate">{country.name}</div>
      <div className="text-xs text-gray-500">{country.phonePrefix}</div>
    </div>
    {isSelected && (
      <div className="w-5 h-5 bg-indigo-500 rounded-full flex items-center justify-center">
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
  const [isLoading, setIsLoading] = useState(true);
  const [showCountrySelect, setShowCountrySelect] = useState(false);
  const [ipInfo, setIpInfo] = useState<IPInfo | null>(null);

  // 优化:使用 useRef 避免创建新函数
  const toastTimerRef = useRef<NodeJS.Timeout>();

  const showToast = useCallback((msg: string) => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToast(msg);
    toastTimerRef.current = setTimeout(() => setToast(''), 1500);
  }, []);

  // 优化:复制函数简化
  const copyToClipboard = useCallback(async (text: string, label: string) => {
    if (!text) {
      showToast('内容为空');
      return;
    }

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        showToast(`${label} 已复制`);
        return;
      }

      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      document.body.appendChild(textArea);
      textArea.select();
      
      try {
        document.execCommand('copy');
        showToast(`${label} 已复制`);
      } finally {
        document.body.removeChild(textArea);
      }
    } catch {
      showToast('复制失败');
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

  const generate = useCallback(() => {
    const name = generateName(selectedCountry.code);
    const birthday = generateBirthday();
    const phone = generatePhone(selectedCountry);
    const password = generatePassword();
    const email = generateEmail(name.firstName, name.lastName);
    
    setUserInfo({ firstName: name.firstName, lastName: name.lastName, birthday, phone, password, email });
  }, [selectedCountry]);

  // 优化:使用 useMemo 缓存过滤结果,但限制搜索范围
  const filteredCountries = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return countries;
    return countries.filter(c => 
      c.name.toLowerCase().includes(q) || 
      c.code.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  useEffect(() => {
    fetchIPInfo().then(() => setIsLoading(false));
  }, [fetchIPInfo]);

  useEffect(() => {
    if (!isLoading && selectedCountry) generate();
  }, [selectedCountry, isLoading, generate]);

  const handleClose = useCallback(() => {
    setShowCountrySelect(false);
    setSearchQuery('');
  }, []);

  const handleSelect = useCallback((country: CountryConfig) => {
    setSelectedCountry(country);
    handleClose();
  }, [handleClose]);

  // 优化:使用 useMemo 缓存复制操作
  const copyActions = useMemo(() => ({
    lastName: () => copyToClipboard(userInfo.lastName, '姓氏'),
    firstName: () => copyToClipboard(userInfo.firstName, '名字'),
    birthday: () => copyToClipboard(userInfo.birthday, '生日'),
    phone: () => copyToClipboard(userInfo.phone, '手机号'),
    password: () => copyToClipboard(userInfo.password, '密码'),
    email: () => copyToClipboard(userInfo.email, '邮箱'),
    link: () => copyToClipboard(`https://yopmail.net?${userInfo.email}`, '接码地址'),
  }), [userInfo, copyToClipboard]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 mx-auto mb-2 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 text-sm">正在加载...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Icon type="doc" className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="text-base font-bold text-gray-900">脸书小助手</h1>
                <p className="text-xs text-gray-500">@fang180</p>
              </div>
            </div>
            {ipInfo && (
              <div className="flex items-center gap-1.5 bg-gray-100 px-2.5 py-1.5 rounded-full">
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${ipInfo.accurate ? 'bg-green-500' : 'bg-amber-500'}`}></div>
                <span className="text-xs text-gray-700 font-mono whitespace-nowrap">{ipInfo.ip}</span>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-4 pb-20">
        
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <label className="block text-xs text-gray-600 mb-1 font-semibold px-1">选择地区</label>
            <button
              onClick={() => setShowCountrySelect(true)}
              className="w-full bg-white border border-gray-200 rounded-xl p-3 flex items-center justify-between active:scale-[0.98]"
            >
              <div className="flex items-center gap-2">
                <FlagIcon countryCode={selectedCountry.code} />
                <div className="text-left min-w-0">
                  <div className="font-semibold text-sm text-gray-900 truncate">{selectedCountry.name}</div>
                  <div className="text-xs text-gray-500">{selectedCountry.code}</div>
                </div>
              </div>
              <Icon type="chevron" className="w-4 h-4 text-gray-400" />
            </button>
          </div>

          <div>
            <label className="block text-xs text-gray-600 mb-1 font-semibold px-1">快速操作</label>
            <button
              onClick={generate}
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl px-3 py-3 font-semibold text-sm flex items-center justify-center gap-2 active:scale-[0.97]"
            >
              <Icon type="refresh" className="w-4 h-4" />
              <span>随机生成</span>
            </button>
          </div>
        </div>

        <div className="space-y-3">
          <DataField label="姓氏" value={userInfo.lastName} color="indigo" onCopy={copyActions.lastName} />
          <DataField label="名字" value={userInfo.firstName} color="purple" onCopy={copyActions.firstName} />
          <DataField label="生日" value={userInfo.birthday} color="pink" onCopy={copyActions.birthday} />
          <DataField label="手机号" value={userInfo.phone} color="blue" mono onCopy={copyActions.phone} />
          <DataField label="密码" value={userInfo.password} color="emerald" mono onCopy={copyActions.password} />
          
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="flex flex-col gap-3">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center">
                    <Icon type="email" className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-xs text-gray-600 font-semibold uppercase">临时邮箱</span>
                </div>
                <div className="text-sm text-gray-900 break-all font-mono bg-gray-50 rounded-lg px-2 py-2">
                  {userInfo.email || '请点击生成按钮'}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={copyActions.email} disabled={!userInfo.email} className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50 active:scale-95">
                  <Icon type="copy" className="w-4 h-4 text-gray-600" />
                  <span className="text-xs font-semibold text-gray-700">复制</span>
                </button>
                <button onClick={copyActions.link} disabled={!userInfo.email} className="px-3 py-2 bg-indigo-500 text-white rounded-lg flex items-center justify-center gap-2 disabled:opacity-50 active:scale-95">
                  <Icon type="link" className="w-4 h-4" />
                  <span className="text-xs font-semibold">接码</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center space-y-3">
          <a href="https://t.me/fang180" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2 bg-[#0088CC] text-white rounded-xl font-semibold text-sm active:scale-95">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .24z"/>
            </svg>
            <span>Telegram 频道</span>
          </a>
          <p className="text-gray-400 text-xs">版本 1.0 • @fang180</p>
        </div>
      </main>

      {toast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-white border border-gray-200 px-4 py-2 rounded-lg shadow-lg">
          <span className="text-sm text-gray-800">{toast}</span>
        </div>
      )}

      {showCountrySelect && (
        <div className="fixed inset-0 z-50 flex items-end">
          <div className="absolute inset-0 bg-black/20" onClick={handleClose}></div>
          <div className="relative w-full max-w-lg bg-white rounded-t-2xl border-t border-x border-gray-200 max-h-[75vh] flex flex-col mx-auto">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-bold text-gray-900">选择地区</h3>
                <button onClick={handleClose} className="p-1 rounded-lg hover:bg-gray-100 active:scale-95">
                  <Icon type="close" className="w-5 h-5 text-gray-400" />
                </button>
              </div>
              <input
                type="text"
                placeholder="搜索..."
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex-1 overflow-y-auto">
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