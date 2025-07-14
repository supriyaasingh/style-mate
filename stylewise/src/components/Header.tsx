import React from 'react';
import { Link } from 'react-router-dom';
import { User, LogOut, Sparkles } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Header: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Sparkles className="h-8 w-8 text-rose-500" />
            <span className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'serif' }}>
              StyleWise
            </span>
          </Link>

          {user ? (
            <div className="flex items-center space-x-4">
              <nav className="hidden md:flex space-x-6">
                <Link to="/dashboard" className="text-gray-700 hover:text-rose-500 transition-colors">
                  Dashboard
                </Link>
                <Link to="/style-quiz" className="text-gray-700 hover:text-rose-500 transition-colors">
                  Style Quiz
                </Link>
                <Link to="/body-calculator" className="text-gray-700 hover:text-rose-500 transition-colors">
                  Body Shape
                </Link>
                <Link to="/face-calculator" className="text-gray-700 hover:text-rose-500 transition-colors">
                  Face Shape
                </Link>
                <Link to="/outfits" className="text-gray-700 hover:text-rose-500 transition-colors">
                  Outfits
                </Link>
              </nav>
              
              <div className="flex items-center space-x-3">
                <Link to="/profile" className="flex items-center space-x-2 text-gray-700 hover:text-rose-500 transition-colors">
                  <User className="h-5 w-5" />
                  <span className="hidden sm:inline">{user.name}</span>
                </Link>
                <button
                  onClick={logout}
                  className="flex items-center space-x-1 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="text-gray-700 hover:text-rose-500 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-rose-500 text-white px-4 py-2 rounded-lg hover:bg-rose-600 transition-colors"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;