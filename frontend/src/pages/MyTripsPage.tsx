import React, { useMemo, useState } from 'react';
import {
  MapPin,
  Calendar,
  CreditCard,
  MessageCircle,
  Navigation,
  Download,
  MoreVertical,
  ShieldCheck,
  Ticket,
  ExternalLink,
  X,
  FileText,
  Receipt,
  Ban,
  RefreshCcw,
  Phone,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import { Link } from 'react-router-dom';

type TripStatus = 'Upcoming' | 'Past' | 'Cancelled';
type PaymentStatus = 'Paid' | 'Pay on arrival' | 'Refunded';

type Trip = {
  id: number;
  hotelName: string;
  location: string;
  address: string;
  date: string;
  status: TripStatus;
  price: string;
  paymentStatus: PaymentStatus;
  image: string;
  whatsapp: string;
  phone?: string;
  confirmationCode: string;

  checkInTime?: string;
  checkOutTime?: string;

  cancellationPolicy?: string;
  perks?: string[];
};

const MyTripsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TripStatus>('Upcoming');

  const [openMenuTripId, setOpenMenuTripId] = useState<number | null>(null);
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);

  const trips: Trip[] = [
    {
      id: 1,
      hotelName: 'Victoria Falls Waterfront',
      location: 'Livingstone, Zambia',
      address: 'Mosi-oa-Tunya Road, Livingstone',
      date: 'Oct 12 - Oct 15, 2026',
      status: 'Upcoming',
      price: 'K4,500',
      paymentStatus: 'Paid',
      image:
        'https://images.unsplash.com/photo-1549180030-48bf079fb38a?auto=format&fit=crop&w=1200&q=80',
      whatsapp: '+260970000000',
      phone: '+260960000000',
      confirmationCode: 'ZAM-99821',
      checkInTime: '14:00',
      checkOutTime: '10:00',
      cancellationPolicy: 'Free cancellation until Oct 9. After that, 1 night will be charged.',
      perks: ['Solar backup', 'Borehole water', 'Secure parking', 'Mobile Money accepted'],
    },
  ];

  const filteredTrips = useMemo(
    () => trips.filter((trip) => trip.status === activeTab),
    [trips, activeTab]
  );

  const closeAllMenus = () => setOpenMenuTripId(null);

  const openTripDetails = (trip: Trip) => {
    setSelectedTrip(trip);
    closeAllMenus();
  };

  const exportBookings = () => {
    // frontend placeholder
    alert('Export will be connected to backend later (PDF/CSV).');
  };

  const downloadDocument = (type: 'Voucher' | 'Receipt' | 'Invoice') => {
    alert(`${type} download will be connected to backend later.`);
  };

  const cancelTrip = (trip: Trip) => {
    const ok = window.confirm(
      `Cancel booking for "${trip.hotelName}"?\n\nThis action will be processed once backend is connected.`
    );
    if (!ok) return;
    alert('Cancellation request sent (frontend demo).');
  };

  const mapsLink = (trip: Trip) => {
    const q = encodeURIComponent(`${trip.hotelName}, ${trip.address}`);
    return `https://www.google.com/maps/search/?api=1&query=${q}`;
  };

  return (
    <div
      className="max-w-6xl mx-auto py-12 px-6 min-h-screen bg-white"
      onClick={closeAllMenus}
    >
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">My Trips</h1>
          <p className="text-slate-500 font-medium">Manage your bookings and travel documents.</p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={exportBookings}
            className="flex items-center gap-2 bg-slate-50 text-slate-600 px-5 py-3 rounded-2xl font-bold text-sm hover:bg-slate-100 transition border border-slate-100"
          >
            <Download size={18} /> Export Bookings
          </button>
        </div>
      </div>

      {/* CUSTOM TABS */}
      <div className="flex border-b border-slate-100 mb-10 gap-10 overflow-x-auto no-scrollbar">
        {(['Upcoming', 'Past', 'Cancelled'] as TripStatus[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-4 text-sm font-black transition-all relative whitespace-nowrap ${
              activeTab === tab ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-600 rounded-t-full shadow-[0_-2px_10px_rgba(37,99,235,0.4)]" />
            )}
          </button>
        ))}
      </div>

      {/* TRIPS */}
      {filteredTrips.length > 0 ? (
        <div className="grid gap-8">
          {filteredTrips.map((trip) => (
            <div
              key={trip.id}
              className="bg-white border-2 border-slate-50 rounded-[2.5rem] overflow-hidden hover:shadow-2xl hover:shadow-slate-200/50 transition-all group flex flex-col lg:flex-row"
            >
              {/* IMAGE & BADGE */}
              <div className="relative lg:w-96 h-64 lg:h-auto shrink-0 overflow-hidden">
                <img
                  src={trip.image}
                  alt={trip.hotelName}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-5 left-5 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-xl flex items-center gap-2">
                  <Ticket size={14} className="text-blue-600" /> Conf: {trip.confirmationCode}
                </div>
              </div>

              {/* DETAILS CONTENT */}
              <div className="p-8 lg:p-10 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-2xl font-black text-slate-900 group-hover:text-blue-600 transition duration-300">
                      {trip.hotelName}
                    </h3>
                    <div className="flex items-center gap-1.5 text-slate-500 font-bold mt-2">
                      <MapPin size={16} className="text-blue-600" /> {trip.location}
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-3 relative">
                    <span
                      className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                        trip.paymentStatus === 'Paid'
                          ? 'bg-emerald-100 text-emerald-700'
                          : trip.paymentStatus === 'Refunded'
                          ? 'bg-slate-100 text-slate-700'
                          : 'bg-orange-100 text-orange-700'
                      }`}
                    >
                      {trip.paymentStatus}
                    </span>

                    {/* MENU BUTTON */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenMenuTripId((prev) => (prev === trip.id ? null : trip.id));
                      }}
                      className="p-2 text-slate-300 hover:text-slate-700 transition rounded-xl hover:bg-slate-50"
                    >
                      <MoreVertical size={20} />
                    </button>

                    {/* MENU DROPDOWN */}
                    {openMenuTripId === trip.id && (
                      <div
                        onClick={(e) => e.stopPropagation()}
                        className="absolute top-16 right-0 w-64 bg-white border border-slate-100 rounded-2xl shadow-2xl shadow-slate-200/50 overflow-hidden"
                      >
                        <button
                          onClick={() => openTripDetails(trip)}
                          className="w-full px-5 py-4 flex items-center gap-3 font-black text-sm text-slate-900 hover:bg-slate-50 transition"
                        >
                          <ExternalLink size={18} className="text-blue-600" /> View details
                        </button>

                        <button
                          onClick={() => downloadDocument('Voucher')}
                          className="w-full px-5 py-4 flex items-center gap-3 font-black text-sm text-slate-900 hover:bg-slate-50 transition"
                        >
                          <FileText size={18} className="text-slate-600" /> Download voucher
                        </button>

                        <button
                          onClick={() => downloadDocument('Receipt')}
                          className="w-full px-5 py-4 flex items-center gap-3 font-black text-sm text-slate-900 hover:bg-slate-50 transition"
                        >
                          <Receipt size={18} className="text-slate-600" /> Download receipt
                        </button>

                        {trip.status === 'Upcoming' && (
                          <>
                            <button
                              onClick={() => alert('Date change will be connected later.')}
                              className="w-full px-5 py-4 flex items-center gap-3 font-black text-sm text-slate-900 hover:bg-slate-50 transition"
                            >
                              <RefreshCcw size={18} className="text-slate-600" /> Change dates
                            </button>

                            <button
                              onClick={() => cancelTrip(trip)}
                              className="w-full px-5 py-4 flex items-center gap-3 font-black text-sm text-red-600 hover:bg-red-50 transition"
                            >
                              <Ban size={18} /> Cancel booking
                            </button>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* INFO GRID */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-8 py-6 border-y border-slate-50">
                  <div className="space-y-1">
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">
                      Check-in / Out
                    </p>
                    <p className="font-black text-slate-800 flex items-center gap-2">
                      <Calendar size={16} className="text-blue-600" /> {trip.date}
                    </p>
                    {(trip.checkInTime || trip.checkOutTime) && (
                      <p className="text-xs text-slate-400 font-bold">
                        Check-in {trip.checkInTime || '--'} · Check-out {trip.checkOutTime || '--'}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">
                      Total Cost
                    </p>
                    <p className="font-black text-slate-800 flex items-center gap-2">
                      <CreditCard size={16} className="text-blue-600" /> {trip.price}
                    </p>
                  </div>

                  <div className="hidden md:block space-y-1">
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">
                      Mwaiseni Protect
                    </p>
                    <p className="font-black text-emerald-600 flex items-center gap-1.5">
                      <ShieldCheck size={16} /> Secured
                    </p>
                  </div>
                </div>

                {/* POLICY + STATUS STRIP */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4">
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">
                      Booking status
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      {trip.status === 'Upcoming' ? (
                        <>
                          <Clock size={18} className="text-blue-600" />
                          <p className="font-black text-slate-900">Confirmed & Upcoming</p>
                        </>
                      ) : trip.status === 'Past' ? (
                        <>
                          <CheckCircle2 size={18} className="text-emerald-600" />
                          <p className="font-black text-slate-900">Completed</p>
                        </>
                      ) : (
                        <>
                          <Ban size={18} className="text-red-600" />
                          <p className="font-black text-slate-900">Cancelled</p>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4">
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">
                      Cancellation policy
                    </p>
                    <p className="mt-2 text-sm text-slate-700 font-bold leading-snug">
                      {trip.cancellationPolicy || 'Policy will be shown here.'}
                    </p>
                  </div>
                </div>

                {/* ACTION BUTTONS */}
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <a
                    href={mapsLink(trip)}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 bg-blue-600 text-white py-4 rounded-[1.25rem] font-black text-sm flex items-center justify-center gap-2 hover:bg-blue-700 shadow-xl shadow-blue-100 transition-all active:scale-95"
                  >
                    <Navigation size={18} /> GET DIRECTIONS
                  </a>

                  <a
                    href={`https://wa.me/${trip.whatsapp.replace('+', '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 border-2 border-slate-100 text-slate-700 py-4 rounded-[1.25rem] font-black text-sm flex items-center justify-center gap-2 hover:bg-slate-50 transition-all active:scale-95"
                  >
                    <MessageCircle size={18} className="text-[#25D366]" /> CHAT WITH HOST
                  </a>

                  {trip.phone && (
                    <a
                      href={`tel:${trip.phone}`}
                      className="p-4 bg-slate-50 text-slate-500 rounded-[1.25rem] hover:text-slate-900 transition flex items-center justify-center"
                      title="Call property"
                    >
                      <Phone size={20} />
                    </a>
                  )}

                  <button
                    onClick={() => openTripDetails(trip)}
                    className="p-4 bg-slate-50 text-slate-400 rounded-[1.25rem] hover:text-blue-600 transition"
                    title="Open details"
                  >
                    <ExternalLink size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-32 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
            <Calendar size={32} className="text-slate-200" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">
            No {activeTab.toLowerCase()} trips
          </h2>
          <p className="text-slate-500 font-medium mb-10">
            Time to plan your next getaway to the Falls or the Luangwa!
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-[#003580] text-white px-10 py-5 rounded-2xl font-black text-lg shadow-2xl shadow-blue-100 hover:bg-blue-900 transition-all active:scale-95"
          >
            Start Searching
          </Link>
        </div>
      )}

      {/* DETAILS MODAL */}
      {selectedTrip && (
        <div
          className="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-sm flex items-end md:items-center justify-center p-4"
          onClick={() => setSelectedTrip(null)}
        >
          <div
            className="w-full max-w-3xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 md:p-8 border-b border-slate-100 flex items-start justify-between gap-6">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Booking details
                </p>
                <h3 className="text-2xl font-black text-slate-900 mt-1">
                  {selectedTrip.hotelName}
                </h3>
                <p className="text-sm text-slate-500 font-bold mt-2 flex items-center gap-2">
                  <MapPin size={16} className="text-blue-600" /> {selectedTrip.address}
                </p>
              </div>

              <button
                onClick={() => setSelectedTrip(null)}
                className="p-3 rounded-2xl hover:bg-slate-50 transition text-slate-500"
              >
                <X size={22} />
              </button>
            </div>

            <div className="p-6 md:p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4">
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">
                    Confirmation
                  </p>
                  <p className="font-black text-slate-900 mt-2">{selectedTrip.confirmationCode}</p>
                </div>

                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4">
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">
                    Dates
                  </p>
                  <p className="font-black text-slate-900 mt-2">{selectedTrip.date}</p>
                </div>

                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4">
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">
                    Total
                  </p>
                  <p className="font-black text-slate-900 mt-2">{selectedTrip.price}</p>
                </div>
              </div>

              {selectedTrip.perks?.length ? (
                <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
                  <p className="text-[10px] text-blue-700 font-black uppercase tracking-widest">
                    Mwaiseni trust perks
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {selectedTrip.perks.map((p, idx) => (
                      <span
                        key={idx}
                        className="bg-white border border-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-black"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <button
                  onClick={() => downloadDocument('Voucher')}
                  className="bg-slate-900 text-white py-4 rounded-2xl font-black hover:bg-slate-800 transition"
                >
                  Download Voucher
                </button>
                <button
                  onClick={() => downloadDocument('Receipt')}
                  className="bg-white border-2 border-slate-200 text-slate-900 py-4 rounded-2xl font-black hover:bg-slate-50 transition"
                >
                  Download Receipt
                </button>
                <button
                  onClick={() => downloadDocument('Invoice')}
                  className="bg-white border-2 border-slate-200 text-slate-900 py-4 rounded-2xl font-black hover:bg-slate-50 transition"
                >
                  Download Invoice
                </button>
              </div>

              {selectedTrip.status === 'Upcoming' && (
                <button
                  onClick={() => cancelTrip(selectedTrip)}
                  className="w-full bg-red-50 border border-red-100 text-red-700 py-4 rounded-2xl font-black hover:bg-red-100 transition"
                >
                  Cancel booking
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyTripsPage;

