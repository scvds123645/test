'use client';

import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { 
  generateName, 
  generateBirthday, 
  generatePhone, 
  generatePassword, 
  generateEmail,
  getCountryConfig 
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

export default function FakerGenerator() {
  const [selectedCountry, setSelectedCountry] = useState<CountryConfig>(countries[0]);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    firstName: '', lastName: '', birthday: '', phone: '', password: '', email: ''
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [toasts, setToasts] = useState<ToastConfig[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCountrySelect, setShowCountrySelect] = useState(false);
  const toastIdRef = useRef(0);
  const [ipInfo, setIpInfo] = useState<IPInfo | null>(null);

  const showToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = ++toastIdRef.current;
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 1500);
  }, []);

  const copyToClipboard = useCallback(async (text: string, label: string) => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      showToast(`${label} 已复制`);
    } catch (e) {
      showToast('复制失败', 'error');
    }
  }, [showToast]);

  const fetchIPInfo = useCallback(async () => {
    try {
      const response = await fetch('/api/ip-info');
      const data = await response.json();
      
      setIpInfo({
        ip: data.ip || 'Unknown',
        country: data.country || 'US',
        countryName: data.countryName || 'Unknown',
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
      console.error('IP detection failed:', error);
    }
  }, []);

  const generate = useCallback(() => {
    const name = generateName(selectedCountry.code);
    const birthday = generateBirthday();
    const phone = generatePhone(selectedCountry);
    const password = generatePassword();
    const email = generateEmail(name.firstName, name.lastName);
    
    setUserInfo({
      firstName: name.firstName,
      lastName: name.lastName,
      birthday,
      phone,
      password,
      email,
    });
  }, [selectedCountry]);

  const filteredCountries = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return countries.filter(c => 
      c.name.toLowerCase().includes(query) || 
      c.code.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  useEffect(() => {
    const init = async () => {
      await fetchIPInfo();
      setIsLoading(false);
    };
    init();
  }, [fetchIPInfo]);

  useEffect(() => {
    if (!isLoading && selectedCountry) {
      generate();
    }
  }, [selectedCountry, isLoading, generate]);

  const handleCloseCountrySelect = useCallback(() => {
    setShowCountrySelect(false);
    setSearchQuery('');
  }, []);

  const handleSelectCountry = useCallback((country: CountryConfig) => {
    setSelectedCountry(country);
    handleCloseCountrySelect();
  }, [handleCloseCountrySelect]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-12 h-12 mx-auto mb-3">
            <div className="absolute inset-0 border-2 border-indigo-100 rounded-full"></div>
            <div className="absolute inset-0 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-gray-500 text-sm font-medium">正在加载...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
      
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-gradient-to-br from-indigo-200/30 to-purple-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-gradient-to-tr from-blue-200/30 to-cyan-200/20 rounded-full blur-3xl"></div>
      </div>

      <header className="sticky top-0 z-40 backdrop-blur-2xl bg-white/70 border-b border-gray-200/50 shadow-sm">
        <div className="max-w-5xl mx-auto px-5 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200/50">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900 tracking-tight">脸书小助手</h1>
                <p className="text-xs text-gray-500 font-medium">@fang180</p>
              </div>
            </div>
            {ipInfo && (
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-xl px-3 py-2 rounded-full border border-gray-200/60 shadow-sm">
                <div className="relative">
                  <div className={`w-2 h-2 rounded-full ${ipInfo.accurate ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>
                  <div className={`absolute inset-0 rounded-full ${ipInfo.accurate ? 'bg-emerald-500' : 'bg-amber-500'} animate-ping opacity-75`}></div>
                </div>
                <span className="text-xs text-gray-700 font-mono font-medium max-w-[100px] truncate">{ipInfo.ip}</span>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-5 py-6 relative z-10 pb-24">
        
        <div className="grid grid-cols-2 gap-3 mb-5">
          
          <div>
            <label className="block text-xs text-gray-600 mb-2 font-semibold px-1 tracking-wide">选择地区</label>
            <button
              onClick={() => setShowCountrySelect(true)}
              className="w-full bg-white/90 backdrop-blur-xl border border-gray-200/80 rounded-2xl p-3.5 flex items-center justify-between transition-all shadow-sm hover:shadow-md hover:border-indigo-300/60 active:scale-[0.98] touch-manipulation group"
            >
              <div className="flex items-center gap-3">
                <div className="text-3xl flex-shrink-0 transform group-hover:scale-110 transition-transform">{selectedCountry.flag}</div>
                <div className="text-left min-w-0">
                  <div className="font-semibold text-gray-900 text-sm truncate">{selectedCountry.name}</div>
                  <div className="text-xs text-gray-500 font-medium mt-0.5">{selectedCountry.code}</div>
                </div>
              </div>
              <svg className="w-4 h-4 text-gray-400 flex-shrink-0 group-hover:text-indigo-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          <div>
            <label className="block text-xs text-gray-600 mb-2 font-semibold px-1 tracking-wide">快速操作</label>
            <button
              onClick={generate}
              className="relative w-full bg-gradient-to-br from-indigo-500 via-indigo-600 to-purple-600 text-white rounded-2xl px-4 py-3.5 font-semibold text-sm transition-all shadow-lg shadow-indigo-200/50 hover:shadow-xl hover:shadow-indigo-300/60 flex items-center justify-center gap-2.5 active:scale-[0.97] touch-manipulation group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <svg className="w-5 h-5 relative z-10 group-hover:rotate-180 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span className="relative z-10">随机生成</span>
            </button>
          </div>
        </div>

        <div className="space-y-3">
          <DataField label="姓氏" value={userInfo.lastName} icon="👤" color="indigo" onCopy={() => copyToClipboard(userInfo.lastName, '姓氏')} />
          <DataField label="名字" value={userInfo.firstName} icon="👤" color="purple" onCopy={() => copyToClipboard(userInfo.firstName, '名字')} />
          <DataField label="生日" value={userInfo.birthday} icon="🎂" color="pink" onCopy={() => copyToClipboard(userInfo.birthday, '生日')} />
          <DataField label="手机号" value={userInfo.phone} icon="📱" color="blue" mono onCopy={() => copyToClipboard(userInfo.phone, '手机号')} />
          <DataField label="密码" value={userInfo.password} icon="🔑" color="emerald" mono onCopy={() => copyToClipboard(userInfo.password, '密码')} />
          
          <div className="bg-gradient-to-br from-white/95 to-white/80 backdrop-blur-2xl border border-gray-200/80 rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all">
            <div className="flex flex-col gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-md">
                    <span className="text-lg">📧</span>
                  </div>
                  <span className="text-xs text-gray-600 font-bold uppercase tracking-wider">临时邮箱</span>
                </div>
                <div className="text-gray-900 text-sm break-all font-mono leading-relaxed bg-gray-50/80 rounded-xl px-3 py-2.5 border border-gray-100">
                  {userInfo.email || '请点击生成按钮'}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => copyToClipboard(userInfo.email, '邮箱')}
                  disabled={!userInfo.email}
                  className="px-3 py-3 bg-white/90 border border-gray-200/80 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:border-indigo-300 hover:bg-indigo-50/50 active:scale-[0.97] touch-manipulation group shadow-sm"
                >
                  <svg className="w-4 h-4 text-gray-600 group-hover:text-indigo-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <span className="text-xs font-semibold text-gray-700 group-hover:text-indigo-700 transition-colors">复制</span>
                </button>
                <button
                  onClick={() => copyToClipboard(`https://yopmail.com?${userInfo.email}`, '接码地址')}
                  disabled={!userInfo.email}
                  className="px-3 py-3 bg-gradient-to-br from-indigo-500 to-indigo-600 border border-indigo-600/50 rounded-2xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:from-indigo-600 hover:to-indigo-700 active:scale-[0.97] touch-manipulation shadow-md shadow-indigo-200/50"
                >
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                  <span className="text-xs font-semibold text-white">接码</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center space-y-4">
          <a
            href="https://t.me/fang180"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3 bg-gradient-to-r from-[#0088CC] to-[#0077B5] text-white rounded-2xl font-semibold text-sm transition-all shadow-lg shadow-cyan-200/50 hover:shadow-xl hover:shadow-cyan-300/60 active:scale-[0.97] touch-manipulation group"
          >
            <svg className="w-5 h-5 group-hover:rotate-12 transition-transform" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .24z"/>
            </svg>
            <span>Telegram 频道</span>
          </a>
          <div className="flex items-center justify-center gap-2">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-gray-300"></div>
            <p className="text-gray-400 text-xs font-medium">版本 1.0 • @fang180</p>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-gray-300"></div>
          </div>
        </div>
      </main>

      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 space-y-2 w-full max-w-[240px] px-4">
        {toasts.map((toast) => (
          <div key={toast.id} className="bg-white/95 backdrop-blur-2xl border border-gray-200/80 px-4 py-2.5 rounded-xl shadow-xl flex items-center justify-center gap-2.5 animate-slide-down mx-auto">
            <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${toast.type === 'success' ? 'bg-emerald-500' : 'bg-rose-500'}`}></div>
            <span className="text-gray-800 text-sm font-medium truncate">{toast.message}</span>
          </div>
        ))}
      </div>

      {showCountrySelect && (
        <div className="fixed inset-0 z-50 flex items-end justify-center animate-fade-in">
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/40 backdrop-blur-sm" onClick={handleCloseCountrySelect}></div>
          <div className="relative w-full max-w-lg bg-white/95 backdrop-blur-2xl rounded-t-3xl shadow-2xl border-t border-x border-gray-200/80 overflow-hidden max-h-[80vh] flex flex-col animate-slide-up">
            <div className="p-5 border-b border-gray-200/60 flex-shrink-0">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-6 bg-gradient-to-b from-indigo-500 to-purple-600 rounded-full"></div>
                  <h3 className="text-lg font-bold text-gray-900">选择地区</h3>
                </div>
                <button onClick={handleCloseCountrySelect} className="text-gray-400 hover:text-gray-600 p-2 rounded-xl transition-all hover:bg-gray-100/80 active:scale-95 touch-manipulation">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="relative">
                <svg className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="搜索国家或地区..."
                  className="w-full bg-gray-50/80 border border-gray-200/80 rounded-xl pl-10 pr-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all font-medium"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto overscroll-contain" style={{WebkitOverflowScrolling: 'touch'}}>
              {filteredCountries.map((country, index) => (
                <button
                  key={country.code}
                  onClick={() => handleSelectCountry(country)}
                  className={`w-full flex items-center gap-3 px-5 py-4 transition-all touch-manipulation group hover:bg-indigo-50/50 ${
                    index !== filteredCountries.length - 1 ? 'border-b border-gray-100/80' : ''
                  }`}
                >
                  <div className="text-3xl flex-shrink-0 transform group-hover:scale-110 transition-transform">{country.flag}</div>
                  <div className="flex-1 text-left min-w-0">
                    <div className="font-semibold text-gray-900 text-sm truncate group-hover:text-indigo-700 transition-colors">{country.name}</div>
                    <div className="text-xs text-gray-500 font-medium mt-0.5">{country.phonePrefix}</div>
                  </div>
                  {selectedCountry.code === country.code && (
                    <div className="w-6 h-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg shadow-indigo-200/50 flex-shrink-0">
                      <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slide-in { from { transform: translateX(120%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes slide-down { from { transform: translateY(-100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes slide-up { from { transform: translateY(100%); } to { transform: translateY(0); } }
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        .animate-slide-in { animation: slide-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); }
        .animate-slide-down { animation: slide-down 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); }
        .animate-slide-up { animation: slide-up 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); }
        .animate-fade-in { animation: fade-in 0.3s ease-out; }
      `}</style>
    </div>
  );
}

interface DataFieldProps {
  label: string;
  value: string;
  icon: string;
  color?: 'indigo' | 'purple' | 'pink' | 'blue' | 'emerald';
  mono?: boolean;
  onCopy: () => void;
}

const DataField = ({ label, value, icon, color = 'indigo', mono = false, onCopy }: DataFieldProps) => {
  const colorClasses: Record<string, string> = {
    indigo: 'from-indigo-400 to-indigo-600 shadow-indigo-200/50',
    purple: 'from-purple-400 to-purple-600 shadow-purple-200/50',
    pink: 'from-pink-400 to-pink-600 shadow-pink-200/50',
    blue: 'from-blue-400 to-blue-600 shadow-blue-200/50',
    emerald: 'from-emerald-400 to-emerald-600 shadow-emerald-200/50',
  };
  
  const selectedColor = colorClasses[color] || colorClasses.indigo;

  return (
    <div className="bg-gradient-to-br from-white/95 to-white/80 backdrop-blur-2xl border border-gray-200/80 rounded-2xl p-4 shadow-md hover:shadow-lg transition-all group">
      <div className="flex items-center justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2.5 mb-2">
            <div className={`w-8 h-8 bg-gradient-to-br ${selectedColor} rounded-xl flex items-center justify-center shadow-md transform group-hover:scale-110 transition-transform`}>
              <span className="text-lg">{icon}</span>
            </div>
            <span className="text-xs text-gray-600 font-bold uppercase tracking-wider">{label}</span>
          </div>
          <div className={`text-gray-900 truncate ${mono ? 'font-mono text-sm bg-gray-50/80 rounded-lg px-3 py-1.5 border border-gray-100' : 'text-sm font-semibold'}`}>
            {value}
          </div>
        </div>
        <button
          onClick={onCopy}
          className="p-2.5 bg-white/90 border border-gray-200/80 rounded-xl transition-all hover:border-indigo-300 hover:bg-indigo-50/50 active:scale-95 flex-shrink-0 touch-manipulation group/btn shadow-sm"
        >
          <svg className="w-4 h-4 text-gray-600 group-hover/btn:text-indigo-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </button>
      </div>
    </div>
  );
};