import React from 'react';
import { Outlet } from 'react-router-dom';
import PublicNavbar from '../components/navbar/PublicNavbar';
import Footer from '../components/footer/Footer';

const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <PublicNavbar />
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
