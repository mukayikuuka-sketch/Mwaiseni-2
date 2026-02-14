import React from 'react';
import { Outlet } from 'react-router-dom';

const GuestLayout: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Sidebar removed to allow full-screen content */}
      <main className="w-full bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
        <Outlet />
      </main>
    </div>
  );
};

export default GuestLayout;
