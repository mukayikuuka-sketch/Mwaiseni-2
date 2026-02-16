import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  ShieldCheck, Zap, Globe, Coins, 
  CheckCircle, MessageSquare, Star, Users 
} from "lucide-react";

const PartnerLandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      
      {/* 1. TOP NAV */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-slate-100 sticky top-0 bg-white z-50">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/partner-login')}>
          <div className="bg-[#003580] text-white w-8 h-8 flex items-center justify-center rounded font-black">Z</div>
          <span className="font-black text-xl text-[#003580]">Mwaiseni</span>
        </div>
        <div className="flex gap-4 items-center">
          {/* FIXED: Changed /partner/login to /partner-login */}
          <Link to="/partner-login" className="text-sm font-bold text-[#003580] hover:underline">Sign in</Link>
          {/* FIXED: Changed /partner/signup to /partner-signup */}
          <Link to="/partner-signup" className="bg-[#003580] text-white px-4 py-2 rounded-md font-bold text-sm">Register for free</Link>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <div className="bg-[#003580] text-white py-16 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
              List your apartment, hotel, or lodge on Mwaiseni
            </h1>
            <p className="text-lg text-blue-100 mb-8">
              Join Zambia's first dedicated travel platform to earn more, faster, and reach local and international guests.
            </p>
            <div className="space-y-3 mb-8 text-sm font-medium">
              <div className="flex items-center gap-2"><CheckCircle size={18} className="text-green-400" /> 45% of hosts get their first booking within a week</div>
              <div className="flex items-center gap-2"><CheckCircle size={18} className="text-green-400" /> We facilitate local payments (Mobile Money & Bank)</div>
              <div className="flex items-center gap-2"><CheckCircle size={18} className="text-green-400" /> Choose instant bookings or Request to Book</div>
            </div>
          </div>

          {/* SIGN IN / REGISTER BOX */}
          <div className="bg-white p-8 rounded-xl shadow-2xl text-slate-900">
            <h3 className="text-2xl font-black mb-4">Register for free</h3>
            <p className="text-slate-500 text-sm mb-6 font-medium">Start welcoming guests today!</p>
            {/* FIXED: Changed to /partner-signup */}
            <Link to="/partner-signup" className="block w-full bg-blue-600 text-white text-center py-4 rounded-lg font-black text-lg hover:bg-blue-700 transition mb-4">
              Get started now
            </Link>
            <div className="border-t pt-4">
              <p className="text-xs text-slate-400 font-bold mb-2">ALREADY STARTED REGISTRATION?</p>
              {/* FIXED: Changed to /partner-login */}
              <Link to="/partner-login" className="text-blue-600 font-bold hover:underline">Continue your registration ?</Link>
            </div>
          </div>
        </div>
      </div>

      {/* 3. TRUST & PROTECTION SECTION */}
      <div className="max-w-6xl mx-auto py-20 px-6">
        <h2 className="text-3xl font-black mb-12">Host worry-free. We�ve got your back.</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="text-blue-600 mb-4"><ShieldCheck size={32} /></div>
            <h4 className="font-black text-lg mb-2">Stay Protected</h4>
            <p className="text-slate-500 text-sm leading-relaxed font-medium">Liability protection against claims from guests at no extra cost to you.</p>
          </div>
          <div>
            <div className="text-blue-600 mb-4"><MessageSquare size={32} /></div>
            <h4 className="font-black text-lg mb-2">Your rules, your home</h4>
            <p className="text-slate-500 text-sm leading-relaxed font-medium">Set house rules and communicate with guests before they arrive.</p>
          </div>
          <div>
            <div className="text-blue-600 mb-4"><Users size={32} /></div>
            <h4 className="font-black text-lg mb-2">Verified Guests</h4>
            <p className="text-slate-500 text-sm leading-relaxed font-medium">We verify guest identities so you know exactly who is staying at your property.</p>
          </div>
        </div>
      </div>

      {/* 4. PAYMENTS SECTION (Specific to Zambia) */}
      <div className="bg-slate-50 py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-black mb-4">Take control of your finances</h2>
          <p className="text-slate-500 mb-12 font-medium">Payments made easy for Zambian property owners.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl border border-slate-200">
              <h4 className="font-black mb-2 flex items-center gap-2"><Coins className="text-blue-600" size={20}/> Local Payouts</h4>
              <p className="text-sm text-slate-500 font-medium">Get paid via Airtel, MTN, or any Zambian Bank 24 hours after guest checkout.</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200">
              <h4 className="font-black mb-2 flex items-center gap-2"><Zap className="text-blue-600" size={20}/> Reduced Risk</h4>
              <p className="text-sm text-slate-500 font-medium">We handle fraud checks and regulatory compliance so your cash flow is secure.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 5. STATS STRIP */}
      <div className="py-20 text-center max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-black mb-12">Reach a unique global customer base</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <p className="text-5xl font-black text-blue-600 mb-2">1 in 3</p>
            <p className="text-slate-500 font-bold uppercase text-xs tracking-widest">Nights are vacation rentals</p>
          </div>
          <div>
            <p className="text-5xl font-black text-blue-600 mb-2">48%</p>
            <p className="text-slate-500 font-bold uppercase text-xs tracking-widest">Of bookings are international</p>
          </div>
          <div>
            <p className="text-5xl font-black text-blue-600 mb-2">24/7</p>
            <p className="text-slate-500 font-bold uppercase text-xs tracking-widest">Local Zambian Support</p>
          </div>
        </div>
      </div>

      {/* 6. FINAL CTA */}
      <div className="bg-white border-t border-slate-200 py-20 text-center">
        <h2 className="text-4xl font-black mb-6">Start welcoming guests today!</h2>
        {/* FIXED: Changed to /partner-signup */}
        <Link to="/partner-signup" className="bg-[#003580] text-white px-12 py-4 rounded-lg font-black text-xl hover:bg-blue-900 transition shadow-xl">
          Register for free
        </Link>
      </div>

    </div>
  );
};

export default PartnerLandingPage;



