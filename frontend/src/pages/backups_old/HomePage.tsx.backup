import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Star, Building2, Home, Tent } from 'lucide-react';

const HomePage: React.FC = () => {
  const [category, setCategory] = useState('All');

  const categories = [
    { name: 'All', icon: Search },
    { name: 'Hotels', icon: Building2 },
    { name: 'Apartments', icon: Home },
    { name: 'Lodges', icon: Tent },
  ];

  const featuredLodges = [
    { id: 1, name: "Victoria Falls Waterfront", location: "Livingstone", price: "K1,200", rating: 4.8, img: "https://images.unsplash.com/photo-1549180030-48bf079fb38a", type: 'Lodges' },
    { id: 2, name: "Lower Zambezi Safari Camp", location: "Chirundu", price: "K3,500", rating: 4.9, img: "https://images.unsplash.com/photo-1516422213488-97f794bb0e02", type: 'Lodges' },
    { id: 3, name: "Lusaka Business Suite", location: "Lusaka", price: "K950", rating: 4.5, img: "https://images.unsplash.com/photo-1566073771259-6a8506099945", type: 'Apartments' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center justify-center bg-blue-900 text-white px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
            <img src="https://images.unsplash.com/photo-1516422213488-97f794bb0e02" className="w-full h-full object-cover" alt="Zambia Safari" />
        </div>
        
        <div className="relative text-center max-w-4xl w-full">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-8 tracking-tight text-white drop-shadow-lg">
            Find your home in Zambia
          </h1>
          
          {/* Advanced Search Bar */}
          <div className="bg-white p-2 rounded-2xl flex flex-col md:flex-row items-stretch gap-2 shadow-2xl mx-auto">
            {/* Location Input */}
            <div className="flex-[2] flex items-center gap-3 px-5 py-4 text-gray-800 border-r border-gray-100">
              <MapPin className="text-blue-600" size={24} />
              <input type="text" placeholder="Where are you going?" className="w-full outline-none font-medium text-lg placeholder:text-gray-400" />
            </div>

            {/* NEW: Category Dropdown */}
            <div className="flex-1 flex items-center gap-2 px-4 py-4 text-gray-800 border-r border-gray-100 bg-gray-50/50">
              <Building2 className="text-blue-600" size={20} />
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-transparent outline-none font-semibold text-gray-700 cursor-pointer"
              >
                <option value="All">All Types</option>
                <option value="Hotels">Hotels</option>
                <option value="Apartments">Apartments</option>
                <option value="Lodges">Lodges</option>
              </select>
            </div>

            <button className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-4 rounded-xl font-bold text-lg transition-all shadow-lg active:scale-95">
              Search
            </button>
          </div>
          
          {/* Quick Category Icons */}
          <div className="flex justify-center gap-8 mt-10">
            {categories.map((item) => (
              <button 
                key={item.name}
                onClick={() => setCategory(item.name)}
                className={`flex flex-col items-center gap-2 group transition-all ${category === item.name ? 'scale-110' : 'opacity-70 hover:opacity-100'}`}
              >
                <div className={`p-4 rounded-2xl transition-all ${category === item.name ? 'bg-blue-600 text-white shadow-xl' : 'bg-white/10 text-white backdrop-blur-md'}`}>
                  <item.icon size={24} />
                </div>
                <span className="text-sm font-bold tracking-wide">{item.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Grid */}
      <section className="max-w-7xl mx-auto py-16 px-4">
        <div className="flex justify-between items-end mb-10">
            <div>
                <h2 className="text-3xl font-bold text-gray-900">Recommended for you</h2>
                <p className="text-gray-500 mt-2 text-lg font-medium">Top-rated stays across Zambia</p>
            </div>
            <Link to="/search" className="bg-gray-100 hover:bg-gray-200 text-gray-900 px-6 py-2.5 rounded-full font-bold transition">
                View All
            </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {featuredLodges.map((lodge) => (
            <Link key={lodge.id} to={`/property/${lodge.id}`} className="group block no-underline">
              <div className="relative overflow-hidden rounded-[2rem] mb-5 aspect-[4/3] bg-gray-100 shadow-sm">
                <img src={lodge.img} alt={lodge.name} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute top-5 right-5 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-xl flex items-center gap-1.5 text-sm font-black shadow-lg">
                  <Star size={16} className="text-yellow-500 fill-yellow-500" /> {lodge.rating}
                </div>
                <div className="absolute bottom-5 left-5 bg-blue-600 text-white px-3 py-1 rounded-lg text-xs font-bold">
                  {lodge.type}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-1">{lodge.name}</h3>
              <p className="text-gray-500 mb-3 font-medium flex items-center gap-1">
                <MapPin size={16} /> {lodge.location}, Zambia
              </p>
              <p className="text-xl font-black text-blue-900">{lodge.price} <span className="text-sm font-medium text-gray-400">/ night</span></p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
