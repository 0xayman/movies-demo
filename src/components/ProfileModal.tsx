import React from 'react';
import { X, User, Plus, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ProfileModal: React.FC = () => {
  const { 
    isProfileModalOpen, 
    setIsProfileModalOpen, 
    profiles, 
    currentProfile, 
    switchProfile, 
    language, 
    t 
  } = useApp();

  if (!isProfileModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
      <div className="fixed inset-0" onClick={() => setIsProfileModalOpen(false)} />

      <div className="relative w-full max-w-lg bg-cinema-card rounded-3xl overflow-hidden shadow-cinema border border-white/10 z-10 p-6 sm:p-8 text-center">
        <button
          onClick={() => setIsProfileModalOpen(false)}
          className="absolute top-4 end-4 z-20 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all hover:scale-110"
        >
          <X className="w-4 h-4" />
        </button>

        <h3 className="text-2xl font-black text-white mb-2">
          {t('من يشاهد الآن؟', "Who's Watching?")}
        </h3>
        <p className="text-xs text-gray-400 mb-6">
          {t('اختر ملفك الشخصي لتخصيص قائمتك وتاريخ المشاهدة', 'Select your profile to customize watchlist and preferences')}
        </p>

        {/* Profiles Grid */}
        <div className="grid grid-cols-3 gap-4 sm:gap-6 my-6">
          {profiles.map((prof) => {
            const isSelected = currentProfile.id === prof.id;
            return (
              <div
                key={prof.id}
                onClick={() => switchProfile(prof.id)}
                className="group flex flex-col items-center gap-2.5 cursor-pointer"
              >
                <div className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden transition-all duration-300 group-hover:scale-105 ${
                  isSelected ? 'ring-4 ring-brand-500 shadow-glow-red' : 'border border-white/20 group-hover:ring-2 group-hover:ring-white/50'
                }`}>
                  <img
                    src={prof.avatar}
                    alt={prof.name}
                    className="w-full h-full object-cover"
                  />
                  {isSelected && (
                    <div className="absolute top-1 end-1 bg-brand-600 rounded-full p-0.5 text-white">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                  )}
                  {prof.isKids && (
                    <span className="absolute bottom-0 inset-x-0 bg-amber-500 text-black font-black text-[10px] py-0.5 uppercase tracking-wider">
                      {t('أطفال', 'Kids')}
                    </span>
                  )}
                </div>

                <span className={`text-xs sm:text-sm font-bold transition-colors ${
                  isSelected ? 'text-brand-500' : 'text-gray-300 group-hover:text-white'
                }`}>
                  {prof.name}
                </span>
              </div>
            );
          })}
        </div>

        <div className="pt-4 border-t border-white/10 flex justify-center">
          <button
            onClick={() => setIsProfileModalOpen(false)}
            className="px-6 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors"
          >
            {t('تم', 'Done')}
          </button>
        </div>
      </div>
    </div>
  );
};
