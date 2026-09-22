import React from 'react';
import { Bookmark, Film, Play, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MEDIA_CATALOG } from '../data/mockData';
import { MovieCard } from './MovieCard';

export const WatchlistView: React.FC = () => {
  const { watchlist, language, t, setActiveTab } = useApp();

  const savedItems = MEDIA_CATALOG.filter(item => watchlist.includes(item.id));

  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-[70vh]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Bookmark className="w-6 h-6 text-brand-500 fill-brand-500" />
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              {t('قائمتي المفضلة', 'My Watchlist')}
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-gray-400">
            {t('الأفلام والمسلسلات التي قمت بحفظها للرجوع إليها لاحقاً', 'Saved movies and series to watch later')}
          </p>
        </div>

        <span className="px-3 py-1 rounded-full bg-white/10 text-white text-xs font-bold self-start sm:self-auto">
          {savedItems.length} {t('أعمال محفوظة', 'saved titles')}
        </span>
      </div>

      {/* Grid or Empty State */}
      {savedItems.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 mt-8">
          {savedItems.map(item => (
            <div key={item.id} className="w-full">
              <MovieCard item={item} />
            </div>
          ))}
        </div>
      ) : (
        <div className="py-20 text-center max-w-md mx-auto space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-gray-500">
            <Film className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-white">
            {t('قائمتك فارغة حالياً', 'Your Watchlist is empty')}
          </h3>
          <p className="text-xs text-gray-400 leading-relaxed">
            {t('تصفح مكتبة الأفلام والمسلسلات واضغط على أيقونة (+) لإضافتها إلى قائمتك الخاصة.', 'Browse through the catalog and click the (+) icon on any title to save it.')}
          </p>
          <button
            onClick={() => setActiveTab('home')}
            className="px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold transition-all shadow-glow-red"
          >
            {t('تصفح الأفلام والمسلسلات الآن', 'Browse Titles Now')}
          </button>
        </div>
      )}
    </div>
  );
};
