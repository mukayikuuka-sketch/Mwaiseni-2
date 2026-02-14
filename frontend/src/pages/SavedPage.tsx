import React, { useState } from "react";
import { Heart, Star, MapPin, Share2, Plus, Trash2, Calendar, LayoutGrid, List } from "lucide-react";
import { Link } from "react-router-dom";

const SavedPage: React.FC = () => {
  // Mocking a folder system
  const [activeFolder, setActiveFolder] = useState("All Saves");

  const savedProperties = [
    { id: 1, name: "Sunset Lodge", location: "Livingstone", price: "ZMW 850", rating: 4.8, status: "Available", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600" },
    { id: 2, name: "City Apartments", location: "Lusaka", price: "ZMW 650", rating: 4.5, status: "Filling Fast", image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=600" },
    { id: 3, name: "Mountain View", location: "Ndola", price: "ZMW 1200", rating: 4.9, status: "Available", image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600" },
  ];

  return (
    <div className="max-w-6xl mx-auto py-10 px-6 min-h-screen">
      {/* 1. HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Saved Stays</h1>
          <p className="text-slate-500 mt-2 font-medium">Plan your next Zambian getaway</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border-2 border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50 transition">
            <Share2 size={18} /> Share List
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-100 transition">
            <Plus size={18} /> New Folder
          </button>
        </div>
      </div>

      {/* 2. FOLDER TABS */}
      <div className="flex gap-4 mb-8 overflow-x-auto pb-2 no-scrollbar">
        {['All Saves', 'Livingstone Trip', 'Work Stays', 'Dream Lodges'].map((folder) => (
          <button
            key={folder}
            onClick={() => setActiveFolder(folder)}
            className={`px-5 py-2 rounded-full text-sm font-black transition whitespace-nowrap ${
              activeFolder === folder 
                ? 'bg-slate-900 text-white' 
                : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
            }`}
          >
            {folder}
          </button>
        ))}
      </div>

      {savedProperties.length === 0 ? (
        <div className="bg-white rounded-3xl border-2 border-dashed border-slate-200 p-20 text-center">
          <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="text-red-500" size={40} fill="currentColor" />
          </div>
          <h3 className="text-2xl font-black text-slate-900 mb-2">Create your first wishlist</h3>
          <p className="text-slate-500 mb-8 max-w-xs mx-auto">Click the heart icon on any property to save it here and start planning.</p>
          <Link to="/search" className="px-10 py-4 bg-blue-600 text-white rounded-2xl font-black hover:bg-blue-700 transition shadow-xl shadow-blue-100">
            Explore Properties
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {savedProperties.map((property) => (
            <div key={property.id} className="group bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-2xl hover:shadow-slate-200 transition-all duration-300">
              {/* Image Section */}
              <div className="h-64 relative overflow-hidden">
                <img 
                  src={property.image} 
                  alt={property.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500" 
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-black uppercase text-blue-700 shadow-sm">
                  {property.status}
                </div>
                <button className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg text-red-500 hover:scale-110 transition">
                  <Heart size={20} fill="currentColor" />
                </button>
              </div>

              {/* Content Section */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-black text-xl text-slate-900">{property.name}</h3>
                  <div className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-lg">
                    <Star size={14} className="text-amber-500" fill="currentColor" />
                    <span className="font-bold text-sm">{property.rating}</span>
                  </div>
                </div>
                
                <div className="flex items-center text-slate-500 text-sm mb-6 font-medium">
                  <MapPin size={16} className="mr-1 text-blue-600" />
                  <span>{property.location}, Zambia</span>
                </div>

                <div className="flex items-end justify-between border-t pt-6">
                  <div>
                    <p className="text-[10px] text-slate-400 font-black uppercase leading-none">Price Per Night</p>
                    <p className="font-black text-xl text-slate-900 mt-1">{property.price}</p>
                  </div>
                  <Link
                    to={`/property/${property.id}`}
                    className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-blue-600 transition shadow-lg shadow-slate-100"
                  >
                    View Stay
                  </Link>
                </div>
                
                <button className="w-full mt-4 flex items-center justify-center gap-2 text-slate-400 hover:text-red-500 transition text-xs font-bold py-2">
                  <Trash2 size={14} /> Remove from wishlist
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedPage;
