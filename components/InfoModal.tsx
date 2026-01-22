import React from 'react';
import { X, Film, Shield, Zap, Database } from 'lucide-react';

interface InfoModalProps {
  onClose: () => void;
}

export const InfoModal: React.FC<InfoModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative w-full max-w-2xl bg-gray-900 rounded-xl shadow-2xl overflow-hidden border border-gray-800 animate-fadeIn">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-black/50 text-white rounded-full hover:bg-white/20 transition-colors"
        >
          <X size={24} />
        </button>
        
        <div className="p-8 md:p-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-yellow-500 text-black p-2 rounded-lg">
              <Film size={24} strokeWidth={2.5} />
            </div>
            <h2 className="text-3xl font-bold text-white">About MovieDB</h2>
          </div>
          
          <p className="text-gray-300 text-lg leading-relaxed mb-8">
            Welcome to MovieDB, your ultimate destination for cinematic discovery. 
            This application showcases the power of modern web technologies, providing a seamless and interactive experience for movie lovers.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
              <div className="flex items-center gap-2 mb-2 text-yellow-500">
                <Database size={20} />
                <h3 className="font-bold text-white">Local Persistence</h3>
              </div>
              <p className="text-gray-400 text-sm">
                Your watchlist and ratings are saved securely in your browser's local storage, ensuring your data is ready whenever you return.
              </p>
            </div>

            <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
              <div className="flex items-center gap-2 mb-2 text-yellow-500">
                <Shield size={20} />
                <h3 className="font-bold text-white">Secure Auth</h3>
              </div>
              <p className="text-gray-400 text-sm">
                A demonstration of client-side authentication allowing for personalized experiences and user-specific data separation.
              </p>
            </div>

            <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
              <div className="flex items-center gap-2 mb-2 text-yellow-500">
                <Zap size={20} />
                <h3 className="font-bold text-white">Instant Interactions</h3>
              </div>
              <p className="text-gray-400 text-sm">
                Experience real-time filtering, sorting, and search capabilities without any page reloads.
              </p>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-800 flex justify-end">
            <button 
              onClick={onClose}
              className="px-6 py-2.5 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors"
            >
              Got it
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};