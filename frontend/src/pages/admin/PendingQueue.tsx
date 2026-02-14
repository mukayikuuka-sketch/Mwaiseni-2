import React, { useState } from 'react';
import { 
  Clock, CheckCircle, XCircle, MapPin, 
  Camera, DollarSign, ExternalLink, ShieldAlert
} from 'lucide-react';

const PendingQueue: React.FC = () => {
  // This would eventually come from your Django API
  const [pendingProperties] = useState([
    { 
      id: 1, 
      name: "Victoria Falls Luxury Lodge", 
      location: "Livingstone", 
      price: "K4,500", 
      photoCount: 12, 
      submitted: "2 hours ago",
      riskLevel: "Low" 
    },
    { 
      id: 2, 
      name: "Kitwe Central Apartments", 
      location: "Riverside, Kitwe", 
      price: "K1,200", 
      photoCount: 3, 
      submitted: "5 hours ago",
      riskLevel: "High" 
    }
  ]);

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Pending Review ??</h1>
            <p className="text-slate-500 font-medium">Verify these listings to go live on ZamStay.</p>
          </div>
          <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-slate-200">
            <span className="text-sm font-bold text-slate-400 uppercase">Queue Size</span>
            <p className="text-2xl font-black text-blue-600">{pendingProperties.length} Properties</p>
          </div>
        </header>

        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 overflow-hidden border border-slate-100">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase">Property & Location</th>
                <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase">Photos</th>
                <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase">Price (Net)</th>
                <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase">Risk Status</th>
                <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {pendingProperties.map((prop) => (
                <tr key={prop.id} className="hover:bg-slate-50/50 transition">
                  <td className="px-8 py-6">
                    <p className="font-bold text-slate-900 text-lg">{prop.name}</p>
                    <div className="flex items-center gap-1 text-slate-400 text-sm">
                      <MapPin size={14} /> {prop.location}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2 font-bold text-slate-700">
                      <Camera size={18} className="text-blue-500" />
                      {prop.photoCount} <span className="text-slate-300 font-medium text-xs">Images</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 font-black text-slate-900">{prop.price}</td>
                  <td className="px-8 py-6">
                    <span className="px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">
                      {prop.riskLevel}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <button className="bg-slate-900 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-blue-600 transition flex items-center gap-2">
                      Inspect <ExternalLink size={16} />
                    </button>
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

export default PendingQueue;
