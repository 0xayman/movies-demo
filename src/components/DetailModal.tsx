import React, { useState } from 'react';
import { 
  X, 
  Play, 
  Plus, 
  Check, 
  Star, 
  Sparkles, 
  Calendar, 
  Clock, 
  Languages, 
  Film, 
  ShoppingBag,
  Tv
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MEDIA_CATALOG } from '../data/mockData';
import { MovieCard } from './MovieCard';

export const DetailModal: React.FC = () => {
  const { 
    selectedDetailItem, 
    closeDetail, 
    openDetail,
    language, 
    t, 
    openPlayer, 
    watchlist, 
    toggleWatchlist,
    subscription,
    setIsSubscriptionModalOpen
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'episodes' | 'similar'>('overview');
  const [selectedSeason, setSelectedSeason] = useState<number>(1);

  if (!selectedDetailItem) return null;

  const item = selectedDetailItem;
  const isSaved = watchlist.includes(item.id);

  // Recommendations: same genre or same origin, excluding current item
  const recommendations = MEDIA_CATALOG.filter(
    m => m.id !== item.id && (m.origin === item.origin || m.genres.some(g => item.genres.includes(g)))
  ).slice(0, 6);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-fade-in">
      {/* Background click to close */}
      <div className="fixed inset-0" onClick={closeDetail} />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-4xl bg-cinema-card rounded-2xl overflow-hidden shadow-cinema border border-white/10 z-10 my-8">
        
        {/* Close Button */}
        <button
          onClick={closeDetail}
          className="absolute top-4 end-4 z-30 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all hover:scale-110"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Billboard Header */}
        <div className="relative aspect-[16/9] max-h-[420px] w-full overflow-hidden">
          <img
            src={item.backdropUrl || item.posterUrl}
            alt={item.title[language]}
            className="w-full h-full object-cover"
          />
          
          {/* Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-cinema-card via-cinema-card/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-cinema-card/80 via-transparent to-transparent rtl:bg-gradient-to-l" />

          {/* Header Actions & Title */}
          <div className="absolute bottom-6 inset-x-6 z-20 space-y-3">
            <div className="flex items-center gap-2">
              {item.isExclusive && (
                <span className="px-2 py-0.5 rounded text-xs font-black bg-brand-600 text-white flex items-center gap-1 shadow-glow-red">
                  <Sparkles className="w-3 h-3" />
                  {t('حصرياً على سلة فلكس', 'SallaFlix Exclusive')}
                </span>
              )}
              <span className="px-2 py-0.5 rounded text-xs font-bold bg-white/15 backdrop-blur-md text-white border border-white/10">
                {item.type === 'series' ? t('مسلسل تلفزيوني', 'TV Series') : t('فيلم سينمائي', 'Feature Movie')}
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight">
              {item.title[language]}
            </h2>

            {item.tagline && (
              <p className="text-sm font-medium text-amber-300 italic hidden sm:block">
                "{item.tagline[language]}"
              </p>
            )}

            {/* Play & Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={() => {
                  closeDetail();
                  openPlayer(item);
                }}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-black text-sm shadow-glow-red transition-all hover:scale-105"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>{item.type === 'series' ? t('مشاهدة الحلقة الأولى', 'Watch Episode 1') : t('تشغيل الفيلم الآن', 'Play Movie Now')}</span>
              </button>

              <button
                onClick={() => toggleWatchlist(item.id)}
                className={`p-2.5 rounded-xl border transition-all ${
                  isSaved 
                    ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400' 
                    : 'bg-white/10 hover:bg-white/20 border-white/15 text-white'
                }`}
                title={isSaved ? t('في قائمتك', 'In My List') : t('إضافة لقائمتي', 'Add to My List')}
              >
                {isSaved ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
              </button>

              {!subscription.isSubscribed && (
                <button
                  onClick={() => setIsSubscriptionModalOpen(true)}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-salla hover:bg-salla-light text-white text-xs font-bold border border-salla-accent/30 shadow-glow-salla transition-all hover:scale-105"
                >
                  <ShoppingBag className="w-3.5 h-3.5 text-salla-accent" />
                  <span>{t('اشترك عبر سلة للمشاهدة بدون حدود', 'Subscribe on Salla for unlimited access')}</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="px-6 border-b border-white/10 flex items-center gap-4 text-sm font-bold">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 border-b-2 transition-all ${
              activeTab === 'overview' 
                ? 'border-brand-500 text-white' 
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            {t('نظرة عامة والتفاصيل', 'Overview & Specs')}
          </button>

          {item.type === 'series' && item.episodes && (
            <button
              onClick={() => setActiveTab('episodes')}
              className={`py-3 border-b-2 transition-all flex items-center gap-1.5 ${
                activeTab === 'episodes' 
                  ? 'border-brand-500 text-white' 
                  : 'border-transparent text-gray-400 hover:text-gray-200'
              }`}
            >
              <Tv className="w-4 h-4" />
              <span>{t('الحلقات والمواسم', 'Episodes & Seasons')}</span>
              <span className="text-[11px] px-1.5 py-0.2 rounded-full bg-white/10">
                {item.episodes.length}
              </span>
            </button>
          )}

          <button
            onClick={() => setActiveTab('similar')}
            className={`py-3 border-b-2 transition-all ${
              activeTab === 'similar' 
                ? 'border-brand-500 text-white' 
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            {t('أعمال مشابهة وموصى بها', 'More Like This')}
          </button>
        </div>

        {/* Tab Content Container */}
        <div className="p-6 max-h-[450px] overflow-y-auto">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Main Synopsis */}
                <div className="md:col-span-2 space-y-4">
                  <div className="flex items-center gap-3 text-xs text-gray-300">
                    <span className="text-emerald-400 font-bold">{item.matchPercentage}% {t('تطابق لذوقك', 'Match for you')}</span>
                    <span>•</span>
                    <span className="text-amber-400 font-bold flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      {item.rating} / 10
                    </span>
                    <span>•</span>
                    <span>{item.year}</span>
                    <span>•</span>
                    <span className="px-1.5 py-0.2 rounded border border-white/20 text-[10px]">{item.ageRating}</span>
                    <span>•</span>
                    <span>{item.duration ? item.duration[language] : `${item.seasonsCount} ${t('مواسم', 'Seasons')}`}</span>
                  </div>

                  <p className="text-sm text-gray-200 leading-relaxed">
                    {item.description[language]}
                  </p>

                  <div className="pt-2">
                    <h4 className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">{t('التصنيفات والأنواع', 'Genres')}</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {item.genres.map((genre, idx) => (
                        <span key={idx} className="text-xs px-2.5 py-1 rounded-lg bg-cinema-surface border border-white/10 text-gray-300">
                          {genre}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Metadata Sidebar */}
                <div className="bg-cinema-surface rounded-xl p-4 border border-white/5 space-y-4 text-xs">
                  <div>
                    <span className="text-gray-400 block mb-1 font-semibold">{t('طاقم التمثيل:', 'Cast:')}</span>
                    <p className="text-gray-200 font-medium leading-relaxed">
                      {item.cast.join('، ')}
                    </p>
                  </div>

                  <div>
                    <span className="text-gray-400 block mb-1 font-semibold">{t('الإخراج:', 'Director:')}</span>
                    <p className="text-gray-200 font-medium">{item.director}</p>
                  </div>

                  <div>
                    <span className="text-gray-400 block mb-1 font-semibold">{t('الصوت والترجمة:', 'Audio & Subtitles:')}</span>
                    <p className="text-gray-200 font-medium">
                      {t('العربية (الأصلية)، الإنجليزية، الفرنسية (دبلجة وترجمة)', 'Arabic (Original), English, French')}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-white/10">
                    <span className="text-salla-light font-bold flex items-center gap-1">
                      <ShoppingBag className="w-3.5 h-3.5" />
                      {t('متاح ضمن باقة سلة الرمزية', 'Included in Salla plan')}
                    </span>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 2: EPISODES (FOR SERIES) */}
          {activeTab === 'episodes' && item.episodes && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <h3 className="font-bold text-sm text-white">
                  {t('حلقات الموسم', 'Season Episodes')} ({item.episodes.length} {t('حلقات', 'episodes')})
                </h3>
                <span className="text-xs text-gray-400 bg-white/5 px-2.5 py-1 rounded-md border border-white/10">
                  {t('الموسم 1', 'Season 1')}
                </span>
              </div>

              <div className="space-y-3">
                {item.episodes.map((ep) => (
                  <div
                    key={ep.id}
                    onClick={() => {
                      closeDetail();
                      openPlayer(item, ep);
                    }}
                    className="p-3 rounded-xl bg-cinema-surface hover:bg-cinema-cardHover border border-white/5 hover:border-white/15 transition-all flex flex-col sm:flex-row items-start sm:items-center gap-4 cursor-pointer group"
                  >
                    {/* Episode Thumbnail */}
                    <div className="relative w-full sm:w-40 aspect-video rounded-lg overflow-hidden flex-shrink-0 bg-black">
                      <img
                        src={ep.thumbnail}
                        alt={ep.title[language]}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Play className="w-8 h-8 text-white fill-white" />
                      </div>
                      <span className="absolute bottom-1 end-1 px-1.5 py-0.5 rounded bg-black/80 text-[10px] text-white">
                        {ep.duration}
                      </span>
                    </div>

                    {/* Episode Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h4 className="font-bold text-sm text-white group-hover:text-brand-500 transition-colors">
                          {ep.episodeNumber}. {ep.title[language]}
                        </h4>
                      </div>
                      <p className="text-xs text-gray-300 line-clamp-2 leading-relaxed">
                        {ep.overview[language]}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: SIMILAR TITLES */}
          {activeTab === 'similar' && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {recommendations.map(rec => (
                <div key={rec.id} onClick={() => openDetail(rec)}>
                  <MovieCard item={rec} />
                </div>
              ))}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
