import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  ChevronDown,
  Zap,
  Droplet,
  Star,
  Wind,
  Map as MapIcon,
  LayoutGrid,
  ShieldCheck,
  Search,
  X,
  SlidersHorizontal,
} from "lucide-react";

// Types for better safety
interface Property {
  id: number;
  name: string;
  location: string;
  price: number;
  rating: number;
  img: string;
  type: string;
  essentials: string[];
}

const SearchResultsPage: React.FC = () => {
  const [propertyType, setPropertyType] = useState("All Stays");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");

  // Mini “search” modal (still frontend only)
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  const categories = ["All Stays", "Hotels", "Lodges", "Apartments", "Guest Houses"];

  // Dropdown outside click
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!dropdownRef.current) return;
      if (!dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // 1) EXTENDED DATA (same as yours)
  const allProperties: Property[] = [
    {
      id: 1,
      name: "Zambezi Luxury Lodge",
      location: "Livingstone",
      price: 1850,
      rating: 4.9,
      type: "Lodges",
      essentials: ["Solar", "Borehole"],
      img: "https://images.unsplash.com/photo-1549180030-48bf079fb38a",
    },
    {
      id: 2,
      name: "Rhodes Park Executive",
      location: "Lusaka",
      price: 1200,
      rating: 4.7,
      type: "Apartments",
      essentials: ["Solar", "AC"],
      img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
    },
    {
      id: 3,
      name: "Riverside Boutique",
      location: "Kitwe",
      price: 950,
      rating: 4.5,
      type: "Hotels",
      essentials: ["Borehole"],
      img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
    },
    {
      id: 4,
      name: "Kabulonga Gardens",
      location: "Lusaka",
      price: 2100,
      rating: 4.8,
      type: "Apartments",
      essentials: ["Solar", "Borehole", "AC"],
      img: "https://images.unsplash.com/photo-1512918766775-d56067b553bb",
    },
    {
      id: 5,
      name: "Siavonga Sun Bay",
      location: "Siavonga",
      price: 3400,
      rating: 4.9,
      type: "Lodges",
      essentials: ["Solar"],
      img: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2",
    },
  ];

  // 2) FILTER LOGIC
  const toggleFilter = (filter: string) => {
    setActiveFilters((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
    );
  };

  const filteredResults = useMemo(() => {
    const query = searchText.trim().toLowerCase();

    return allProperties.filter((p) => {
      const matchesType = propertyType === "All Stays" || p.type === propertyType;
      const matchesEssentials = activeFilters.every((f) => p.essentials.includes(f));

      // simple name + location search
      const matchesSearch =
        query.length === 0 ||
        p.name.toLowerCase().includes(query) ||
        p.location.toLowerCase().includes(query);

      return matchesType && matchesEssentials && matchesSearch;
    });
  }, [propertyType, activeFilters, searchText]);

  const activeFilterCount = activeFilters.length + (propertyType !== "All Stays" ? 1 : 0);

  return (
    <div className="min-h-screen bg-slate-50/50">
      {/* 1) SEARCH & FILTER HEADER */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search Summary/Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="w-full md:w-auto text-left flex items-center gap-3 bg-slate-100 px-4 py-2 rounded-full border border-slate-200 cursor-pointer hover:shadow-md transition"
            >
              <Search size={18} className="text-blue-600" />
              <div className="text-sm">
                <span className="font-black text-slate-900">Anywhere in Zambia</span>
                <span className="mx-2 text-slate-300">|</span>
                <span className="text-slate-500 font-medium">
                  Any dates · Guests
                </span>
              </div>

              {activeFilterCount > 0 && (
                <div className="ml-auto hidden md:flex items-center gap-2">
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Filters
                  </div>
                  <div className="px-2 py-1 rounded-full bg-blue-600 text-white text-[10px] font-black">
                    {activeFilterCount}
                  </div>
                </div>
              )}
            </button>

            {/* View Toggler */}
            <div className="flex bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => setViewMode("grid")}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-black transition ${
                  viewMode === "grid"
                    ? "bg-white shadow-sm text-blue-600"
                    : "text-slate-500"
                }`}
              >
                <LayoutGrid size={16} /> List
              </button>
              <button
                onClick={() => setViewMode("map")}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-black transition ${
                  viewMode === "map"
                    ? "bg-white shadow-sm text-blue-600"
                    : "text-slate-500"
                }`}
              >
                <MapIcon size={16} /> Map
              </button>
            </div>
          </div>

          {/* FILTER ROW */}
          <div className="flex flex-wrap items-center gap-3 mt-4 pt-4 border-t border-slate-100">
            {/* Type Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen((v) => !v)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black tracking-tight border transition ${
                  propertyType !== "All Stays"
                    ? "bg-blue-600 border-blue-600 text-white"
                    : "bg-white border-slate-200 text-slate-700"
                }`}
              >
                <SlidersHorizontal size={14} />
                {propertyType.toUpperCase()} <ChevronDown size={14} />
              </button>

              {isDropdownOpen && (
                <div className="absolute top-11 left-0 w-52 bg-white border border-slate-200 shadow-2xl rounded-2xl overflow-hidden z-50">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setPropertyType(cat);
                        setIsDropdownOpen(false);
                      }}
                      className="w-full text-left px-5 py-3 hover:bg-blue-50 text-xs font-bold transition border-b border-slate-50 last:border-0"
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="h-6 w-[1px] bg-slate-200 mx-1 hidden md:block"></div>

            {/* Essential Toggles */}
            <button
              onClick={() => toggleFilter("Solar")}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black transition border ${
                activeFilters.includes("Solar")
                  ? "bg-amber-100 border-amber-300 text-amber-700"
                  : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
              }`}
            >
              <Zap
                size={14}
                fill={activeFilters.includes("Solar") ? "currentColor" : "none"}
              />
              SOLAR BACKUP
            </button>

            <button
              onClick={() => toggleFilter("Borehole")}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black transition border ${
                activeFilters.includes("Borehole")
                  ? "bg-blue-100 border-blue-300 text-blue-700"
                  : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
              }`}
            >
              <Droplet
                size={14}
                fill={activeFilters.includes("Borehole") ? "currentColor" : "none"}
              />
              BOREHOLE
            </button>

            <button
              onClick={() => toggleFilter("AC")}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black transition border ${
                activeFilters.includes("AC")
                  ? "bg-emerald-100 border-emerald-300 text-emerald-700"
                  : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
              }`}
            >
              <Wind size={14} />
              AIR CON
            </button>

            {activeFilters.length > 0 || propertyType !== "All Stays" ? (
              <button
                onClick={() => {
                  setActiveFilters([]);
                  setPropertyType("All Stays");
                }}
                className="text-xs font-black text-slate-400 hover:text-red-500 flex items-center gap-1 ml-2"
              >
                <X size={14} /> Clear
              </button>
            ) : null}
          </div>
        </div>
      </header>

      {/* 2) RESULTS CONTENT */}
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        <div className="mb-6">
          <h1 className="text-xl font-black text-slate-900">
            {filteredResults.length} stays in Zambia
          </h1>
          <p className="text-sm text-slate-500 font-medium">
            Showing top-rated {propertyType.toLowerCase()} with active filters
          </p>
        </div>

        {/* MAP MODE (placeholder panel, no backend) */}
        {viewMode === "map" ? (
          <div className="bg-white border border-slate-200 rounded-[2.5rem] p-10 text-center shadow-sm">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapIcon size={34} className="text-slate-300" />
            </div>
            <h3 className="text-xl font-black text-slate-900">Map view coming next</h3>
            <p className="text-slate-500 font-medium mt-2 max-w-xl mx-auto">
              Your UI already supports switching. Next step is plugging in Google Maps or Mapbox.
              For now, use the List view.
            </p>
            <button
              onClick={() => setViewMode("grid")}
              className="mt-6 px-8 py-3 bg-blue-600 text-white rounded-2xl font-black hover:bg-blue-700 transition shadow-lg shadow-blue-200"
            >
              Switch to List
            </button>
          </div>
        ) : filteredResults.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
            {filteredResults.map((p) => (
              <Link to={`/property/${p.id}`} key={p.id} className="group">
                <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-slate-200 mb-4 shadow-sm group-hover:shadow-xl transition-all duration-500">
                  <img
                    src={`${p.img}?w=600&h=800&fit=crop`}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700 ease-out"
                    loading="lazy"
                  />

                  {/* Floating Essential Tags */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {p.essentials.includes("Solar") && (
                      <div className="bg-amber-400 text-slate-900 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter flex items-center gap-1 shadow-lg">
                        <Zap size={10} fill="currentColor" /> Solar Ready
                      </div>
                    )}
                    {p.essentials.includes("Borehole") && (
                      <div className="bg-white/95 backdrop-blur text-blue-600 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter flex items-center gap-1 shadow-lg">
                        <Droplet size={10} fill="currentColor" /> Borehole
                      </div>
                    )}
                    {p.essentials.includes("AC") && (
                      <div className="bg-emerald-500 text-white px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter flex items-center gap-1 shadow-lg">
                        <Wind size={10} /> AC
                      </div>
                    )}
                  </div>

                  {/* Trust badge */}
                  <div className="absolute top-4 right-4 p-2.5 bg-black/10 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-blue-600 transition">
                    <ShieldCheck size={18} />
                  </div>
                </div>

                <div className="px-1">
                  <div className="flex justify-between items-start mb-1 gap-3">
                    <h2 className="font-black text-slate-900 leading-tight group-hover:text-blue-600 transition line-clamp-2">
                      {p.name}
                    </h2>
                    <div className="flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded-md shrink-0">
                      <Star size={12} fill="currentColor" className="text-amber-500" />
                      <span className="text-xs font-black">{p.rating}</span>
                    </div>
                  </div>

                  <p className="text-slate-500 text-xs font-black flex items-center gap-1 uppercase tracking-wide">
                    <MapPin size={12} className="text-blue-500" /> {p.location}
                  </p>

                  <div className="mt-3 flex items-baseline gap-1">
                    <span className="text-lg font-black text-slate-900 font-mono">
                      K{p.price.toLocaleString()}
                    </span>
                    <span className="text-slate-400 text-[10px] font-bold uppercase">
                      per night
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-[3rem] border-2 border-dashed border-slate-200">
            <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search size={32} className="text-slate-300" />
            </div>
            <h3 className="text-xl font-black text-slate-900">No stays found</h3>
            <p className="text-slate-500 font-medium mt-2">
              Try removing some filters or searching another location.
            </p>
            <button
              onClick={() => {
                setActiveFilters([]);
                setPropertyType("All Stays");
                setSearchText("");
              }}
              className="mt-6 px-8 py-3 bg-blue-600 text-white rounded-2xl font-black hover:bg-blue-700 transition shadow-lg shadow-blue-200"
            >
              Reset all filters
            </button>
          </div>
        )}
      </main>

      {/* SEARCH MODAL (simple frontend) */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="w-full max-w-xl bg-white rounded-[2.5rem] shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Search stays
                </p>
                <h3 className="text-xl font-black text-slate-900">Where are you going?</h3>
              </div>
              <button
                onClick={() => setIsSearchOpen(false)}
                className="p-2 rounded-xl hover:bg-slate-100 transition"
              >
                <X />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">
                  City or property name
                </label>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    placeholder="e.g. Lusaka, Livingstone, Zambezi..."
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl font-bold focus:border-blue-500 focus:bg-white outline-none transition"
                    autoFocus
                  />
                </div>
                <p className="text-[11px] text-slate-500 font-medium">
                  This is frontend-only for now. Later it will connect to your real search API.
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => {
                    setSearchText("");
                  }}
                  className="flex-1 py-4 rounded-2xl font-black bg-white border-2 border-slate-200 text-slate-700 hover:bg-slate-50 transition"
                >
                  Clear
                </button>
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="flex-1 py-4 rounded-2xl font-black bg-blue-600 text-white hover:bg-blue-700 transition shadow-lg shadow-blue-200"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResultsPage;

