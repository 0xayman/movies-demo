import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { MediaItem } from '../types';
import { MovieCard } from './MovieCard';
import { useApp } from '../context/AppContext';

interface MovieRowProps {
  title: string;
  subtitle?: string;
  items: MediaItem[];
  showProgress?: boolean;
}

export const MovieRow: React.FC<MovieRowProps> = ({ title, subtitle, items, showProgress }) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const { language } = useApp();

  const scroll = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      // In RTL, scroll direction semantics invert in some browsers, but standard scrollBy works nicely
      const scrollAmount = 600;
      const factor = direction === 'left' ? -1 : 1;
      rowRef.current.scrollBy({
        left: factor * scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  if (items.length === 0) return null;

  return (
    <section className="relative my-8 px-4 sm:px-6 lg:px-8 group">
      {/* Row Header */}
      <div className="flex items-baseline justify-between mb-3.5">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <span>{title}</span>
          </h2>
          {subtitle && (
            <p className="text-xs sm:text-sm text-gray-400 mt-0.5">{subtitle}</p>
          )}
        </div>
      </div>

      {/* Row Container with Navigation Arrows */}
      <div className="relative">
        {/* Left Arrow */}
        <button
          onClick={() => scroll('left')}
          className="absolute start-0 top-1/2 -translate-y-1/2 z-20 w-10 h-24 bg-black/70 hover:bg-black/90 text-white rounded-e-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm border-e border-y border-white/10"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Scrollable Track */}
        <div
          ref={rowRef}
          className="flex items-center gap-4 overflow-x-auto no-scrollbar py-3 px-1 scroll-smooth"
        >
          {items.map((item) => (
            <MovieCard 
              key={item.id} 
              item={item} 
              showProgress={showProgress} 
            />
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scroll('right')}
          className="absolute end-0 top-1/2 -translate-y-1/2 z-20 w-10 h-24 bg-black/70 hover:bg-black/90 text-white rounded-s-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm border-s border-y border-white/10"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </section>
  );
};
