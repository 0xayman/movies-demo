import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  RotateCw, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Minimize, 
  ArrowLeft, 
  ArrowRight,
  Settings, 
  Subtitles, 
  FastForward,
  Tv,
  Check
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const VideoPlayerModal: React.FC = () => {
  const { 
    currentPlaying, 
    closePlayer, 
    language, 
    t, 
    updateWatchProgress 
  } = useApp();

  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [controlsTimeout, setControlsTimeout] = useState<number | null>(null);

  // Overlays & menus
  const [showSettings, setShowSettings] = useState(false);
  const [showSubtitles, setShowSubtitles] = useState(false);
  const [selectedQuality, setSelectedQuality] = useState('4K Ultra HD (HDR)');
  const [selectedAudio, setSelectedAudio] = useState('العربية (Arabic 5.1)');
  const [selectedSubtitle, setSelectedSubtitle] = useState('العربية (Arabic)');
  const [playbackRate, setPlaybackRate] = useState(1);

  const item = currentPlaying?.item;
  const episode = currentPlaying?.episode;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closePlayer();
      } else if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      } else if (e.key === 'ArrowLeft') {
        skipTime(-10);
      } else if (e.key === 'ArrowRight') {
        skipTime(10);
      } else if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, isFullscreen]);

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeout) {
      window.clearTimeout(controlsTimeout);
    }
    const timeout = window.setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
        setShowSettings(false);
        setShowSubtitles(false);
      }
    }, 3500);
    setControlsTimeout(timeout);
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const skipTime = (amount: number) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = Math.max(0, Math.min(videoRef.current.duration, videoRef.current.currentTime + amount));
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
    if (videoRef.current.duration && item) {
      const pct = Math.round((videoRef.current.currentTime / videoRef.current.duration) * 100);
      updateWatchProgress(item.id, pct);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const time = parseFloat(e.target.value);
    videoRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      setIsMuted(val === 0);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    if (isMuted) {
      videoRef.current.muted = false;
      videoRef.current.volume = volume || 0.5;
      setIsMuted(false);
    } else {
      videoRef.current.muted = true;
      setIsMuted(true);
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!item) return null;

  // Show "Skip Intro" between 3 seconds and 30 seconds
  const canSkipIntro = currentTime >= 3 && currentTime <= 35;

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="fixed inset-0 z-50 bg-black flex items-center justify-center select-none overflow-hidden"
    >
      {/* HTML5 Video Element */}
      <video
        ref={videoRef}
        src={episode?.videoUrl || item.videoUrl}
        autoPlay
        playsInline
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onClick={togglePlay}
        className="w-full h-full object-contain cursor-pointer"
      />

      {/* Floating "Skip Intro" button */}
      {canSkipIntro && (
        <button
          onClick={() => skipTime(45)}
          className="absolute bottom-24 end-8 z-30 px-5 py-2.5 rounded-lg bg-black/80 hover:bg-white hover:text-black text-white font-bold text-xs sm:text-sm border border-white/30 backdrop-blur-md transition-all shadow-2xl flex items-center gap-2 animate-fade-in"
        >
          <FastForward className="w-4 h-4" />
          <span>{t('تخطي المقدمة', 'Skip Intro')}</span>
        </button>
      )}

      {/* Controls Overlay */}
      <div 
        className={`absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/70 flex flex-col justify-between p-4 sm:p-8 transition-opacity duration-300 ${
          showControls ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Top Header Bar: Back Button, Title, Specs */}
        <div className="flex items-center justify-between">
          <button
            onClick={closePlayer}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/20 backdrop-blur-sm transition-all hover:scale-105"
          >
            {language === 'ar' ? <ArrowRight className="w-5 h-5" /> : <ArrowLeft className="w-5 h-5" />}
            <span className="text-xs font-bold">{t('رجوع للقائمة', 'Back')}</span>
          </button>

          <div className="text-center">
            <h3 className="text-sm sm:text-base font-bold text-white drop-shadow">
              {item.title[language]}
            </h3>
            {episode && (
              <p className="text-xs text-brand-500 font-semibold drop-shadow">
                {t('الحلقة', 'Episode')} {episode.episodeNumber}: {episode.title[language]}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black px-2 py-0.5 rounded bg-brand-600 text-white">
              {selectedQuality.split(' ')[0]}
            </span>
          </div>
        </div>

        {/* Bottom Control Bar */}
        <div className="space-y-3">
          {/* Progress / Seek Bar */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-300 font-mono w-12 text-center">
              {formatTime(currentTime)}
            </span>

            <div className="relative flex-1 group/track flex items-center">
              <input
                type="range"
                min={0}
                max={duration || 100}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-brand-600 focus:outline-none"
              />
            </div>

            <span className="text-xs text-gray-400 font-mono w-12 text-center">
              {formatTime(duration)}
            </span>
          </div>

          {/* Buttons Row */}
          <div className="flex items-center justify-between pt-1">
            
            {/* Left Controls: Play/Pause, Rewind, Forward, Volume */}
            <div className="flex items-center gap-3 sm:gap-4">
              <button
                onClick={togglePlay}
                className="p-2 rounded-full hover:bg-white/10 text-white transition-colors"
                title={isPlaying ? t('إيقاف مؤقت (مسافة)', 'Pause (Space)') : t('تشغيل (مسافة)', 'Play (Space)')}
              >
                {isPlaying ? <Pause className="w-6 h-6 fill-white" /> : <Play className="w-6 h-6 fill-white" />}
              </button>

              <button
                onClick={() => skipTime(-10)}
                className="p-2 rounded-full hover:bg-white/10 text-white transition-colors"
                title={t('رجوع 10 ثواني', 'Back 10s')}
              >
                <RotateCcw className="w-5 h-5" />
              </button>

              <button
                onClick={() => skipTime(10)}
                className="p-2 rounded-full hover:bg-white/10 text-white transition-colors"
                title={t('تقديم 10 ثواني', 'Forward 10s')}
              >
                <RotateCw className="w-5 h-5" />
              </button>

              {/* Volume Slider */}
              <div className="flex items-center gap-2 group/vol">
                <button
                  onClick={toggleMute}
                  className="p-2 rounded-full hover:bg-white/10 text-white transition-colors"
                >
                  {isMuted || volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-16 sm:w-24 h-1 bg-white/30 rounded appearance-none cursor-pointer accent-white"
                />
              </div>
            </div>

            {/* Right Controls: Subtitles, Settings, Fullscreen */}
            <div className="flex items-center gap-2 sm:gap-3">
              
              {/* Audio & Subtitles Popover */}
              <div className="relative">
                <button
                  onClick={() => {
                    setShowSubtitles(!showSubtitles);
                    setShowSettings(false);
                  }}
                  className={`p-2 rounded-full hover:bg-white/10 transition-colors ${
                    showSubtitles ? 'text-brand-500 bg-white/10' : 'text-white'
                  }`}
                  title={t('الصوت والترجمة', 'Audio & Subtitles')}
                >
                  <Subtitles className="w-5 h-5" />
                </button>

                {showSubtitles && (
                  <div className="absolute bottom-full mb-3 end-0 w-64 glass-panel rounded-2xl p-4 shadow-2xl z-50 text-xs animate-slide-up border border-white/10">
                    <h4 className="font-bold text-white mb-2 pb-1 border-b border-white/10">{t('اللغة والترجمة', 'Audio & Subtitles')}</h4>
                    
                    <div className="space-y-3">
                      <div>
                        <span className="text-gray-400 block mb-1 font-semibold">{t('لغة الصوت:', 'Audio:')}</span>
                        {['العربية (Arabic 5.1)', 'الإنجليزية (English Atmos)'].map(aud => (
                          <button
                            key={aud}
                            onClick={() => setSelectedAudio(aud)}
                            className="w-full text-start py-1 px-2 rounded hover:bg-white/10 flex items-center justify-between text-gray-200"
                          >
                            <span>{aud}</span>
                            {selectedAudio === aud && <Check className="w-3.5 h-3.5 text-brand-500" />}
                          </button>
                        ))}
                      </div>

                      <div className="pt-2 border-t border-white/5">
                        <span className="text-gray-400 block mb-1 font-semibold">{t('الترجمة:', 'Subtitles:')}</span>
                        {['العربية (Arabic)', 'English', 'إيقاف الترجمة (Off)'].map(sub => (
                          <button
                            key={sub}
                            onClick={() => setSelectedSubtitle(sub)}
                            className="w-full text-start py-1 px-2 rounded hover:bg-white/10 flex items-center justify-between text-gray-200"
                          >
                            <span>{sub}</span>
                            {selectedSubtitle === sub && <Check className="w-3.5 h-3.5 text-brand-500" />}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Quality & Speed Settings */}
              <div className="relative">
                <button
                  onClick={() => {
                    setShowSettings(!showSettings);
                    setShowSubtitles(false);
                  }}
                  className={`p-2 rounded-full hover:bg-white/10 transition-colors ${
                    showSettings ? 'text-brand-500 bg-white/10' : 'text-white'
                  }`}
                  title={t('الإعدادات والجودة', 'Settings & Quality')}
                >
                  <Settings className="w-5 h-5" />
                </button>

                {showSettings && (
                  <div className="absolute bottom-full mb-3 end-0 w-60 glass-panel rounded-2xl p-4 shadow-2xl z-50 text-xs animate-slide-up border border-white/10">
                    <h4 className="font-bold text-white mb-2 pb-1 border-b border-white/10">{t('جودة البث وسرعة العرض', 'Playback Settings')}</h4>
                    
                    <div className="space-y-3">
                      <div>
                        <span className="text-gray-400 block mb-1 font-semibold">{t('الدقة والجودة:', 'Video Quality:')}</span>
                        {['4K Ultra HD (HDR)', '1080p Full HD', '720p HD'].map(q => (
                          <button
                            key={q}
                            onClick={() => setSelectedQuality(q)}
                            className="w-full text-start py-1 px-2 rounded hover:bg-white/10 flex items-center justify-between text-gray-200"
                          >
                            <span>{q}</span>
                            {selectedQuality === q && <Check className="w-3.5 h-3.5 text-brand-500" />}
                          </button>
                        ))}
                      </div>

                      <div className="pt-2 border-t border-white/5">
                        <span className="text-gray-400 block mb-1 font-semibold">{t('سرعة التشغيل:', 'Speed:')}</span>
                        <div className="flex items-center justify-between gap-1 mt-1">
                          {[0.75, 1, 1.25, 1.5].map(rate => (
                            <button
                              key={rate}
                              onClick={() => {
                                setPlaybackRate(rate);
                                if (videoRef.current) videoRef.current.playbackRate = rate;
                              }}
                              className={`px-2 py-1 rounded text-xs font-bold transition-all ${
                                playbackRate === rate ? 'bg-brand-600 text-white' : 'bg-white/10 text-gray-300 hover:bg-white/20'
                              }`}
                            >
                              {rate}x
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Fullscreen Toggle */}
              <button
                onClick={toggleFullscreen}
                className="p-2 rounded-full hover:bg-white/10 text-white transition-colors"
                title={isFullscreen ? t('إنهاء ملء الشاشة (F)', 'Exit Fullscreen (F)') : t('ملء الشاشة (F)', 'Fullscreen (F)')}
              >
                {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
              </button>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
