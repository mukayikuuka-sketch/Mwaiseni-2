import React, { useMemo, useState } from 'react';
import {
  Package,
  ListFilter,
  Edit3,
  Trash2,
  Eye,
  Plus,
  CheckCircle2,
  Clock,
  Search,
  ChevronDown,
  X,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PartnerInventoryHub = () => {
  const navigate = useNavigate();

  const [inventory, setInventory] = useState([
    {
      id: 1,
      name: 'Victoria Falls Luxury Suite',
      location: 'Livingstone',
      price: 'K2,500',
      status: 'Active',
      bookings: 12,
      image: 'https://images.unsplash.com/photo-1544124499-58912cbddada?w=600&q=80',
    },
    {
      id: 2,
      name: 'Lusaka Central Apartment',
      location: 'Lusaka',
      price: 'K1,200',
      status: 'Pending',
      bookings: 0,
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&q=80',
    },
  ]);

  // UI states
  const [showFilters, setShowFilters] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Active' | 'Pending'>('All');
  const [locationFilter, setLocationFilter] = useState<'All' | 'Lusaka' | 'Livingstone' | 'Ndola' | 'Kitwe'>('All');
  const [sortBy, setSortBy] = useState<'Newest' | 'BookingsHigh' | 'BookingsLow'>('Newest');

  const stats = useMemo(() => {
    const total = inventory.length;
    const active = inventory.filter((i) => i.status === 'Active').length;
    const pending = inventory.filter((i) => i.status === 'Pending').length;
    const totalBookings = inventory.reduce((sum, i) => sum + i.bookings, 0);

    return { total, active, pending, totalBookings };
  }, [inventory]);

  const filteredInventory = useMemo(() => {
    let list = [...inventory];

    // search
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (i) =>
          i.name.toLowerCase().includes(q) ||
          i.location.toLowerCase().includes(q)
      );
    }

    // status
    if (statusFilter !== 'All') {
      list = list.filter((i) => i.status === statusFilter);
    }

    // location
    if (locationFilter !== 'All') {
      list = list.filter((i) => i.location === locationFilter);
    }

    // sort
    if (sortBy === 'BookingsHigh') {
      list.sort((a, b) => b.bookings - a.bookings);
    } else if (sortBy === 'BookingsLow') {
      list.sort((a, b) => a.bookings - b.bookings);
    } else {
      // Newest: since we don't have createdAt, just keep original order
      // (later you’ll sort by createdAt)
    }

    return list;
  }, [inventory, search, statusFilter, locationFilter, sortBy]);

  const handleDelete = (id: number) => {
    const item = inventory.find((i) => i.id === id);
    if (!item) return;

    const ok = window.confirm(`Delete "${item.name}"? This cannot be undone.`);
    if (!ok) return;

    setInventory((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Inventory Hub
          </h1>
          <p className="text-slate-500 font-medium">
            Manage your active rooms and lodges
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setShowFilters((v) => !v)}
            className={`text-slate-700 flex items-center gap-2 font-black bg-white border px-4 py-2.5 rounded-xl transition ${
              showFilters
                ? 'border-blue-200 bg-blue-50 text-blue-700'
                : 'border-slate-200 hover:bg-slate-50'
            }`}
          >
            <ListFilter size={18} /> Filters
          </button>

          <button
            onClick={() => navigate('/owner/add-property')}
            className="bg-blue-600 text-white flex items-center gap-2 font-black px-6 py-2.5 rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-100 transition active:scale-95"
          >
            <Plus size={18} /> Add Property
          </button>
        </div>
      </div>

      {/* QUICK STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm">
          <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">
            Total listings
          </p>
          <p className="text-2xl font-black text-slate-900 mt-1">{stats.total}</p>
        </div>
        <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm">
          <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">
            Active
          </p>
          <p className="text-2xl font-black text-emerald-700 mt-1">{stats.active}</p>
        </div>
        <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm">
          <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">
            Pending
          </p>
          <p className="text-2xl font-black text-amber-700 mt-1">{stats.pending}</p>
        </div>
        <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm">
          <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">
            Total bookings
          </p>
          <p className="text-2xl font-black text-slate-900 mt-1">{stats.totalBookings}</p>
        </div>
      </div>

      {/* FILTERS PANEL */}
      {showFilters && (
        <div className="bg-white border border-slate-200 rounded-[2rem] p-5 mb-8 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <p className="font-black text-slate-900">Filters</p>
            <button
              onClick={() => setShowFilters(false)}
              className="p-2 rounded-xl hover:bg-slate-50 text-slate-500"
            >
              <X size={18} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <label className="text-[10px] text-slate-400 font-black uppercase tracking-widest">
                Search
              </label>
              <div className="mt-2 flex items-center gap-3 px-4 py-3 rounded-2xl bg-slate-50 border border-slate-100">
                <Search size={18} className="text-slate-400" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by name or city..."
                  className="w-full bg-transparent outline-none font-bold text-slate-800"
                />
              </div>
            </div>

            {/* Status */}
            <div>
              <label className="text-[10px] text-slate-400 font-black uppercase tracking-widest">
                Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="mt-2 w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-100 font-black text-slate-800 outline-none"
              >
                <option value="All">All</option>
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
              </select>
            </div>

            {/* Location */}
            <div>
              <label className="text-[10px] text-slate-400 font-black uppercase tracking-widest">
                Location
              </label>
              <select
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value as any)}
                className="mt-2 w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-100 font-black text-slate-800 outline-none"
              >
                <option value="All">All</option>
                <option value="Lusaka">Lusaka</option>
                <option value="Livingstone">Livingstone</option>
                <option value="Ndola">Ndola</option>
                <option value="Kitwe">Kitwe</option>
              </select>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-sm text-slate-500 font-bold">
              Showing <span className="text-slate-900 font-black">{filteredInventory.length}</span> results
            </p>

            <button
              onClick={() => {
                setSearch('');
                setStatusFilter('All');
                setLocationFilter('All');
                setSortBy('Newest');
              }}
              className="text-slate-700 font-black px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 transition"
            >
              Reset filters
            </button>
          </div>
        </div>
      )}

      {/* TOP ROW: SORT */}
      {inventory.length > 0 && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <p className="text-sm text-slate-500 font-bold">
            Your listings
          </p>

          <div className="flex items-center gap-3">
            <div className="text-sm font-black text-slate-500">Sort:</div>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="appearance-none pl-4 pr-10 py-2.5 rounded-2xl bg-white border border-slate-200 font-black text-slate-900 outline-none hover:bg-slate-50 transition"
              >
                <option value="Newest">Newest</option>
                <option value="BookingsHigh">Bookings (High)</option>
                <option value="BookingsLow">Bookings (Low)</option>
              </select>
              <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>
      )}

      {/* LIST */}
      {filteredInventory.length > 0 ? (
        <div className="grid gap-4">
          {filteredInventory.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-slate-100 rounded-[2rem] p-4 flex flex-col md:flex-row md:items-center gap-6 hover:shadow-xl hover:shadow-slate-100 transition-all group"
            >
              {/* Thumbnail */}
              <div className="w-full md:w-24 h-48 md:h-24 rounded-[1.5rem] overflow-hidden shrink-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                />
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-1">
                  <h3 className="font-black text-slate-900 text-lg">
                    {item.name}
                  </h3>

                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1 ${
                      item.status === 'Active'
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-amber-100 text-amber-700'
                    }`}
                  >
                    {item.status === 'Active' ? (
                      <CheckCircle2 size={12} />
                    ) : (
                      <Clock size={12} />
                    )}
                    {item.status}
                  </span>
                </div>

                <p className="text-slate-500 font-bold text-sm">
                  {item.location} ·{' '}
                  <span className="text-blue-600">{item.price}/night</span>
                </p>
              </div>

              {/* Stats */}
              <div className="hidden md:block px-8 border-x border-slate-50">
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">
                  Total Bookings
                </p>
                <p className="text-xl font-black text-slate-900">
                  {item.bookings}
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-2 md:pr-4">
                <button
                  onClick={() => navigate(`/owner/listings/${item.id}`)}
                  className="p-3 bg-slate-50 text-slate-500 rounded-2xl hover:bg-blue-50 hover:text-blue-700 transition"
                  title="View listing"
                >
                  <Eye size={20} />
                </button>

                <button
                  onClick={() => navigate(`/owner/edit-property/${item.id}`)}
                  className="p-3 bg-slate-50 text-slate-500 rounded-2xl hover:bg-slate-900 hover:text-white transition"
                  title="Edit listing"
                >
                  <Edit3 size={20} />
                </button>

                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-3 bg-slate-50 text-red-300 rounded-2xl hover:bg-red-50 hover:text-red-600 transition"
                  title="Delete listing"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : inventory.length > 0 ? (
        // Empty after filtering
        <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-[3rem] py-20 text-center">
          <p className="text-slate-700 font-black text-xl mb-2">
            No results found
          </p>
          <p className="text-slate-400 font-medium mb-8">
            Try clearing filters or searching a different name.
          </p>
          <button
            onClick={() => {
              setSearch('');
              setStatusFilter('All');
              setLocationFilter('All');
              setSortBy('Newest');
            }}
            className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black transition active:scale-95"
          >
            Reset filters
          </button>
        </div>
      ) : (
        // YOUR ORIGINAL EMPTY STATE (no listings at all)
        <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-[3rem] py-32 text-center">
          <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
            <Package className="text-slate-200" size={40} />
          </div>
          <p className="text-slate-500 font-black text-xl mb-2">No listings yet</p>
          <p className="text-slate-400 font-medium mb-8">
            Start your journey as a Mwaiseni partner.
          </p>
          <button
            onClick={() => navigate('/owner/add-property')}
            className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black transition active:scale-95"
          >
            Create Your First Listing
          </button>
        </div>
      )}
    </div>
  );
};

export default PartnerInventoryHub;

