import React from 'react';
import { 
  Check, 
  X, 
  MessageCircle, 
  User, 
  Calendar, 
  MapPin, 
  Clock, 
  Phone,
  MoreVertical,
  ChevronRight
} from 'lucide-react';

const PartnerBookingsPage: React.FC = () => {
  // Keeping your exact data structure
  const bookings = [
    { 
      id: 'BK-7701', 
      guest: "Chanda Mukuka", 
      property: "Victoria Falls Lodge", 
      checkIn: "2026-02-15", 
      status: "Pending", 
      amount: "K2,500",
      phone: "+260970000000" // Added for logic
    },
    { 
      id: 'BK-7702', 
      guest: "Sarah Phiri", 
      property: "Lusaka Executive Apt", 
      checkIn: "2026-02-20", 
      status: "Confirmed", 
      amount: "K1,200",
      phone: "+260960000000"
    }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 bg-slate-50 min-h-screen">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Bookings Manager</h1>
          <p className="text-slate-500 font-medium">Manage incoming guest requests and check-ins for your Zambian properties.</p>
        </div>
        <div className="flex gap-3">
          <div className="bg-blue-600 text-white px-5 py-2.5 rounded-2xl text-xs font-black flex items-center gap-2 shadow-lg shadow-blue-200">
            <Clock size={16}/> 3 NEW REQUESTS
          </div>
          <button className="p-2.5 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-slate-600 transition">
            <MoreVertical size={20}/>
          </button>
        </div>
      </div>

      {/* BOOKINGS LIST */}
      <div className="grid gap-6">
        {bookings.map((booking) => (
          <div 
            key={booking.id} 
            className="bg-white border border-slate-200 rounded-[2rem] p-6 flex flex-wrap lg:flex-nowrap items-center gap-8 hover:shadow-xl hover:shadow-slate-200/50 transition-all group"
          >
            {/* GUEST INFO */}
            <div className="flex items-center gap-4 min-w-[240px]">
              <div className="h-16 w-16 bg-blue-50 rounded-3xl flex items-center justify-center text-blue-600 border border-blue-100 shadow-inner group-hover:scale-110 transition-transform">
                <User size={30} strokeWidth={2.5} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                    <h3 className="font-black text-slate-900 text-xl">{booking.guest}</h3>
                    <span className="text-[10px] font-black text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md uppercase">{booking.id}</span>
                </div>
                <p className="text-sm text-slate-500 font-bold flex items-center gap-1 mt-0.5 italic">
                  <MapPin size={14} className="text-blue-500"/> {booking.property}
                </p>
              </div>
            </div>

            {/* BOOKING DETAILS */}
            <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <p className="text-[10px] uppercase font-black text-slate-400 mb-1 tracking-widest">Check-In</p>
                <p className="font-black text-slate-700 flex items-center gap-2">
                    <Calendar size={16} className="text-blue-600"/> {booking.checkIn}
                </p>
              </div>
              
              <div>
                <p className="text-[10px] uppercase font-black text-slate-400 mb-1 tracking-widest">Earnings</p>
                <p className="font-black text-blue-600 text-xl font-mono">{booking.amount}</p>
              </div>

              <div className="hidden md:block">
                <p className="text-[10px] uppercase font-black text-slate-400 mb-1 tracking-widest">Status</p>
                <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                    booking.status === "Pending" ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"
                }`}>
                    <div className={`h-1.5 w-1.5 rounded-full ${booking.status === "Pending" ? "bg-amber-500" : "bg-emerald-500"}`}></div>
                    {booking.status}
                </div>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="flex items-center gap-3 w-full lg:w-auto pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-50">
              {booking.status === "Pending" ? (
                <>
                  <button className="flex-1 lg:flex-none bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl text-sm font-black shadow-xl shadow-blue-100 transition-all active:scale-95 flex items-center justify-center gap-2">
                    <Check size={18}/> Accept
                  </button>
                  <button className="flex-1 lg:flex-none text-slate-400 hover:text-red-500 hover:bg-red-50 px-6 py-4 rounded-2xl text-sm font-bold transition-all">
                    Decline
                  </button>
                </>
              ) : (
                <div className="flex gap-2 w-full lg:w-auto">
                    <a 
                      href={`https://wa.me/${booking.phone}`}
                      className="flex-1 lg:flex-none bg-[#25D366] hover:bg-[#20ba5a] text-white px-8 py-4 rounded-2xl text-sm font-black flex items-center justify-center gap-2 shadow-xl shadow-green-100 transition-all active:scale-95"
                    >
                        <MessageCircle size={18} fill="white"/> WhatsApp Guest
                    </a>
                    <button className="p-4 bg-slate-100 text-slate-600 rounded-2xl hover:bg-slate-200 transition">
                        <Phone size={18} />
                    </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* FOOTER INFO */}
      <div className="bg-white p-6 rounded-[2rem] border border-slate-200 flex items-center gap-4">
        <div className="p-3 bg-amber-50 rounded-2xl text-amber-600">
            <Clock size={24}/>
        </div>
        <p className="text-xs text-slate-500 font-medium leading-relaxed">
            <b>Note:</b> For "Pending" requests, guests have already authorized payment via Mobile Money or Card. Accepting the request will finalize the transaction and hold the funds in escrow until check-out.
        </p>
      </div>
    </div>
  );
};

export default PartnerBookingsPage;