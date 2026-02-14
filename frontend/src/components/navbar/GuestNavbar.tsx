import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Home, Search, Heart, User, LogOut, Settings, Briefcase } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const GuestNavbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Helper to check if a link is active
  const isActive = (path: string) => 
    location.pathname === path ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-700 hover:text-blue-600";

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">Z</span>
            </div>
            <span className="text-xl font-black text-gray-900 tracking-tighter">Mwaiseni</span>
          </Link>

          {/* Navigation - FIXED PATHS */}
          <div className="hidden md:flex items-center space-x-8 h-full">
            <Link to="/search" className={`flex items-center space-x-1 font-bold transition h-16 px-1 ${isActive('/search')}`}>
              <Search size={18} />
              <span>Find Stays</span>
            </Link>
            {/* FIXED: Changed from /my-trips to /trips to match App.tsx */}
            <Link to="/trips" className={`flex items-center space-x-1 font-bold transition h-16 px-1 ${isActive('/trips')}`}>
              <Briefcase size={18} />
              <span>My Trips</span>
            </Link>
            <Link to="/saved" className={`flex items-center space-x-1 font-bold transition h-16 px-1 ${isActive('/saved')}`}>
              <Heart size={18} />
              <span>Saved</span>
            </Link>
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <div className="relative group">
              <button className="flex items-center space-x-2 text-gray-700 py-2">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <User size={16} className="text-blue-600" />
                </div>
                <div className="text-left hidden md:block leading-tight">
                  <p className="font-bold text-sm">{user?.name?.split(" ")[0] || "Guest"}</p>
                  <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest">Guest</p>
                </div>
              </button>
              
              {/* Dropdown Menu */}
              <div className="absolute right-0 mt-1 w-56 bg-white rounded-2xl shadow-2xl border border-slate-100 hidden group-hover:block z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="p-4 border-b border-slate-50">
                  <p className="font-black text-slate-900">{user?.name || "Guest User"}</p>
                  <p className="text-xs text-slate-500 truncate">{user?.email || "guest@Mwaiseni.com"}</p>
                </div>
                <div className="p-2">
                  <Link
                    to="/profile"
                    className="flex items-center space-x-3 px-4 py-2.5 text-slate-600 font-bold hover:bg-slate-50 rounded-xl transition"
                  >
                    <User size={18} className="text-slate-400" />
                    <span>Profile</span>
                  </Link>
                  <Link
                    to="/settings"
                    className="flex items-center space-x-3 px-4 py-2.5 text-slate-600 font-bold hover:bg-slate-50 rounded-xl transition"
                  >
                    <Settings size={18} className="text-slate-400" />
                    <span>Settings</span>
                  </Link>
                  <div className="my-2 border-t border-slate-50"></div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-3 w-full text-left px-4 py-2.5 text-red-500 font-bold hover:bg-red-50 rounded-xl transition"
                  >
                    <LogOut size={18} />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default GuestNavbar;
