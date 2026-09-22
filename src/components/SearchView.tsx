import React, { useState } from 'react';
import { Search, SlidersHorizontal, Film, Tv, Star, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MEDIA_CATALOG } from '../data/mockData';
import { MovieCard } from './MovieCard';

export const SearchView: React.FC = () => {
  const { 
    searchQuery, 
    setSearchQuery, 
    language, 
    t 
  } = useApp();

  const [selectedType, setSelectedType] = useState<'all' | 'movie' | 'series'>('all');
  const [selectedGenre, setSelectedGenre] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'rating' | 'year'>('rating');

  const allGenres = Array.from(new Set(MEDIA_CATALOG.flatMap(m => m.genres)));

  // Filter and sort items
  const filteredItems = MEDIA_CATALOG.filter(item => {
    // Text search in title, cast, description
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q || 
      item.title.ar.toLowerCase().includes(q) || 
      item.title.en.toLowerCase().includes(q) ||
      item.description.ar.toLowerCase().includes(q) ||
      item.description.en.toLowerCase().includes(q) ||
      item.cast.some(c => c.toLowerCase().includes(q)) ||
      item.director.toLowerCase().includes(q);

    // Type filter
    const matchesType = selectedType === 'all' || item.type === selectedType;

    // Genre filter
    const matchesGenre = selectedGenre === 'all' || item.genres.includes(selectedGenre);

    return matchesSearch && matchesType && matchesGenre;
  }).sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    return b.year - a.year;
  });

  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-[75vh] space-y-8 animate-fade-in">
      
      {/* Search Input Bar */}
      <div className="max-w-2xl mx-auto relative">
        <div className="flex items-center bg-cinema-surface border border-white/15 rounded-2xl px-5 py-3.5 shadow-2xl focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-500/20 transition-all">
          <Search className="w-5 h-5 text-gray-400 me-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('ابحث عن فيلم، مسلسل، ممثل، أو مخرج...', 'Search movies, series, actors, directors...')}
            className="bg-transparent text-sm text-white placeholder-gray-400 focus:outline-none w-full"
            autoFocus
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="p-1 rounded-full text-gray-400 hover:text-white hover:bg-white/10"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Filters & Sorting Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10 text-xs">
        
        {/* Type Filter Buttons */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setSelectedType('all')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
              selectedType === 'all' ? 'bg-brand-600 text-white shadow-glow-red' : 'bg-white/5 text-gray-300 hover:bg-white/10'
            }`}
          >
            {t('الكل', 'All')}
          </button>
          <button
            onClick={() => setSelectedType('movie')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1 ${
              selectedType === 'movie' ? 'bg-brand-600 text-white shadow-glow-red' : 'bg-white/5 text-gray-300 hover:bg-white/10'
            }`}
          >
            <Film className="w-3.5 h-3.5" />
            <span>{t('أفلام', 'Movies')}</span>
          </button>
          <button
            onClick={() => setSelectedType('series')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1 ${
              selectedType === 'series' ? 'bg-brand-600 text-white shadow-glow-red' : 'bg-white/5 text-gray-300 hover:bg-white/10'
            }`}
          >
            <Tv className="w-3.5 h-3.5" />
            <span>{t('مسلسلات', 'Series')}</span>
          </button>
        </div>

        {/* Genre Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar max-w-full sm:max-w-md py-1">
          <button
            onClick={() => setSelectedGenre('all')}
            className={`px-3 py-1 rounded-full text-[11px] font-bold whitespace-nowrap transition-all ${
              selectedGenre === 'all' ? 'bg-white text-black' : 'bg-cinema-surface text-gray-300 border border-white/10 hover:bg-white/10'
            }`}
          >
            {t('جميع التصنيفات', 'All Genres')}
          </button>
          {allGenres.map((g) => (
            <button
              key={g}
              onClick={() => setSelectedGenre(g)}
              className={`px-3 py-1 rounded-full text-[11px] font-bold whitespace-nowrap transition-all ${
                selectedGenre === g ? 'bg-white text-black' : 'bg-cinema-surface text-gray-300 border border-white/10 hover:bg-white/10'
              }`}
            >
              {g}
            </button>
          ))}
        </div>

        {/* Sort Select */}
        <div className="flex items-center gap-2">
          <span className="text-gray-400 font-medium">{t('ترتيب حسب:', 'Sort by:')}</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'rating' | 'year')}
            className="bg-cinema-surface border border-white/15 rounded-xl px-2.5 py-1 text-white text-xs focus:outline-none focus:border-brand-500"
          >
            <option value="rating">{t('الأعلى تقييماً ⭐', 'Highest Rated ⭐')}</option>
            <option value="year">{t('الأحدث سنة إنتاج', 'Newest Release')}</option>
          </select>
        </div>

      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs text-gray-400">
        <span>
          {t(`تم العثور على ${filteredItems.length} عمل`, `Found ${filteredItems.length} titles`)}
        </span>
      </div>

      {/* Media Grid */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {filteredItems.map((item) => (
            <div key={item.id} className="w-full">
              <MovieCard item={item} />
            </div>
          ))}
        </div>
      ) : (
        <div className="py-20 text-center max-w-md mx-auto space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-gray-500">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-white">
            {t('لم نتمكن من العثور على نتائج تطابق بحثك', 'No matching titles found')}
          </h3>
          <p className="text-xs text-gray-400">
            {t('جرب البحث بكلمات أخرى أو اختر تصنيفاً مختلفاً من القائمة أعلاه.', 'Try searching with different keywords or clear your active filters.')}
          </p>
        </div>
      )}

    </div>
  );
};
