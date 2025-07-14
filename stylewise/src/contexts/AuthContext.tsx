import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string, gender: 'male' | 'female') => Promise<boolean>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('stylewise_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    const mockUser: User = {
      id: '1',
      email,
      name: email.split('@')[0],
      gender: 'female',
      preferences: {
        favoriteColors: [],
        stylePreferences: [],
        occasions: [],
        brands: []
      }
    };
    
    setUser(mockUser);
    localStorage.setItem('stylewise_user', JSON.stringify(mockUser));
    return true;
  };

  const signup = async (email: string, password: string, name: string, gender: 'male' | 'female'): Promise<boolean> => {
    // Simulate API call
    const newUser: User = {
      id: Date.now().toString(),
      email,
      name,
      gender,
      preferences: {
        favoriteColors: [],
        stylePreferences: [],
        occasions: [],
        brands: []
      }
    };
    
    setUser(newUser);
    localStorage.setItem('stylewise_user', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('stylewise_user');
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('stylewise_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};