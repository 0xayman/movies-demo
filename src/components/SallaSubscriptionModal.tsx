import React, { useState } from 'react';
import { 
  X, 
  ShoppingBag, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  Tv, 
  Smartphone, 
  HelpCircle, 
  ArrowRight, 
  CreditCard,
  KeyRound,
  ChevronDown,
  Gift
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SALLA_PLANS } from '../data/mockData';

export const SallaSubscriptionModal: React.FC = () => {
  const { 
    isSubscriptionModalOpen, 
    setIsSubscriptionModalOpen, 
    language, 
    t, 
    subscription, 
    activateSallaCode, 
    cancelSubscription,
    showToast
  } = useApp();

  const [inputCode, setInputCode] = useState('');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [selectedPlanTab, setSelectedPlanTab] = useState<string>('plans'); // 'plans' | 'code' | 'how-it-works'

  if (!isSubscriptionModalOpen) return null;

  const handleSubmitCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode.trim()) {
      showToast(t('الرجاء إدخال كود التفعيل أو رقم طلب سلة', 'Please enter your activation code'));
      return;
    }
    const success = activateSallaCode(inputCode);
    if (success) {
      setInputCode('');
    }
  };

  const handleQuickDemoCode = (code: string) => {
    setInputCode(code);
    activateSallaCode(code);
  };

  const faqs = [
    {
      q: t('كيف تتم عملية الشراء والاشتراك الرمزي عبر سلة؟', 'How does the nominal subscription purchase work via Salla?'),
      a: t('يتم الشراء عبر متجرنا المعتمد في منصة سلة (Salla Store)، حيث تختار الباقة وتدفع بأمان عبر مدى، أبل باي، أو بطاقتك الائتمانية بمبلغ رمزي يبدأ من 9.99 ريال فقط.', 'You purchase through our verified Salla store using Mada, Apple Pay, or credit card for a nominal price starting at just 9.99 SAR.')
    },
    {
      q: t('متى أستلم كود التفعيل بعد الدفع في سلة؟', 'When do I receive the activation code after paying on Salla?'),
      a: t('تصلك رسالة SMS فورية وبريد إلكتروني تلقائياً خلال أقل من 30 ثانية من إتمام الطلب تحتوي على كود التفعيل الرقمي المباشر.', 'You receive an instant SMS and email within 30 seconds of checkout containing your digital activation code.')
    },
    {
      q: t('هل يمكنني تشغيل المنصة على التلفزيون الذكي والجوال معاً؟', 'Can I watch on Smart TV and mobile simultaneously?'),
      a: t('نعم! تدعم باقاتنا شاشات متعددة متزامنة بدقة 4K Ultra HD وتعمل بكفاءة على جميع الشاشات الذكية (سامسونج، إل جي، أندرويد تي في، أبل تي في) وهواتف آيفون وأندرويد.', 'Yes! Our plans support multiple simultaneous 4K screens on Samsung, LG, Android TV, Apple TV, iPhone, and Android.')
    },
    {
      q: t('هل يوجد ضمان للاشتراك؟', 'Is there a warranty on the subscription?'),
      a: t('نعم، جميع الاشتراكات مضمونة 100% طوال مدة الباقة، مع دعم فني مخصص ومباشر عبر واتساب متجرنا في سلة.', 'Yes, all subscriptions come with a 100% uptime warranty backed by dedicated WhatsApp support from our Salla store.')
    }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-fade-in">
      <div className="fixed inset-0" onClick={() => setIsSubscriptionModalOpen(false)} />

      <div className="relative w-full max-w-4xl bg-cinema-card rounded-3xl overflow-hidden shadow-cinema border border-white/10 z-10 my-6">
        
        {/* Close Button */}
        <button
          onClick={() => setIsSubscriptionModalOpen(false)}
          className="absolute top-4 end-4 z-30 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all hover:scale-110"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header Banner */}
        <div className="relative bg-gradient-to-r from-salla via-[#003842] to-cinema-card p-6 sm:p-8 border-b border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1.5 max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-salla-light/20 text-salla-accent border border-salla-light/30 text-xs font-bold">
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>{t('متجر سلة المعتمد • اشتراك رمزي فوري', 'Verified Salla Store • Instant Nominal Subscription')}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                {t('اشترك بريال رمزي وشاهد كل الأفلام والمسلسلات', 'Subscribe for a Nominal Fee & Watch Everything')}
              </h2>

              <p className="text-xs sm:text-sm text-gray-300">
                {t('دفع آمن وسريع عبر متجرنا في سلة (مدى، أبل باي) مع تفعيل فوري وبدقة 4K بدون إعلانات.', 'Secure instant checkout via Salla with immediate digital code activation and zero ads.')}
              </p>
            </div>

            {/* Current Status Pill if Subscribed */}
            {subscription.isSubscribed && (
              <div className="p-3 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs">
                <div className="flex items-center gap-1.5 font-bold mb-1">
                  <ShieldCheck className="w-4 h-4" />
                  <span>{t('اشتراكك نشط حالياً', 'Your Subscription is Active')}</span>
                </div>
                <p className="text-[11px] text-gray-300 font-mono">{subscription.planName}</p>
                <p className="text-[10px] text-gray-400 mt-0.5">{t('ينتهي في:', 'Expires:')} {subscription.expiryDate}</p>
              </div>
            )}
          </div>

          {/* Quick Tabs */}
          <div className="flex items-center gap-2 mt-6 pt-4 border-t border-white/10 text-xs font-bold">
            <button
              onClick={() => setSelectedPlanTab('plans')}
              className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                selectedPlanTab === 'plans'
                  ? 'bg-white text-black shadow-md'
                  : 'bg-white/10 text-gray-300 hover:bg-white/15'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t('باقات موفي هاوس', 'MovieHouse Plans')}</span>
            </button>

            <button
              onClick={() => setSelectedPlanTab('code')}
              className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                selectedPlanTab === 'code'
                  ? 'bg-white text-black shadow-md'
                  : 'bg-white/10 text-gray-300 hover:bg-white/15'
              }`}
            >
              <KeyRound className="w-3.5 h-3.5 text-salla-light" />
              <span>{t('تفعيل كود سلة الرقمي', 'Activate Digital Code')}</span>
            </button>

            <button
              onClick={() => setSelectedPlanTab('how-it-works')}
              className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                selectedPlanTab === 'how-it-works'
                  ? 'bg-white text-black shadow-md'
                  : 'bg-white/10 text-gray-300 hover:bg-white/15'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>{t('كيف يعمل النظام؟', 'How It Works')}</span>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[560px] overflow-y-auto space-y-8">

          {/* TAB 1: PLANS CARDS */}
          {selectedPlanTab === 'plans' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {SALLA_PLANS.map((plan) => (
                  <div
                    key={plan.id}
                    className={`relative rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 ${
                      plan.popular
                        ? 'bg-gradient-to-b from-[#004956]/60 via-cinema-surface to-cinema-card border-2 border-salla-light shadow-glow-salla scale-102'
                        : 'bg-cinema-surface border border-white/10 hover:border-white/20'
                    }`}
                  >
                    {/* Popular Badge */}
                    {plan.badge && (
                      <div className="absolute -top-3 inset-x-0 flex justify-center">
                        <span className={`px-3 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider shadow-md ${
                          plan.popular 
                            ? 'bg-salla-light text-black font-bold' 
                            : 'bg-brand-600 text-white'
                        }`}>
                          {plan.badge[language]}
                        </span>
                      </div>
                    )}

                    <div>
                      <div className="text-center pt-2 pb-4 border-b border-white/10">
                        <h3 className="font-black text-base text-white mb-2">
                          {plan.name[language]}
                        </h3>
                        <div className="flex items-baseline justify-center gap-1">
                          <span className="text-3xl sm:text-4xl font-black text-white">
                            {plan.price}
                          </span>
                          <span className="text-xs font-bold text-gray-400">
                            {t('ريال', 'SAR')} / {plan.period[language]}
                          </span>
                        </div>
                        <div className="flex items-center justify-center gap-2 mt-2 text-[11px] text-gray-300">
                          <span>{plan.screens} {t('شاشات', 'screens')}</span>
                          <span>•</span>
                          <span className="text-salla-accent font-semibold">{plan.quality}</span>
                        </div>
                      </div>

                      {/* Features List */}
                      <ul className="space-y-2.5 my-5 text-xs text-gray-300">
                        {plan.features[language].map((feat, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-2 pt-3 border-t border-white/10">
                      <button
                        onClick={() => handleQuickDemoCode(plan.sallaDemoCode)}
                        className={`w-full py-2.5 px-4 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer ${
                          plan.popular
                            ? 'bg-salla-light hover:bg-salla-accent text-black shadow-glow-salla hover:scale-102'
                            : 'bg-brand-600 hover:bg-brand-700 text-white shadow-glow-red hover:scale-102'
                        }`}
                      >
                        <ShoppingBag className="w-4 h-4" />
                        <span>{t('شراء وتفعيل فوري (تجريبي)', 'Instant Demo Purchase')}</span>
                      </button>

                      <p className="text-[10px] text-center text-gray-400">
                        {t('كود سلة التجريبي:', 'Demo Code:')} <code className="text-amber-400 font-mono font-bold">{plan.sallaDemoCode}</code>
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Instant Code Activation Form under the plans */}
              <div className="p-5 rounded-2xl bg-cinema-surface border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1 text-center sm:text-start">
                  <h4 className="font-bold text-sm text-white flex items-center gap-2 justify-center sm:justify-start">
                    <KeyRound className="w-4 h-4 text-salla-light" />
                    <span>{t('لديك كود تفعيل بالفعل من متجر سلة؟', 'Already have a code from Salla?')}</span>
                  </h4>
                  <p className="text-xs text-gray-400">
                    {t('أدخل رقم الطلب أو كود التفعيل الرقمي لتنشيط حسابك في ثوانٍ.', 'Enter your digital order code to unlock all content instantly.')}
                  </p>
                </div>

                <form onSubmit={handleSubmitCode} className="flex items-center gap-2 w-full sm:w-auto">
                  <input
                    type="text"
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                    placeholder={t('مثال: SALLA-VIP-2024', 'e.g. SALLA-VIP-2024')}
                    className="px-4 py-2 rounded-xl bg-black/50 border border-white/20 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-salla-light uppercase font-mono"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-salla hover:bg-salla-light text-white hover:text-black text-xs font-bold transition-all flex-shrink-0"
                  >
                    {t('تفعيل الآن', 'Activate')}
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* TAB 2: CODE ACTIVATION FORM */}
          {selectedPlanTab === 'code' && (
            <div className="max-w-xl mx-auto space-y-6 text-center py-4">
              <div className="w-16 h-16 rounded-2xl bg-salla-light/20 border border-salla-light/40 flex items-center justify-center mx-auto text-salla-accent shadow-glow-salla">
                <KeyRound className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {t('تفعيل اشتراك متجر سلة', 'Activate Salla Subscription')}
                </h3>
                <p className="text-xs text-gray-400 max-w-md mx-auto">
                  {t('أدخل الكود الذي وصلك عبر رسالة SMS أو إيميل بعد إتمام الشراء في متجر سلة.', 'Enter the digital activation code sent to you via SMS/Email from Salla store.')}
                </p>
              </div>

              <form onSubmit={handleSubmitCode} className="space-y-4">
                <input
                  type="text"
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                  placeholder={t('أدخل كود سلة أو رقم الطلب (مثال: SALLA-VIP-2024)', 'Enter Salla Code or Order ID')}
                  className="w-full px-5 py-3 rounded-2xl bg-black/60 border border-white/20 text-sm text-center font-mono uppercase tracking-widest text-white placeholder-gray-500 focus:outline-none focus:border-salla-light focus:ring-2 focus:ring-salla-light/30"
                />

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-salla to-salla-light hover:opacity-95 text-white font-black text-sm shadow-glow-salla transition-all hover:scale-102"
                >
                  {t('تفعيل فوري وفتح المكتبة كاملة 🎉', 'Instant Activate & Unlock All 4K Movies 🎉')}
                </button>
              </form>

              {/* Demo Sample Quick Codes */}
              <div className="pt-4 border-t border-white/10 text-xs">
                <p className="text-gray-400 mb-2 font-medium">
                  {t('أكواد تجريبية سريعة للتجربة الفورية (اضغط للتفعيل):', 'Demo sample codes (click to activate immediately):')}
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {['SALLA-VIP-2024', 'SALLA-MONTHLY-88', 'SALLA-GOLD-VIP'].map((c) => (
                    <button
                      key={c}
                      onClick={() => handleQuickDemoCode(c)}
                      className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-amber-400 font-mono text-xs font-bold transition-all hover:scale-105"
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: HOW IT WORKS & FAQ */}
          {selectedPlanTab === 'how-it-works' && (
            <div className="space-y-8">
              {/* 3 Step Process Diagram */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-cinema-surface border border-white/10 text-center space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-salla/40 text-salla-accent border border-salla-light/30 flex items-center justify-center mx-auto text-base font-black">
                    1
                  </div>
                  <h4 className="font-bold text-sm text-white">
                    {t('الطلب من متجر سلة', '1. Buy on Salla')}
                  </h4>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    {t('ادخل على متجرنا واختر باقتك المفضلة وادفع بريال رمزي عبر مدى أو أبل باي.', 'Select your desired plan on our Salla store and pay via Mada or Apple Pay.')}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-cinema-surface border border-white/10 text-center space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center mx-auto text-base font-black">
                    2
                  </div>
                  <h4 className="font-bold text-sm text-white">
                    {t('استلام كود التفعيل الرقمي', '2. Receive Digital Code')}
                  </h4>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    {t('يصلك كود فوري في رسالة SMS وواتساب خلال 30 ثانية من إتمام عملية الدفع.', 'Receive instant digital activation code via SMS & WhatsApp within 30 seconds.')}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-cinema-surface border border-white/10 text-center space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto text-base font-black">
                    3
                  </div>
                  <h4 className="font-bold text-sm text-white">
                    {t('المشاهدة فوراً بدون إعلانات', '3. Watch in 4K Ad-Free')}
                  </h4>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    {t('أدخل الكود هنا وافتح المنصة مباشرة على التلفزيون، الكمبيوتر، أو الجوال.', 'Enter the code here and start watching instantly on Smart TV, laptop, or phone.')}
                  </p>
                </div>
              </div>

              {/* FAQ Accordion */}
              <div className="space-y-3">
                <h4 className="font-bold text-sm text-white flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-salla-light" />
                  <span>{t('الأسئلة الشائعة حول اشتراكات سلة', 'Frequently Asked Questions')}</span>
                </h4>

                <div className="space-y-2">
                  {faqs.map((faq, idx) => (
                    <div 
                      key={idx}
                      className="rounded-xl bg-cinema-surface border border-white/5 overflow-hidden transition-all"
                    >
                      <button
                        onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                        className="w-full text-start p-3.5 text-xs font-bold text-gray-200 flex items-center justify-between gap-2 hover:bg-white/5"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown className={`w-4 h-4 transition-transform ${activeFaq === idx ? 'rotate-180' : ''}`} />
                      </button>
                      {activeFaq === idx && (
                        <div className="px-3.5 pb-3.5 text-xs text-gray-400 leading-relaxed border-t border-white/5 pt-2">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer: Trust Badges */}
        <div className="bg-black/50 p-4 px-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-gray-400">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              {t('متجر سلة موثق ومعتمد', 'Verified Salla Merchant')}
            </span>
            <span>•</span>
            <span>{t('دفع آمن 100% (Mada, Apple Pay, Visa, STC Pay)', '100% Secure Checkout')}</span>
          </div>

          {subscription.isSubscribed && (
            <button
              onClick={cancelSubscription}
              className="text-red-400 hover:text-red-300 text-[11px] underline"
            >
              {t('إعادة ضبط الاشتراك التجريبي', 'Reset demo subscription')}
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
