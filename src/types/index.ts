export type Language = 'ar' | 'en';

export type MediaType = 'movie' | 'series';

export interface LocalizedString {
  ar: string;
  en: string;
}

export interface Episode {
  id: string;
  season: number;
  episodeNumber: number;
  title: LocalizedString;
  overview: LocalizedString;
  duration: string;
  thumbnail: string;
  videoUrl: string;
}

export interface MediaItem {
  id: string;
  title: LocalizedString;
  tagline?: LocalizedString;
  description: LocalizedString;
  type: MediaType;
  backdropUrl: string;
  posterUrl: string;
  videoUrl: string; // Direct working MP4 / WebM stream
  previewVideoUrl?: string;
  year: number;
  rating: number; // e.g., 8.8
  matchPercentage: number; // e.g., 97
  ageRating: string; // '13+', '16+', '18+', 'PG'
  duration?: LocalizedString; // for movies: '2h 15m'
  seasonsCount?: number; // for series: 3
  genres: string[];
  cast: string[];
  director: string;
  origin: 'arabic' | 'hollywood' | 'anime' | 'korean' | 'turkish';
  isTrending?: boolean;
  isTop10?: boolean;
  top10Rank?: number;
  isExclusive?: boolean;
  episodes?: Episode[];
}

export interface SallaPlan {
  id: string;
  name: LocalizedString;
  price: number; // In SAR
  period: LocalizedString;
  badge?: LocalizedString;
  popular?: boolean;
  screens: number;
  quality: 'HD' | '4K Ultra HD' | '4K HDR + IMAX';
  features: {
    ar: string[];
    en: string[];
  };
  sallaDemoCode: string;
}

export interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  isKids: boolean;
}

export interface UserSubscription {
  isSubscribed: boolean;
  planId?: string;
  planName?: string;
  sallaOrderNumber?: string;
  activationCode?: string;
  activatedAt?: string;
  expiryDate?: string;
}

export interface WatchProgress {
  mediaId: string;
  currentTime: number;
  duration: number;
  percentage: number;
  lastWatched: string;
  episodeId?: string;
}
