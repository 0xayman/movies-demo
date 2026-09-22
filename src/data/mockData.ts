import { MediaItem, SallaPlan, UserProfile } from '../types';

export const SALLA_PLANS: SallaPlan[] = [
  {
    id: 'salla-monthly',
    name: {
      ar: 'الباقة الشهرية الأساسية',
      en: 'Monthly Basic Plan'
    },
    price: 9.99,
    period: {
      ar: 'شهرياً',
      en: 'Monthly'
    },
    badge: {
      ar: 'اشتراك رمزي',
      en: 'Nominal Fee'
    },
    screens: 1,
    quality: 'HD',
    features: {
      ar: [
        'مشاهدة كامل محتوى المنصة بدون حدود',
        'شاشة واحدة في نفس الوقت بدقة 1080p Full HD',
        'يعمل على الجوال، التابلت، والكمبيوتر',
        'تفعيل فوري خلال دقيقة واحدة عبر كود متجر سلة',
        'بدون أي إعلانات مزعجة إطلاقاً'
      ],
      en: [
        'Unlimited access to all movies and series',
        '1 simultaneous screen in 1080p Full HD',
        'Works on phones, tablets, and computers',
        'Instant 1-minute activation via Salla store digital code',
        'Completely ad-free experience'
      ]
    },
    sallaDemoCode: 'SALLA-MONTHLY-88'
  },
  {
    id: 'salla-vip-quarterly',
    name: {
      ar: 'باقة VIP ربع سنوية (الأكثر طلباً)',
      en: 'Quarterly VIP Plan (Most Popular)'
    },
    price: 24.99,
    period: {
      ar: 'كل 3 أشهر',
      en: 'Every 3 Months'
    },
    badge: {
      ar: 'الأكثر توفيراً ⭐',
      en: 'Best Value ⭐'
    },
    popular: true,
    screens: 2,
    quality: '4K Ultra HD',
    features: {
      ar: [
        'جميع مميزات الباقة الشهرية + توفير 20%',
        'شاشتان في نفس الوقت بدقة 4K Ultra HD',
        'دعم كامل للتلفزيونات الذكية (Smart TV & Apple TV)',
        'صوت سينمائي محيطي Dolby 5.1',
        'كود إضافي يمكن إهدائه لصديق',
        'دعم فني مخصص عبر واتساب'
      ],
      en: [
        'All monthly features + save 20%',
        '2 simultaneous screens in stunning 4K Ultra HD',
        'Full Smart TV & Apple TV app support',
        'Cinematic surround sound Dolby 5.1',
        'Bonus gift code for a friend',
        'Priority WhatsApp customer support'
      ]
    },
    sallaDemoCode: 'SALLA-VIP-2024'
  },
  {
    id: 'salla-annual-gold',
    name: {
      ar: 'الباقة الذهبية العائلية السنوية',
      en: 'Annual Family Gold Plan'
    },
    price: 79.99,
    period: {
      ar: 'سنوياً',
      en: 'Annually'
    },
    badge: {
      ar: 'العرض الخارق 🔥',
      en: 'Mega Deal 🔥'
    },
    screens: 4,
    quality: '4K HDR + IMAX',
    features: {
      ar: [
        'أقل من 7 ريالات في الشهر فقط!',
        '4 شاشات متزامنة لجميع أفراد العائلة بدقة 4K HDR',
        'إنشاء حتى 5 ملفات شخصية مخصصة مع رمز أمان',
        'ميزة العرض المبكر للحصريات قبل نزولها بيومين',
        'تحميل للمشاهدة بدون إنترنت أثناء السفر',
        'ضمان كامل لمدة 365 يوماً من متجرنا في سلة'
      ],
      en: [
        'Less than 7 SAR per month!',
        '4 concurrent screens for the entire family in 4K HDR',
        'Create up to 5 custom profiles with PIN lock',
        'Early access to platform exclusives 48 hours ahead',
        'Offline downloads for offline viewing while traveling',
        'Full 365-day warranty verified by our Salla store'
      ]
    },
    sallaDemoCode: 'SALLA-GOLD-VIP'
  }
];

