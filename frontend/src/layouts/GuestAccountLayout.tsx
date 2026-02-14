// src/layouts/GuestAccountLayout.tsx
import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Home, Calendar, Heart, User, LogOut, Settings, Bell, HelpCircle } from "lucide-react";

const GuestAccountLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {`n  const { logout } = useAuth();
    logout();
    navigate("/");
  };

  const menuItems = [
    { path: "/my-trips", icon: <Calendar size={20} />, label: "My Trips" },
    { path: "/saved", icon: <Heart size={20} />, label: "Saved Stays" },
    { path: "/profile", icon: <User size={20} />, label: "Profile" },
    { path: "/settings", icon: <Settings size={20} />, label: "Settings" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">Z</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Mwaiseni</span>
            </Link>

            {/* Right Side */}
            <div className="flex items-center space-x-6">
              <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium flex items-center">
                <Home size={18} className="mr-2" />
                Browse Stays
              </Link>
              
              <button className="relative">
                <Bell size={20} className="text-gray-700" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              
              <button className="text-gray-700 hover:text-blue-600">
                <HelpCircle size={20} />
              </button>
              
              {/* User Dropdown */}
              <div className="relative group">
                <button className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-green-400 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">
                      {user?.name?.charAt(0).toUpperCase() || "U"}
                    </span>
                  </div>
                  <span className="font-medium">{user?.name?.split(" ")[0] || "User"}</span>
                </button>
                
                {/* Dropdown Menu */}
                <div className="absolute right-0 top-12 w-64 bg-white rounded-lg shadow-lg border py-2 hidden group-hover:block z-50">
                  <div className="px-4 py-3 border-b">
                    <p className="font-bold">{user?.name}</p>
                    <p className="text-sm text-gray-600">{user?.email}</p>
                  </div>
                  
                  {menuItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50"
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </Link>
                  ))}
                  
                  <div className="border-t mt-2 pt-2">
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 w-full text-left"
                    >
                      <LogOut size={20} />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-400">© 2024 Mwaiseni. Your travel companion.</p>
            </div>
            <div className="flex space-x-6">
              <Link to="/help" className="text-gray-400 hover:text-white">
                Help Center
              </Link>
              <Link to="/privacy" className="text-gray-400 hover:text-white">
                Privacy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-white">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default GuestAccountLayout;


