// src/components/auth/RoleGuard.tsx
import React from "react";
import { Navigate } from "react-router-dom";

interface RoleGuardProps {
  children: React.ReactNode;
  user: any;
  allowedRoles: string[];
  redirectTo?: string;
}

const RoleGuard: React.FC<RoleGuardProps> = ({ 
  children, 
  user, 
  allowedRoles, 
  redirectTo = "/" 
}) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to={redirectTo} replace />;
  }
  
  return <>{children}</>;
};

export default RoleGuard;
