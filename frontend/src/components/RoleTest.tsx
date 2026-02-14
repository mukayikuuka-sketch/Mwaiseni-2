import React from 'react';
import { useAuth } from '../context/AuthContext';

const RoleTest: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <div className="fixed bottom-4 right-4 z-50 p-4 bg-white rounded-lg shadow-lg border">
      <div className="text-sm font-bold">Role Debug:</div>
      <div className="text-xs">
        {user ? (
          <>
            <div>Email: {user.email}</div>
            <div>Role: <span className="font-bold text-blue-600">{user.role}</span></div>
            <div>Layout: {user.role === 'partner' ? 'PartnerLayout' : 'MainLayout'}</div>
          </>
        ) : (
          <div>No user logged in</div>
        )}
      </div>
    </div>
  );
};

export default RoleTest;
