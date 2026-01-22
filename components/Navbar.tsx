import React, { useState } from 'react';
import { Film, Search, LogOut, Menu, X, User as UserIcon } from 'lucide-react';
import { User } from '../types';

interface NavbarProps {
  user: User | null;
  onLogout: () => void;
  searchTerm: string;
  onSearchChange: (val: string) => void;
  currentView: 'home' | 'watchlist' | 'top_rated';
  onChangeView: (view: 'home' | 'watchlist' | 'top_rated') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  user, 
  onLogout, 
  searchTerm, 
  onSearchChange,
  currentView,
  onChangeView
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (view: 'home' | 'watchlist' | 'top_rated') => {
    onChangeView(view);
    setIsMenuOpen(false);
  };

  const handleLogoutClick = () => {
    onLogout();
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-gray-950/90 backdrop-blur-md border-b border-gray-800 transition-all shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo */}
          <div 
            className="flex-shrink-0 flex items-center gap-2 cursor-pointer" 
            onClick={() => handleNavClick('home')}
          >
            <div className="bg-yellow-500 text-black p-1.5 rounded font-bold">
              <Film size={20} strokeWidth={3} />
            </div>
            <span className="font-bold text-xl tracking-wide hidden sm:block">MovieDB</span>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={16} className="text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="block w-full pl-9 pr-3 py-2 border border-gray-700 rounded-full leading-5 bg-gray-900/50 text-gray-300 placeholder-gray-500 focus:outline-none focus:bg-gray-800 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 sm:text-sm transition-all"
                placeholder="Search..."
              />
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex gap-4 text-sm font-medium">
              <button 
                onClick={() => onChangeView('home')}
                className={`${currentView === 'home' ? 'text-white' : 'text-gray-400 hover:text-white'} transition-colors`}
              >
                Home
              </button>
              <button 
                onClick={() => onChangeView('top_rated')}
                className={`${currentView === 'top_rated' ? 'text-white' : 'text-gray-400 hover:text-white'} transition-colors`}
              >
                Top Rated
              </button>
              <button 
                onClick={() => onChangeView('watchlist')}
                className={`${currentView === 'watchlist' ? 'text-white' : 'text-gray-400 hover:text-white'} transition-colors`}
              >
                Watchlist
              </button>
            </div>

            <div className="h-5 w-px bg-gray-700"></div>

            <div className="flex items-center gap-3">
              <div className="flex flex-col items-end">
                <span className="text-sm font-semibold text-white">{user?.username}</span>
              </div>
              <button 
                onClick={onLogout}
                className="text-gray-400 hover:text-red-400 transition-colors p-2 rounded-full hover:bg-gray-800"
                title="Logout"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="text-gray-300 hover:text-white p-2 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-950 border-b border-gray-800 absolute top-16 left-0 right-0 shadow-2xl animate-fadeIn">
          <div className="px-4 pt-4 pb-6 space-y-2">
            <button 
              onClick={() => handleNavClick('home')}
              className={`block w-full text-left px-3 py-3 rounded-md text-base font-medium ${currentView === 'home' ? 'bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`}
            >
              Home
            </button>
            <button 
              onClick={() => handleNavClick('top_rated')}
              className={`block w-full text-left px-3 py-3 rounded-md text-base font-medium ${currentView === 'top_rated' ? 'bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`}
            >
              Top Rated
            </button>
            <button 
              onClick={() => handleNavClick('watchlist')}
              className={`block w-full text-left px-3 py-3 rounded-md text-base font-medium ${currentView === 'watchlist' ? 'bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`}
            >
              Watchlist
            </button>
          </div>
          
          <div className="border-t border-gray-800 pt-4 pb-6">
            <div className="flex items-center px-5 mb-4">
              <div className="flex-shrink-0 bg-gray-800 p-2 rounded-full text-gray-400">
                <UserIcon size={20} />
              </div>
              <div className="ml-3">
                <div className="text-base font-medium leading-none text-white">{user?.username}</div>
                <div className="text-sm font-medium leading-none text-gray-400 mt-1">{user?.email}</div>
              </div>
            </div>
            <div className="px-4">
              <button 
                onClick={handleLogoutClick}
                className="block w-full text-left px-3 py-3 rounded-md text-base font-medium text-red-400 hover:bg-gray-800 hover:text-red-300 transition-colors flex items-center gap-2"
              >
                <LogOut size={18} />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};