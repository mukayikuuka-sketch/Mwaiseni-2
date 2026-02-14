import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Home,
  TrendingUp,
  Users,
  Calendar,
  Plus,
  Wallet,
  ArrowUpRight,
} from "lucide-react";

const PartnerDashboard = () => {
  const navigate = useNavigate();

  const stats = [
    {
      label: "Active Listings",
      value: "3",
      icon: <Home className="text-blue-600" />,
      trend: "+1 this month",
      trendColor: "text-emerald-600",
      trendBg: "bg-emerald-50",
    },
    {
      label: "Total Bookings",
      value: "12",
      icon: <Calendar className="text-purple-600" />,
      trend: "4 pending",
      trendColor: "text-purple-600",
      trendBg: "bg-purple-50",
    },
    {
      label: "Monthly Views",
      value: "1,240",
      icon: <Users className="text-orange-600" />,
      trend: "+12% vs last month",
      trendColor: "text-orange-600",
      trendBg: "bg-orange-50",
    },
    {
      label: "Total Revenue",
      value: "K14,500",
      icon: <Wallet className="text-emerald-600" />,
      trend: "Paid to MoMo/Bank",
      trendColor: "text-emerald-600",
      trendBg: "bg-emerald-50",
    },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-10 bg-slate-50 min-h-screen">
      {/* HEADER */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            Partner Hub
          </h1>
          <p className="text-slate-500 font-medium">
            Monitoring your property performance across Zambia
          </p>
        </div>
        <button
          onClick={() => navigate("/owner/add-property")}
          className="w-full md:w-auto bg-blue-600 text-white px-8 py-4 rounded-[1.5rem] font-black flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 active:scale-95"
        >
          <Plus size={22} strokeWidth={3} /> Add New Listing
        </button>
      </header>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-200/60 hover:border-blue-200 hover:shadow-lg transition-all group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="bg-slate-50 w-12 h-12 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform font-bold">
                {s.icon}
              </div>
              <span
                className={`text-[10px] font-black ${s.trendColor} ${s.trendBg} px-2 py-1 rounded-lg flex items-center gap-1`}
              >
                <ArrowUpRight size={10} /> {s.trend}
              </span>
            </div>
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest">
              {s.label}
            </p>
            <p className="text-3xl font-black text-slate-900 mt-1 font-mono">
              {s.value}
            </p>
          </div>
        ))}
      </div>

      {/* ACTIVITY SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-slate-200/60 shadow-sm min-h-[400px] flex items-center justify-center animate-in slide-in-from-left-2 duration-300">
          <div className="max-w-xs mx-auto text-center">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <TrendingUp size={40} className="text-slate-200" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 mb-2">
              No Growth Data Yet
            </h2>
            <p className="text-slate-500 font-medium text-sm leading-relaxed">
              We're ready when you are! Once you accept your first booking, we'll
              start charting your revenue and occupancy growth.
            </p>
            <button className="mt-6 text-blue-600 font-black text-sm hover:underline">
              Learn how to boost views →
            </button>
          </div>
        </div>

        {/* QUICK TIPS */}
        <div className="space-y-6">
          <div className="bg-blue-600 p-8 rounded-[2.5rem] text-white shadow-xl shadow-blue-100 animate-in slide-in-from-right-2 duration-300">
            <h3 className="font-black text-xl mb-2">Host Tip</h3>
            <p className="text-blue-100 text-sm font-medium leading-relaxed">
              Properties with at least 5 high-quality photos get **3x more bookings** in Lusaka and Livingstone.
            </p>
            <button className="mt-4 py-2 px-4 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-bold transition">
              Update Gallery
            </button>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200/60 shadow-sm animate-in slide-in-from-right-2 duration-300">
            <h3 className="font-black text-slate-900 mb-4 uppercase text-xs tracking-widest">
              Support
            </h3>
            <p className="text-sm text-slate-500 font-medium">
              Need help with your payout?
            </p>
            <button className="mt-4 w-full py-3 border-2 border-slate-100 hover:border-blue-100 rounded-2xl text-slate-900 font-black text-sm transition">
              Contact Partner Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerDashboard;
