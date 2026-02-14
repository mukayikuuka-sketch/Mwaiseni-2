import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { LayoutDashboard, Package, Wallet, LogOut, User as UserIcon, Calendar } from 'lucide-react'

export default function PartnerNavbar() {
  const { logout, user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  // Helper to highlight the active page
  const isActive = (path: string) => location.pathname === path ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  return (
    <nav className="border-b bg-white px-8 py-4 flex justify-between items-center sticky top-0 z-50 shadow-sm">
      {/* LEFT: LOGO */}
      <div className="flex items-center gap-8">
        <Link to="/" className="text-2xl font-black text-blue-600 tracking-tighter">
          Mwaiseni<span className="text-slate-900">.</span>
          <span className="ml-2 text-[10px] uppercase tracking-widest bg-blue-50 px-2 py-1 rounded text-blue-500 border border-blue-100">Partner</span>
        </Link>

        {/* CENTER: NAV LINKS */}
        <div className="hidden md:flex items-center gap-8 font-bold text-sm">
          <Link to="/owner/dashboard" className={`flex items-center gap-2 transition ${isActive('/owner/dashboard')}`}>
            <LayoutDashboard size={18} /> Dashboard
          </Link>
          <Link to="/owner/inventory" className={`flex items-center gap-2 transition ${isActive('/owner/inventory')}`}>
            <Package size={18} /> Inventory
          </Link>
          <Link to="/owner/bookings" className={`flex items-center gap-2 transition ${isActive('/owner/bookings')}`}>
            <Calendar size={18} /> Bookings
          </Link>
          <Link to="/owner/calendar" className={`flex items-center gap-2 transition ${isActive('/owner/calendar')}`}>
            <Calendar size={18} /> Calendar
          </Link>
          <Link to="/owner/earnings" className={`flex items-center gap-2 transition ${isActive('/owner/earnings')}`}>
            <Wallet size={18} /> Earnings
          </Link>
        </div>
      </div>

      {/* RIGHT: USER PROFILE & LOGOUT */}
      <div className="flex gap-6 items-center">
        <div className="flex items-center gap-3 pr-6 border-r border-slate-100">
          <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-slate-500">
            <UserIcon size={18} />
          </div>
          <span className="font-bold text-slate-700 text-sm hidden sm:inline">
            {user?.name || 'Partner Account'}
          </span>
        </div>

        <button 
          onClick={handleLogout} 
          className="text-red-500 hover:text-red-700 font-bold text-sm flex items-center gap-2 transition"
        >
          <LogOut size={18} />
          <span className="hidden md:inline">Logout</span>
        </button>
      </div>
    </nav>
  )
}
