import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Flame } from 'lucide-react';
import { MediaItem } from '../types';
import { useApp } from '../context/AppContext';

interface Top10RowProps {
  items: MediaItem[];
}

export const Top10Row: React.FC<Top10RowProps> = ({ items }) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const { language, t, openDetail, openPlayer } = useApp();

  const scroll = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      const scrollAmount = 600;
      rowRef.current.scrollBy({
        left: (direction === 'left' ? -1 : 1) * scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const top10Sorted = [...items]
    .filter(item => item.isTop10 && item.top10Rank)
    .sort((a, b) => (a.top10Rank || 99) - (b.top10Rank || 99))
    .slice(0, 10);

  if (top10Sorted.length === 0) return null;

  return (
    <section className="relative my-10 px-4 sm:px-6 lg:px-8 group">
      {/* Title */}
      <div className="flex items-center gap-2 mb-4">
        <div className="p-1.5 rounded-lg bg-amber-500/20 border border-amber-500/30">
          <Flame className="w-5 h-5 text-amber-400" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            {t('أفضل 10 أعمال في السعودية اليوم', 'Top 10 in Saudi Arabia Today')}
          </h2>
          <p className="text-xs text-gray-400">
            {t('الأعمال الأكثر مشاهدة واشتراكاً هذا الأسبوع', 'Most watched by active subscribers this week')}
          </p>
        </div>
      </div>

      <div className="relative">
        {/* Left Arrow */}
        <button
          onClick={() => scroll('left')}
          className="absolute start-0 top-1/2 -translate-y-1/2 z-20 w-10 h-28 bg-black/70 hover:bg-black/90 text-white rounded-e-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm border-e border-y border-white/10"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Scrollable Track */}
        <div
          ref={rowRef}
          className="flex items-center gap-2 sm:gap-4 overflow-x-auto no-scrollbar py-4 px-1 scroll-smooth"
        >
          {top10Sorted.map((item, index) => {
            const rank = index + 1;
            return (
              <div
                key={item.id}
                onClick={() => openDetail(item)}
                className="relative flex-shrink-0 flex items-center group/card cursor-pointer transition-all duration-300 hover:scale-105"
              >
                {/* Big Stylized Rank Number SVG */}
                <div className="relative -me-6 sm:-me-8 z-10 select-none pointer-events-none">
                  <span className="text-[90px] sm:text-[130px] font-black leading-none top10-number drop-shadow-[0_10px_20px_rgba(0,0,0,0.9)]">
                    {rank}
                  </span>
                </div>

                {/* Poster Card */}
                <div className="w-36 sm:w-44 aspect-[2/3] rounded-xl overflow-hidden bg-cinema-surface border border-cinema-border shadow-cinema relative z-0">
                  <img
                    src={item.posterUrl || item.backdropUrl}
                    alt={item.title[language]}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  
                  {/* Title overlay */}
                  <div className="absolute bottom-2 inset-x-2">
                    <p className="text-white text-xs font-bold truncate">
                      {item.title[language]}
                    </p>
                    <span className="text-[10px] text-emerald-400 font-semibold">
                      {item.matchPercentage}% {t('تطابق', 'match')}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scroll('right')}
          className="absolute end-0 top-1/2 -translate-y-1/2 z-20 w-10 h-28 bg-black/70 hover:bg-black/90 text-white rounded-s-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm border-s border-y border-white/10"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </section>
  );
};
