import React from 'react';
import { Star, Clock, Bookmark, BookmarkCheck } from 'lucide-react';
import { Movie } from '../types';

interface MovieCardProps {
  movie: Movie;
  userRating?: number;
  isInWatchlist: boolean;
  onToggleWatchlist: (e: React.MouseEvent) => void;
  onClick: () => void;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie, userRating, isInWatchlist, onToggleWatchlist, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="group relative bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer border border-gray-800"
    >
      {/* Poster Placeholder */}
      <div className={`h-64 w-full bg-gradient-to-br ${movie.posterGradient} relative p-4 flex flex-col justify-end`}>
         <div className="absolute top-2 right-2 z-20">
            <button
              onClick={onToggleWatchlist}
              className="p-2 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm transition-colors text-white"
              title={isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
            >
              {isInWatchlist ? <BookmarkCheck className="text-yellow-500 fill-current" size={20} /> : <Bookmark size={20} />}
            </button>
         </div>
         <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
         <div className="text-6xl font-bold text-white/10 absolute top-4 left-4 select-none">
           {movie.title.substring(0, 1)}
         </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg leading-tight text-gray-100 group-hover:text-yellow-500 transition-colors truncate pr-2">
            {movie.title}
          </h3>
          
          {/* Rating Display Logic: Prioritize User Rating */}
          <div className="flex items-center gap-1 font-semibold text-sm">
            {userRating ? (
              <div className="flex items-center gap-1 text-blue-400" title="Your Rating">
                <Star size={14} fill="currentColor" />
                <span>{userRating}</span>
              </div>
            ) : (
              <div className="flex items-center gap-1 text-yellow-500" title="IMDb Rating">
                <Star size={14} fill="currentColor" />
                <span>{movie.rating.toFixed(1)}</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
          <span>{movie.year}</span>
          <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
          <div className="flex items-center gap-1">
            <Clock size={12} />
            <span>{movie.duration}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1">
          {movie.genres.slice(0, 2).map(g => (
            <span key={g} className="text-xs px-2 py-0.5 bg-gray-800 text-gray-300 rounded-full border border-gray-700">
              {g}
            </span>
          ))}
          {movie.genres.length > 2 && (
             <span className="text-xs px-2 py-0.5 bg-gray-800 text-gray-300 rounded-full border border-gray-700">
               +{movie.genres.length - 2}
             </span>
          )}
        </div>
      </div>
    </div>
  );
};