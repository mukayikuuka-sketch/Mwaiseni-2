import React, { useState } from 'react';
import { 
  CheckCircle, XCircle, MapPin, ChevronLeft, 
  ChevronRight, ShieldCheck, AlertTriangle, MessageSquare
} from 'lucide-react';

const PropertyInspector: React.FC = () => {
  const [currentPhoto, setCurrentPhoto] = useState(0);
  
  const property = {
    name: "Victoria Falls Luxury Lodge",
    location: "Livingstone, Zambia",
    coordinates: { lat: -17.9244, lng: 25.8572 },
    photos: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80'
    ]
  };

  return (
    <div className="h-screen flex flex-col bg-white">
      <header className="p-4 border-b flex justify-between items-center bg-slate-900 text-white">
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-slate-800 rounded-full"><ChevronLeft /></button>
          <div>
            <h2 className="font-bold">{property.name}</h2>
            <p className="text-xs text-slate-400">{property.location}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="bg-red-500/10 text-red-500 px-4 py-2 rounded-xl font-bold text-sm border border-red-500/20 hover:bg-red-500 hover:text-white transition">Reject</button>
          <button className="bg-green-500 text-white px-6 py-2 rounded-xl font-bold text-sm hover:bg-green-600 shadow-lg shadow-green-900/20 transition flex items-center gap-2">
            <ShieldCheck size={18} /> Approve Listing
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <div className="w-1/2 relative bg-black flex items-center justify-center border-r border-slate-800">
          <img 
            src={property.photos[currentPhoto]} 
            className="max-h-full object-contain"
            alt="Property Preview"
          />
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
             {property.photos.map((_, i) => (
               <div key={i} className={`h-1.5 w-8 rounded-full ${i === currentPhoto ? "bg-white" : "bg-white/30"}`} />
             ))}
          </div>
          <button onClick={() => setCurrentPhoto(0)} className="absolute left-4 p-4 text-white hover:bg-white/10 rounded-full"><ChevronLeft size={32}/></button>
          <button onClick={() => setCurrentPhoto(1)} className="absolute right-4 p-4 text-white hover:bg-white/10 rounded-full"><ChevronRight size={32}/></button>
        </div>

        <div className="w-1/2 overflow-y-auto p-8 bg-slate-50">
           <div className="space-y-6">
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
                 <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Satellite Verification</h3>
                 <div className="w-full h-64 bg-slate-200 rounded-2xl overflow-hidden relative">
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500">
                       <MapPin size={40} className="mb-2 text-blue-600" />
                       <p className="font-bold">Satellite Map Loading...</p>
                       <p className="text-xs">Lat: {property.coordinates.lat}, Lng: {property.coordinates.lng}</p>
                    </div>
                 </div>
              </div>

              <div className="bg-orange-50 p-6 rounded-3xl border border-orange-100 flex gap-4">
                 <AlertTriangle className="text-orange-600 shrink-0" />
                 <div>
                    <h4 className="font-bold text-orange-900 text-sm">Review Checklist</h4>
                    <ul className="text-xs text-orange-800 mt-2 space-y-1 font-medium">
                       <li>• Does the building match the map footprint?</li>
                       <li>• Are photos high-res and watermark-free?</li>
                       <li>• Is the price in line with Livingstone averages?</li>
                    </ul>
                 </div>
              </div>

              <button className="w-full py-4 bg-white border-2 border-slate-200 rounded-2xl text-slate-600 font-bold hover:border-blue-500 hover:text-blue-500 transition flex items-center justify-center gap-2">
                 <MessageSquare size={20} /> Message Owner for Corrections
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyInspector;
