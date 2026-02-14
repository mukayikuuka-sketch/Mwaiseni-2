import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  MapPin,
  Star,
  Share2,
  Heart,
  Zap,
  Droplets,
  ShieldCheck,
  Check,
  X,
  ChevronRight,
  Users,
  BedDouble,
  Wifi,
  Coffee,
  Wind,
  Map as MapIcon,
  Copy,
  ExternalLink,
  Phone,
  MessageCircle,
} from "lucide-react";

type Room = {
  id: string;
  name: string;
  price: number;
  guests: number;
  bed: string;
  inventory: number;
};

const PropertyDetailsPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);

  // NOTE: This is still static data (frontend-only), just more complete.
  const property = useMemo(() => {
    return {
      id: id || "1",
      name: "Zambezi River Lodge",
      location: "Livingstone, Zambia",
      address: "Mosi-oa-Tunya Road, Livingstone 10101",
      rating: 9.4,
      ratingText: "Wonderful",
      reviews: 128,
      description:
        "Located right on the banks of the Zambezi, this lodge offers world-class service, a stunning infinity pool, and guaranteed 24/7 power through our hybrid solar system.",
      images: [
        "https://images.unsplash.com/photo-1549180030-48bf079fb38a?w=1200",
        "https://images.unsplash.com/photo-1516422213488-97f794bb0e02?w=800",
        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800",
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800",
        "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800",
      ],
      backups: {
        power: "Solar + 150kVA Genset",
        water: "Private Borehole + 10kL Reserve",
        security: "24/7 Rapid Response + Electric Fence",
      },
      amenities: [
        { label: "Free WiFi", icon: <Wifi size={18} className="text-blue-600" /> },
        { label: "Air Conditioning", icon: <Wind size={18} className="text-blue-600" /> },
        { label: "Breakfast", icon: <Coffee size={18} className="text-blue-600" /> },
        { label: "Airport Shuttle", icon: <MapIcon size={18} className="text-blue-600" /> },
      ],
      policies: {
        checkIn: "From 14:00",
        checkOut: "Until 11:00",
        cancellation: "Free cancellation within 24 hours of booking (Mwaiseni policy).",
        payment: "Mobile Money + Card supported (Airtel / MTN / Visa / MasterCard).",
      },
      rooms: [
        { id: "1", name: "Executive River Suite", price: 2450, guests: 2, bed: "1 King Bed", inventory: 2 },
        { id: "2", name: "Standard Garden Room", price: 1850, guests: 2, bed: "1 Queen Bed", inventory: 5 },
        { id: "3", name: "Family Safari Tent", price: 3200, guests: 4, bed: "2 Double Beds", inventory: 1 },
      ] as Room[],
    };
  }, [id]);

  const selectedRoomObj = useMemo(() => {
    return property.rooms.find((r) => r.id === selectedRoom) || null;
  }, [property.rooms, selectedRoom]);

  // ESC closes gallery
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsGalleryOpen(false);
    };
    if (isGalleryOpen) window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isGalleryOpen]);

  const handleReserve = () => {
    if (!selectedRoom) {
      const el = document.getElementById("availability");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    // ✅ FIXED: Navigate to the correct checkout route with property ID and room ID
    navigate(`/checkout/${property.id}?roomId=${selectedRoom}`);
  };

  const handleShare = async () => {
    try {
      const url = window.location.href;
      if (navigator.share) {
        await navigator.share({
          title: property.name,
          text: `Check out ${property.name} on Mwaiseni`,
          url,
        });
        return;
      }
      await navigator.clipboard.writeText(url);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 1500);
    } catch {
      // silent
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 1500);
    }
  };

  const formatMoney = (amount: number) => {
    return `K${amount.toLocaleString()}`;
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-24 selection:bg-blue-100">
      {/* 1) IMAGE GALLERY MODAL */}
      {isGalleryOpen && (
        <div className="fixed inset-0 z-[100] bg-white flex flex-col animate-in fade-in duration-200">
          <div className="p-4 flex justify-between items-center border-b border-slate-200">
            <div>
              <h2 className="font-black text-xl">{property.name}</h2>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">{property.location}</p>
            </div>
            <button
              onClick={() => setIsGalleryOpen(false)}
              className="p-3 hover:bg-slate-100 rounded-full transition"
              aria-label="Close gallery"
            >
              <X size={28} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 md:p-10 bg-slate-50">
            <div className="max-w-4xl mx-auto space-y-6">
              {property.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  className="w-full rounded-2xl shadow-xl"
                  alt={`${property.name} photo ${idx + 1}`}
                  loading="lazy"
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 2) TOP NAV BAR */}
      <div className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <nav className="flex items-center gap-2 text-xs font-black uppercase tracking-tighter text-blue-600">
            <Link to="/" className="hover:text-blue-800 transition">
              Home
            </Link>
            <ChevronRight size={14} className="text-slate-300" />
            <span className="text-slate-400">{property.location.split(",")[0]}</span>
          </nav>

          <div className="flex gap-2 items-center">
            <button
              onClick={handleShare}
              className="p-2 hover:bg-slate-100 rounded-full transition text-slate-700 relative"
              aria-label="Share listing"
              title="Share"
            >
              <Share2 size={18} />
              {shareCopied && (
                <span className="absolute -bottom-9 right-0 bg-slate-900 text-white text-[10px] px-2 py-1 rounded-full">
                  Link copied
                </span>
              )}
            </button>

            <button
              onClick={() => setIsSaved((v) => !v)}
              className={`p-2 rounded-full transition ${
                isSaved ? "bg-red-50 text-red-600" : "hover:bg-slate-100 text-slate-700"
              }`}
              aria-label="Save listing"
              title="Save"
            >
              <Heart size={18} className={isSaved ? "fill-red-500" : ""} />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-8">
        {/* 3) HEADER */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-black tracking-tight text-slate-900">{property.name}</h1>

            <div className="flex flex-wrap items-center gap-3 mt-3 text-sm font-bold text-slate-500">
              <span className="flex items-center gap-2">
                <MapPin size={18} className="text-blue-600" />
                <span className="underline decoration-slate-300 underline-offset-4">{property.address}</span>
              </span>

              <span className="flex items-center gap-1 text-slate-400">
                <Star size={16} className="text-amber-500 fill-amber-500" />
                {property.rating} • {property.reviews} reviews
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-white p-3 rounded-2xl border border-slate-200 shadow-sm">
            <div className="text-right">
              <p className="font-black text-lg leading-none">{property.ratingText}</p>
              <p className="text-[10px] font-black text-blue-600 uppercase mt-1">
                {property.reviews} verified reviews
              </p>
            </div>
            <div className="bg-blue-600 text-white w-12 h-12 flex items-center justify-center rounded-xl font-black text-xl shadow-lg shadow-blue-100">
              {property.rating}
            </div>
          </div>
        </div>

        {/* 4) PHOTO GRID */}
        <div
          onClick={() => setIsGalleryOpen(true)}
          className="grid grid-cols-1 md:grid-cols-4 gap-3 h-[280px] md:h-[500px] mb-8 rounded-[2rem] overflow-hidden cursor-pointer group"
          role="button"
          tabIndex={0}
          aria-label="Open photo gallery"
        >
          <div className="md:col-span-2 md:row-span-2 relative overflow-hidden">
            <img
              src={property.images[0]}
              className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
              alt={`${property.name} main photo`}
            />
          </div>

          <div className="hidden md:block overflow-hidden">
            <img src={property.images[1]} className="w-full h-full object-cover hover:opacity-90 transition" alt="" />
          </div>

          <div className="hidden md:block overflow-hidden rounded-tr-[2rem]">
            <img src={property.images[2]} className="w-full h-full object-cover hover:opacity-90 transition" alt="" />
          </div>

          <div className="hidden md:block overflow-hidden">
            <img src={property.images[3]} className="w-full h-full object-cover hover:opacity-90 transition" alt="" />
          </div>

          <div className="hidden md:block relative overflow-hidden rounded-br-[2rem]">
            <img src={property.images[4]} className="w-full h-full object-cover" alt="" />
            <div className="absolute inset-0 bg-slate-900/60 flex flex-col items-center justify-center text-white backdrop-blur-[2px]">
              <span className="text-2xl font-black">+12</span>
              <span className="text-[10px] font-bold uppercase tracking-widest">Photos</span>
            </div>
          </div>
        </div>

        {/* 5) ZAMBIA TRUST BAR */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <div className="bg-amber-50 border border-amber-100 p-5 rounded-3xl flex items-center gap-4 shadow-sm">
            <div className="p-3 bg-white rounded-2xl text-amber-500 shadow-sm">
              <Zap />
            </div>
            <div>
              <h4 className="font-black text-xs uppercase text-amber-800">Power Backup</h4>
              <p className="text-sm font-bold text-amber-900">{property.backups.power}</p>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-100 p-5 rounded-3xl flex items-center gap-4 shadow-sm">
            <div className="p-3 bg-white rounded-2xl text-blue-500 shadow-sm">
              <Droplets />
            </div>
            <div>
              <h4 className="font-black text-xs uppercase text-blue-800">Water Supply</h4>
              <p className="text-sm font-bold text-blue-900">{property.backups.water}</p>
            </div>
          </div>

          <div className="bg-emerald-50 border border-emerald-100 p-5 rounded-3xl flex items-center gap-4 shadow-sm">
            <div className="p-3 bg-white rounded-2xl text-emerald-600 shadow-sm">
              <ShieldCheck />
            </div>
            <div>
              <h4 className="font-black text-xs uppercase text-emerald-800">Security</h4>
              <p className="text-sm font-bold text-emerald-900">{property.backups.security}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* LEFT COLUMN */}
          <div className="lg:col-span-2 space-y-12">
            {/* About */}
            <section>
              <h2 className="text-2xl font-black mb-4">About this stay</h2>
              <p className="text-slate-600 leading-relaxed font-medium">{property.description}</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                {property.amenities.map((a, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-slate-700 font-bold text-sm">
                    {a.icon}
                    {a.label}
                  </div>
                ))}
              </div>
            </section>

            {/* Policies */}
            <section>
              <h2 className="text-2xl font-black mb-4">Policies</h2>

              <div className="bg-white border border-slate-200 rounded-[2rem] p-6 md:p-8 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Check-in</p>
                    <p className="font-black text-slate-900 mt-1">{property.policies.checkIn}</p>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Check-out</p>
                    <p className="font-black text-slate-900 mt-1">{property.policies.checkOut}</p>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 md:col-span-2">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Cancellation</p>
                    <p className="font-bold text-slate-700 mt-1">{property.policies.cancellation}</p>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 md:col-span-2">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Payment</p>
                    <p className="font-bold text-slate-700 mt-1">{property.policies.payment}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Rooms */}
            <section id="availability">
              <div className="flex items-end justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-2xl font-black">Select your room</h2>
                  <p className="text-sm text-slate-500 font-medium mt-1">
                    Choose the best option for your stay in {property.location.split(",")[0]}.
                  </p>
                </div>
                <div className="hidden md:flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest">
                  <span className="px-3 py-2 rounded-full bg-slate-100 border border-slate-200">Taxes included</span>
                  <span className="px-3 py-2 rounded-full bg-slate-100 border border-slate-200">Per night</span>
                </div>
              </div>

              {/* Desktop Table */}
              <div className="hidden md:block bg-white border border-slate-200 rounded-[2rem] overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-slate-50 text-[10px] uppercase font-black text-slate-400 tracking-widest border-b">
                    <tr>
                      <th className="p-6">Room Type</th>
                      <th className="p-6">Capacity</th>
                      <th className="p-6">Price</th>
                      <th className="p-6"></th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {property.rooms.map((room) => (
                      <tr
                        key={room.id}
                        className={`transition ${
                          selectedRoom === room.id ? "bg-blue-50/50" : "hover:bg-slate-50/50"
                        }`}
                      >
                        <td className="p-6">
                          <p className="font-black text-slate-900 text-lg">{room.name}</p>
                          <div className="flex flex-col gap-1 mt-2">
                            <p className="text-xs text-slate-500 font-bold flex items-center gap-1">
                              <BedDouble size={14} className="text-blue-500" /> {room.bed}
                            </p>

                            {room.inventory < 3 && (
                              <span className="bg-red-100 text-red-700 text-[10px] font-black px-2 py-0.5 rounded-full w-fit mt-1 animate-pulse">
                                ONLY {room.inventory} LEFT!
                              </span>
                            )}
                          </div>
                        </td>

                        <td className="p-6">
                          <div className="flex gap-0.5">
                            {Array.from({ length: room.guests }).map((_, i) => (
                              <Users key={i} size={18} className="text-slate-400" />
                            ))}
                          </div>
                        </td>

                        <td className="p-6">
                          <div className="flex flex-col">
                            <span className="text-2xl font-black text-slate-900 font-mono">
                              {formatMoney(room.price)}
                            </span>
                            <span className="text-[10px] text-slate-400 font-black uppercase">per night</span>
                          </div>
                        </td>

                        <td className="p-6">
                          <button
                            onClick={() => setSelectedRoom(room.id)}
                            className={`w-full py-3 rounded-2xl font-black text-sm transition-all shadow-md ${
                              selectedRoom === room.id
                                ? "bg-blue-600 text-white shadow-blue-200 ring-4 ring-blue-50"
                                : "bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 shadow-slate-100"
                            }`}
                          >
                            {selectedRoom === room.id ? "Selected" : "Choose"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden space-y-4">
                {property.rooms.map((room) => {
                  const active = selectedRoom === room.id;
                  return (
                    <div
                      key={room.id}
                      className={`bg-white border rounded-[2rem] p-5 shadow-sm transition ${
                        active ? "border-blue-600 ring-4 ring-blue-50" : "border-slate-200"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="font-black text-lg text-slate-900">{room.name}</p>
                          <p className="text-xs text-slate-500 font-bold mt-1 flex items-center gap-1">
                            <BedDouble size={14} className="text-blue-500" />
                            {room.bed}
                          </p>

                          <div className="flex items-center gap-2 mt-2">
                            <div className="flex gap-0.5">
                              {Array.from({ length: room.guests }).map((_, i) => (
                                <Users key={i} size={18} className="text-slate-400" />
                              ))}
                            </div>

                            {room.inventory < 3 && (
                              <span className="bg-red-100 text-red-700 text-[10px] font-black px-2 py-0.5 rounded-full animate-pulse">
                                ONLY {room.inventory} LEFT
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="text-right">
                          <p className="text-2xl font-black font-mono">{formatMoney(room.price)}</p>
                          <p className="text-[10px] text-slate-400 font-black uppercase">per night</p>
                        </div>
                      </div>

                      <button
                        onClick={() => setSelectedRoom(room.id)}
                        className={`w-full mt-4 py-4 rounded-[1.5rem] font-black text-base transition ${
                          active ? "bg-blue-600 text-white" : "bg-slate-50 border-2 border-blue-600 text-blue-700"
                        }`}
                      >
                        {active ? "Selected" : "Choose this room"}
                      </button>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Support / Contact */}
            <section>
              <h2 className="text-2xl font-black mb-4">Need help?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                      <MessageCircle />
                    </div>
                    <div>
                      <p className="font-black">Chat Support</p>
                      <p className="text-xs text-slate-500 font-bold">Fast response</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                      <Phone />
                    </div>
                    <div>
                      <p className="font-black">Call</p>
                      <p className="text-xs text-slate-500 font-bold">Zambia-friendly</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                      <ExternalLink />
                    </div>
                    <div>
                      <p className="font-black">FAQs</p>
                      <p className="text-xs text-slate-500 font-bold">Policies & payments</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN: STICKY SUMMARY */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-4">
              <div className="bg-white border border-slate-200 p-7 rounded-[2.5rem] shadow-xl shadow-slate-200/50">
                <h3 className="font-black text-xl mb-6">Reservation Details</h3>

                <div className="space-y-4 mb-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                      <p className="text-[10px] font-black text-slate-400 uppercase">Check-in</p>
                      <p className="font-bold text-sm">Feb 14, 2026</p>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                      <p className="text-[10px] font-black text-slate-400 uppercase">Check-out</p>
                      <p className="font-bold text-sm">Feb 17, 2026</p>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Selected room</p>

                    {!selectedRoomObj ? (
                      <p className="text-sm font-bold text-slate-600 mt-1">No room selected yet</p>
                    ) : (
                      <div className="mt-2">
                        <p className="font-black text-slate-900">{selectedRoomObj.name}</p>
                        <p className="text-xs text-slate-500 font-bold mt-1">
                          {selectedRoomObj.bed} • Up to {selectedRoomObj.guests} guests
                        </p>
                        <p className="text-lg font-black font-mono mt-2">{formatMoney(selectedRoomObj.price)} / night</p>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  disabled={!selectedRoom}
                  onClick={handleReserve}
                  className="w-full bg-blue-600 text-white py-5 rounded-[1.5rem] font-black text-lg disabled:opacity-30 disabled:grayscale transition-all hover:bg-blue-700 active:scale-95 shadow-lg shadow-blue-200"
                >
                  Reserve Now
                </button>

                {!selectedRoom && (
                  <button
                    onClick={() => {
                      const el = document.getElementById("availability");
                      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                    className="w-full mt-3 py-4 rounded-[1.25rem] font-black text-sm border-2 border-blue-600 text-blue-700 bg-blue-50 hover:bg-blue-100 transition"
                  >
                    Choose a room first
                  </button>
                )}

                <div className="mt-6 space-y-3">
                  <div className="flex gap-3 text-xs font-bold text-emerald-700 items-center">
                    <div className="p-1 bg-emerald-100 rounded-full">
                      <Check size={12} />
                    </div>
                    <span>Instant Confirmation</span>
                  </div>

                  <div className="flex gap-3 text-xs font-bold text-emerald-700 items-center">
                    <div className="p-1 bg-emerald-100 rounded-full">
                      <Check size={12} />
                    </div>
                    <span>Mobile Money Accepted</span>
                  </div>

                  <div className="flex gap-3 text-xs font-bold text-emerald-700 items-center">
                    <div className="p-1 bg-emerald-100 rounded-full">
                      <Check size={12} />
                    </div>
                    <span>Verified Zambia Power & Water</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-900 text-white p-6 rounded-[2rem] flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold opacity-70 italic underline">Mwaiseni Guarantee</p>
                  <p className="text-sm font-bold mt-1">Verified Power & Water</p>
                </div>
                <ShieldCheck size={32} className="opacity-40" />
              </div>

              <div className="bg-white border border-slate-200 rounded-[2rem] p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <p className="font-black text-slate-900">Share this stay</p>
                  <button
                    onClick={handleShare}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 font-black text-xs hover:bg-slate-100 transition"
                  >
                    <Copy size={16} />
                    Copy link
                  </button>
                </div>
                <p className="text-xs text-slate-500 font-bold mt-2">
                  Send this property to family or friends for quick planning.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 p-4 md:hidden">
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          <button
            onClick={() => setIsSaved((v) => !v)}
            className={`p-4 rounded-2xl border transition ${
              isSaved ? "bg-red-50 text-red-600 border-red-200" : "bg-slate-50 text-slate-700 border-slate-200"
            }`}
            aria-label="Save"
          >
            <Heart size={18} className={isSaved ? "fill-red-500" : ""} />
          </button>

          <button
            onClick={handleReserve}
            className="flex-1 bg-blue-600 text-white py-4 rounded-2xl font-black text-base shadow-lg shadow-blue-200 active:scale-[0.99] transition"
          >
            {selectedRoomObj ? `Reserve • ${formatMoney(selectedRoomObj.price)}` : "Choose room"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsPage;
