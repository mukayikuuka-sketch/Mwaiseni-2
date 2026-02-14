import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Globe, Menu, Building2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const PublicNavbar: React.FC = () => {
  const { user, isLoggedIn } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">Z</span>
            </div>
            <span className="text-xl font-bold text-gray-900">ZamStay</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/search" className="text-gray-700 hover:text-blue-600 font-medium">Browse Stays</Link>
            
            {/* FIXED: Single clean link to the Partner Landing Page */}
            <Link to="/partner" className="text-gray-700 hover:text-blue-600 font-medium flex items-center gap-1">
              <Building2 size={18} />
              <span>List Property</span>
            </Link>

            <button className="flex items-center space-x-1 text-gray-700 hover:text-blue-600">
              <Globe size={18} />
              <span>ZMW</span>
            </button>
          </div>

          <div className="flex items-center space-x-4">
            {!isLoggedIn ? (
              <>
                <Link to="/login" className="px-4 py-2 text-gray-700 font-medium">Sign in</Link>
                <Link to="/register" className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium">Sign up</Link>
              </>
            ) : (
              <Link to={user?.role === 'partner' ? "/partner/dashboard" : "/profile"} className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-bold">
                My Account
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
export default PublicNavbar;
