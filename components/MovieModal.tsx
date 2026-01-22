import React from 'react';
import { X, Star, Calendar, Clock, Bookmark, BookmarkCheck } from 'lucide-react';
import { Movie } from '../types';

interface MovieModalProps {
  movie: Movie;
  isInWatchlist: boolean;
  userRating?: number;
  onClose: () => void;
  onToggleWatchlist: () => void;
  onRate: (rating: number) => void;
}

export const MovieModal: React.FC<MovieModalProps> = ({ 
  movie, 
  isInWatchlist, 
  userRating, 
  onClose, 
  onToggleWatchlist, 
  onRate 
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative w-full max-w-4xl bg-gray-900 rounded-xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] border border-gray-800 animate-fadeIn">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-black/50 text-white rounded-full hover:bg-white/20 transition-colors"
        >
          <X size={24} />
        </button>

        {/* Left Side: Poster (or gradient block) */}
        <div className={`md:w-2/5 h-64 md:h-auto bg-gradient-to-br ${movie.posterGradient} relative flex items-center justify-center`}>
           <h1 className="text-9xl font-bold text-white/20 select-none">{movie.title.substring(0,1)}</h1>
        </div>

        {/* Right Side: Details */}
        <div className="flex-1 p-6 md:p-8 overflow-y-auto custom-scrollbar">
          <div className="mb-2 flex items-center gap-3">
             <h2 className="text-3xl md:text-4xl font-bold text-white">{movie.title}</h2>
          </div>
          
          <div className="flex flex-wrap items-center gap-4 text-gray-300 mb-6 text-sm md:text-base">
            <span className="flex items-center gap-1">
              <Calendar size={16} className="text-yellow-500" /> {movie.year}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={16} className="text-yellow-500" /> {movie.duration}
            </span>
            
            {/* Ratings Header */}
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-yellow-500 font-bold" title="IMDb Rating">
                <Star size={16} fill="currentColor" /> {movie.rating}
              </span>
              {userRating && (
                <span className="flex items-center gap-1 text-blue-400 font-bold" title="Your Rating">
                  <Star size={16} fill="currentColor" /> {userRating} <span className="text-xs font-normal text-gray-400">(You)</span>
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {movie.genres.map(g => (
              <span key={g} className="px-3 py-1 bg-gray-800 text-gray-200 rounded-full text-sm border border-gray-700">
                {g}
              </span>
            ))}
          </div>

          <h3 className="text-xl font-semibold text-white mb-2">Plot</h3>
          <p className="text-gray-300 mb-6 leading-relaxed">
            {movie.description}
          </p>

          <h3 className="text-xl font-semibold text-white mb-2">Cast</h3>
          <ul className="text-gray-300 mb-8 list-disc list-inside">
            {movie.cast.map(c => (
              <li key={c}>{c}</li>
            ))}
          </ul>

          <div className="border-t border-gray-800 pt-6 flex flex-col gap-6">
            {/* Actions */}
            <div className="flex items-center gap-4">
              <button 
                onClick={onToggleWatchlist}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-bold transition-all ${
                  isInWatchlist 
                    ? 'bg-red-600 hover:bg-red-700 text-white' 
                    : 'bg-yellow-500 hover:bg-yellow-400 text-black'
                }`}
              >
                {isInWatchlist ? (
                  <>
                    <BookmarkCheck size={20} /> Remove from Watchlist
                  </>
                ) : (
                  <>
                    <Bookmark size={20} /> Add to Watchlist
                  </>
                )}
              </button>
            </div>

            {/* Rating */}
            <div>
              <h4 className="text-sm font-semibold text-gray-400 mb-2 uppercase tracking-wider">Your Rating</h4>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
                  <button 
                    key={star}
                    onClick={() => onRate(star)}
                    className="group focus:outline-none transition-transform hover:scale-110"
                    title={`Rate ${star} stars`}
                  >
                    <Star 
                      size={24} 
                      className={`${
                        (userRating || 0) >= star 
                          ? 'text-blue-400 fill-current' // Changed to blue to match "Your Rating" theme
                          : 'text-gray-600 group-hover:text-blue-200'
                      } transition-colors`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};