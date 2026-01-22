import React, { useState } from 'react';
import { Film, UserPlus, LogIn, AlertCircle } from 'lucide-react';
import { User } from '../types';
import { StorageService } from '../services/storage';

interface AuthOverlayProps {
  onLogin: (user: User) => void;
}

export const AuthOverlay: React.FC<AuthOverlayProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  
  // Form State
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const clearForm = () => {
    setError('');
    setUsername('');
    setEmail('');
    setPassword('');
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    clearForm();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      // Login Logic
      const users = StorageService.getUsers();
      const user = users.find(u => 
        (u.email === email || u.username === email) && u.password === password
      );

      if (user) {
        onLogin(user);
      } else {
        setError('Invalid credentials. Please try again.');
      }
    } else {
      // Registration Logic
      if (!username || !email || !password) {
        setError('All fields are required.');
        return;
      }
      if (password.length < 6) {
        setError('Password must be at least 6 characters.');
        return;
      }
      if (!email.includes('@')) {
        setError('Please enter a valid email.');
        return;
      }

      const users = StorageService.getUsers();
      if (users.some(u => u.username === username)) {
        setError('Username already taken.');
        return;
      }
      if (users.some(u => u.email === email)) {
        setError('Email already registered.');
        return;
      }

      const newUser: User = {
        id: Date.now().toString(),
        username,
        email,
        password,
        createdAt: Date.now()
      };

      StorageService.saveUser(newUser);
      onLogin(newUser);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-gray-950 flex flex-col items-center justify-center p-4">
      <div className="mb-8 flex flex-col items-center">
        <div className="bg-yellow-500 text-black p-3 rounded-lg font-bold mb-4 shadow-lg shadow-yellow-500/20">
          <Film size={48} strokeWidth={2.5} />
        </div>
        <h1 className="text-4xl font-bold text-white tracking-tight">MovieDB</h1>
        <p className="text-gray-400 mt-2">Your personal cinematic journey starts here.</p>
      </div>

      <div className="w-full max-w-md bg-gray-900 border border-gray-800 p-8 rounded-xl shadow-2xl animate-fadeIn">
        <div className="flex items-center justify-between mb-8 border-b border-gray-800 pb-4">
          <button 
            className={`text-lg font-semibold pb-1 transition-colors ${isLogin ? 'text-yellow-500' : 'text-gray-500 hover:text-gray-300'}`}
            onClick={!isLogin ? toggleMode : undefined}
          >
            Sign In
          </button>
          <button 
            className={`text-lg font-semibold pb-1 transition-colors ${!isLogin ? 'text-yellow-500' : 'text-gray-500 hover:text-gray-300'}`}
            onClick={isLogin ? toggleMode : undefined}
          >
            Create Account
          </button>
        </div>

        {error && (
          <div className="mb-6 bg-red-900/30 border border-red-800 text-red-200 px-4 py-3 rounded-lg flex items-start gap-3 text-sm">
            <AlertCircle size={18} className="mt-0.5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Username</label>
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="w-full bg-gray-950 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 focus:outline-none transition-colors"
                placeholder="Choose a username"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              {isLogin ? 'Email or Username' : 'Email Address'}
            </label>
            <input
              type="text"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-gray-950 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 focus:outline-none transition-colors"
              placeholder={isLogin ? "Enter your email or username" : "Enter your email"}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-gray-950 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 focus:outline-none transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 rounded-lg transition-all transform active:scale-95 flex items-center justify-center gap-2 mt-2"
          >
            {isLogin ? <LogIn size={20} /> : <UserPlus size={20} />}
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <p className="mt-6 text-xs text-center text-gray-600">
          This project uses localStorage for authentication. <br/> This is for demo purposes only and is NOT secure for real production use.
        </p>
      </div>
    </div>
  );
};
