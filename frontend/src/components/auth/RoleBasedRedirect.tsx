import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface RoleBasedRedirectProps {
  children: React.ReactNode;
}

const RoleBasedRedirect: React.FC<RoleBasedRedirectProps> = ({ children }) => {
  const { user } = useAuth();
  
  // If no user, show children (normal flow)
  if (!user) {
    return <>{children}</>;
  }
  
  // If user has partner role, redirect to partner dashboard
  if (user.role === 'partner') {
    return <Navigate to="/owner/dashboard" replace />;
  }
  
  // If user has guest role, show children (normal guest flow)
  return <>{children}</>;
};

export default RoleBasedRedirect;
