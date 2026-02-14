import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Heart, Plane, LogOut, Menu, Home } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const PublicNavbar: React.FC = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  };

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-blue-600 p-2 rounded-lg text-white font-black text-xl">Z</div>
          <span className="text-2xl font-black text-blue-900 tracking-tighter">Mwaiseni</span>
        </Link>

        <div className="flex items-center gap-4">
          {!user ? (
            <>
              <Link to="/list-property" className="hidden md:block text-gray-600 font-bold hover:text-blue-600 transition">List your property</Link>
              <Link to="/login" className="text-gray-600 font-bold hover:text-blue-600 transition">Sign In</Link>
              <Link to="/register" className="bg-blue-600 text-white px-6 py-2.5 rounded-full font-bold hover:bg-blue-700 transition">
                Sign Up
              </Link>
            </>
          ) : (
            <div className="relative">
              <button 
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 p-1 pr-3 border border-gray-200 rounded-full hover:shadow-md transition bg-white"
              >
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {getInitials(user.name || 'Guest')}
                </div>
                <Menu size={18} className="text-gray-500" />
              </button>

              {isOpen && (
                <>
                  <div className="fixed inset-0" onClick={() => setIsOpen(false)}></div>
                  <div className="absolute right-0 mt-3 w-64 bg-white border border-gray-100 rounded-2xl shadow-2xl py-3 z-50 animate-in fade-in zoom-in duration-200">
                    <div className="px-4 py-2 border-b border-gray-50 mb-2">
                      <p className="font-bold text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-400">{user.email}</p>
                    </div>

                    {/* NEW: Home Link in Circle Dropdown */}
                    <Link to="/" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-gray-700 font-medium" onClick={() => setIsOpen(false)}>
                      <Home size={18} className="text-blue-600" /> Explore Home
                    </Link>
                    
                    <Link to="/trips" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-gray-700 font-medium" onClick={() => setIsOpen(false)}>
                      <Plane size={18} className="text-blue-500" /> My Trips
                    </Link>
                    
                    <Link to="/saved" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-gray-700 font-medium" onClick={() => setIsOpen(false)}>
                      <Heart size={18} className="text-red-500" /> Saved Stays
                    </Link>

                    <Link to="/profile" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-gray-700 font-medium border-b border-gray-50" onClick={() => setIsOpen(false)}>
                      <User size={18} className="text-gray-400" /> Account Settings
                    </Link>
                    
                    <button 
                      onClick={() => { logout(); setIsOpen(false); }}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 text-red-600 font-bold transition mt-2 text-left"
                    >
                      <LogOut size={18} /> Log out
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default PublicNavbar;



