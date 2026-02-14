// src/components/footer/PublicFooter.tsx
import React from "react";
import { Link } from "react-router-dom";

const PublicFooter: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">Z</span>
              </div>
              <span className="text-xl font-bold">Mwaiseni</span>
            </div>
            <p className="text-gray-400">
              Find your perfect stay in Zambia. Experience local hospitality.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">For Guests</h3>
            <ul className="space-y-2">
              <li><Link to="/search" className="text-gray-400 hover:text-white">Browse Stays</Link></li>
              <li><Link to="/login" className="text-gray-400 hover:text-white">Sign In</Link></li>
              <li><Link to="/register" className="text-gray-400 hover:text-white">Sign Up</Link></li>
              <li><Link to="/help" className="text-gray-400 hover:text-white">Help Center</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">For Partners</h3>
            <ul className="space-y-2">
              <li><Link to="/partner/listings" className="text-gray-400 hover:text-white">List Property</Link></li>
              <li><Link to="/partner/login" className="text-gray-400 hover:text-white">Partner Sign In</Link></li>
              <li><Link to="/partner/signup" className="text-gray-400 hover:text-white">Become a Partner</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
              <li><Link to="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-400 hover:text-white">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
          <p>© 2024 Mwaiseni. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default PublicFooter;


