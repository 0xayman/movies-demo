import React, { useState } from 'react';
import { 
  Play, 
  Info, 
  Plus, 
  Check, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  ShoppingBag,
  Star,
  Flame
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MEDIA_CATALOG } from '../data/mockData';

export const HeroBanner: React.FC = () => {
  const { 
    language, 
    t, 
    openPlayer, 
    openDetail, 
    watchlist, 
    toggleWatchlist, 
    setIsSubscriptionModalOpen, 
    subscription 
  } = useApp();

  const [isMuted, setIsMuted] = useState(true);

  // Use the top featured Arabic blockbuster or switchable item
  const heroItem = MEDIA_CATALOG[0]; // Al Hashashin (The Assassins)
  const isSaved = watchlist.includes(heroItem.id);

  return (
    <div className="relative w-full h-[85vh] min-h-[580px] max-h-[820px] overflow-hidden select-none">
      {/* Background Image with Cinematic Overlay Gradients */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-700 scale-105"
        style={{ backgroundImage: `url(${heroItem.backdropUrl})` }}
      >
        {/* Gradients to blend smoothly into dark obsidian background */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d14] via-[#0a0d14]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0d14]/90 via-[#0a0d14]/50 to-transparent rtl:bg-gradient-to-l" />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Salla Special Promotional Banner across top-right/left */}
      <div className="absolute top-24 sm:top-20 end-4 sm:end-8 z-20">
        <button
          onClick={() => setIsSubscriptionModalOpen(true)}
          className="group flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#004956]/80 hover:bg-[#004956] border border-salla-light/40 text-white text-xs font-semibold backdrop-blur-md shadow-glow-salla transition-all hover:scale-105 cursor-pointer"
        >
          <span className="w-2 h-2 rounded-full bg-salla-accent animate-ping" />
          <ShoppingBag className="w-3.5 h-3.5 text-salla-accent" />
          <span>
            {subscription.isSubscribed
              ? t('اشتراك سلة مفعل | باقة VIP', 'Salla VIP Active')
              : t('احصل على اشتراكك بـ 9.99 ر.س فقط عبر سلة', 'Get subscription for 9.99 SAR on Salla')}
          </span>
        </button>
      </div>

      {/* Hero Content Information */}
      <div className="relative max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-20 sm:pb-24 z-10">
        <div className="max-w-2xl space-y-4">
          
          {/* Metadata Badges */}
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-brand-600/90 text-white text-xs font-black tracking-wider uppercase shadow-glow-red">
              <Sparkles className="w-3 h-3" />
              {t('حصرياً على سلة فلكس', 'SallaFlix Exclusive')}
            </span>

            <span className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              {t('المرتبة #1 في السعودية والخليج', '#1 in Saudi Arabia')}
            </span>

            <span className="px-2 py-0.5 rounded text-xs font-bold bg-white/10 text-gray-200 border border-white/15">
              4K Ultra HD
            </span>

            <span className="px-2 py-0.5 rounded text-xs font-bold bg-white/10 text-gray-200 border border-white/15">
              Dolby Atmos
            </span>

            <span className="flex items-center gap-1 text-xs font-bold text-amber-400">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{heroItem.rating}</span>
            </span>
          </div>

          {/* Hero Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight drop-shadow-2xl leading-tight">
            {heroItem.title[language]}
          </h1>

          {/* Tagline */}
          {heroItem.tagline && (
            <p className="text-base sm:text-lg font-medium text-amber-300/90 italic drop-shadow">
              "{heroItem.tagline[language]}"
            </p>
          )}

          {/* Synopsis */}
          <p className="text-sm sm:text-base text-gray-200/90 line-clamp-3 leading-relaxed max-w-xl drop-shadow">
            {heroItem.description[language]}
          </p>

          {/* Genres Chips */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            {heroItem.genres.map((genre, idx) => (
              <span 
                key={idx} 
                className="text-xs text-gray-300 font-medium px-2.5 py-0.5 rounded-full bg-black/40 border border-white/10 backdrop-blur-sm"
              >
                {genre}
              </span>
            ))}
            <span className="text-xs text-gray-400">•</span>
            <span className="text-xs text-gray-300">{heroItem.year}</span>
            <span className="text-xs text-gray-400">•</span>
            <span className="text-xs text-gray-300 border border-white/20 px-1.5 py-0.2 rounded text-[11px]">
              {heroItem.ageRating}
            </span>
          </div>

          {/* Action Buttons Row */}
          <div className="flex flex-wrap items-center gap-3 pt-3">
            {/* Play Button */}
            <button
              onClick={() => openPlayer(heroItem)}
              className="group flex items-center gap-2.5 px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-black text-sm sm:text-base shadow-glow-red transition-all hover:scale-105 cursor-pointer"
            >
              <Play className="w-5 h-5 fill-white group-hover:scale-110 transition-transform" />
              <span>{t('مشاهدة الحلقة الأولى', 'Watch Episode 1')}</span>
            </button>

            {/* More Details Button */}
            <button
              onClick={() => openDetail(heroItem)}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-sm sm:text-base backdrop-blur-md transition-all hover:scale-105 border border-white/20 cursor-pointer"
            >
              <Info className="w-5 h-5" />
              <span>{t('تفاصيل العمل والحلقات', 'Details & Episodes')}</span>
            </button>

            {/* Add to My List Button */}
            <button
              onClick={() => toggleWatchlist(heroItem.id)}
              className={`p-3 rounded-xl backdrop-blur-md transition-all border cursor-pointer ${
                isSaved 
                  ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400' 
                  : 'bg-white/10 hover:bg-white/20 border-white/15 text-white'
              }`}
              title={isSaved ? t('في قائمتك', 'In My List') : t('إضافة لقائمتي', 'Add to My List')}
            >
              {isSaved ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
            </button>

            {/* Mute/Sound Toggle Simulation */}
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="ms-auto p-3 rounded-full bg-black/40 hover:bg-black/60 border border-white/20 text-gray-300 hover:text-white backdrop-blur-md transition-all"
              title={isMuted ? t('تشغيل الصوت', 'Unmute preview') : t('كتم الصوت', 'Mute preview')}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
