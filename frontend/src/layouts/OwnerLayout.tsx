import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  Hotel, 
  PlusCircle, 
  Wallet, 
  LogOut,
  Calendar
} from 'lucide-react';

const OwnerLayout: React.FC = () => {
  const { logout, user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/owner/dashboard' },
    { icon: <Calendar size={20} />, label: 'Bookings', path: '/owner/bookings' },
    { icon: <Hotel size={20} />, label: 'My Properties', path: '/owner/inventory' },
    { icon: <PlusCircle size={20} />, label: 'Add Property', path: '/owner/wizard' },
    { icon: <Wallet size={20} />, label: 'Earnings', path: '/owner/earnings' },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-900 text-white flex flex-col">
        <div className="p-6 border-b border-blue-800">
          <h1 className="text-2xl font-bold tracking-tight">
            Mwaiseni <span className="text-blue-400">Owner</span>
          </h1>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                location.pathname === item.path 
                  ? 'bg-blue-800 text-white' 
                  : 'text-blue-100 hover:bg-blue-800/50'
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-blue-800">
          <button 
            onClick={() => { logout(); navigate('/'); }}
            className="flex items-center gap-3 px-4 py-3 w-full text-blue-100 hover:bg-red-500/20 hover:text-red-400 rounded-xl transition"
          >
            <LogOut size={20} />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white h-16 border-b flex items-center justify-between px-8 sticky top-0 z-10">
          <h2 className="text-xl font-semibold text-gray-800">Partner Portal</h2>
          <div className="flex items-center gap-4">
             <span className="text-sm text-gray-500">{user?.email}</span>
             <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
               {user?.email?.[0]?.toUpperCase() || 'O'}
             </div>
          </div>
        </header>
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default OwnerLayout;

