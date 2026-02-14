import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Calendar,
  Heart,
  Clock,
  Bell,
  ChevronRight,
  MapPin,
  Star,
  Zap,
  Droplets,
  ShieldCheck,
  Users,
  Search,
  Sparkles,
  Home,
  Tent,
  Building,
  TreePine,
  Waves,
  ArrowRight
} from 'lucide-react';

interface Property {
  id: string;
  name: string;
  loc: string;
  price: number;
  rating: number;
  img: string;
  category: string;
  features: string[];
  verified: boolean;
}

const GuestDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Mock data - In real app, fetch from API based on user's history
  const [upcomingBookings] = useState([
    {
      id: '2',
      property: 'Ibex Hill Modern Suite',
      location: 'Lusaka',
      dates: 'Jun 15 - Jun 20',
      status: 'Confirmed',
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&q=80',
      price: 1200,
      guests: 2,
      bookingId: 'ZMB-2024-001'
    },
    {
      id: '4',
      property: 'Siavonga Bay Villa',
      location: 'Siavonga',
      dates: 'Jul 3 - Jul 7',
      status: 'Pending',
      image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=400&q=80',
      price: 3100,
      guests: 4,
      bookingId: 'ZMB-2024-002'
    }
  ]);

  const [recentlyViewed] = useState<Property[]>([
    {
      id: '6',
      name: 'Mfuwe Safari Camp',
      loc: 'South Luangwa',
      price: 5500,
      rating: 5.0,
      img: 'https://images.unsplash.com/photo-1493246507139-91e8bef99c02',
      category: 'Safari',
      features: ['Solar', 'Borehole'],
      verified: true
    },
    {
      id: '1',
      name: 'Zambezi River Lodge',
      loc: 'Livingstone',
      price: 2450,
      rating: 4.9,
      img: 'https://images.unsplash.com/photo-1549180030-48bf079fb38a',
      category: 'Lodges',
      features: ['Solar', 'Borehole'],
      verified: true
    }
  ]);

  const [savedProperties] = useState<Property[]>([
    {
      id: '5',
      name: 'Showgrounds Loft',
      loc: 'Lusaka',
      price: 950,
      rating: 4.5,
      img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2',
      category: 'Apartments',
      features: ['Solar'],
      verified: true
    },
    {
      id: '6',
      name: 'Mfuwe Safari Camp',
      loc: 'South Luangwa',
      price: 5500,
      rating: 5.0,
      img: 'https://images.unsplash.com/photo-1493246507139-91e8bef99c02',
      category: 'Safari',
      features: ['Solar', 'Borehole'],
      verified: true
    }
  ]);

  const [recentSearches] = useState([
    { location: 'Livingstone', date: '2 days ago', guests: 2 },
    { location: 'Lusaka', date: '5 days ago', guests: 1 },
    { location: 'Siavonga', date: '1 week ago', guests: 4 }
  ]);

  const [recommendations] = useState<Property[]>([
    {
      id: '2',
      name: 'Ibex Hill Modern Suite',
      loc: 'Lusaka',
      price: 1200,
      rating: 4.7,
      img: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267',
      category: 'Apartments',
      features: ['Borehole', 'WiFi'],
      verified: true
    },
    {
      id: '4',
      name: 'Siavonga Bay Villa',
      loc: 'Siavonga',
      price: 3100,
      rating: 4.9,
      img: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2',
      category: 'Pools',
      features: ['Security'],
      verified: true
    },
    {
      id: '1',
      name: 'Zambezi River Lodge',
      loc: 'Livingstone',
      price: 2450,
      rating: 4.9,
      img: 'https://images.unsplash.com/photo-1549180030-48bf079fb38a',
      category: 'Lodges',
      features: ['Solar', 'Borehole'],
      verified: true
    }
  ]);

  const stats = {
    totalBookings: upcomingBookings.length,
    savedCount: savedProperties.length,
    reviewedCount: 3,
    memberSince: '2024'
  };

  const getUserInitial = () => {
    if (user?.email) return user.email.charAt(0).toUpperCase();
    return 'G';
  };

  const getUserName = () => {
    if (user?.email) return user.email.split('@')[0];
    return 'Guest';
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Personalized Hero Section - GUEST ONLY */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white/90 text-xs font-black uppercase tracking-widest mb-4">
                <Sparkles size={14} />
                Welcome back, {getUserName()}!
              </div>
              <h1 className="text-4xl md:text-5xl font-black mb-3 tracking-tight">
                Ready for your next <br />
                <span className="text-blue-200">Zambian adventure?</span>
              </h1>
              <p className="text-lg text-white/80 font-medium max-w-2xl">
                Continue your search in {recentSearches[0]?.location || 'Livingstone'} or explore new destinations.
              </p>
            </div>

            {/* User Stats Card */}
            <div className="bg-white/10 border border-white/20 rounded-2xl p-4 backdrop-blur-sm min-w-[200px]">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-400 to-blue-500 flex items-center justify-center">
                  <span className="text-3xl font-black text-white">{getUserInitial()}</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-white/70">Member since</p>
                  <p className="text-xl font-black">{stats.memberSince}</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-white/20">
                <div className="text-center">
                  <p className="text-lg font-black">{stats.totalBookings}</p>
                  <p className="text-xs text-white/70">Trips</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-black">{stats.savedCount}</p>
                  <p className="text-xs text-white/70">Saved</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-black">{stats.reviewedCount}</p>
                  <p className="text-xs text-white/70">Reviews</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Action Bar - GUEST ONLY */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4 overflow-x-auto no-scrollbar">
            <button
              onClick={() => navigate('/search')}
              className="flex items-center gap-3 px-6 py-3 bg-blue-600 text-white rounded-2xl font-black hover:bg-blue-700 transition whitespace-nowrap"
            >
              <Search size={20} />
              Search stays
            </button>
            <button
              onClick={() => navigate('/trips')}
              className="flex items-center gap-3 px-6 py-3 bg-gray-100 text-gray-700 rounded-2xl font-black hover:bg-gray-200 transition whitespace-nowrap"
            >
              <Calendar size={20} />
              My trips ({stats.totalBookings})
            </button>
            <button
              onClick={() => navigate('/saved')}
              className="flex items-center gap-3 px-6 py-3 bg-gray-100 text-gray-700 rounded-2xl font-black hover:bg-gray-200 transition whitespace-nowrap"
            >
              <Heart size={20} />
              Saved ({stats.savedCount})
            </button>
            <button
              onClick={() => navigate('/profile')}
              className="flex items-center gap-3 px-6 py-3 bg-gray-100 text-gray-700 rounded-2xl font-black hover:bg-gray-200 transition whitespace-nowrap"
            >
              <Users size={20} />
              Profile
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Upcoming Bookings Section - GUEST ONLY */}
        {upcomingBookings.length > 0 && (
          <section className="mb-16">
            <div className="flex justify-between items-end mb-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">
                  Your upcoming stays
                </h2>
                <p className="text-gray-500 font-medium mt-1">
                  {upcomingBookings.length} {upcomingBookings.length === 1 ? 'booking' : 'bookings'} confirmed
                </p>
              </div>
              <Link
                to="/trips"
                className="hidden md:flex items-center gap-2 text-sm font-black text-blue-600 hover:text-blue-800"
              >
                View all <ChevronRight size={18} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {upcomingBookings.map((booking) => (
                <div
                  key={booking.id}
                  onClick={() => navigate(`/trips/${booking.bookingId}`)}
                  className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition cursor-pointer"
                >
                  <div className="flex flex-col sm:flex-row">
                    <div className="sm:w-48 h-48 sm:h-auto overflow-hidden">
                      <img
                        src={booking.image}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                        alt={booking.property}
                      />
                    </div>
                    <div className="flex-1 p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className={`text-xs px-3 py-1 rounded-full font-black uppercase tracking-wider ${
                              booking.status === 'Confirmed'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-yellow-100 text-yellow-700'
                            }`}>
                              {booking.status}
                            </span>
                          </div>
                          <h3 className="font-black text-xl text-gray-900 mb-1">{booking.property}</h3>
                          <p className="text-gray-500 font-medium flex items-center gap-1 mb-3">
                            <MapPin size={14} /> {booking.location}, Zambia
                          </p>
                          <div className="flex items-center gap-4 text-sm">
                            <span className="flex items-center gap-1 text-gray-600">
                              <Calendar size={14} /> {booking.dates}
                            </span>
                            <span className="flex items-center gap-1 text-gray-600">
                              <Users size={14} /> {booking.guests} guests
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                        <p className="text-lg font-black text-gray-900">
                          K{booking.price.toLocaleString()}{' '}
                          <span className="text-sm font-medium text-gray-400">total</span>
                        </p>
                        <button className="text-blue-600 font-black text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                          View details <ChevronRight size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Recently Viewed - GUEST ONLY */}
        <section className="mb-16">
          <div className="flex justify-between items-end mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">
                Recently viewed
              </h2>
              <p className="text-gray-500 font-medium mt-1">
                Properties you checked out recently
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentlyViewed.map((property) => (
              <div
                key={property.id}
                onClick={() => navigate(`/property/${property.id}`)}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-3 shadow-sm">
                  <img
                    src={`${property.img}?w=800&q=80`}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                    alt={property.name}
                  />
                  {property.verified && (
                    <div className="absolute top-3 left-3 bg-blue-600 text-white px-2 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                      <ShieldCheck size={12} /> Verified
                    </div>
                  )}
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-gray-900">{property.loc}, Zambia</h3>
                    <p className="text-sm text-gray-500 mt-0.5">{property.name}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star size={14} fill="currentColor" className="text-amber-500" />
                      <span className="text-sm font-bold">{property.rating}</span>
                    </div>
                    <p className="text-lg font-black text-gray-900 mt-2">
                      K{property.price.toLocaleString()}{' '}
                      <span className="text-sm font-medium text-gray-400">/ night</span>
                    </p>
                  </div>
                  <button className="p-2 hover:bg-gray-100 rounded-full transition">
                    <Heart size={18} className="text-gray-400 hover:text-red-500" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Searches - GUEST ONLY */}
        <section className="mb-16">
          <div className="flex justify-between items-end mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">
                Recent searches
              </h2>
              <p className="text-gray-500 font-medium mt-1">
                Pick up where you left off
              </p>
            </div>
            <button className="text-sm font-medium text-gray-500 hover:text-gray-900">
              Clear all
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentSearches.map((search, index) => (
              <button
                key={index}
                onClick={() => navigate(`/search?location=${encodeURIComponent(search.location)}`)}
                className="group flex items-center justify-between p-5 bg-gray-50 hover:bg-gray-100 rounded-2xl transition text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-xl">
                    <Clock size={18} className="text-gray-500" />
                  </div>
                  <div>
                    <p className="font-black text-gray-900">{search.location}</p>
                    <p className="text-xs text-gray-500">{search.date} · {search.guests} {search.guests === 1 ? 'guest' : 'guests'}</p>
                  </div>
                </div>
                <ChevronRight size={18} className="text-gray-400 group-hover:text-gray-600" />
              </button>
            ))}
          </div>
        </section>

        {/* Saved Properties Preview - GUEST ONLY */}
        {savedProperties.length > 0 && (
          <section className="mb-16">
            <div className="flex justify-between items-end mb-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">
                  Your saved properties
                </h2>
                <p className="text-gray-500 font-medium mt-1">
                  {savedProperties.length} {savedProperties.length === 1 ? 'property' : 'properties'} saved
                </p>
              </div>
              <Link
                to="/saved"
                className="hidden md:flex items-center gap-2 text-sm font-black text-blue-600 hover:text-blue-800"
              >
                View all <ChevronRight size={18} />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {savedProperties.map((property) => (
                <div
                  key={property.id}
                  onClick={() => navigate(`/property/${property.id}`)}
                  className="group cursor-pointer"
                >
                  <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-3 shadow-sm">
                    <img
                      src={`${property.img}?w=800&q=80`}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                      alt={property.name}
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        // Remove from saved logic
                      }}
                      className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition"
                    >
                      <Heart size={18} className="text-red-500 fill-red-500" />
                    </button>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{property.loc}, Zambia</h3>
                    <p className="text-sm text-gray-500 mt-0.5">{property.name}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star size={14} fill="currentColor" className="text-amber-500" />
                      <span className="text-sm font-bold">{property.rating}</span>
                    </div>
                    <p className="text-lg font-black text-gray-900 mt-2">
                      K{property.price.toLocaleString()}{' '}
                      <span className="text-sm font-medium text-gray-400">/ night</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Recommendations - GUEST ONLY */}
        <section className="mb-16">
          <div className="flex justify-between items-end mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">
                Recommended for you
              </h2>
              <p className="text-gray-500 font-medium mt-1">
                Based on your searches in {recentSearches[0]?.location || 'Zambia'}
              </p>
            </div>
            <Link
              to="/search"
              className="hidden md:flex items-center gap-2 text-sm font-black text-blue-600 hover:text-blue-800"
            >
              Explore more <ArrowRight size={18} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendations.slice(0, 4).map((property) => (
              <div
                key={property.id}
                onClick={() => navigate(`/property/${property.id}`)}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-3 shadow-sm">
                  <img
                    src={`${property.img}?w=800&q=80`}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                    alt={property.name}
                  />
                  {property.verified && (
                    <div className="absolute top-3 left-3 bg-blue-600 text-white px-2 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                      <ShieldCheck size={12} /> Verified
                    </div>
                  )}
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-gray-900">{property.loc}, Zambia</h3>
                    <p className="text-sm text-gray-500 mt-0.5">{property.name}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star size={14} fill="currentColor" className="text-amber-500" />
                      <span className="text-sm font-bold">{property.rating}</span>
                    </div>
                    <div className="flex gap-2 mt-2">
                      {property.features.includes('Solar') && (
                        <div className="flex items-center gap-1 text-xs text-gray-600">
                          <Zap size={14} className="text-amber-500" /> Solar
                        </div>
                      )}
                      {property.features.includes('Borehole') && (
                        <div className="flex items-center gap-1 text-xs text-gray-600">
                          <Droplets size={14} className="text-blue-500" /> Borehole
                        </div>
                      )}
                    </div>
                    <p className="text-lg font-black text-gray-900 mt-2">
                      K{property.price.toLocaleString()}{' '}
                      <span className="text-sm font-medium text-gray-400">/ night</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default GuestDashboard;