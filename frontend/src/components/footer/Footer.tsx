// src/components/footer/Footer.tsx
import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">Z</span>
              </div>
              <span className="text-xl font-bold">Mwaiseni</span>
            </div>
            <p className="text-gray-400 mb-4">
              Connecting travelers to Zambia's finest stays since 2026.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Discover</h3>
            <ul className="space-y-2">
              <li><Link to="/search" className="text-gray-400 hover:text-white">Browse Stays</Link></li>
              <li><Link to="/search?type=lodge" className="text-gray-400 hover:text-white">Safari Lodges</Link></li>
              <li><Link to="/search?type=hotel" className="text-gray-400 hover:text-white">Hotels</Link></li>
              <li><Link to="/search?type=apartment" className="text-gray-400 hover:text-white">Apartments</Link></li>
            </ul>
          </div>

          {/* Partner */}
          <div>
            <h3 className="text-lg font-bold mb-4">Partner</h3>
            <ul className="space-y-2">
              <li><Link to="/partner" className="text-gray-400 hover:text-white">List Your Property</Link></li>
              <li><Link to="/owner/dashboard" className="text-gray-400 hover:text-white">Partner Dashboard</Link></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Property Management</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Pricing</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-400">
                <Phone size={16} className="mr-2" />
                <span>+260 96 123 4567</span>
              </li>
              <li className="flex items-center text-gray-400">
                <Mail size={16} className="mr-2" />
                <span>support@Mwaiseni.com</span>
              </li>
              <li className="flex items-center text-gray-400">
                <MapPin size={16} className="mr-2" />
                <span>Lusaka, Zambia</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>© 2026 Mwaiseni. All Rights Reserved. | 
            <Link to="/privacy" className="ml-2 hover:text-white">Privacy Policy</Link> | 
            <Link to="/terms" className="ml-2 hover:text-white">Terms of Service</Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

