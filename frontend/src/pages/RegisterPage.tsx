import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  User,
  Mail,
  Lock,
  ShieldCheck,
  Loader2,
  ArrowRight,
  AlertCircle,
} from "lucide-react";

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      await register(email, password, "guest", { name });
      navigate("/dashboard");
    } catch {
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-12">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/60 border border-slate-100">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-50 rounded-3xl mb-6 text-blue-600 ring-8 ring-blue-50/50">
            <ShieldCheck size={40} strokeWidth={2.5} />
          </div>

          <h2 className="text-4xl font-black text-slate-900 tracking-tighter">
            Create Account
          </h2>

          <p className="mt-3 text-slate-500 font-bold">
            Join Mwaiseni and start booking in minutes
          </p>
        </div>

        {/* Form */}
        <form className="mt-10 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-100 p-4 rounded-2xl text-red-600 text-sm font-bold flex items-center gap-3">
              <AlertCircle size={20} />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-5">
            {/* Name */}
            <div className="space-y-2 text-left">
              <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 ml-5">
                Full Name
              </label>

              <div className="relative group">
                <User
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors"
                  size={22}
                />
                <input
                  type="text"
                  required
                  placeholder="Your name"
                  className="w-full pl-14 pr-6 py-5 bg-slate-50 border-2 border-transparent rounded-[1.5rem] focus:ring-0 focus:border-blue-500 focus:bg-white font-bold transition-all text-slate-900 outline-none"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2 text-left">
              <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 ml-5">
                Email Address
              </label>

              <div className="relative group">
                <Mail
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors"
                  size={22}
                />
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  className="w-full pl-14 pr-6 py-5 bg-slate-50 border-2 border-transparent rounded-[1.5rem] focus:ring-0 focus:border-blue-500 focus:bg-white font-bold transition-all text-slate-900 outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2 text-left">
              <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 ml-5">
                Password
              </label>

              <div className="relative group">
                <Lock
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors"
                  size={22}
                />
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

            {/* Confirm */}
            <div className="space-y-2 text-left">
              <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 ml-5">
                Confirm Password
              </label>

              <input
                type="password"
                required
                placeholder="••••••••••••"
                className="w-full px-6 py-5 bg-slate-50 border-2 border-transparent rounded-[1.5rem] focus:ring-0 focus:border-blue-500 focus:bg-white font-bold transition-all text-slate-900 outline-none"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 py-5 px-4 rounded-[1.5rem] text-sm font-black text-white glass-button shadow-xl shadow-blue-200 transition-all active:scale-[0.98] disabled:opacity-70 group"
          >
            {loading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <>
                Create Account
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </>
            )}
          </button>

          {/* Switch */}
          <div className="text-center text-sm font-bold text-slate-500 mt-8">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 hover:underline hover:text-blue-700"
            >
              Sign In
            </Link>
          </div>

          {/* Partner Link */}
          <div className="text-center text-xs font-bold text-slate-400">
            Want to list a property?{" "}
            <Link
              to="/partner-register"
              className="text-blue-600 hover:underline"
            >
              Partner registration
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
