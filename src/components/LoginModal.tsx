import React, { useState } from 'react';
import { X, KeyRound, Mail, Smartphone, ShieldCheck, Check, ShoppingBag } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const LoginModal: React.FC = () => {
  const { 
    isLoginModalOpen, 
    setIsLoginModalOpen, 
    language, 
    t, 
    activateSallaCode, 
    setIsSubscriptionModalOpen,
    showToast 
  } = useApp();

  const [authMethod, setAuthMethod] = useState<'salla' | 'email'>('salla');
  const [sallaCode, setSallaCode] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  if (!isLoginModalOpen) return null;

  const handleSallaLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sallaCode.trim()) {
      showToast(t('الرجاء كتابة كود سلة أو رقم الطلب', 'Please enter your Salla code'));
      return;
    }
    activateSallaCode(sallaCode);
  };

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() && !phone.trim()) {
      showToast(t('الرجاء إدخال البريد الإلكتروني أو رقم الجوال', 'Please enter email or phone'));
      return;
    }
    // Simulate successful login with demo code
    activateSallaCode('SALLA-VIP-2024');
    showToast(t('تم تسجيل الدخول بنجاح عبر كود سلة المرتبط بحسابك!', 'Logged in successfully!'));
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-fade-in">
      <div className="fixed inset-0" onClick={() => setIsLoginModalOpen(false)} />

      <div className="relative w-full max-w-md bg-cinema-card rounded-3xl overflow-hidden shadow-cinema border border-white/10 z-10 my-8">
        {/* Close Button */}
        <button
          onClick={() => setIsLoginModalOpen(false)}
          className="absolute top-4 end-4 z-20 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all hover:scale-110"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="p-6 pb-4 border-b border-white/10 text-center">
          <div className="w-12 h-12 rounded-2xl bg-salla-light/20 border border-salla-light/40 flex items-center justify-center mx-auto mb-3 text-salla-accent shadow-glow-salla">
            <KeyRound className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-black text-white">
            {t('تسجيل الدخول والتفعيل', 'Sign In & Activate')}
          </h3>
          <p className="text-xs text-gray-400 mt-1">
            {t('أدخل كود سلة الرقمي أو حسابك المشترك لمتابعة المشاهدة', 'Enter your digital Salla code or credentials')}
          </p>

          {/* Toggle Tab */}
          <div className="flex rounded-xl bg-cinema-surface p-1 mt-4 border border-white/5 text-xs font-bold">
            <button
              onClick={() => setAuthMethod('salla')}
              className={`flex-1 py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                authMethod === 'salla'
                  ? 'bg-salla text-white shadow-glow-salla'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>{t('كود متجر سلة', 'Salla Order Code')}</span>
            </button>

            <button
              onClick={() => setAuthMethod('email')}
              className={`flex-1 py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                authMethod === 'email'
                  ? 'bg-brand-600 text-white shadow-glow-red'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Mail className="w-3.5 h-3.5" />
              <span>{t('البريد / الجوال', 'Email / Phone')}</span>
            </button>
          </div>
        </div>

        {/* Body Form */}
        <div className="p-6 space-y-4">
          {authMethod === 'salla' ? (
            <form onSubmit={handleSallaLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1.5">
                  {t('رقم الطلب في سلة أو كود التفعيل الرقمي:', 'Salla Order ID or Digital Code:')}
                </label>
                <input
                  type="text"
                  value={sallaCode}
                  onChange={(e) => setSallaCode(e.target.value)}
                  placeholder="SALLA-VIP-2024"
                  className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/20 text-xs font-mono uppercase text-white placeholder-gray-500 focus:outline-none focus:border-salla-light"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-salla to-salla-light text-white font-bold text-xs shadow-glow-salla transition-all hover:scale-102"
              >
                {t('تفعيل الحساب والبدء فوراً', 'Activate & Start Watching')}
              </button>

              {/* One Click Demo helper */}
              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={() => {
                    setSallaCode('SALLA-VIP-2024');
                    activateSallaCode('SALLA-VIP-2024');
                  }}
                  className="text-xs text-amber-400 hover:underline font-semibold"
                >
                  {t('⚡ اضغط هنا للتفعيل التجريبي التلقائي (1-Click Demo)', '⚡ Click here for 1-Click Auto Demo')}
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleEmailLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1.5">
                  {t('البريد الإلكتروني:', 'Email Address:')}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/20 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1.5">
                  {t('أو رقم الجوال (المسجل بسلة):', 'Or Mobile Number (used on Salla):')}
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="05XXXXXXXX"
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/20 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-brand-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-glow-red transition-all hover:scale-102"
              >
                {t('تسجيل الدخول', 'Sign In')}
              </button>
            </form>
          )}

          <div className="pt-3 border-t border-white/10 text-center">
            <p className="text-xs text-gray-400">
              {t('ليس لديك كود أو اشتراك بعد؟', "Don't have a code yet?")}{' '}
              <button
                type="button"
                onClick={() => {
                  setIsLoginModalOpen(false);
                  setIsSubscriptionModalOpen(true);
                }}
                className="text-salla-accent font-bold hover:underline"
              >
                {t('اشترك بمبلغ رمزي عبر سلة', 'Subscribe on Salla for nominal fee')}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
