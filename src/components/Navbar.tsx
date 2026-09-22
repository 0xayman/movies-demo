import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Search, 
  Globe, 
  Bell, 
  User, 
  Sparkles, 
  ShieldCheck, 
  Film, 
  Tv, 
  Flame, 
  Bookmark, 
  ShoppingBag,
  Menu,
  X,
  CheckCircle2,
  KeyRound,
  LogOut
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Navbar: React.FC = () => {
  const { 
    language, 
    toggleLanguage, 
    t, 
    activeTab, 
    setActiveTab, 
    subscription, 
    setIsSubscriptionModalOpen,
    setIsLoginModalOpen,
    setIsProfileModalOpen,
    currentProfile,
    watchlist,
    searchQuery,
    setSearchQuery,
    cancelSubscription,
    showToast
  } = useApp();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (showSearchBar && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showSearchBar]);

  const navLinks = [
    { id: 'home', label: t('الرئيسية', 'Home'), icon: Film },
    { id: 'movies', label: t('الأفلام', 'Movies'), icon: Film },
    { id: 'series', label: t('المسلسلات', 'TV Series'), icon: Tv },
    { id: 'trending', label: t('الأكثر رواجاً', 'Trending'), icon: Flame },
    { 
      id: 'watchlist', 
      label: t('قائمتي', 'My List'), 
      icon: Bookmark, 
      count: watchlist.length 
    },
    { 
      id: 'salla-plans', 
      label: t('باقات سلة', 'Salla Plans'), 
      icon: ShoppingBag, 
      highlight: true 
    },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'glass-nav py-3 shadow-cinema' 
          : 'bg-gradient-to-b from-[#0a0d14]/90 via-[#0a0d14]/50 to-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3">
          
          {/* Left: Brand Logo & Main Nav */}
          <div className="flex items-center gap-8">
            <button 
              onClick={() => { setActiveTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="flex items-center gap-2 group cursor-pointer text-left"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 via-brand-500 to-amber-500 flex items-center justify-center shadow-glow-red group-hover:scale-105 transition-transform">
                <Play className="w-5 h-5 text-white fill-white" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 font-black text-xl tracking-tight">
                  <span className="text-white">SALLA</span>
                  <span className="text-brand-500">FLIX</span>
                  <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-salla-light/20 text-salla-accent border border-salla-light/30">
                    {t('سلة', 'Salla')}
                  </span>
                </div>
                <span className="text-[10px] text-gray-400 font-medium -mt-1 hidden sm:block">
                  {t('سينما باشتراك رمزي', 'Cinema for nominal fee')}
                </span>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map(link => {
                const isActive = activeTab === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => {
                      setActiveTab(link.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-1.5 ${
                      isActive 
                        ? 'text-white bg-white/10 shadow-sm' 
                        : link.highlight
                          ? 'text-amber-400 hover:text-amber-300 hover:bg-amber-500/10'
                          : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span>{link.label}</span>
                    {link.count !== undefined && link.count > 0 && (
                      <span className="text-[11px] px-1.5 py-0.2 rounded-full bg-brand-500 text-white font-bold">
                        {link.count}
                      </span>
                    )}
                    {link.highlight && (
                      <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Right Controls: Search, Lang, Subscription Pill, Profile */}
          <div className="flex items-center gap-2.5 sm:gap-4">
            
            {/* Live Search Input */}
            <div className="relative flex items-center">
              {showSearchBar ? (
                <div className="flex items-center bg-cinema-surface border border-cinema-border rounded-full px-3 py-1.5 animate-fade-in w-44 sm:w-64">
                  <Search className="w-4 h-4 text-gray-400 mr-1.5 ml-1.5" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t('ابحث عن فيلم، ممثل...', 'Search movies, cast...')}
                    className="bg-transparent text-xs text-white placeholder-gray-400 focus:outline-none w-full"
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="text-gray-400 hover:text-white text-xs px-1"
                    >
                      ×
                    </button>
                  )}
                  <button 
                    onClick={() => setShowSearchBar(false)}
                    className="text-gray-400 hover:text-white ml-1 mr-1"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowSearchBar(true)}
                  className="p-2 rounded-full text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                  title={t('بحث', 'Search')}
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-gray-200 text-xs font-bold border border-white/10 transition-all hover:scale-105"
              title={t('تغيير اللغة إلى الإنجليزية', 'Switch language to Arabic')}
            >
              <Globe className="w-3.5 h-3.5 text-salla-light" />
              <span>{language === 'ar' ? 'English' : 'عربي'}</span>
            </button>

            {/* Salla Subscription Badge / Action */}
            {subscription.isSubscribed ? (
              <div 
                onClick={() => setIsSubscriptionModalOpen(true)}
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold cursor-pointer hover:bg-emerald-500/25 transition-all shadow-sm"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400 animate-pulse" />
                <span>{t('مشترك سلة VIP', 'Salla VIP Active')}</span>
              </div>
            ) : (
              <button
                onClick={() => setIsSubscriptionModalOpen(true)}
                className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-salla to-salla-light text-white text-xs font-bold shadow-glow-salla hover:opacity-95 transition-all hover:scale-105 border border-salla-accent/40"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>{t('اشترك بسلة (رمزي)', 'Subscribe via Salla')}</span>
              </button>
            )}

            {/* Notifications Menu */}
            <div className="relative">
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="relative p-2 rounded-full text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-brand-500 ring-2 ring-[#0a0d14]"></span>
              </button>

              {isNotificationsOpen && (
                <div className="absolute top-full mt-2 left-0 sm:right-0 sm:left-auto w-72 glass-panel rounded-2xl p-4 shadow-2xl z-50 animate-slide-up border border-white/10">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <h4 className="text-sm font-bold text-white">{t('الإشعارات والتحديثات', 'Notifications')}</h4>
                    <span className="text-[10px] text-gray-400 font-medium">{t('جديد', 'New')}</span>
                  </div>
                  <div className="space-y-3 mt-3 text-xs">
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                      <p className="font-bold text-amber-400 mb-0.5">{t('حصرياً: فيلم ولاد رزق 3', 'Exclusive: Welad Rizk 3')}</p>
                      <p className="text-gray-300 text-[11px]">{t('متاح الآن للمشتركين بدقة 4K HDR وصوت محيطي.', 'Now available in 4K HDR with Dolby Atmos.')}</p>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                      <p className="font-bold text-salla-light mb-0.5">{t('تكامل متجر سلة', 'Salla Integration')}</p>
                      <p className="text-gray-300 text-[11px]">{t('يمكنك تفعيل أي باقة رقمية مباشرة بكود الطلب.', 'Instant activation using your Salla order code.')}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Avatar & Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center gap-2 p-1 rounded-full hover:ring-2 hover:ring-brand-500 transition-all cursor-pointer"
              >
                <img
                  src={currentProfile.avatar}
                  alt={currentProfile.name}
                  className="w-8 h-8 rounded-full object-cover border border-white/20"
                />
              </button>

              {isProfileDropdownOpen && (
                <div className="absolute top-full mt-2 left-0 sm:right-0 sm:left-auto w-56 glass-panel rounded-2xl p-2 shadow-2xl z-50 animate-slide-up border border-white/10">
                  <div className="px-3 py-2 border-b border-white/10 flex items-center gap-2.5">
                    <img
                      src={currentProfile.avatar}
                      alt={currentProfile.name}
                      className="w-9 h-9 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-xs font-bold text-white leading-tight">{currentProfile.name}</p>
                      <p className="text-[10px] text-emerald-400 font-medium">
                        {subscription.isSubscribed ? t('مشترك سلة مفعّل', 'Salla Subscriber') : t('زائر (غير مشترك)', 'Free Visitor')}
                      </p>
                    </div>
                  </div>

                  <div className="py-1 space-y-0.5 text-xs font-medium">
                    <button
                      onClick={() => {
                        setIsProfileDropdownOpen(false);
                        setIsProfileModalOpen(true);
                      }}
                      className="w-full text-start px-3 py-2 rounded-lg hover:bg-white/10 text-gray-200 flex items-center gap-2 transition-colors"
                    >
                      <User className="w-4 h-4 text-gray-400" />
                      <span>{t('تبديل الملف الشخصي', 'Switch Profile')}</span>
                    </button>

                    <button
                      onClick={() => {
                        setIsProfileDropdownOpen(false);
                        setIsSubscriptionModalOpen(true);
                      }}
                      className="w-full text-start px-3 py-2 rounded-lg hover:bg-white/10 text-gray-200 flex items-center gap-2 transition-colors"
                    >
                      <ShoppingBag className="w-4 h-4 text-amber-400" />
                      <span>{t('إدارة باقة سلة', 'Manage Salla Plan')}</span>
                    </button>

                    <button
                      onClick={() => {
                        setIsProfileDropdownOpen(false);
                        setIsLoginModalOpen(true);
                      }}
                      className="w-full text-start px-3 py-2 rounded-lg hover:bg-white/10 text-gray-200 flex items-center gap-2 transition-colors"
                    >
                      <KeyRound className="w-4 h-4 text-salla-light" />
                      <span>{t('تفعيل كود طلب سلة', 'Enter Salla Code')}</span>
                    </button>

                    {subscription.isSubscribed && (
                      <button
                        onClick={() => {
                          setIsProfileDropdownOpen(false);
                          cancelSubscription();
                        }}
                        className="w-full text-start px-3 py-2 rounded-lg hover:bg-red-500/10 text-red-400 flex items-center gap-2 transition-colors border-t border-white/5 mt-1"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>{t('إلغاء التفعيل (تجريبي)', 'Reset Subscription')}</span>
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Menu Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-white/10 glass-panel rounded-2xl p-4 shadow-2xl animate-slide-up">
            <div className="grid grid-cols-2 gap-2 mb-4">
              {navLinks.map(link => {
                const isActive = activeTab === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => {
                      setActiveTab(link.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`p-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                      isActive 
                        ? 'bg-brand-600 text-white shadow-glow-red' 
                        : 'bg-white/5 text-gray-300 hover:bg-white/10'
                    }`}
                  >
                    <link.icon className="w-4 h-4" />
                    <span>{link.label}</span>
                    {link.count !== undefined && link.count > 0 && (
                      <span className="ms-auto text-[10px] px-1.5 py-0.5 rounded-full bg-brand-500 text-white">
                        {link.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
              <button
                onClick={() => {
                  setIsSubscriptionModalOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-salla to-salla-light text-white text-xs font-bold shadow-glow-salla flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{t('اشترك عبر متجرنا في سلة', 'Subscribe via Salla Store')}</span>
              </button>
              
              <button
                onClick={() => {
                  setIsLoginModalOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full py-2 px-4 rounded-xl bg-white/10 text-white text-xs font-semibold flex items-center justify-center gap-2 hover:bg-white/15"
              >
                <KeyRound className="w-4 h-4 text-salla-accent" />
                <span>{t('تفعيل كود سلة الرقمي', 'Activate Digital Code')}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
