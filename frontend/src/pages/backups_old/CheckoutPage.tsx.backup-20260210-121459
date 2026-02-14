import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { ShieldCheck, CreditCard, Lock, Info } from 'lucide-react';

const CheckoutPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const { propertyName, roomName, price } = location.state || {};
  
  console.log('Checkout for property:', id, propertyName, price);

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* LEFT: PAYMENT DETAILS */}
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-black text-gray-900 mb-2">Confirm and pay</h1>
            <p className="text-gray-500">Secure checkout powered by Stripe</p>
          
          {/* PROPERTY INFO */}
          <div className='bg-white p-6 rounded-xl border border-gray-200 mt-6'>
            <h3 className='font-bold text-lg mb-3'>Booking Summary</h3>
            <div className='space-y-2'>
              <div className='flex justify-between'>
                <span className='text-gray-600'>Property:</span>
                <span className='font-semibold'>{propertyName || 'Not specified'}</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-600'>Room:</span>
                <span className='font-semibold'>{roomName || 'Standard Room'}</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-600'>Price per night:</span>
                <span className='font-semibold'>K {price || '0'}</span>
              </div>
              <div className='flex justify-between pt-3 border-t'>
                <span className='text-gray-600'>Total (3 nights):</span>
                <span className='font-bold text-lg'>K {(price || 0) * 3}</span>
              </div>
            </div>
          </div>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <CreditCard size={20} className="text-blue-600" /> Payment Method
            </h2>
            
            {/* STRIPE ELEMENT PLACEHOLDER */}
            <div className="p-6 border-2 border-dashed border-gray-100 rounded-2xl mb-6 flex flex-col items-center justify-center text-gray-400">
               <Lock size={32} className="mb-2 opacity-20" />
               <p className="text-sm font-medium">Stripe Payment Element will load here</p>
            </div>

            <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-2xl border border-blue-100 text-blue-800 text-sm">
              <ShieldCheck size={20} />
              <p>Your payment information is encrypted and never stored on our servers.</p>
            </div>
          </div>

          <button className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-200">
            Confirm Payment • K5,840
          </button>
        </div>

        {/* RIGHT: TRIP SUMMARY */}
        <div className="lg:sticky lg:top-8 h-fit">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
            <div className="flex gap-4 pb-6 border-b border-gray-50">
              <div className="w-24 h-24 rounded-2xl bg-gray-100 overflow-hidden flex-shrink-0">
                <img src="https://images.unsplash.com/photo-1544124499-58912cbddada?auto=format&fit=crop&q=80&w=300" className="w-full h-full object-cover" alt="Stay" />
              </div>
              <div>
                <p className="text-xs font-bold text-blue-600 uppercase tracking-wider">Lodge</p>
                <h3 className="font-bold text-gray-900">Zambezi River Lodge</h3>
                <p className="text-sm text-gray-500">Livingstone • 3 Nights</p>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-bold text-gray-900">Price Details</h4>
              <div className="flex justify-between text-gray-600">
                <span>K1,850 x 3 nights</span>
                <span>K5,550</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Service Fee</span>
                <span>K290</span>
              </div>
              <div className="flex justify-between pt-4 border-t border-gray-50 font-black text-xl text-gray-900">
                <span>Total (ZMW)</span>
                <span>K5,840</span>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-2xl flex gap-3 items-start">
              <Info size={18} className="text-gray-400 mt-0.5" />
              <p className="text-xs text-gray-500 leading-relaxed">
                Prices include all applicable Zambian taxes and tourism levies. Final amount may vary slightly based on your bank's exchange rate if paying in USD.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CheckoutPage;

