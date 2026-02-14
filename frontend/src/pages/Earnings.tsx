import React, { useState } from 'react';
import { Wallet, Smartphone, Landmark, Info, ChevronRight, History, ArrowDownLeft } from 'lucide-react';

const Earnings = () => {
  const [payoutMethod, setPayoutMethod] = useState<'momo' | 'bank'>('momo');

  // Mock data to make the frontend feel "populated"
  const recentPayouts = [
    { id: 1, date: "Feb 04, 2026", amount: "K 3,200", status: "Completed", type: "Mobile Money" },
    { id: 2, date: "Jan 28, 2026", amount: "K 1,500", status: "Completed", type: "Bank Transfer" },
  ];

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8 bg-slate-50 min-h-screen">
      <header>
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">Earnings & Payouts</h1>
        <p className="text-slate-500 font-medium italic">Manage your revenue from Zambian bookings</p>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* WALLET CARD */}
        <div className="lg:col-span-2 bg-[#003580] text-white p-10 rounded-[2.5rem] shadow-2xl shadow-blue-200 relative overflow-hidden">
          {/* Decorative Circle */}
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-400/10 rounded-full" />
          
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-10">
              <div className="bg-blue-400/20 p-4 rounded-3xl backdrop-blur-md">
                <Wallet size={32} />
              </div>
              <span className="bg-emerald-400 text-emerald-950 text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest">
                Account Verified
              </span>
            </div>
            
            <p className="opacity-70 font-black text-xs uppercase tracking-[0.2em]">Total Available Balance</p>
            <h2 className="text-6xl font-black mt-2 font-mono">K 4,850.00</h2>
            
            <div className="grid grid-cols-2 gap-4 mt-10">
              <button className="bg-white text-[#003580] py-4 rounded-2xl font-black hover:bg-slate-100 transition active:scale-95 shadow-lg">
                Request Payout
              </button>
              <button className="bg-blue-700/40 text-white border border-blue-400/30 py-4 rounded-2xl font-black hover:bg-blue-700/60 transition backdrop-blur-sm">
                View Reports
              </button>
            </div>
          </div>
        </div>

        {/* PAYOUT METHODS */}
        <div className="space-y-4">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest ml-2">Payout Method</h3>
          
          <button 
            onClick={() => setPayoutMethod('momo')}
            className={`w-full p-6 rounded-3xl border-2 transition-all flex items-center gap-4 text-left ${
              payoutMethod === 'momo' ? 'bg-white border-blue-600 shadow-md' : 'bg-transparent border-slate-200 opacity-60'
            }`}
          >
            <div className={`p-3 rounded-2xl ${payoutMethod === 'momo' ? 'bg-orange-100 text-orange-600' : 'bg-slate-200'}`}>
              <Smartphone />
            </div>
            <div className="flex-1">
              <p className="font-black text-slate-900 leading-tight">Mobile Money</p>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">MTN / Airtel Zambia</p>
            </div>
            {payoutMethod === 'momo' && <div className="w-3 h-3 bg-blue-600 rounded-full shadow-glow" />}
          </button>

          <button 
            onClick={() => setPayoutMethod('bank')}
            className={`w-full p-6 rounded-3xl border-2 transition-all flex items-center gap-4 text-left ${
              payoutMethod === 'bank' ? 'bg-white border-blue-600 shadow-md' : 'bg-transparent border-slate-200 opacity-60'
            }`}
          >
            <div className={`p-3 rounded-2xl ${payoutMethod === 'bank' ? 'bg-blue-50 text-blue-600' : 'bg-slate-200'}`}>
              <Landmark />
            </div>
            <div className="flex-1">
              <p className="font-black text-slate-900 leading-tight">Bank Transfer</p>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">Local Bank Account</p>
            </div>
            {payoutMethod === 'bank' && <div className="w-3 h-3 bg-blue-600 rounded-full shadow-glow" />}
          </button>

          <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-2xl border border-amber-100 mt-4">
            <Info size={16} className="text-amber-600 shrink-0 mt-0.5" />
            <p className="text-[10px] text-amber-800 font-bold leading-relaxed uppercase tracking-tight">
              Payouts are processed Tuesdays & Fridays.
            </p>
          </div>
        </div>
      </div>

      {/* RECENT ACTIVITY TABLE */}
      <div className="bg-white rounded-[2rem] border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-black text-slate-900 flex items-center gap-2">
            <History size={18} className="text-blue-600" /> Recent Payout History
          </h3>
          <button className="text-xs font-black text-blue-600 hover:underline">Download CSV</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                <th className="px-8 py-4">Transaction ID</th>
                <th className="px-8 py-4">Date</th>
                <th className="px-8 py-4">Method</th>
                <th className="px-8 py-4">Amount</th>
                <th className="px-8 py-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 font-bold text-sm text-slate-700">
              {recentPayouts.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50/50 transition">
                  <td className="px-8 py-5 text-slate-400">#ZAM-550{row.id}</td>
                  <td className="px-8 py-5">{row.date}</td>
                  <td className="px-8 py-5 flex items-center gap-2">
                    <ArrowDownLeft size={14} className="text-emerald-500" /> {row.type}
                  </td>
                  <td className="px-8 py-5 font-black text-slate-900">{row.amount}</td>
                  <td className="px-8 py-5 text-right">
                    <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-[10px] font-black uppercase">
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Earnings;