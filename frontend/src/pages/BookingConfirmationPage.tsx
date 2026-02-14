import React from "react";
import { Link } from "react-router-dom";

const BookingConfirmationPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <div className="max-w-md mx-auto bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl">?</span>
        </div>
        <h1 className="text-3xl font-black text-gray-900 mb-4">Booking Confirmed!</h1>
        <p className="text-gray-600 mb-8">
          Your stay in Zambia is officially booked. Check your email for details.
        </p>
        <Link 
          to="/trips" 
          className="block w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition"
        >
          View My Trips
        </Link>
        <Link 
          to="/" 
          className="block mt-4 text-gray-500 font-medium hover:text-gray-800"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default BookingConfirmationPage;
