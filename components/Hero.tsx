import React from 'react';
import { PlayCircle, Info } from 'lucide-react';

interface HeroProps {
  onRandomMovie: () => void;
  onLearnMore: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onRandomMovie, onLearnMore }) => {
  return (
    <section className="relative min-h-[55vh] md:min-h-[75vh] w-full flex items-end justify-start overflow-hidden">
      {/* Background with Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900 z-0">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute bottom-0 left-0 right-0 h-32 md:h-48 bg-gradient-to-t from-gray-950 via-gray-950/60 to-transparent"></div>
      </div>

      <div className="relative z-10 px-4 py-8 pb-12 md:p-16 md:pb-32 max-w-4xl w-full">
        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-3 md:mb-6 tracking-tight drop-shadow-lg leading-tight">
          Explore Movies & <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">TV Shows</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-6 md:mb-8 max-w-xl md:max-w-2xl drop-shadow-md leading-relaxed">
          Dive into a world of cinematic masterpieces. Create your watchlist, rate your favorites, and discover hidden gems.
        </p>
        
        <div className="flex flex-col xs:flex-row gap-3 md:gap-4 w-full sm:w-auto">
          <button 
            onClick={onRandomMovie}
            className="flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-black px-6 py-3 md:px-8 md:py-4 rounded-xl font-bold transition-all transform hover:scale-105 shadow-lg shadow-yellow-500/20 active:scale-95"
          >
            <PlayCircle size={20} md:size={24} fill="currentColor" className="text-black" />
            <span>Random Movie</span>
          </button>
          <button 
            onClick={onLearnMore}
            className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-6 py-3 md:px-8 md:py-4 rounded-xl font-semibold transition-all border border-white/10 hover:border-white/30 active:scale-95"
          >
            <Info size={20} md:size={24} />
            <span>Learn More</span>
          </button>
        </div>
      </div>
    </section>
  );
};