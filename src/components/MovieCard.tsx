import React, { useState } from 'react';
import { Play, Plus, Check, Info, Star, Sparkles } from 'lucide-react';
import { MediaItem } from '../types';
import { useApp } from '../context/AppContext';

interface MovieCardProps {
  item: MediaItem;
  rank?: number;
  showProgress?: boolean;
}

export const MovieCard: React.FC<MovieCardProps> = ({ item, rank, showProgress }) => {
  const { 
    language, 
    t, 
    openPlayer, 
    openDetail, 
    watchlist, 
    toggleWatchlist, 
    watchProgress 
  } = useApp();

  const [isHovered, setIsHovered] = useState(false);
  const isSaved = watchlist.includes(item.id);
  const progressPercent = showProgress ? (watchProgress[item.id] || 45) : undefined;

  return (
    <div 
      className="relative flex-shrink-0 w-44 sm:w-56 md:w-64 rounded-xl overflow-hidden group cursor-pointer transition-all duration-300 hover:scale-105 hover:z-20 shadow-lg hover:shadow-2xl bg-cinema-card border border-cinema-border"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => openDetail(item)}
    >
      {/* Poster Image / Backdrop */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-cinema-surface">
        <img
          src={item.backdropUrl || item.posterUrl}
          alt={item.title[language]}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />

        {/* Gradient Shadow */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d14] via-transparent to-transparent opacity-80" />

        {/* Quality or Exclusive Pill */}
        <div className="absolute top-2.5 start-2.5 flex items-center gap-1.5 z-10">
          {item.isExclusive && (
            <span className="px-1.5 py-0.5 rounded text-[10px] font-black bg-brand-600 text-white shadow-glow-red flex items-center gap-0.5">
              <Sparkles className="w-2.5 h-2.5" />
              {t('حصري', 'Exclusive')}
            </span>
          )}
          <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-black/60 backdrop-blur-md text-gray-300 border border-white/10">
            {item.type === 'series' ? t('مسلسل', 'Series') : t('فيلم', 'Movie')}
          </span>
        </div>

        {/* Match Percentage & Rating */}
        <div className="absolute top-2.5 end-2.5 flex items-center gap-1 px-1.5 py-0.5 rounded bg-black/60 backdrop-blur-md text-amber-400 text-[10px] font-bold border border-white/10">
          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
          <span>{item.rating}</span>
        </div>

        {/* Quick Play Overlay on Hover */}
        <div className={`absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              openPlayer(item);
            }}
            className="w-12 h-12 rounded-full bg-brand-600 hover:bg-brand-500 text-white flex items-center justify-center shadow-glow-red transform scale-90 group-hover:scale-100 transition-all hover:scale-110"
            title={t('تشغيل فوري', 'Play Now')}
          >
            <Play className="w-6 h-6 fill-white translate-x-0.5" />
          </button>
        </div>

        {/* Progress Bar for "Continue Watching" */}
        {progressPercent !== undefined && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
            <div 
              className="h-full bg-brand-600"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        )}
      </div>

      {/* Card Info Details */}
      <div className="p-3 bg-cinema-card flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-sm text-white truncate leading-snug group-hover:text-brand-500 transition-colors">
            {item.title[language]}
          </h3>
          
          <div className="flex items-center gap-2 mt-1.5 text-[11px] text-gray-400 font-medium">
            <span className="text-emerald-400 font-bold">{item.matchPercentage}% {t('تطابق', 'match')}</span>
            <span>•</span>
            <span className="border border-white/20 px-1 rounded text-[10px]">{item.ageRating}</span>
            <span>•</span>
            <span>{item.duration ? item.duration[language] : `${item.seasonsCount} ${t('مواسم', 'Seasons')}`}</span>
          </div>
        </div>

        {/* Action icons & Genres */}
        <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/5">
          <span className="text-[11px] text-gray-400 truncate max-w-[120px]">
            {item.genres.slice(0, 2).join(' • ')}
          </span>

          <div className="flex items-center gap-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleWatchlist(item.id);
              }}
              className={`p-1.5 rounded-full hover:bg-white/20 transition-colors ${
                isSaved ? 'text-emerald-400' : 'text-gray-300'
              }`}
              title={isSaved ? t('في قائمتك', 'In My List') : t('إضافة لقائمتي', 'Add to My List')}
            >
              {isSaved ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                openDetail(item);
              }}
              className="p-1.5 rounded-full hover:bg-white/20 text-gray-300 transition-colors"
              title={t('تفاصيل', 'Details')}
            >
              <Info className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
