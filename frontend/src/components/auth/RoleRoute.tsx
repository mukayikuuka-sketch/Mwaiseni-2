import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../common/LoadingSpinner';

interface RoleRouteProps {
  children: React.ReactNode;
  allowedRole: 'guest' | 'owner';
}

const RoleRoute: React.FC<RoleRouteProps> = ({ children, allowedRole }) => {
  const { user, loading } = useAuth();

  if (loading) return <LoadingSpinner />;

  // If not logged in, go to login
  if (!user) return <Navigate to="/login" />;

  // If the role doesn't match, send them to their respective "Home"
  if (user.role !== allowedRole) {
    return user.role === 'owner' ? <Navigate to="/owner/dashboard" /> : <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default RoleRoute;
