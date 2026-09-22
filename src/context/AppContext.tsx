import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Language, MediaItem, Episode, UserProfile, UserSubscription, SallaPlan } from '../types';
import { MEDIA_CATALOG, SALLA_PLANS, DEMO_PROFILES } from '../data/mockData';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (ar: string, en: string) => string;
  
  // Navigation & Views
  activeTab: string;
  setActiveTab: (tab: string) => void;
  
  // Modals & Overlays
  selectedDetailItem: MediaItem | null;
  openDetail: (item: MediaItem) => void;
  closeDetail: () => void;
  
  currentPlaying: { item: MediaItem; episode?: Episode } | null;
  openPlayer: (item: MediaItem, episode?: Episode) => void;
  closePlayer: () => void;
  
  isSubscriptionModalOpen: boolean;
  setIsSubscriptionModalOpen: (open: boolean) => void;
  
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (open: boolean) => void;
  
  isProfileModalOpen: boolean;
  setIsProfileModalOpen: (open: boolean) => void;

  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedGenre: string | null;
  setSelectedGenre: (genre: string | null) => void;
  
  // User & Subscription
  subscription: UserSubscription;
  activateSallaCode: (code: string) => boolean;
  simulateSallaPurchase: (plan: SallaPlan) => void;
  cancelSubscription: () => void;
  
  // Profiles
  profiles: UserProfile[];
  currentProfile: UserProfile;
  switchProfile: (profileId: string) => void;
  
  // Watchlist
  watchlist: string[];
  toggleWatchlist: (id: string) => void;
  isInWatchlist: (id: string) => boolean;

  // Watch Progress
  watchProgress: Record<string, number>;
  updateWatchProgress: (id: string, percentage: number) => void;

  // Notification Toast
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem('sallaflix_lang') as Language) || 'ar';
  });

  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedDetailItem, setSelectedDetailItem] = useState<MediaItem | null>(null);
  const [currentPlaying, setCurrentPlaying] = useState<{ item: MediaItem; episode?: Episode } | null>(null);
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Watchlist
  const [watchlist, setWatchlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('sallaflix_watchlist');
      return saved ? JSON.parse(saved) : ['hashashin', 'welad-rizk-3', 'solo-leveling'];
    } catch {
      return ['hashashin', 'welad-rizk-3'];
    }
  });

  // Watch Progress (simulate resume watching)
  const [watchProgress, setWatchProgress] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem('sallaflix_progress');
      return saved ? JSON.parse(saved) : { 'hashashin': 65, 'dune-2': 40, 'welad-rizk-3': 85 };
    } catch {
      return { 'hashashin': 65 };
    }
  });

  // Subscription state
  const [subscription, setSubscription] = useState<UserSubscription>(() => {
    try {
      const saved = localStorage.getItem('sallaflix_sub');
      if (saved) return JSON.parse(saved);
    } catch {}
    // Default demo: Unsubscribed so the user can experience the Salla subscription & activation flow!
    return {
      isSubscribed: false
    };
  });

  // Profiles
  const [profiles] = useState<UserProfile[]>(DEMO_PROFILES);
  const [currentProfile, setCurrentProfile] = useState<UserProfile>(DEMO_PROFILES[0]);

  // Sync RTL/LTR & language
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('sallaflix_lang', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  };

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const t = (ar: string, en: string) => {
    return language === 'ar' ? ar : en;
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const toggleWatchlist = (id: string) => {
    setWatchlist(prev => {
      const exists = prev.includes(id);
      const updated = exists ? prev.filter(item => item !== id) : [...prev, id];
      localStorage.setItem('sallaflix_watchlist', JSON.stringify(updated));
      showToast(
        exists 
          ? (language === 'ar' ? 'تمت الإزالة من قائمتك' : 'Removed from My List')
          : (language === 'ar' ? 'تمت الإضافة إلى قائمتك بنجاح ❤️' : 'Added to My List ❤️')
      );
      return updated;
    });
  };

  const isInWatchlist = (id: string) => watchlist.includes(id);

  const updateWatchProgress = (id: string, percentage: number) => {
    setWatchProgress(prev => {
      const updated = { ...prev, [id]: percentage };
      localStorage.setItem('sallaflix_progress', JSON.stringify(updated));
      return updated;
    });
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const activateSallaCode = (code: string): boolean => {
    const cleanCode = code.trim().toUpperCase();
    if (!cleanCode) return false;

    // Matches any demo code or Salla order format
    const matchingPlan = SALLA_PLANS.find(p => p.sallaDemoCode.toUpperCase() === cleanCode) || SALLA_PLANS[1];

    const newSub: UserSubscription = {
      isSubscribed: true,
      planId: matchingPlan.id,
      planName: matchingPlan.name[language],
      sallaOrderNumber: cleanCode.startsWith('SALLA-') ? `#ORD-${cleanCode.slice(6, 12)}` : `#SALLA-89421`,
      activationCode: cleanCode,
      activatedAt: new Date().toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US'),
      expiryDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US')
    };

    setSubscription(newSub);
    localStorage.setItem('sallaflix_sub', JSON.stringify(newSub));
    triggerConfetti();
    showToast(language === 'ar' ? '🎉 تم تفعيل اشتراك سلة بنجاح! استمتع بالمشاهدة بلا حدود' : '🎉 Salla subscription activated! Enjoy unlimited streaming');
    setIsSubscriptionModalOpen(false);
    setIsLoginModalOpen(false);
    return true;
  };

  const simulateSallaPurchase = (plan: SallaPlan) => {
    activateSallaCode(plan.sallaDemoCode);
  };

  const cancelSubscription = () => {
    const unsubbed = { isSubscribed: false };
    setSubscription(unsubbed);
    localStorage.setItem('sallaflix_sub', JSON.stringify(unsubbed));
    showToast(language === 'ar' ? 'تم إلغاء الاشتراك التجريبي' : 'Subscription reset');
  };

  const switchProfile = (profileId: string) => {
    const found = profiles.find(p => p.id === profileId);
    if (found) {
      setCurrentProfile(found);
      setIsProfileModalOpen(false);
      showToast(language === 'ar' ? `تم التبديل إلى ملف: ${found.name}` : `Switched to profile: ${found.name}`);
    }
  };

  const openPlayer = (item: MediaItem, episode?: Episode) => {
    // If not subscribed, open subscription modal
    if (!subscription.isSubscribed) {
      setIsSubscriptionModalOpen(true);
      showToast(language === 'ar' ? 'يتطلب هذا المحتوى اشتراكاً رمزياً عبر سلة لتشغيله بدقة 4K' : 'This content requires a nominal Salla subscription to stream');
      return;
    }
    setCurrentPlaying({ item, episode });
  };

  const closePlayer = () => {
    setCurrentPlaying(null);
  };

  const openDetail = (item: MediaItem) => {
    setSelectedDetailItem(item);
  };

  const closeDetail = () => {
    setSelectedDetailItem(null);
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        t,
        activeTab,
        setActiveTab,
        selectedDetailItem,
        openDetail,
        closeDetail,
        currentPlaying,
        openPlayer,
        closePlayer,
        isSubscriptionModalOpen,
        setIsSubscriptionModalOpen,
        isLoginModalOpen,
        setIsLoginModalOpen,
        isProfileModalOpen,
        setIsProfileModalOpen,
        searchQuery,
        setSearchQuery,
        selectedGenre,
        setSelectedGenre,
        subscription,
        activateSallaCode,
        simulateSallaPurchase,
        cancelSubscription,
        profiles,
        currentProfile,
        switchProfile,
        watchlist,
        toggleWatchlist,
        isInWatchlist,
        watchProgress,
        updateWatchProgress,
        toastMessage,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