export const DEMO_PROFILES: UserProfile[] = [
  {
    id: 'prof-1',
    name: 'أيمن (المشرف)',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    isKids: false
  },
  {
    id: 'prof-2',
    name: 'سارة',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    isKids: false
  },
  {
    id: 'prof-3',
    name: 'الأطفال (Kids)',
    avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=150&auto=format&fit=crop&q=80',
    isKids: true
  }
];

export const MEDIA_CATALOG: MediaItem[] = [
  // 1. Featured Epic Hero - Al Hashashin (The Assassins)
  {
    id: 'hashashin',
    title: {
      ar: 'الحشاشين: قلعة آلموت',
      en: 'The Assassins: Alamut Fortress'
    },
    tagline: {
      ar: 'من يملك عقول الرجال... يملك العالم',
      en: 'Whoever controls the minds of men... controls the world'
    },
    description: {
      ar: 'في القرن الحادي عشر الميلادي، يؤسس حسن الصباح أخطر وأشرس فرقة اغتيالات عرفها التاريخ داخل قلعة آلموت المنيعة. ملحمة تاريخية مشوقة تأخذك في دهاليز العقيدة، السياسة، والصراع على السلطة.',
      en: 'In the 11th century, Hassan al-Sabbah founds the most notorious and feared assassination order in history within the fortress of Alamut. An epic historical thriller exploring ideology, politics, and power.'
    },
    type: 'series',
    backdropUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1920&auto=format&fit=crop&q=85',
    posterUrl: 'https://images.unsplash.com/photo-1514539079130-25950c84af65?w=600&auto=format&fit=crop&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    year: 2024,
    rating: 9.3,
    matchPercentage: 99,
    ageRating: '16+',
    seasonsCount: 1,
    genres: ['تاريخي', 'دراما', 'إثارة', 'أكشن'],
    cast: ['كريم عبد العزيز', 'فتحي عبد الوهاب', 'نيقولا معوض', 'ميرنا نور الدين'],
    director: 'بيتر ميمي',
    origin: 'arabic',
    isTrending: true,
    isTop10: true,
    top10Rank: 1,
    isExclusive: true,
    episodes: [
      {
        id: 'hash-ep1',
        season: 1,
        episodeNumber: 1,
        title: { ar: 'العهد والبيعة', en: 'The Oath & Allegiance' },
        overview: { ar: 'بداية رحلة حسن الصباح ولقائه مع الوزير نظام الملك وعمر الخيام وقسمهم المشترك.', en: 'The beginning of Hassan al-Sabbah’s journey and his fateful pact with Nizam al-Mulk.' },
        duration: '48 دقيقة',
        thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&auto=format&fit=crop&q=80',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4'
      },
      {
        id: 'hash-ep2',
        season: 1,
        episodeNumber: 2,
        title: { ar: 'أبواب آلموت', en: 'Gates of Alamut' },
        overview: { ar: 'حسن الصباح يخطط للسيطرة على قلعة آلموت المنيعة دون إراقة قطرة دم واحدة.', en: 'Hassan orchestrates the bloodless takeover of the impenetrable fortress of Alamut.' },
        duration: '52 دقيقة',
        thumbnail: 'https://images.unsplash.com/photo-1514539079130-25950c84af65?w=500&auto=format&fit=crop&q=80',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4'
      },
      {
        id: 'hash-ep3',
        season: 1,
        episodeNumber: 3,
        title: { ar: 'جنة الأرض الموعودة', en: 'The Promised Paradise' },
        overview: { ar: 'صناعة الوهم داخل حدائق القلعة لتدريب الفدائيين الأشد قسوة ووفاءً.', en: 'The illusion fabricated in the castle gardens to train the most ruthless fedayeen.' },
        duration: '45 دقيقة',
        thumbnail: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=500&auto=format&fit=crop&q=80',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4'
      }
    ]
  },

  // 2. Welad Rizk 3 (Sons of Rizk 3)
  {
    id: 'welad-rizk-3',
    title: {
      ar: 'ولاد رزق 3: القاضية',
      en: 'Sons of Rizk 3: The Knockout'
    },
    tagline: {
      ar: 'الضربة القاضية ما فيهاش هزار',
      en: 'The knockout punch leaves no survivors'
    },
    description: {
      ar: 'بعد سنوات من التفرقة والانفصال عن عالم الجريمة، يجتمع أشقاء رزق مرة أخرى في الرياض في مهمة انتحارية عالية الخطورة لسرقة جوهرة باهظة الثمن، لتبدأ مطاردات ملحمية تفوق التوقعات.',
      en: 'Years after walking away from crime, the Rizk brothers reunite in Riyadh for an ultra-high-stakes heist to steal a priceless treasure, triggering explosive citywide chases.'
    },
    type: 'movie',
    backdropUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1920&auto=format&fit=crop&q=85',
    posterUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600&auto=format&fit=crop&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    year: 2024,
    rating: 8.9,
    matchPercentage: 98,
    ageRating: '16+',
    duration: { ar: 'ساعتان و 10 دقائق', en: '2h 10m' },
    genres: ['أكشن', 'جريمة', 'كوميديا'],
    cast: ['أحمد عز', 'عمرو يوسف', 'آسر ياسين', 'كريم قاسم', 'محمد ممدوح'],
    director: 'طارق العريان',
    origin: 'arabic',
    isTrending: true,
    isTop10: true,
    top10Rank: 2,
    isExclusive: true
  },

  // 3. Dune: Part Two
  {
    id: 'dune-2',
    title: {
      ar: 'كثيب: الجزء الثاني',
      en: 'Dune: Part Two'
    },
    tagline: {
      ar: 'القدر يكتب بين رمال أراكيس الحارقة',
      en: 'Long live the fighters of Arrakis'
    },
    description: {
      ar: 'يتحالف بول أتريدس مع تشاني وشعب الفريمن للانتقام من المتآمرين الذين دمروا عائلته. وفي مواجهة خيار بين حب حياته ومصير الكون بأسره، يسعى لمنع مستقبل فظيع هو وحده القادر على التنبؤ به.',
      en: 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the universe.'
    },
    type: 'movie',
    backdropUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1920&auto=format&fit=crop&q=85',
    posterUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    year: 2024,
    rating: 8.8,
    matchPercentage: 96,
    ageRating: '13+',
    duration: { ar: 'ساعتان و 46 دقيقة', en: '2h 46m' },
    genres: ['خيال علمي', 'مغامرة', 'أكشن', 'دراما'],
    cast: ['تيموثي شالاماي', 'زيندايا', 'ريبيكا فيرغسون', 'خافيير بارديم'],
    director: 'دينيس فيلنوف',
    origin: 'hollywood',
    isTrending: true,
    isTop10: true,
    top10Rank: 3,
    isExclusive: false
  },

  // 4. Shabab Al Bomb 12 (Saudi Comedy)
  {
    id: 'shabab-bomb-12',
    title: {
      ar: 'شباب البومب 12',
      en: 'Shabab Al Bomb 12'
    },
    tagline: {
      ar: 'عامر وربعه يرجعون بأقوى المقالب والمغامرات',
      en: 'Amer and the gang return with hilarious adventures'
    },
    description: {
      ar: 'المسلسل الكوميدي الخليجي والسعودي الأنجح، يعود في موسمه الجديد ليرصد قضايا الشباب والمجتمع بطابع فكاهي خفيف ومفارقات يومية لا تنتهي في الرياض وجدة.',
      en: 'The top Gulf and Saudi comedy series returns with hilarious episodes exploring modern youth life, technology, and cultural misadventures in Riyadh.'
    },
    type: 'series',
    backdropUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&auto=format&fit=crop&q=85',
    posterUrl: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=600&auto=format&fit=crop&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
    year: 2024,
    rating: 8.4,
    matchPercentage: 94,
    ageRating: 'PG',
    seasonsCount: 12,
    genres: ['كوميديا', 'عائلي', 'مواقف'],
    cast: ['فيصل العيسى', 'مهند الجميلي', 'عبدالعزيز الفريحي', 'محمد الدوسري'],
    director: 'سمير عارف',
    origin: 'arabic',
    isTrending: true,
    isTop10: true,
    top10Rank: 4,
    episodes: [
      {
        id: 'bomb-ep1',
        season: 12,
        episodeNumber: 1,
        title: { ar: 'ترند التيك توك', en: 'The TikTok Trend' },
        overview: { ar: 'عامر يحاول صناعة محتوى فايرل للحصول على ملايين المشاهدات فتتحول الفكرة إلى كارثة مضحكة.', en: 'Amer attempts to make a viral video that turns upside down.' },
        duration: '22 دقيقة',
        thumbnail: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=500&auto=format&fit=crop&q=80',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4'
      },
      {
        id: 'bomb-ep2',
        season: 12,
        episodeNumber: 2,
        title: { ar: 'الذكاء الاصطناعي', en: 'Artificial Intelligence' },
        overview: { ar: 'كفته يشتري روبوت ذكاء اصطناعي لإدارة الاستراحة فيسيطر الروبوت على كل شيء.', en: 'Kofta buys an AI bot to run their lounge with chaotic results.' },
        duration: '24 دقيقة',
        thumbnail: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=500&auto=format&fit=crop&q=80',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4'
      }
    ]
  },

  // 5. Solo Leveling (Anime)
  {
    id: 'solo-leveling',
    title: {
      ar: 'سولو ليفلينغ: النهوض من الظل',
      en: 'Solo Leveling: Arise'
    },
    tagline: {
      ar: 'من أضعف صياد في العالم... إلى ملك الظلال',
      en: 'From the weakest hunter in the world... to the Shadow Monarch'
    },
    description: {
      ar: 'في عالم انفتحت فيه بوابات الوحوش، يُعرف سونغ جين وو بأنه أضعف صياد في البشرية. بعد حادث مروع في زنزانة مزدوجة غامضة، يصحو ليكتشف أنه الوحيد القادر على رؤية شاشة المهام والترقية بلا حدود.',
      en: 'In a world invaded by monsters, Sung Jinwoo is ridiculed as mankind’s weakest hunter. After surviving a deadly dual dungeon, he awakens with a mysterious player UI that allows him alone to level up infinitely.'
    },
    type: 'series',
    backdropUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1920&auto=format&fit=crop&q=85',
    posterUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600&auto=format&fit=crop&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    year: 2024,
    rating: 9.1,
    matchPercentage: 97,
    ageRating: '16+',
    seasonsCount: 1,
    genres: ['أنمي', 'أكشن', 'فانتازيا', 'خوارق'],
    cast: ['تيتو بان', 'جينا بارك', 'مايكل تشوي'],
    director: 'شونسوكي ناكاشيغي',
    origin: 'anime',
    isTrending: true,
    isTop10: true,
    top10Rank: 5,
    episodes: [
      {
        id: 'solo-ep1',
        season: 1,
        episodeNumber: 1,
        title: { ar: 'أضعف الصيادين', en: 'I’m Used to It' },
        overview: { ar: 'رحلة جين وو داخل زنزانة الرتبة D ووقوع فريقه في فخ المعبد الملعون.', en: 'Jinwoo enters a low-rank dungeon only to walk into a horrifying slaughter.' },
        duration: '24 دقيقة',
        thumbnail: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=500&auto=format&fit=crop&q=80',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4'
      }
    ]
  },

  // 6. Oppenheimer
  {
    id: 'oppenheimer',
    title: {
      ar: 'أوبنهايمر',
      en: 'Oppenheimer'
    },
    tagline: {
      ar: 'أصبحتُ الموت... مدمّر العوالم',
      en: 'I am become Death, the destroyer of worlds'
    },
    description: {
      ar: 'القصة الملحمية للمشروع السري لوس ألاموس وصناعة القنبلة الذرية على يد الفيزيائي روبرت أوبنهايمر، والصراع الأخلاقي والسياسي الذي طارده طوال حياته.',
      en: 'The epic biographical drama chronicling J. Robert Oppenheimer’s race against time to create the atomic bomb in the Manhattan Project, and the harrowing moral fallout.'
    },
    type: 'movie',
    backdropUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&auto=format&fit=crop&q=85',
    posterUrl: 'https://images.unsplash.com/photo-1507499739999-097706ad8914?w=600&auto=format&fit=crop&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    year: 2023,
    rating: 8.9,
    matchPercentage: 95,
    ageRating: '16+',
    duration: { ar: '3 ساعات', en: '3h 0m' },
    genres: ['سيرة ذاتية', 'دراما', 'تاريخ'],
    cast: ['كيليان ميرفي', 'إميلي بلنت', 'مات ديمون', 'روبرت داوني جونيور'],
    director: 'كريستوفر نولان',
    origin: 'hollywood',
    isTrending: false,
    isTop10: true,
    top10Rank: 6
  },

  // 7. Kira & El Gin (Arabic historical action)
  {
    id: 'kira-el-gin',
    title: {
      ar: 'كيرة والجن',
      en: 'Kira & El Gin'
    },
    tagline: {
      ar: 'رجال لا تراجعهم المشانق',
      en: 'Men unbroken by the noose'
    },
    description: {
      ar: 'يرصد الفيلم واقع المجتمع المصري إبان ثورة 1919، من خلال بطولات المقاومة الشعبية السرية ضد الاحتلال الإنجليزي في إطار من الأكشن والغموض المثير.',
      en: 'Chronicles the Egyptian resistance movement during the 1919 revolution, uniting unlikely underground heroes against British military occupation.'
    },
    type: 'movie',
    backdropUrl: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=1920&auto=format&fit=crop&q=85',
    posterUrl: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=600&auto=format&fit=crop&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    year: 2023,
    rating: 8.7,
    matchPercentage: 93,
    ageRating: '16+',
    duration: { ar: ' ساعتان و 55 دقيقة', en: '2h 55m' },
    genres: ['أكشن', 'تاريخي', 'دراما'],
    cast: ['كريم عبد العزيز', 'أحمد عز', 'هند صبري', 'سيد رجب'],
    director: 'مروان حامد',
    origin: 'arabic',
    isTrending: false,
    isTop10: true,
    top10Rank: 7
  },

  // 8. Kuruluş: Osman (Turkish Epic)
  {
    id: 'kurulus-osman',
    title: {
      ar: 'المؤسس عثمان: راية المجد',
      en: 'Kuruluş: Osman'
    },
    tagline: {
      ar: 'دماء الفاتحين تسطر أعظم إمبراطورية',
      en: 'The blood of conquerors builds an empire'
    },
    description: {
      ar: 'ملحمة ولادة الدولة العثمانية وصراع القائد الشاب عثمان بن أرطغرل مع المغول والصليبيين لبناء وطن قوي وشامخ يعلو بالعدالة والكرامة.',
      en: 'The epic saga of Osman I battling Mongol forces and Byzantine fortresses to establish the foundation of the Ottoman Empire.'
    },
    type: 'series',
    backdropUrl: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=1920&auto=format&fit=crop&q=85',
    posterUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    year: 2024,
    rating: 8.6,
    matchPercentage: 92,
    ageRating: '13+',
    seasonsCount: 5,
    genres: ['تاريخي', 'حروب', 'أكشن'],
    cast: ['بوراك أوزجيفيت', 'أوزجه تورير', 'يغيت أوشان'],
    director: 'متين جوناي',
    origin: 'turkish',
    isTrending: true,
    isTop10: true,
    top10Rank: 8
  },

  // 9. Attack on Titan
  {
    id: 'attack-on-titan',
    title: {
      ar: 'هجوم العمالقة: الفصل الأخير',
      en: 'Attack on Titan: The Final Chapter'
    },
    tagline: {
      ar: 'إذا فزنا نعيش، إذا خسرنا نموت، وإذا لم نقاتل فلا يمكننا الفوز',
      en: 'If you win, you live. If you lose, you die. If you don’t fight, you can’t win.'
    },
    description: {
      ar: 'اللحظات الأخيرة في صراع البشرية ضد إيرين ييغر وقوات الدك المروع. معركة بقاء ملحمية تحسم مصير العالم ومفهوم الحرية.',
      en: 'The earth-shattering conclusion of humanity’s battle against Eren Yeager and the apocalyptic Rumbling. A monumental finale exploring freedom and destiny.'
    },
    type: 'series',
    backdropUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1920&auto=format&fit=crop&q=85',
    posterUrl: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=600&auto=format&fit=crop&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    year: 2023,
    rating: 9.2,
    matchPercentage: 99,
    ageRating: '16+',
    seasonsCount: 4,
    genres: ['أنمي', 'فانتازيا سوداء', 'أكشن', 'غموض'],
    cast: ['يوكي كاجي', 'يوي إيشيكاوا', 'هيروشي كاميا'],
    director: 'يويتشيرو هاياشي',
    origin: 'anime',
    isTrending: false,
    isTop10: true,
    top10Rank: 9
  },

  // 10. Interstellar
  {
    id: 'interstellar',
    title: {
      ar: 'بين النجوم',
      en: 'Interstellar'
    },
    tagline: {
      ar: 'نهاية كوكب الأرض لن تكون نهاية البشرية',
      en: 'Mankind was born on Earth. It was never meant to die here.'
    },
    description: {
      ar: 'عندما توشك الأرض على الهلاك، يقود رائد الفضاء كوبر ومجموعة من العلماء رحلة شجاعة عبر ثقب دودي فلكي للبحث عن كوكب جديد يؤوي الجنس البشري.',
      en: 'A team of intrepid explorers travel through a wormhole in space in an attempt to ensure humanity’s survival amidst an environmentally collapsing Earth.'
    },
    type: 'movie',
    backdropUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&auto=format&fit=crop&q=85',
    posterUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&auto=format&fit=crop&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    year: 2014,
    rating: 8.7,
    matchPercentage: 96,
    ageRating: 'PG-13',
    duration: { ar: 'ساعتان و 49 دقيقة', en: '2h 49m' },
    genres: ['خيال علمي', 'مغامرة', 'دراما'],
    cast: ['ماثيو ماكونهي', 'آن هاثاواي', 'جيسيكا شاستاين'],
    director: 'كريستوفر نولان',
    origin: 'hollywood',
    isTrending: false,
    isTop10: true,
    top10Rank: 10
  },

  // 11. El Beit Beity (Egyptian Horror Comedy)
  {
    id: 'el-beit-beity',
    title: {
      ar: 'البيت بيتي: لغز القصر',
      en: 'El Beit Beity: Mystery of the Manor'
    },
    tagline: {
      ar: 'قصر مسكون... ومواقف تموت من الضحك',
      en: 'A haunted mansion... and nonstop laughter'
    },
    description: {
      ar: 'بينو الشاب المستهتر يرث قصراً مهجوراً ومسكوناً بالأرواح في إحدى القرى النائية، ويلتقي بسائق التاكسي كراكيري لتبدأ مغامرة رعب كوميدية لا مثيل لها لحل لغز اللعنة.',
      en: 'A spoiled young man inherits an eerie haunted palace in the countryside and teams up with a stressed taxi driver to solve ghostly ancestral secrets.'
    },
    type: 'series',
    backdropUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1920&auto=format&fit=crop&q=85',
    posterUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    year: 2024,
    rating: 8.9,
    matchPercentage: 95,
    ageRating: '13+',
    seasonsCount: 2,
    genres: ['كوميديا', 'رعب', 'غموض'],
    cast: ['كريم محمود عبد العزيز', 'مصطفى خاطر', 'ميرنا جميل', 'سامي مغاوري'],
    director: 'خالد مرعي',
    origin: 'arabic',
    isTrending: true,
    isExclusive: true
  },

  // 12. The Batman
  {
    id: 'the-batman',
    title: {
      ar: 'باتمان: فارس الظلام الجديد',
      en: 'The Batman'
    },
    tagline: {
      ar: 'أنا لست الظل... أنا الانتقام',
      en: 'I am the shadows... I am Vengeance'
    },
    description: {
      ar: 'في سنته الثانية من مكافحة الجريمة في مدينة غوثام، يلاحق بروس واين القاتل المتسلسل الغامض ريدلر الذي يستهدف النخبة السياسية ويكشف عن فساد متجذر في عائلة واين.',
      en: 'In his second year fighting crime, Batman ventures into Gotham City’s underworld when a sadistic killer leaves behind a trail of cryptic clues targeting corrupt elites.'
    },
    type: 'movie',
    backdropUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1920&auto=format&fit=crop&q=85',
    posterUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600&auto=format&fit=crop&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    year: 2022,
    rating: 8.4,
    matchPercentage: 92,
    ageRating: '16+',
    duration: { ar: 'ساعتان و 56 دقيقة', en: '2h 56m' },
    genres: ['أكشن', 'جريمة', 'غموض'],
    cast: ['روبرت باتينسون', 'زوي كرافيتز', 'بول دانو', 'كولين فاريل'],
    director: 'مات ريفز',
    origin: 'hollywood'
  }
];
