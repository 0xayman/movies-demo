import React from 'react';
import { 
  ShoppingBag, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  Tv, 
  Smartphone, 
  Flame, 
  Film, 
  CheckCircle2, 
  Play
} from 'lucide-react';
import { useApp } from './context/AppContext';
import { MEDIA_CATALOG } from './data/mockData';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { MovieRow } from './components/MovieRow';
import { Top10Row } from './components/Top10Row';
import { DetailModal } from './components/DetailModal';
import { VideoPlayerModal } from './components/VideoPlayerModal';
import { SallaSubscriptionModal } from './components/SallaSubscriptionModal';
import { LoginModal } from './components/LoginModal';
import { ProfileModal } from './components/ProfileModal';
import { WatchlistView } from './components/WatchlistView';
import { SallaPlansView } from './components/SallaPlansView';
import { SearchView } from './components/SearchView';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const { 
    activeTab, 
    searchQuery, 
    language, 
    t, 
    toastMessage, 
    setIsSubscriptionModalOpen, 
    subscription,
    watchProgress 
  } = useApp();

  // Filter lists for categorized rows
  const trendingItems = MEDIA_CATALOG.filter(m => m.isTrending);
  const arabicItems = MEDIA_CATALOG.filter(m => m.origin === 'arabic');
  const hollywoodItems = MEDIA_CATALOG.filter(m => m.origin === 'hollywood');
  const seriesItems = MEDIA_CATALOG.filter(m => m.type === 'series');
  const movieItems = MEDIA_CATALOG.filter(m => m.type === 'movie');
  const animeItems = MEDIA_CATALOG.filter(m => m.origin === 'anime');

  // Continue watching items
  const continueWatchingItems = MEDIA_CATALOG.filter(m => !!watchProgress[m.id]);

  return (
    <div className={`min-h-screen bg-[#0a0d14] text-white flex flex-col ${language === 'ar' ? 'font-arabic' : 'font-english'}`}>
      
      {/* Top Fixed Navigation Bar */}
      <Navbar />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 start-1/2 -translate-x-1/2 z-50 animate-slide-up">
          <div className="glass-panel px-5 py-3 rounded-2xl shadow-2xl border border-white/20 text-xs sm:text-sm font-bold text-white flex items-center gap-2.5 backdrop-blur-xl">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-grow">
        
        {/* If user types in search bar, render Search View */}
        {searchQuery ? (
          <SearchView />
        ) : (
          <>
            {/* VIEW 1: HOME */}
            {activeTab === 'home' && (
              <div>
                {/* Hero Billboard */}
                <HeroBanner />

                {/* Salla Store Prominent Value Callout */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-10 relative z-20 mb-8">
                  <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-salla via-[#003842] to-cinema-card p-5 sm:p-6 border border-salla-light/30 shadow-cinema flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-4 text-start">
                      <div className="w-12 h-12 rounded-2xl bg-salla-light/20 border border-salla-light/40 flex items-center justify-center text-salla-accent shadow-glow-salla flex-shrink-0">
                        <ShoppingBag className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-black text-salla-accent uppercase tracking-wider">
                            {t('فكرة المشروع • متجر سلة', 'The Salla Store Model')}
                          </span>
                          <span className="px-2 py-0.2 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold">
                            {t('مبلغ رمزي فقط', 'Nominal Fee')}
                          </span>
                        </div>
                        <h3 className="text-base sm:text-lg font-black text-white leading-snug">
                          {t('اشترك في متجرنا على سلة بـ 9.99 ريال وفعل الكود فورياً للمشاهدة بدون حدود', 'Subscribe on our Salla store for 9.99 SAR & activate instantly')}
                        </h3>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 flex-shrink-0 w-full md:w-auto">
                      <button
                        onClick={() => setIsSubscriptionModalOpen(true)}
                        className="flex-1 md:flex-initial px-5 py-2.5 rounded-xl bg-salla-light hover:bg-salla-accent text-black font-black text-xs shadow-glow-salla transition-all hover:scale-105 flex items-center justify-center gap-2"
                      >
                        <Zap className="w-4 h-4 fill-black" />
                        <span>{subscription.isSubscribed ? t('إدارة باقة موفي هاوس', 'Manage MovieHouse Plan') : t('عرض باقات موفي هاوس والاشتراك', 'View MovieHouse Plans')}</span>
                      </button>
                    </div>
                  </div>
                </section>

                {/* Continue Watching Row (if user has progress) */}
                {continueWatchingItems.length > 0 && (
                  <MovieRow
                    title={t('متابعة المشاهدة', 'Continue Watching')}
                    subtitle={t('أكمل المشاهدة من حيث توقفت', 'Resume where you left off')}
                    items={continueWatchingItems}
                    showProgress={true}
                  />
                )}

                {/* Top 10 Today Row */}
                <Top10Row items={MEDIA_CATALOG} />

                {/* Trending Row */}
                <MovieRow
                  title={t('الأكثر رواجاً ومشاهدة الآن', 'Trending Now')}
                  subtitle={t('أحدث الأعمال التي يتابعها المشتركون حالياً', 'Top titles watched by subscribers')}
                  items={trendingItems}
                />

                {/* Arabic Cinema & Series Row */}
                <MovieRow
                  title={t('روائع السينما والمسلسلات العربية والخليجية', 'Arabic & Gulf Blockbusters')}
                  subtitle={t('أضخم الإنتاجات الحصرية المصرية والسعودية', 'Exclusive Arabic productions in 4K')}
                  items={arabicItems}
                />

                {/* Mid-page Salla Experience Banner */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-12">
                  <div className="rounded-3xl bg-cinema-card border border-white/10 p-6 sm:p-10 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-cinema relative overflow-hidden">
                    <div className="space-y-4 max-w-xl text-start">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-600/20 text-brand-500 border border-brand-500/30 text-xs font-bold">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>{t('تجربة سينمائية منزلية متكاملة', 'Ultimate Home Cinema Experience')}</span>
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                        {t('لماذا تدفع مبالغ طائلة بينما يمكنك المشاهدة بمبلغ رمزي عبر سلة؟', 'Why pay high fees when you can stream for a nominal fee via Salla?')}
                      </h2>
                      <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                        {t(
                          'تصلك بيانات التفعيل الفورية في ثوانٍ عبر رسالة نصية وواتساب فور إتمام عملية الدفع عبر متجرنا المعتمد في منصة سلة، وتعمل على جميع الشاشات الذكية بدون إعلانات.',
                          'Instant automated activation code sent to your phone within seconds of Salla checkout, streaming ad-free on all your Smart TVs.'
                        )}
                      </p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs">
                        <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-gray-200">
                          <p className="font-bold text-emerald-400">4K Ultra HD</p>
                          <p className="text-[11px] text-gray-400">{t('صوت محيطي نقي', 'Dolby Surround')}</p>
                        </div>
                        <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-gray-200">
                          <p className="font-bold text-amber-400">{t('بدون إعلانات', 'Zero Ads')}</p>
                          <p className="text-[11px] text-gray-400">{t('مشاهدة سلسة متواصلة', 'Uninterrupted')}</p>
                        </div>
                        <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-gray-200">
                          <p className="font-bold text-salla-light">{t('تفعيل آلي في 30 ثانية', '30s Activation')}</p>
                          <p className="text-[11px] text-gray-400">{t('عبر كود متجر سلة', 'Via Salla Code')}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row lg:flex-col gap-3 flex-shrink-0 w-full sm:w-auto">
                      <button
                        onClick={() => setIsSubscriptionModalOpen(true)}
                        className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-salla to-salla-light hover:opacity-95 text-white font-black text-sm shadow-glow-salla transition-all hover:scale-105 flex items-center justify-center gap-2"
                      >
                        <ShoppingBag className="w-5 h-5" />
                        <span>{t('اشترك الآن من متجر سلة', 'Subscribe on Salla Store')}</span>
                      </button>
                    </div>
                  </div>
                </section>

                {/* Hollywood Hits Row */}
                <MovieRow
                  title={t('أفلام هوليوود والعالمية', 'Hollywood & Global Blockbusters')}
                  subtitle={t('أحدث أفلام السينما العالمية الحائزة على الجوائز', 'Award-winning global blockbusters')}
                  items={hollywoodItems}
                />

                {/* Anime & Animation Row */}
                <MovieRow
                  title={t('عالم الأنمي والفانتازيا', 'Anime & Epic Fantasy')}
                  subtitle={t('أقوى مسلسلات الأنمي الياباني مترجمة ومدبلجة', 'Japanese anime masterpieces')}
                  items={animeItems}
                />
              </div>
            )}

            {/* VIEW 2: MOVIES ONLY */}
            {activeTab === 'movies' && (
              <div className="pt-24 pb-16 space-y-8 animate-fade-in">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="pb-6 border-b border-white/10">
                    <div className="flex items-center gap-2 mb-1">
                      <Film className="w-6 h-6 text-brand-500" />
                      <h1 className="text-2xl sm:text-3xl font-black text-white">
                        {t('مكتبة الأفلام السينمائية', 'Movies Library')}
                      </h1>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-400">
                      {t('أحدث الأفلام العربية، الهوليودية، وأفلام الأكشن والكوميديا بدقة 4K', 'Latest Arabic & Hollywood movies in 4K Ultra HD')}
                    </p>
                  </div>
                </div>

                <MovieRow
                  title={t('أفلام عربية ومصرية', 'Arabic Movies')}
                  items={arabicItems.filter(m => m.type === 'movie')}
                />

                <MovieRow
                  title={t('أفلام هوليوود والعالمية', 'Hollywood Hits')}
                  items={hollywoodItems.filter(m => m.type === 'movie')}
                />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <h2 className="text-xl font-bold text-white mb-4">{t('جميع الأفلام المتوفرة', 'All Movies')}</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
                    {movieItems.map(item => (
                      <div key={item.id} className="w-full">
                        <MovieRow title="" items={[item]} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* VIEW 3: SERIES ONLY */}
            {activeTab === 'series' && (
              <div className="pt-24 pb-16 space-y-8 animate-fade-in">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="pb-6 border-b border-white/10">
                    <div className="flex items-center gap-2 mb-1">
                      <Tv className="w-6 h-6 text-brand-500" />
                      <h1 className="text-2xl sm:text-3xl font-black text-white">
                        {t('المسلسلات التلفزيونية الحصرية', 'TV Series Library')}
                      </h1>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-400">
                      {t('مواسم كاملة بدون إعلانات مع إمكانية التنقل بين الحلقات وتخطي المقدمة', 'Full seasons ad-free with episode browser & skip intro')}
                    </p>
                  </div>
                </div>

                <MovieRow
                  title={t('مسلسلات تاريخية ودراما عربية', 'Historical & Arabic Drama')}
                  items={arabicItems.filter(m => m.type === 'series')}
                />

                <MovieRow
                  title={t('مسلسلات الأنمي والدراما العالمية', 'Anime & Global Series')}
                  items={[...animeItems, ...MEDIA_CATALOG.filter(m => m.origin === 'turkish')]}
                />
              </div>
            )}

            {/* VIEW 4: TRENDING */}
            {activeTab === 'trending' && (
              <div className="pt-24 pb-16 space-y-8 animate-fade-in">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="pb-6 border-b border-white/10">
                    <div className="flex items-center gap-2 mb-1">
                      <Flame className="w-6 h-6 text-amber-400" />
                      <h1 className="text-2xl sm:text-3xl font-black text-white">
                        {t('الأكثر رواجاً في السعودية والخليج', 'Trending in Saudi Arabia')}
                      </h1>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-400">
                      {t('الأعمال التي تسجل أعلى نسب مشاهدة وتفاعل هذا الأسبوع', 'The most watched and trending titles this week')}
                    </p>
                  </div>
                </div>

                <Top10Row items={MEDIA_CATALOG} />

                <MovieRow
                  title={t('أعمال حصرية على موفي هاوس', 'MovieHouse Exclusives')}
                  items={MEDIA_CATALOG.filter(m => m.isExclusive)}
                />
              </div>
            )}

            {/* VIEW 5: WATCHLIST */}
            {activeTab === 'watchlist' && (
              <WatchlistView />
            )}

            {/* VIEW 6: SALLA PLANS */}
            {activeTab === 'salla-plans' && (
              <SallaPlansView />
            )}
          </>
        )}

      </main>

      {/* Global Modals & Player */}
      <DetailModal />
      <VideoPlayerModal />
      <SallaSubscriptionModal />
      <LoginModal />
      <ProfileModal />

      {/* Footer */}
      <Footer />

    </div>
  );
};
