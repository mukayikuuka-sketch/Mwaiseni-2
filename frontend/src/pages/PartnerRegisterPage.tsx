import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Building, Phone, Mail, Lock, ShieldCheck, Loader2, ArrowRight } from 'lucide-react';

const PartnerRegisterPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      // Logic confirmed: hits your AuthContext simulation correctly
      await register(email, password, 'partner', {
        businessName,
        phone
      });
      
      // Navigate to the correct nested route from your App.tsx
      navigate('/owner/dashboard');
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="text-4xl font-black text-blue-600 tracking-tighter">
          Mwaiseni<span className="text-slate-900">.</span>
        </Link>
        <h2 className="mt-6 text-2xl font-black text-slate-900 tracking-tight">Partner Registration</h2>
        <p className="mt-2 text-sm text-slate-500 font-bold">
          List your Zambian lodge or apartment in minutes
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl shadow-slate-200/50 rounded-[2.5rem] sm:px-10 border border-slate-100">
          {error && (
            <div className="mb-6 bg-red-50 border border-red-100 p-4 rounded-xl text-red-600 text-sm font-bold flex items-center gap-2">
              <span>⚠️</span> {error}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Business Name */}
            <div className="space-y-1 text-left">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Business / Property Name</label>
              <div className="relative">
                <Building className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <input
                  required
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full pl-12 pr-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 font-bold transition text-slate-900"
                  placeholder="e.g., Mosi-oa-Tunya Lodge"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1 text-left">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Contact Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 font-bold transition text-slate-900"
                  placeholder="owner@example.com"
                />
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-1 text-left">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">WhatsApp / Phone</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <input
                  required
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-12 pr-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 font-bold transition text-slate-900"
                  placeholder="+260..."
                />
              </div>
            </div>

            {/* Password Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1 text-left">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                  <input
                    required
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 font-bold transition text-slate-900"
                    placeholder="••••••••"
                  />
                </div>
              </div>
              <div className="space-y-1 text-left">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Confirm</label>
                <input
                  required
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 font-bold transition text-slate-900"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-3 px-2 py-2">
              <ShieldCheck className="text-blue-600 mt-1 shrink-0" size={16} />
              <p className="text-xs text-slate-500 font-medium text-left leading-relaxed">
                By registering, you agree to comply with Zambian Tourism Agency (ZTA) regulations and our Partner Terms.
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-5 px-4 border border-transparent rounded-2xl shadow-xl text-sm font-black text-white glass-button transition active:scale-95 disabled:opacity-70 group"
            >
              {loading ? <Loader2 className="animate-spin" /> : (
                <>
                  Start Hosting in Zambia
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-50 text-center">
            <p className="text-sm text-slate-500 font-bold">
              Looking for a place to stay?{' '}
              <Link to="/register" className="text-blue-600 hover:underline">
                Sign up as a Guest
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerRegisterPage;

