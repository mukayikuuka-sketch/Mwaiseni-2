import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  role: "guest" | "partner";
  name?: string;
  businessName?: string;
  phone?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, role: 'guest' | 'partner') => void;
  register: (email: string, password: string, role: 'guest' | 'partner', additionalData?: any) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('Mwaiseni_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (email: string, role: 'guest' | 'partner') => {
    const dummyUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      role,
      name: role === 'partner' ? 'Lodge Owner' : 'Zambian Traveler'
    };
    setUser(dummyUser);
    localStorage.setItem('Mwaiseni_user', JSON.stringify(dummyUser));
  };

  const register = async (email: string, password: string, role: 'guest' | 'partner', additionalData?: any) => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser: User = {
          id: Math.random().toString(36).substr(2, 9),
          email,
          role,
          ...(role === 'partner' ? {
            businessName: additionalData?.businessName,
            phone: additionalData?.phone,
            name: additionalData?.businessName
          } : {
            name: additionalData?.name || 'New User'
          })
        };
        
        setUser(newUser);
        localStorage.setItem('Mwaiseni_user', JSON.stringify(newUser));
        resolve();
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('Mwaiseni_user');
    window.location.href = '/';
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

