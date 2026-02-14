import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  MapPin,
  Star,
  Zap,
  Droplets,
  ShieldCheck,
  Heart,
  Waves,
  Home,
  TreePine,
  Building,
  Tent,
  CheckCircle2,
  CalendarDays,
  Users,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

const HomePage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [location, setLocation] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);

  const navigate = useNavigate();

  // Categories for the high-end "Airbnb" scroll bar
  const categories = [
    { id: 'All', label: 'All Stays', icon: <Home size={20} /> },
    { id: 'Apartments', label: 'Apartments', icon: <Building size={20} /> },
    { id: 'Lodges', label: 'Lodges', icon: <Tent size={20} /> },
    { id: 'Safari', label: 'Safari', icon: <TreePine size={20} /> },
    { id: 'Pools', label: 'Amazing Pools', icon: <Waves size={20} /> },
  ];

  const propertyCards = [
    {
      id: '1',
      name: 'Zambezi River Lodge',
      loc: 'Livingstone',
      price: 2450,
      rating: 4.9,
      img: 'https://images.unsplash.com/photo-1549180030-48bf079fb38a',
      category: 'Lodges',
      features: ['Solar', 'Borehole'],
      verified: true,
    },
    {
      id: '2',
      name: 'Ibex Hill Modern Suite',
      loc: 'Lusaka',
      price: 1200,
      rating: 4.7,
      img: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267',
      category: 'Apartments',
      features: ['Borehole', 'WiFi'],
      verified: true,
    },
    {
      id: '3',
      name: 'Copperbelt Executive',
      loc: 'Kitwe',
      price: 1800,
      rating: 4.8,
      img: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688',
      category: 'Apartments',
      features: ['Security', 'Solar'],
      verified: false,
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
      verified: true,
    },
    {
      id: '5',
      name: 'Showgrounds Loft',
      loc: 'Lusaka',
      price: 950,
      rating: 4.5,
      img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2',
      category: 'Apartments',
      features: ['Solar'],
      verified: true,
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
      verified: true,
    },
  ];

  // Logic to filter cards by category
  const filteredProperties = useMemo(() => {
    if (activeCategory === 'All') return propertyCards;
    return propertyCards.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (location.trim()) params.set('location', location.trim());
    if (activeCategory) params.set('category', activeCategory);

    // These are frontend-only for now (still useful)
    if (checkIn) params.set('checkIn', checkIn);
    if (checkOut) params.set('checkOut', checkOut);
    params.set('guests', String(guests));

    navigate(`/search?${params.toString()}`);
  };

  const trending = [
    {
      id: 'lusaka',
      name: 'Lusaka',
      subtitle: 'Business & city stays',
      img: 'https://images.unsplash.com/photo-1544986581-efac024faf62?auto=format&fit=crop&w=1200&q=80',
    },
    {
      id: 'livingstone',
      name: 'Livingstone',
      subtitle: 'Victoria Falls gateway',
      img: 'https://images.unsplash.com/photo-1533157964786-5f9c6b0f89a6?auto=format&fit=crop&w=1200&q=80',
    },
    {
      id: 'ndola',
      name: 'Ndola',
      subtitle: 'Copperbelt comfort',
      img: 'https://images.unsplash.com/photo-1502920917128-1aa500764b7c?auto=format&fit=crop&w=1200&q=80',
    },
    {
      id: 'siavonga',
      name: 'Siavonga',
      subtitle: 'Lake Kariba escapes',
      img: 'https://images.unsplash.com/photo-1519817914152-22f90e1f1aaf?auto=format&fit=crop&w=1200&q=80',
    },
  ];

  const collections = [
    {
      title: 'Solar Ready',
      desc: '24/7 power backups',
      icon: <Zap size={18} className="text-amber-500" />,
      tag: 'solar',
    },
    {
      title: 'Borehole Verified',
      desc: 'Reliable water supply',
      icon: <Droplets size={18} className="text-blue-500" />,
      tag: 'borehole',
    },
    {
      title: 'High Security',
      desc: 'Trusted neighborhoods',
      icon: <ShieldCheck size={18} className="text-emerald-600" />,
      tag: 'security',
    },
    {
      title: 'Near Airport',
      desc: 'Fast check-in travel',
      icon: <Sparkles size={18} className="text-purple-600" />,
      tag: 'airport',
    },
  ];

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-blue-100">
      {/* 1. HERO SECTION */}
      <section className="relative h-[680px] flex items-center justify-center bg-slate-900">
        <div className="absolute inset-0 opacity-40">
          <img
            src="https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1600&q=80"
            className="w-full h-full object-cover"
            alt="Zambia Background"
          />
        </div>

        <div className="relative z-10 text-center max-w-6xl px-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 text-white/90 text-xs font-black uppercase tracking-widest mb-6">
            <ShieldCheck size={14} />
            Zambia-first booking platform
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 drop-shadow-lg leading-tight">
            Discover Zambia’s <br />
            <span className="text-blue-400">Finest Stays.</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-3xl mx-auto font-medium leading-relaxed">
            From Lusaka lofts to Livingstone lodges — with verified power & water backups, and local payments built for Zambia.
          </p>

          {/* SEARCH BAR */}
          <div className="bg-white p-3 rounded-3xl flex flex-col lg:flex-row gap-2 shadow-2xl transition-all hover:shadow-blue-500/10 max-w-5xl mx-auto">
            {/* Location */}
            <div className="flex-[2] flex items-center gap-3 px-6 py-4 text-gray-800 border-b lg:border-b-0 lg:border-r border-gray-100 group">
              <MapPin className="text-blue-600 group-hover:scale-110 transition" size={24} />
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                type="text"
                placeholder="Search Lusaka, Livingstone, Ndola..."
                className="w-full outline-none font-semibold text-lg"
              />
            </div>

            {/* Dates */}
            <div className="flex-[1.4] grid grid-cols-2 gap-2 px-4 py-3 border-b lg:border-b-0 lg:border-r border-gray-100">
              <div className="flex items-center gap-2 bg-slate-50 rounded-2xl px-4 py-3">
                <CalendarDays size={18} className="text-slate-500" />
                <input
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  type="date"
                  className="w-full bg-transparent outline-none font-bold text-sm text-slate-700"
                />
              </div>
              <div className="flex items-center gap-2 bg-slate-50 rounded-2xl px-4 py-3">
                <CalendarDays size={18} className="text-slate-500" />
                <input
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  type="date"
                  className="w-full bg-transparent outline-none font-bold text-sm text-slate-700"
                />
              </div>
            </div>

            {/* Guests */}
            <div className="flex-[0.9] flex items-center justify-between gap-3 px-6 py-4 text-gray-800 border-b lg:border-b-0 lg:border-r border-gray-100">
              <div className="flex items-center gap-2">
                <Users size={20} className="text-slate-500" />
                <div className="leading-tight">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Guests</p>
                  <p className="font-black text-slate-900">{guests}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setGuests((g) => Math.max(1, g - 1))}
                  className="w-10 h-10 rounded-2xl bg-slate-100 hover:bg-slate-200 font-black transition"
                >
                  -
                </button>
                <button
                  onClick={() => setGuests((g) => Math.min(16, g + 1))}
                  className="w-10 h-10 rounded-2xl bg-slate-100 hover:bg-slate-200 font-black transition"
                >
                  +
                </button>
              </div>
            </div>

            {/* Button */}
            <button
              onClick={handleSearch}
              className="bg-blue-600 text-white px-10 py-5 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-blue-700 hover:shadow-lg active:scale-95 transition-all"
            >
              <Search size={22} /> Find Stays
            </button>
          </div>

          {/* Quick chips */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs font-black">
            <span className="px-3 py-2 rounded-full bg-white/10 text-white/90 border border-white/10">Solar backup</span>
            <span className="px-3 py-2 rounded-full bg-white/10 text-white/90 border border-white/10">Borehole water</span>
            <span className="px-3 py-2 rounded-full bg-white/10 text-white/90 border border-white/10">Near airport</span>
            <span className="px-3 py-2 rounded-full bg-white/10 text-white/90 border border-white/10">Secure areas</span>
          </div>
        </div>
      </section>

      {/* 2. CATEGORY BAR */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-center gap-8 md:gap-12 py-4 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex flex-col items-center gap-2 min-w-fit transition-all border-b-2 pb-2 ${
                activeCategory === cat.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-200'
              }`}
            >
              {cat.icon}
              <span className="text-xs font-bold uppercase tracking-wider">{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 3. TRUST BANNER */}
      <section className="bg-blue-50 py-10 mt-8">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex gap-4 items-start">
            <div className="p-3 bg-white rounded-2xl shadow-sm text-amber-500">
              <Zap />
            </div>
            <div>
              <h4 className="font-black">Solar Ready</h4>
              <p className="text-sm text-gray-600 font-medium">Filter for stays with 24/7 power backups.</p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <div className="p-3 bg-white rounded-2xl shadow-sm text-blue-500">
              <Droplets />
            </div>
            <div>
              <h4 className="font-black">Borehole Water</h4>
              <p className="text-sm text-gray-600 font-medium">Reliable water supply, guaranteed in verified stays.</p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <div className="p-3 bg-white rounded-2xl shadow-sm text-green-600">
              <CheckCircle2 />
            </div>
            <div>
              <h4 className="font-black">Local Payments</h4>
              <p className="text-sm text-gray-600 font-medium">Card today. Mobile Money next (MTN & Airtel).</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. TRENDING DESTINATIONS */}
      <section className="max-w-7xl mx-auto px-6 pt-16">
        <div className="flex items-end justify-between gap-6 mb-8">
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Trending destinations</h2>
            <p className="text-gray-500 font-medium">Start with the cities Zambians book most.</p>
          </div>
          <button
            onClick={() => navigate('/search')}
            className="hidden md:flex items-center gap-2 text-sm font-black text-blue-600 hover:text-blue-800 transition"
          >
            Explore all <ArrowRight size={18} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trending.map((t) => (
            <button
              key={t.id}
              onClick={() => navigate(`/search?location=${encodeURIComponent(t.name)}&category=All`)}
              className="group text-left rounded-[2rem] overflow-hidden border border-slate-200 bg-white shadow-sm hover:shadow-xl transition"
            >
              <div className="h-44 overflow-hidden">
                <img src={t.img} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" alt={t.name} />
              </div>
              <div className="p-5">
                <p className="font-black text-lg text-slate-900">{t.name}</p>
                <p className="text-sm text-slate-500 font-medium">{t.subtitle}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* 5. FEATURED COLLECTIONS */}
      <section className="max-w-7xl mx-auto px-6 pt-16">
        <div className="mb-8">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Browse by Mwaiseni collections</h2>
          <p className="text-gray-500 font-medium">Built for real Zambia problems: power, water, security.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {collections.map((c) => (
            <button
              key={c.tag}
              onClick={() => navigate(`/search?tag=${encodeURIComponent(c.tag)}`)}
              className="rounded-[2rem] border border-slate-200 bg-white p-6 text-left shadow-sm hover:shadow-xl transition"
            >
              <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-4">
                {c.icon}
              </div>
              <p className="font-black text-lg text-slate-900">{c.title}</p>
              <p className="text-sm text-slate-500 font-medium mt-1">{c.desc}</p>
              <div className="mt-5 inline-flex items-center gap-2 text-sm font-black text-blue-600">
                Browse <ArrowRight size={18} />
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* 6. PROPERTY GRID */}
      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Recommended for you</h2>
            <p className="text-gray-500 font-medium">Top rated properties in Zambia</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
          {filteredProperties.map((p) => (
            <div
              key={p.id}
              onClick={() => navigate(`/property/${p.id}`)}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden mb-4 shadow-md">
                <img
                  src={`${p.img}?w=800&q=80`}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-700 ease-out"
                  alt={p.name}
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    // favorites logic later
                  }}
                  className="absolute top-4 right-4 p-3 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/40 transition text-white"
                >
                  <Heart size={20} />
                </button>
                {p.verified && (
                  <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                    <ShieldCheck size={12} /> Verified
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-lg text-slate-900">{p.loc}, Zambia</h3>
                  <div className="flex items-center gap-1">
                    <Star size={16} fill="currentColor" className="text-amber-500" />
                    <span className="text-sm font-bold">{p.rating}</span>
                  </div>
                </div>
                <p className="text-slate-500 font-medium">{p.name}</p>

                {/* Features Icons */}
                <div className="flex gap-3 py-2">
                  {p.features.includes('Solar') && (
                    <div className="group/tip relative">
                      <Zap size={18} className="text-amber-500" />
                      <span className="invisible group-hover/tip:visible absolute -top-8 left-0 bg-black text-white text-[10px] px-2 py-1 rounded">
                        Solar Backup
                      </span>
                    </div>
                  )}
                  {p.features.includes('Borehole') && (
                    <div className="group/tip relative">
                      <Droplets size={18} className="text-blue-500" />
                      <span className="invisible group-hover/tip:visible absolute -top-8 left-0 bg-black text-white text-[10px] px-2 py-1 rounded">
                        Borehole
                      </span>
                    </div>
                  )}
                </div>

                <p className="text-xl font-black text-slate-900 pt-1">
                  K{p.price.toLocaleString()} <span className="font-medium text-slate-400 text-sm">/ night</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* 7. HOW IT WORKS */}
      <section className="bg-slate-50 border-t border-slate-200 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">How Mwaiseni works</h2>
            <p className="text-gray-500 font-medium">Simple, safe, and made for Zambia.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mb-5">
                <Search size={20} />
              </div>
              <h3 className="font-black text-xl">Search & filter</h3>
              <p className="text-slate-500 font-medium mt-2 leading-relaxed">
                Browse verified stays and filter for solar, borehole water, and secure areas.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700 mb-5">
                <ShieldCheck size={20} />
              </div>
              <h3 className="font-black text-xl">Book with confidence</h3>
              <p className="text-slate-500 font-medium mt-2 leading-relaxed">
                Transparent pricing, instant confirmation, and trusted hosts.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-700 mb-5">
                <CheckCircle2 size={20} />
              </div>
              <h3 className="font-black text-xl">Arrive & enjoy</h3>
              <p className="text-slate-500 font-medium mt-2 leading-relaxed">
                Check in smoothly and enjoy your stay — even when the power goes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. HOST CTA */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="rounded-[2.5rem] overflow-hidden border border-slate-200 bg-gradient-to-br from-blue-700 to-blue-950 text-white shadow-2xl">
          <div className="p-10 md:p-14 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 text-white/90 text-xs font-black uppercase tracking-widest mb-5">
                <Sparkles size={14} />
                Partner program
              </div>
              <h2 className="text-4xl md:text-5xl font-black leading-tight">
                Earn from your property — <br /> the Zambian way.
              </h2>
              <p className="mt-5 text-white/80 font-medium leading-relaxed">
                List your lodge, guesthouse, or apartment in minutes. Manage bookings, pricing, and availability from your partner dashboard.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => navigate('/partner')}
                  className="bg-white text-blue-900 px-7 py-4 rounded-2xl font-black hover:bg-blue-50 transition flex items-center justify-center gap-2"
                >
                  Become a host <ArrowRight size={18} />
                </button>
                <button
                  onClick={() => navigate('/partner/signup')}
                  className="bg-white/10 border border-white/20 text-white px-7 py-4 rounded-2xl font-black hover:bg-white/15 transition"
                >
                  Partner sign up
                </button>
              </div>
            </div>

            <div className="bg-white/10 border border-white/10 rounded-[2rem] p-8">
              <p className="text-xs font-black uppercase tracking-widest text-white/70">What hosts get</p>
              <ul className="mt-5 space-y-3 text-white font-bold">
                <li className="flex items-center gap-3">
                  <CheckCircle2 size={18} className="text-emerald-300" /> A professional listing page
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 size={18} className="text-emerald-300" /> Booking & calendar management
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 size={18} className="text-emerald-300" /> Earnings dashboard
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 size={18} className="text-emerald-300" /> Admin verification (trust badges)
                </li>
              </ul>

              <div className="mt-8 text-xs text-white/70 font-bold">
                Tip: Start with 5 great photos and accurate location — it boosts bookings massively.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. FOOTER */}
      <footer className="bg-slate-50 border-t border-slate-200 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="space-y-4">
              <h4 className="font-black text-xl text-blue-600 uppercase tracking-tighter">Mwaiseni</h4>
              <p className="text-sm text-gray-500 font-medium leading-relaxed">
                Zambia’s booking platform built for trust: power, water, and verified stays.
              </p>
            </div>

            <div className="space-y-3 text-sm font-bold text-slate-700">
              <p className="text-xs font-black uppercase tracking-widest text-slate-400">Explore</p>
              <button onClick={() => navigate('/search')} className="block hover:underline">Search stays</button>
              <button onClick={() => navigate('/saved')} className="block hover:underline">Saved</button>
              <button onClick={() => navigate('/trips')} className="block hover:underline">My trips</button>
            </div>

            <div className="space-y-3 text-sm font-bold text-slate-700">
              <p className="text-xs font-black uppercase tracking-widest text-slate-400">Partner</p>
              <button onClick={() => navigate('/partner')} className="block hover:underline">Partner portal</button>
              <button onClick={() => navigate('/partner/signup')} className="block hover:underline">List a property</button>
              <button onClick={() => navigate('/partner/earnings')} className="block hover:underline">Earnings</button>
            </div>

            <div className="space-y-3 text-sm font-bold text-slate-700">
              <p className="text-xs font-black uppercase tracking-widest text-slate-400">Support</p>
              <span className="block text-slate-500 font-medium">support@Mwaiseni.zm</span>
              <span className="block text-slate-500 font-medium">Lusaka, Zambia</span>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold text-gray-400">
            <p>© 2026 Mwaiseni Zambia Inc. All rights reserved.</p>
            <div className="flex gap-6">
              <span className="underline hover:text-slate-900 cursor-pointer">Privacy</span>
              <span className="underline hover:text-slate-900 cursor-pointer">Terms</span>
              <span className="underline hover:text-slate-900 cursor-pointer">Support</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;

