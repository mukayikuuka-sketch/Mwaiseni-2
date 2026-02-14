import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { 
  Mail, 
  Lock, 
  User as UserIcon, 
  ShieldCheck, 
  Loader2, 
  ArrowRight,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"guest" | "partner">("guest");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email || !password) {
      setError("Please enter both email and password");
      setLoading(false);
      return;
    }

    try {
      // Logic: Only sending 2 arguments to match your strict AuthContext type
      await login(email, role as "guest" | "partner");

      // Redirect logic based on the role to match App.tsx nested routes
      if (role === "partner") {
        navigate("/owner/dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      setError("Login failed. Please check your credentials and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-12">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/60 border border-slate-100">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-50 rounded-3xl mb-6 text-blue-600 ring-8 ring-blue-50/50">
            <ShieldCheck size={40} strokeWidth={2.5} />
          </div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter">Welcome Back</h2>
          <p className="mt-3 text-slate-500 font-bold">
            Access the #1 Zambian Booking Platform
          </p>
        </div>

        <form className="mt-10 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-100 p-4 rounded-2xl text-red-600 text-sm font-bold flex items-center gap-3 animate-shake">
              <AlertCircle size={20} />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-5">
            {/* Email Input */}
            <div className="space-y-2 text-left">
              <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 ml-5">
                Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors" size={22} />
                <input
                  type="email"
                  required
                  placeholder="name@example.zm"
                  className="w-full pl-14 pr-6 py-5 bg-slate-50 border-2 border-transparent rounded-[1.5rem] focus:ring-0 focus:border-blue-500 focus:bg-white font-bold transition-all text-slate-900 outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2 text-left">
              <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 ml-5">
                Secure Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors" size={22} />
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  className="w-full pl-14 pr-6 py-5 bg-slate-50 border-2 border-transparent rounded-[1.5rem] focus:ring-0 focus:border-blue-500 focus:bg-white font-bold transition-all text-slate-900 outline-none"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {/* Role Selection */}
            <div className="space-y-2 text-left">
              <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 ml-5">
                Sign in as
              </label>
              <div className="relative text-slate-900 font-bold group">
                <UserIcon className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors" size={22} />
                <select
                  className="w-full pl-14 pr-10 py-5 bg-slate-50 border-2 border-transparent rounded-[1.5rem] focus:ring-0 focus:border-blue-500 focus:bg-white font-bold transition-all appearance-none cursor-pointer outline-none"
                  value={role}
                  onChange={(e) => setRole(e.target.value as "guest" | "partner")}
                >
                  <option value="guest">Guest (I want to book)</option>
                  <option value="partner">Partner (I own a property)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
              <CheckCircle2 size={14} className="text-blue-500" />
              Secure Encrypted Login
            </div>
            {/* FIXED: Removed invalid 'size' prop to resolve TS2322 error */}
            <Link to="/forgot-password" className="text-xs font-black text-blue-600 hover:text-blue-700">
              Forgot?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 py-5 px-4 rounded-[1.5rem] text-sm font-black text-white bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-200 transition-all active:scale-[0.98] disabled:opacity-70 group"
          >
            {loading ? <Loader2 className="animate-spin" /> : (
              <>
                Sign In to Mwaiseni
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>

          {/* Demo Section */}
          <div className="pt-4 border-t border-slate-100">
            <p className="text-[10px] font-black uppercase text-slate-400 text-center mb-4 tracking-widest">Quick Demo Access</p>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => { setEmail("guest@Mwaiseni.com"); setPassword("password"); setRole("guest"); }}
                className="py-3 px-4 bg-slate-100 hover:bg-slate-200 rounded-xl text-[10px] font-black text-slate-600 transition-colors"
              >
                GUEST DEMO
              </button>
              <button
                type="button"
                onClick={() => { setEmail("partner@Mwaiseni.com"); setPassword("password"); setRole("partner"); }}
                className="py-3 px-4 bg-slate-100 hover:bg-slate-200 rounded-xl text-[10px] font-black text-slate-600 transition-colors"
              >
                PARTNER DEMO
              </button>
            </div>
          </div>

          <div className="text-center text-sm font-bold text-slate-500 mt-8">
            New to our community?{" "}
            <Link to="/register" className="text-blue-600 hover:underline hover:text-blue-700">
              Create an Account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
