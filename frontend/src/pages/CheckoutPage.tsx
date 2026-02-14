import React, { useMemo, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  CreditCard,
  Lock,
  Info,
  Smartphone,
  CheckCircle2,
  ChevronLeft,
  Star,
  X,
  BadgeCheck,
  Tag,
  Mail,
  User,
  AlertTriangle,
  Loader2,
} from 'lucide-react';

type PaymentMethod = 'card' | 'momo';
type MomoProvider = 'mtn' | 'airtel';

const CheckoutPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  // State passed from Property Details
  const { propertyName, roomName, price, img } = location.state || {};

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('momo');
  const [momoProvider, setMomoProvider] = useState<MomoProvider>('mtn');

  // Guest details (required)
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');

  // MoMo
  const [phoneNumber, setPhoneNumber] = useState('');

  // Promo
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);

  // Terms
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  // Payment UI state
  const [isPaying, setIsPaying] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Calculations (frontend demo)
  const nights = 3;
  const serviceFee = 290;

  const basePrice = (price || 1850) * nights;

  // Promo logic (simple demo)
  const promoDiscount = useMemo(() => {
    if (!appliedPromo) return 0;

    // You can replace this with backend logic later
    if (appliedPromo === 'Mwaiseni10') return Math.round(basePrice * 0.1);
    if (appliedPromo === 'WELCOME200') return 200;
    return 0;
  }, [appliedPromo, basePrice]);

  const total = Math.max(0, basePrice + serviceFee - promoDiscount);

  // ---------------------------
  // Validation helpers
  // ---------------------------
  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  };

  // Zambia common formats:
  // 097xxxxxxx / 077xxxxxxx / 076xxxxxxx / 095xxxxxxx / 096xxxxxxx
  const normalizeZambiaPhone = (input: string) => {
    // Keep digits only
    const digits = input.replace(/\D/g, '');

    // If user typed 26097...
    if (digits.startsWith('260') && digits.length >= 12) return `0${digits.slice(3, 12)}`;

    // If user typed 097...
    if (digits.startsWith('0') && digits.length >= 10) return digits.slice(0, 10);

    // If user typed 97...
    if (!digits.startsWith('0') && digits.length >= 9) return `0${digits.slice(0, 9)}`;

    return digits;
  };

  const phoneNormalized = useMemo(() => normalizeZambiaPhone(phoneNumber), [phoneNumber]);

  const isValidZambiaPhone = useMemo(() => {
    if (phoneNormalized.length !== 10) return false;
    if (!phoneNormalized.startsWith('0')) return false;

    // Basic mobile prefixes
    const prefix = phoneNormalized.slice(0, 3);
    const allowed = ['097', '077', '076', '095', '096'];
    return allowed.includes(prefix);
  }, [phoneNormalized]);

  const guestValid = guestName.trim().length >= 2 && isValidEmail(guestEmail);

  const paymentValid = useMemo(() => {
    if (!acceptedTerms) return false;
    if (!guestValid) return false;

    if (paymentMethod === 'momo') return isValidZambiaPhone;
    if (paymentMethod === 'card') return true; // Stripe Elements will validate later
    return false;
  }, [acceptedTerms, guestValid, paymentMethod, isValidZambiaPhone]);

  const applyPromo = () => {
    const code = promoCode.trim().toUpperCase();

    if (!code) return;

    if (code === 'Mwaiseni10' || code === 'WELCOME200') {
      setAppliedPromo(code);
    } else {
      alert('Invalid promo code (demo). Try: Mwaiseni10 or WELCOME200');
      setAppliedPromo(null);
    }
  };

  const removePromo = () => {
    setAppliedPromo(null);
    setPromoCode('');
  };

  const handlePay = async () => {
    if (!paymentValid) return;

    setIsPaying(true);

    // Frontend demo: simulate payment
    await new Promise((res) => setTimeout(res, 1400));

    setIsPaying(false);
    setPaymentSuccess(true);

    // Auto redirect to My Trips
    setTimeout(() => {
      navigate('/my-trips', {
        state: {
          justBooked: true,
          propertyName: propertyName || 'Zambezi River Lodge',
        },
      });
    }, 1200);
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20 selection:bg-blue-100">
      {/* 1. TOP NAVIGATION */}
      <div className="bg-white border-b border-slate-200 py-4 mb-8">
        <div className="max-w-5xl mx-auto px-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-blue-600 transition"
          >
            <ChevronLeft size={16} /> Back to property
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* LEFT COLUMN: PAYMENT FLOW */}
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-black text-slate-900 mb-2 tracking-tight">
              Confirm and pay
            </h1>
            <p className="text-slate-500 font-medium">Secure local and international payments</p>
          </div>

          {/* TRUST STRIP */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-white border border-slate-100 rounded-2xl p-4 flex items-center gap-3">
              <BadgeCheck size={20} className="text-emerald-600" />
              <p className="text-xs font-black text-slate-800">Verified stays</p>
            </div>
            <div className="bg-white border border-slate-100 rounded-2xl p-4 flex items-center gap-3">
              <ShieldCheck size={20} className="text-blue-600" />
              <p className="text-xs font-black text-slate-800">Secure checkout</p>
            </div>
            <div className="bg-white border border-slate-100 rounded-2xl p-4 flex items-center gap-3">
              <CheckCircle2 size={20} className="text-slate-700" />
              <p className="text-xs font-black text-slate-800">Instant confirmation</p>
            </div>
          </div>

          {/* GUEST DETAILS */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-200/60 space-y-6">
            <div>
              <h2 className="text-xl font-black text-slate-900">Guest details</h2>
              <p className="text-slate-500 font-medium text-sm mt-1">
                This is who the booking will be under.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">
                  Full name
                </label>
                <div className="relative">
                  <input
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="e.g. Kuuka Mukayi"
                    className="w-full p-4 pl-12 bg-slate-50 border-2 border-slate-100 rounded-2xl font-bold focus:border-blue-500 focus:bg-white outline-none transition"
                  />
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300">
                    <User size={18} />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">
                  Email address
                </label>
                <div className="relative">
                  <input
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full p-4 pl-12 bg-slate-50 border-2 border-slate-100 rounded-2xl font-bold focus:border-blue-500 focus:bg-white outline-none transition"
                  />
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300">
                    <Mail size={18} />
                  </div>
                </div>
              </div>
            </div>

            {!guestValid && (guestName.length > 0 || guestEmail.length > 0) && (
              <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-2xl border border-orange-100">
                <AlertTriangle size={18} className="text-orange-600 mt-0.5" />
                <p className="text-xs font-bold text-orange-800">
                  Please enter a valid full name and email address.
                </p>
              </div>
            )}
          </div>

          {/* PAYMENT METHOD SELECTOR */}
          <div className="space-y-4">
            <h2 className="text-xl font-black flex items-center gap-2 text-slate-800">
              Choose how to pay
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setPaymentMethod('momo')}
                className={`p-5 rounded-2xl border-2 transition-all flex flex-col gap-3 text-left ${
                  paymentMethod === 'momo'
                    ? 'border-blue-600 bg-blue-50/50 ring-4 ring-blue-50'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <Smartphone
                  className={paymentMethod === 'momo' ? 'text-blue-600' : 'text-slate-400'}
                />
                <span
                  className={`font-black text-sm ${
                    paymentMethod === 'momo' ? 'text-blue-900' : 'text-slate-600'
                  }`}
                >
                  Mobile Money
                </span>
              </button>

              <button
                onClick={() => setPaymentMethod('card')}
                className={`p-5 rounded-2xl border-2 transition-all flex flex-col gap-3 text-left ${
                  paymentMethod === 'card'
                    ? 'border-blue-600 bg-blue-50/50 ring-4 ring-blue-50'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <CreditCard
                  className={paymentMethod === 'card' ? 'text-blue-600' : 'text-slate-400'}
                />
                <span
                  className={`font-black text-sm ${
                    paymentMethod === 'card' ? 'text-blue-900' : 'text-slate-600'
                  }`}
                >
                  Card / Google Pay
                </span>
              </button>
            </div>
          </div>

          {/* DYNAMIC PAYMENT DETAILS FORM */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/60 border border-slate-100">
            {paymentMethod === 'momo' ? (
              <div className="space-y-6 animate-in slide-in-from-bottom-2 duration-500">
                <div className="flex gap-4">
                  <button
                    onClick={() => setMomoProvider('mtn')}
                    className={`flex-1 p-4 rounded-2xl border-2 transition flex items-center justify-center gap-3 ${
                      momoProvider === 'mtn'
                        ? 'border-yellow-400 bg-yellow-50 text-yellow-700'
                        : 'border-slate-100 opacity-50 hover:opacity-80'
                    }`}
                  >
                    <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center font-black text-[9px] text-white">
                      MTN
                    </div>
                    <span className="font-black text-sm text-slate-800">MTN MoMo</span>
                  </button>

                  <button
                    onClick={() => setMomoProvider('airtel')}
                    className={`flex-1 p-4 rounded-2xl border-2 transition flex items-center justify-center gap-3 ${
                      momoProvider === 'airtel'
                        ? 'border-red-500 bg-red-50 text-red-700'
                        : 'border-slate-100 opacity-50 hover:opacity-80'
                    }`}
                  >
                    <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center font-black text-[9px] text-white">
                      Airtel
                    </div>
                    <span className="font-black text-sm text-slate-800">Airtel Money</span>
                  </button>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">
                    Zambian Phone Number
                  </label>

                  <div className="relative">
                    <input
                      type="tel"
                      placeholder="0970 000 000"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className={`w-full p-4 bg-slate-50 border-2 rounded-2xl font-bold outline-none transition ${
                        phoneNumber.length === 0
                          ? 'border-slate-100 focus:border-blue-500 focus:bg-white'
                          : isValidZambiaPhone
                          ? 'border-emerald-200 focus:border-emerald-400 bg-emerald-50/40'
                          : 'border-orange-200 focus:border-orange-400 bg-orange-50/40'
                      }`}
                    />

                    <div
                      className={`absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full shadow-lg ${
                        phoneNumber.length === 0
                          ? 'bg-slate-200 text-white'
                          : isValidZambiaPhone
                          ? 'bg-emerald-600 text-white'
                          : 'bg-orange-500 text-white'
                      }`}
                    >
                      <CheckCircle2 size={16} />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-[10px] text-slate-500 font-medium ml-1">
                      You’ll receive a PIN prompt to authorize payment.
                    </p>
                    {phoneNumber.length > 0 && (
                      <p className="text-[10px] font-black text-slate-400">
                        {phoneNormalized || ''}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="animate-in slide-in-from-bottom-2 duration-500">
                <div className="p-12 border-2 border-dashed border-slate-100 rounded-[2rem] flex flex-col items-center justify-center text-slate-400 bg-slate-50/50">
                  <Lock size={40} className="mb-4 opacity-20" />
                  <p className="text-sm font-bold uppercase tracking-widest">Stripe Gateway</p>
                  <p className="text-xs mt-1">Stripe Elements will load here</p>
                </div>
              </div>
            )}

            <div className="mt-8 pt-8 border-t border-slate-50 space-y-4">
              <div className="flex items-center gap-3 p-4 bg-emerald-50 rounded-2xl text-emerald-800 text-xs font-bold border border-emerald-100">
                <ShieldCheck size={20} className="text-emerald-600" />
                <p>Protected by Mwaiseni Trust™ Guarantee</p>
              </div>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="mt-1 w-5 h-5 rounded border-slate-300"
                />
                <p className="text-xs text-slate-600 font-bold leading-relaxed">
                  I agree to Mwaiseni’s Terms, Privacy Policy, and the property’s house rules.
                </p>
              </label>

              {!acceptedTerms && (
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">
                  Required to continue
                </p>
              )}
            </div>
          </div>

          {/* PAY BUTTON */}
          <button
            onClick={handlePay}
            disabled={!paymentValid || isPaying}
            className={`w-full py-5 rounded-[2rem] font-black text-xl transition-all shadow-xl active:scale-[0.98] transform flex items-center justify-center gap-3 ${
              paymentValid && !isPaying
                ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-200'
                : 'bg-slate-200 text-slate-400 shadow-slate-100 cursor-not-allowed'
            }`}
          >
            {isPaying ? (
              <>
                <Loader2 size={22} className="animate-spin" />
                Processing...
              </>
            ) : (
              <>Pay K{total.toLocaleString()}</>
            )}
          </button>

          {/* DEV NOTE */}
          <p className="text-[10px] text-slate-400 font-bold">
            Booking ID: {id || 'N/A'} · Payment method: {paymentMethod.toUpperCase()}
          </p>
        </div>

        {/* RIGHT COLUMN: TRIP PREVIEW */}
        <div className="lg:sticky lg:top-8 h-fit space-y-6">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-200/60 space-y-6">
            <div className="flex gap-5 pb-6 border-b border-slate-100">
              <div className="w-28 h-28 rounded-3xl bg-slate-100 overflow-hidden flex-shrink-0 shadow-inner">
                <img
                  src={
                    img ||
                    'https://images.unsplash.com/photo-1544124499-58912cbddada?w=300'
                  }
                  className="w-full h-full object-cover"
                  alt="Property"
                />
              </div>

              <div className="flex flex-col justify-center">
                <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">
                  Stay Details
                </p>
                <h3 className="font-black text-slate-900 text-lg leading-tight">
                  {propertyName || 'Zambezi River Lodge'}
                </h3>
                <p className="text-sm text-slate-500 font-bold mt-1">
                  {roomName || 'Executive River Suite'}
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <Star size={12} fill="currentColor" className="text-amber-500" />
                  <span className="text-xs font-black">4.9 (128 reviews)</span>
                </div>
              </div>
            </div>

            {/* PROMO */}
            <div className="bg-slate-50 rounded-3xl border border-slate-100 p-5 space-y-3">
              <div className="flex items-center gap-2">
                <Tag size={16} className="text-blue-600" />
                <p className="font-black text-slate-900 text-sm">Promo code</p>
              </div>

              {appliedPromo ? (
                <div className="flex items-center justify-between bg-white border border-slate-100 rounded-2xl px-4 py-3">
                  <div>
                    <p className="text-xs font-black text-slate-900">{appliedPromo}</p>
                    <p className="text-[10px] text-slate-400 font-bold">
                      Discount applied
                    </p>
                  </div>
                  <button
                    onClick={removePromo}
                    className="p-2 rounded-xl hover:bg-slate-50 transition text-slate-500"
                  >
                    <X size={18} />
                  </button>
                </div>
              ) : (
                <div className="flex gap-3">
                  <input
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="e.g. Mwaiseni10"
                    className="flex-1 p-4 bg-white border-2 border-slate-100 rounded-2xl font-bold focus:border-blue-500 outline-none transition"
                  />
                  <button
                    onClick={applyPromo}
                    className="px-5 rounded-2xl bg-slate-900 text-white font-black text-sm hover:bg-slate-800 transition"
                  >
                    Apply
                  </button>
                </div>
              )}

              <p className="text-[10px] text-slate-500 font-bold">
                Demo codes: <span className="font-black">Mwaiseni10</span> or{' '}
                <span className="font-black">WELCOME200</span>
              </p>
            </div>

            {/* PRICE BREAKDOWN */}
            <div className="space-y-4">
              <h4 className="font-black text-slate-900 uppercase text-xs tracking-widest">
                Price Breakdown
              </h4>

              <div className="flex justify-between text-slate-600 font-bold text-sm">
                <span>K{(price || 1850).toLocaleString()} x {nights} nights</span>
                <span className="text-slate-900 font-mono">
                  K{basePrice.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between text-slate-600 font-bold text-sm">
                <span>Service Fee</span>
                <span className="text-slate-900 font-mono">K{serviceFee}</span>
              </div>

              {promoDiscount > 0 && (
                <div className="flex justify-between text-emerald-700 font-black text-sm">
                  <span>Promo discount</span>
                  <span className="font-mono">-K{promoDiscount.toLocaleString()}</span>
                </div>
              )}

              <div className="flex justify-between pt-6 border-t border-slate-100">
                <span className="font-black text-slate-900 text-xl tracking-tight">
                  Total (ZMW)
                </span>
                <span className="font-black text-2xl text-blue-600 font-mono">
                  K{total.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="p-5 bg-slate-50 rounded-3xl flex gap-3 items-start border border-slate-100">
              <Info size={18} className="text-slate-400 mt-0.5 flex-shrink-0" />
              <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                Your booking is subject to the property's house rules. Prices include VAT and
                tourism levies. Payment will be processed in <b>Kwacha (ZMW)</b>.
              </p>
            </div>
          </div>

          {/* SECURITY CARD */}
          <div className="bg-white border border-slate-200/60 rounded-[2.5rem] p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <Lock size={18} className="text-slate-500" />
              <p className="font-black text-slate-900">Secure checkout</p>
            </div>
            <p className="mt-2 text-sm text-slate-500 font-bold leading-relaxed">
              Your payment details are encrypted. Mwaiseni never stores your card PIN or MoMo PIN.
            </p>
          </div>
        </div>
      </div>

      {/* SUCCESS MODAL */}
      {paymentSuccess && (
        <div className="fixed inset-0 z-[200] bg-slate-900/40 backdrop-blur-sm flex items-end md:items-center justify-center p-4">
          <div className="w-full max-w-xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-7 border-b border-slate-100 flex items-start justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600">
                  Payment successful
                </p>
                <h3 className="text-2xl font-black text-slate-900 mt-1">
                  Booking confirmed 🎉
                </h3>
                <p className="text-sm text-slate-500 font-bold mt-2">
                  You’ll be redirected to My Trips.
                </p>
              </div>

              <button
                onClick={() => setPaymentSuccess(false)}
                className="p-3 rounded-2xl hover:bg-slate-50 transition text-slate-500"
              >
                <X size={22} />
              </button>
            </div>

            <div className="p-7 space-y-5">
              <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5 flex gap-4 items-start">
                <CheckCircle2 size={22} className="text-emerald-600 mt-0.5" />
                <div>
                  <p className="font-black text-slate-900">
                    {propertyName || 'Zambezi River Lodge'}
                  </p>
                  <p className="text-sm text-slate-600 font-bold mt-1">
                    Total paid: <span className="text-emerald-700">K{total.toLocaleString()}</span>
                  </p>
                </div>
              </div>

              <button
                onClick={() => navigate('/my-trips')}
                className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black hover:bg-blue-700 transition"
              >
                Go to My Trips
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;

