import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

// LAYOUTS
import PublicLayout from './layouts/PublicLayout';
import OwnerLayout from './layouts/OwnerLayout';

// --- ALL PAGES (Directly from src/pages/) ---
import HomePage from './pages/HomePage';
import SearchResultsPage from './pages/SearchResultsPage';
import PropertyDetailsPage from './pages/PropertyDetailsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CheckoutPage from './pages/CheckoutPage';
import BookingConfirmationPage from './pages/BookingConfirmationPage';
import MyTripsPage from './pages/MyTripsPage';
import SavedPage from './pages/SavedPage';
import ProfilePage from './pages/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';
import PartnerLandingPage from './pages/PartnerLandingPage';
import GuestDashboard from './pages/GuestDashboard';

// Partner & Owner Components
import PartnerDashboard from './pages/PartnerDashboard';
import PartnerInventoryHub from './pages/PartnerInventoryHub';
import PartnerLoginPage from './pages/PartnerLoginPage';
import PartnerRegisterPage from './pages/PartnerRegisterPage';
import PartnerSignupPage from './pages/PartnerSignupPage';
import AddPropertyWizard from './pages/AddPropertyWizard';
import Earnings from './pages/Earnings';
import MyProperties from './pages/MyProperties';
import PartnerBookingsPage from './pages/PartnerBookingsPage';
import PartnerCalendarPage from './pages/PartnerCalendarPage';
import PartnerListingsPage from './pages/PartnerListingsPage';
import PartnerStart from './pages/PartnerStart';

// Admin
import PendingQueue from './pages/admin/PendingQueue';
import PropertyInspector from './pages/admin/PropertyInspector';

const App: React.FC = () => {
  const location = useLocation();

  return (
    <>
      <Routes>
        {/* 1. PUBLIC FLOW - Guest & Public Pages */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<GuestDashboard />} />
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="/property/:id" element={<PropertyDetailsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/checkout/:id" element={<CheckoutPage />} />
          <Route path="/confirmation" element={<BookingConfirmationPage />} />
          <Route path="/trips" element={<MyTripsPage />} />
          <Route path="/saved" element={<SavedPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/list-property" element={<PartnerLandingPage />} />
        </Route>

        {/* 2. OWNER MANAGEMENT FLOW - Partner Dashboard */}
        <Route path="/owner" element={<OwnerLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<PartnerDashboard />} />
          <Route path="inventory" element={<PartnerInventoryHub />} />
          <Route path="earnings" element={<Earnings />} />
          <Route path="wizard" element={<AddPropertyWizard />} />
          <Route path="bookings" element={<PartnerBookingsPage />} />
          <Route path="calendar" element={<PartnerCalendarPage />} />
          <Route path="listings" element={<PartnerListingsPage />} />
          <Route path="my-listings" element={<MyProperties />} />
        </Route>

        {/* 3. PARTNER AUTH FLOW - Separate from Guest Auth */}
        <Route path="/partner-login" element={<PartnerLoginPage />} />
        <Route path="/partner-signup" element={<PartnerSignupPage />} />
        <Route path="/partner-register" element={<PartnerRegisterPage />} />
        <Route path="/partner-welcome" element={<PartnerStart />} />

        {/* 4. ADMIN FLOW - Moderation & Inspection */}
        <Route path="/admin">
          <Route path="pending" element={<PendingQueue />} />
          <Route path="inspect/:id" element={<PropertyInspector />} />
        </Route>

        {/* 5. ERROR HANDLING */}
        <Route path="/404" element={<NotFoundPage />} />
        <Route 
          path="*" 
          element={
            <Navigate 
              to="/404" 
              replace 
              state={{ from: location.pathname }}
            />
          } 
        />
      </Routes>
    </>
  );
};

export default App;

