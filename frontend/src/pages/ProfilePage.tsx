import React from "react";
import { useAuth } from "../context/AuthContext";
import { 
  User as UserIcon, Mail, Shield, CreditCard, Bell, 
  LifeBuoy, LogOut, ChevronRight, 
  CheckCircle2, Wallet, MapPin, Star, Eye
} from "lucide-react";
import { Link } from "react-router-dom";

// --- 1. THE FIX FOR YOUR TYPESCRIPT ERROR ---
// This tells TypeScript exactly what to expect from the user object on this page
interface ExtendedUser {
  id?: string;
  email?: string;
  name?: string;
  role?: string;
}

const ProfilePage: React.FC = () => {
  const { user: authUser, logout } = useAuth();
  
  // Cast the user to our ExtendedUser type to stop the "Property name does not exist" errors
  const user = authUser as ExtendedUser | null;

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center bg-white p-10 rounded-3xl shadow-xl border border-slate-100">
          <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <UserIcon size={40} />
          </div>
          <h2 className="text-2xl font-black text-slate-900 mb-2">Sign in to your account</h2>
          <p className="text-slate-500 mb-8">Access your bookings, favorites, and profile settings.</p>
          <Link to="/login" className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition">Login Now</Link>
        </div>
      </div>
    );
  }

  const menuSections = [
    {
      title: "Account Settings",
      items: [
        { icon: <UserIcon size={20}/>, label: "Personal Info", desc: "Name, ID, and contact details", link: "/profile/edit" },
        { icon: <Shield size={20}/>, label: "Login & Security", desc: "Update password and secure", link: "/profile/security" },
        { icon: <CreditCard size={20}/>, label: "Payments", desc: "Saved cards and billing history", link: "/profile/payments" },
      ]
    },
    {
      title: "Hosting & Activity",
      items: [
        { icon: <Wallet size={20}/>, label: "Mwaiseni Wallet", desc: "K0.00 available in credits", link: "/wallet" },
        { icon: <Star size={20}/>, label: "My Reviews", desc: "Manage reviews you've written", link: "/reviews" },
        { icon: <Eye size={20}/>, label: "Privacy & Data", desc: "Manage your data visibility", link: "/privacy" },
      ]
    },
    {
      title: "Support",
      items: [
        { icon: <LifeBuoy size={20}/>, label: "Get Help", desc: "Contact support or visit Help Center", link: "/support" },
        { icon: <Bell size={20}/>, label: "Notifications", desc: "Choose how we contact you", link: "/notifications" },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* 2. TOP PROFILE HEADER */}
      <div className="bg-white border-b border-slate-200 pt-12 pb-8">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 bg-blue-900 rounded-full flex items-center justify-center text-white text-3xl font-black shadow-xl">
                {user.name?.charAt(0).toUpperCase() || "U"}
              </div>
              <div className="absolute -bottom-1 -right-1 bg-green-500 border-4 border-white w-8 h-8 rounded-full flex items-center justify-center">
                 <CheckCircle2 size={16} className="text-white" />
              </div>
            </div>
            
            <div className="text-center md:text-left flex-1">
              <h1 className="text-3xl font-black text-slate-900 leading-tight">
                {user.name || "Valued Guest"}
              </h1>
              <p className="text-slate-500 font-medium">{user.email}</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-3">
                 <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                   {user.role || "Guest"} Account
                 </span>
                 <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
                   <MapPin size={10}/> Zambia
                 </span>
              </div>
            </div>

            <div className="flex gap-3">
               <Link to="/profile/edit" className="border-2 border-slate-200 px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-slate-50 transition">Edit Profile</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 mt-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          
          {/* 3. LEFT: ZAMGENIUS STATUS CARD */}
          <div className="md:col-span-1 space-y-6">
            <div className="bg-blue-900 rounded-3xl p-6 text-white shadow-xl shadow-blue-200">
               <h3 className="font-bold text-lg mb-4">ZamGenius Tier</h3>
               <p className="text-blue-200 text-xs mb-6">You're at Level 1. Complete 2 more stays in Zambia to unlock Level 2 discounts!</p>
               <div className="w-full bg-blue-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-400 h-full w-1/3 rounded-full"></div>
               </div>
               <p className="text-[10px] mt-2 font-bold opacity-70 italic text-right">33% to next level</p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <h4 className="font-black text-slate-900 mb-2">Verified Account</h4>
              <p className="text-xs text-slate-500 mb-4 italic">Verification builds trust with Zambian hosts.</p>
              <button className="w-full py-2 bg-slate-900 text-white rounded-lg text-xs font-bold">Manage Settings</button>
            </div>
          </div>

          {/* 4. RIGHT: COMMAND CENTER TILES */}
          <div className="md:col-span-2 space-y-10">
            {menuSections.map((section, idx) => (
              <div key={idx}>
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">{section.title}</h3>
                <div className="grid grid-cols-1 gap-3">
                  {section.items.map((item, itemIdx) => (
                    <Link 
                      key={itemIdx} 
                      to={item.link} 
                      className="group bg-white border border-slate-200 p-4 rounded-2xl flex items-center justify-between hover:border-blue-600 hover:shadow-md transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <div className="bg-slate-50 p-3 rounded-xl text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-600 transition">
                          {item.icon}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 leading-none">{item.label}</p>
                          <p className="text-xs text-slate-400 mt-1">{item.desc}</p>
                        </div>
                      </div>
                      <ChevronRight size={18} className="text-slate-300 group-hover:text-blue-600 transition" />
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            {/* Logout & Build Info */}
            <div className="pt-6 border-t border-slate-200">
               <button 
                 onClick={logout}
                 className="flex items-center gap-2 text-red-500 font-bold hover:text-red-700 transition"
               >
                 <LogOut size={20}/> Logout from Mwaiseni
               </button>
               <p className="text-[10px] text-slate-400 mt-4 uppercase tracking-widest font-black">
                 Version 1.0.4 — Developed for Zambia
               </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

