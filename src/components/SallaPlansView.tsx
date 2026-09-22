import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  Tv, 
  Smartphone, 
  HelpCircle, 
  KeyRound, 
  Star,
  Lock,
  MessageCircle,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SALLA_PLANS } from '../data/mockData';

export const SallaPlansView: React.FC = () => {
  const { 
    language, 
    t, 
    activateSallaCode, 
    subscription, 
    cancelSubscription,
    showToast 
  } = useApp();

  const [inputCode, setInputCode] = useState('');

  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode.trim()) {
      showToast(t('الرجاء إدخال كود التفعيل الرقمي أو رقم طلب سلة', 'Please enter your activation code'));
      return;
    }
    activateSallaCode(inputCode);
  };

  const reviews = [
    {
      name: 'عبدالرحمن الشهري',
      city: 'الرياض',
      comment: t('والله تجربة خرافية! اشتريت الباقة الربع سنوية من متجر سلة ووصلني الكود في واتساب فوراً وفعلت على التلفزيون بدقة 4K.', 'Incredible experience! Bought the quarterly plan via Salla and received the code instantly via WhatsApp.'),
      stars: 5
    },
    {
      name: 'نوف القحطاني',
      city: 'جدة',
      comment: t('مبلغ رمزي جداً مقارنة بالنتفلكس وباقي المنصات، وبدون أي إعلانات مزعجة والأفلام العربية كلها متوفرة.', 'Very affordable nominal fee compared to other platforms, zero ads, and all Arabic blockbusters are available.'),
      stars: 5
    },
    {
      name: 'سلطان الدوسري',
      city: 'الدمام',
      comment: t('الدعم الفني عبر الواتساب سريع جداً، والاشتراك شغال على شاشتين بدون أي تقطيع.', 'Customer service is super responsive, and it works seamlessly on 2 TVs concurrently.'),
      stars: 5
    }
  ];

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16 animate-fade-in">
      
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-salla-light/20 text-salla-accent border border-salla-light/30 text-xs font-bold shadow-glow-salla">
          <ShoppingBag className="w-4 h-4" />
          <span>{t('باقات موفي هاوس • متجر سلة المعتمد', 'MovieHouse Plans • Verified Salla Store')}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
          {t('باقات موفي هاوس (MovieHouse Plans)', 'MovieHouse Plans')}
        </h1>

        <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
          {t(
            'نوفر لك وصولاً شاملاً لأحدث الأفلام والمسلسلات العالمية والعربية بدقة 4K فائقة الوضوح. اشترك بضغطة زر عبر متجرنا في سلة وتصلك بيانات التفعيل فورياً.',
            'Get unlimited access to the latest Hollywood and Arabic blockbusters in 4K HDR. Subscribe through our Salla store and get instant digital activation.'
          )}
        </p>

        {/* Current status if active */}
        {subscription.isSubscribed && (
          <div className="inline-flex items-center gap-2 p-3 px-5 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-bold shadow-md">
            <ShieldCheck className="w-5 h-5" />
            <span>
              {t('أنت مشترك بالفعل في:', 'You are currently subscribed to:')} {subscription.planName} ({t('ينتهي في:', 'Expires:')} {subscription.expiryDate})
            </span>
          </div>
        )}
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {SALLA_PLANS.map((plan) => (
          <div
            key={plan.id}
            className={`relative rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 ${
              plan.popular
                ? 'bg-gradient-to-b from-[#004956]/70 via-cinema-surface to-cinema-card border-2 border-salla-light shadow-glow-salla scale-105 z-10'
                : 'bg-cinema-surface border border-white/10 hover:border-white/20'
            }`}
          >
            {plan.badge && (
              <div className="absolute -top-3.5 inset-x-0 flex justify-center">
                <span className={`px-4 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-lg ${
                  plan.popular 
                    ? 'bg-salla-light text-black font-extrabold' 
                    : 'bg-brand-600 text-white'
                }`}>
                  {plan.badge[language]}
                </span>
              </div>
            )}

            <div>
              <div className="text-center pt-3 pb-5 border-b border-white/10">
                <h3 className="font-black text-lg text-white mb-2">
                  {plan.name[language]}
                </h3>

                <div className="flex items-baseline justify-center gap-1.5 my-2">
                  <span className="text-4xl sm:text-5xl font-black text-white">
                    {plan.price}
                  </span>
                  <span className="text-sm font-bold text-gray-400">
                    {t('ريال', 'SAR')} / {plan.period[language]}
                  </span>
                </div>

                <div className="flex items-center justify-center gap-3 text-xs text-gray-300 mt-2">
                  <span className="flex items-center gap-1">
                    <Tv className="w-3.5 h-3.5 text-salla-light" />
                    {plan.screens} {t('شاشات', 'screens')}
                  </span>
                  <span>•</span>
                  <span className="text-salla-accent font-semibold">{plan.quality}</span>
                </div>
              </div>

              {/* Features list */}
              <ul className="space-y-3 my-6 text-xs text-gray-300">
                {plan.features[language].map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-4 border-t border-white/10">
              <button
                onClick={() => activateSallaCode(plan.sallaDemoCode)}
                className={`w-full py-3.5 px-4 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  plan.popular
                    ? 'bg-salla-light hover:bg-salla-accent text-black shadow-glow-salla hover:scale-102'
                    : 'bg-brand-600 hover:bg-brand-700 text-white shadow-glow-red hover:scale-102'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{t('شراء وتفعيل تجريبي فوري', 'Instant Demo Purchase')}</span>
              </button>

              <div className="p-2.5 rounded-lg bg-black/40 border border-white/5 text-center">
                <span className="text-[11px] text-gray-400 block mb-0.5">{t('كود سلة التجريبي:', 'Demo Code:')}</span>
                <code className="text-amber-400 font-mono text-xs font-bold">{plan.sallaDemoCode}</code>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Instant Salla Code Activation Section */}
      <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-white/10 max-w-3xl mx-auto shadow-cinema text-center space-y-6">
        <div className="w-14 h-14 rounded-2xl bg-salla-light/20 border border-salla-light/40 flex items-center justify-center mx-auto text-salla-accent shadow-glow-salla">
          <KeyRound className="w-7 h-7" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-black text-white">
            {t('لديك كود تفعيل من متجر سلة بالفعل؟', 'Already have a code from Salla Store?')}
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 max-w-lg mx-auto">
            {t('أدخل رقم الطلب من فاتورة سلة أو كود التفعيل الرقمي لتنشيط حسابك فورياً بدون انتظار.', 'Enter your digital code or Salla order ID to unlock the entire catalog right now.')}
          </p>
        </div>

        <form onSubmit={handleCodeSubmit} className="max-w-md mx-auto space-y-3">
          <input
            type="text"
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
            placeholder={t('أدخل كود سلة (مثال: SALLA-VIP-2024)', 'Enter Salla Code (e.g. SALLA-VIP-2024)')}
            className="w-full px-5 py-3.5 rounded-2xl bg-black/60 border border-white/20 text-sm text-center font-mono uppercase tracking-widest text-white placeholder-gray-500 focus:outline-none focus:border-salla-light focus:ring-2 focus:ring-salla-light/30"
          />

          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-salla to-salla-light hover:opacity-95 text-white font-black text-sm shadow-glow-salla transition-all hover:scale-102"
          >
            {t('تفعيل فوري الآن 🎉', 'Activate Now 🎉')}
          </button>
        </form>
      </div>

      {/* How it Works Workflow */}
      <div className="space-y-8 text-center">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            {t('كيف يعمل التكامل مع متجر سلة؟', 'How does Salla integration work?')}
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            {t('3 خطوات بسيطة تبدأ من متجر سلة وتنتهي بالمشاهدة الممتعة', '3 simple steps from checkout to cinema')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-start">
          <div className="p-6 rounded-2xl bg-cinema-surface border border-white/5 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-salla text-salla-accent font-black text-base flex items-center justify-center">
              1
            </div>
            <h4 className="font-bold text-base text-white">
              {t('شراء المنتج الرقمي بسلة', '1. Buy Digital Order on Salla')}
            </h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              {t('يضيف العميل باقة الاشتراك إلى سلته في متجر سلة ويدفع بمبلغ رمزي عبر مدى، أبل باي، أو البطاقات الائتمانية بأعلى معايير الأمان.', 'Customer adds the subscription to their cart in Salla store and pays via Mada, Apple Pay, or credit card.')}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-cinema-surface border border-white/5 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 font-black text-base flex items-center justify-center">
              2
            </div>
            <h4 className="font-bold text-base text-white">
              {t('إرسال الكود الرقمي آلياً', '2. Automated Digital Code')}
            </h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              {t('فور إتمام الطلب، يقوم نظام متجر سلة بإصدار كود رقمي مشفر وإرساله للعميل برسالة نصية SMS وعبر الإيميل وتطبيق الواتساب خلال 30 ثانية.', 'Salla automatically generates the unique code and sends it to the customer via SMS, Email, and WhatsApp within 30 seconds.')}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-cinema-surface border border-white/5 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-black text-base flex items-center justify-center">
              3
            </div>
            <h4 className="font-bold text-base text-white">
              {t('المشاهدة بدقة 4K فوراً', '3. Instant 4K Streaming')}
            </h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              {t('يدخل العميل الكود في موقع المنصة ويتم فتح الصلاحيات وتفعيل الحساب فورياً دون الحاجة لكلمات مرور معقدة أو خطوات إضافية.', 'Customer enters the code on the streaming site and unlocks all features immediately without complex setups.')}
            </p>
          </div>
        </div>
      </div>

      {/* Customer Testimonials */}
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-black text-white">
            {t('آراء وتجارب المشتركين', 'Subscriber Reviews')}
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            {t('تقييمات حقيقية من عملاء متجرنا على سلة', 'Verified reviews from our Salla store customers')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-cinema-surface border border-white/5 space-y-3">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(rev.stars)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs text-gray-300 leading-relaxed italic">
                "{rev.comment}"
              </p>
              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px]">
                <span className="font-bold text-white">{rev.name}</span>
                <span className="text-gray-400">{rev.city}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
