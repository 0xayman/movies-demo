import React from 'react';
import { Play, ShoppingBag, ShieldCheck, Heart, MessageCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { language, t, setActiveTab, setIsSubscriptionModalOpen, setIsLoginModalOpen } = useApp();

  return (
    <footer className="bg-[#07090e] border-t border-white/10 pt-16 pb-12 text-gray-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 via-brand-500 to-amber-500 flex items-center justify-center shadow-glow-red">
                <Play className="w-4 h-4 text-white fill-white" />
              </div>
              <div className="font-black text-lg tracking-tight text-white flex items-center gap-1">
                <span>SALLA</span>
                <span className="text-brand-500">FLIX</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-salla-light/20 text-salla-accent border border-salla-light/30">
                  {t('سلة', 'Salla')}
                </span>
              </div>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed">
              {t(
                'المنصة السينمائية الرائدة لمتابعة أحدث الأفلام والمسلسلات باشتراك رمزي وبسيط يتم عبر متجرنا المعتمد في منصة سلة.',
                'The premier cinematic streaming platform with affordable nominal plans available through our verified Salla store.'
              )}
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>{t('متجر موثق في المركز السعودي للأعمال', 'Saudi Business Center Verified')}</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider">{t('روابط سريعة', 'Quick Navigation')}</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => { setActiveTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition-colors">
                  {t('الرئيسية والعروض', 'Home & Featured')}
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('movies'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition-colors">
                  {t('مكتبة الأفلام', 'Movies Library')}
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('series'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition-colors">
                  {t('المسلسلات الحصرية', 'Exclusive Series')}
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('trending'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition-colors">
                  {t('الأكثر رواجاً في السعودية', 'Trending in Saudi Arabia')}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Salla Subscriptions */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider">{t('اشتراكات متجر سلة', 'Salla Subscriptions')}</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => setIsSubscriptionModalOpen(true)} className="hover:text-white text-salla-light font-bold flex items-center gap-1.5 transition-colors">
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>{t('باقات الاشتراك الرمزي', 'Nominal Pricing Plans')}</span>
                </button>
              </li>
              <li>
                <button onClick={() => setIsLoginModalOpen(true)} className="hover:text-white transition-colors">
                  {t('تفعيل كود الطلب الرقمي', 'Activate Digital Code')}
                </button>
              </li>
              <li>
                <span className="text-gray-400 block">
                  {t('الباقة الشهرية: 9.99 ر.س فقط', 'Monthly: 9.99 SAR')}
                </span>
              </li>
              <li>
                <span className="text-gray-400 block">
                  {t('باقة VIP ربع سنوية: 24.99 ر.س', 'Quarterly VIP: 24.99 SAR')}
                </span>
              </li>
            </ul>
          </div>

          {/* Col 4: Payment Methods & Support */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider">{t('طرق الدفع والدعم', 'Payments & Support')}</h4>
            <p className="text-xs text-gray-400">
              {t('دفع آمن 100% عبر بوابات الدفع الرسمية لمتجر سلة:', '100% Secure payment via Salla:')}
            </p>
            
            {/* Payment badges */}
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="px-2.5 py-1 rounded-lg bg-white/10 text-white font-bold text-[10px] border border-white/10">
                مدى (Mada)
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-white/10 text-white font-bold text-[10px] border border-white/10">
                Apple Pay
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-white/10 text-white font-bold text-[10px] border border-white/10">
                Visa / MasterCard
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-white/10 text-white font-bold text-[10px] border border-white/10">
                STC Pay
              </span>
            </div>

            <div className="pt-2">
              <div className="flex items-center gap-2 text-salla-accent font-semibold text-xs">
                <MessageCircle className="w-4 h-4" />
                <span>{t('دعم فني متاح 24/7 عبر واتساب', '24/7 WhatsApp Support')}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>
            © {new Date().getFullYear()} SallaFlix. {t('جميع الحقوق محفوظة لمنصة الأفلام والمتجر في سلة.', 'All rights reserved.')}
          </p>
          <div className="flex items-center gap-1 text-gray-400">
            <span>{t('صُمم بأعلى معايير الجودة والسرعة للجمهور العربي والخليجي', 'Crafted for Arabic & Gulf audiences')}</span>
            <Heart className="w-3.5 h-3.5 text-brand-500 fill-brand-500" />
          </div>
        </div>

      </div>
    </footer>
  );
};
