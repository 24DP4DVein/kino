import React, { useEffect, useState, useMemo } from 'react';
import { User, Movie, SortOption } from './types';
import { MOVIES, GENRES } from './constants';
import { StorageService } from './services/storage';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MovieCard } from './components/MovieCard';
import { MovieModal } from './components/MovieModal';
import { AuthOverlay } from './components/AuthOverlay';
import { InfoModal } from './components/InfoModal';
import { Filter, SortAsc } from 'lucide-react';

const App: React.FC = () => {
  // Auth State
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  
  // App State
  const [currentView, setCurrentView] = useState<'home' | 'watchlist' | 'top_rated'>('home');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [showInfoModal, setShowInfoModal] = useState(false);
  
  // Data State
  const [watchlist, setWatchlist] = useState<number[]>([]);
  const [userRatings, setUserRatings] = useState<Record<number, number>>({});
  
  // Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [sortOption, setSortOption] = useState<SortOption>('rating_desc');

  // Initialization
  useEffect(() => {
    const storedUser = StorageService.getCurrentUser();
    if (storedUser) {
      handleLogin(storedUser);
    }
  }, []);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    StorageService.setCurrentUser(user);
    const data = StorageService.getUserData(user.id);
    setWatchlist(data.watchlist);
    setUserRatings(data.ratings);
    setCurrentView('home');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    StorageService.setCurrentUser(null);
    setWatchlist([]);
    setUserRatings({});
  };

  const handleChangeView = (view: 'home' | 'watchlist' | 'top_rated') => {
    setCurrentView(view);
    // Reset filters when changing view for a cleaner experience
    setSearchTerm('');
    setSelectedGenre('All');
    
    if (view === 'top_rated') {
      setSortOption('rating_desc');
    }
  };

  const toggleWatchlist = (e: React.MouseEvent | null, movieId: number) => {
    if (e) e.stopPropagation();
    if (!currentUser) return;

    const newList = StorageService.toggleWatchlist(currentUser.id, movieId);
    setWatchlist(newList);
  };

  const handleRate = (movieId: number, rating: number) => {
    if (!currentUser) return;
    
    const newRatings = StorageService.setUserRating(currentUser.id, movieId, rating);
    setUserRatings(newRatings);
  };

  const handleRandomMovie = () => {
    const randomIndex = Math.floor(Math.random() * MOVIES.length);
    setSelectedMovie(MOVIES[randomIndex]);
  };

  // Filter Logic
  const filteredMovies = useMemo(() => {
    let result = MOVIES;

    // View Filter (Watchlist vs All vs Top Rated)
    if (currentView === 'watchlist') {
      result = result.filter(m => watchlist.includes(m.id));
    } else if (currentView === 'top_rated') {
      result = result.filter(m => m.rating >= 8.5); // Only show high rated movies
    }

    // Search
    if (searchTerm) {
      const lower = searchTerm.toLowerCase();
      result = result.filter(m => m.title.toLowerCase().includes(lower));
    }

    // Genre
    if (selectedGenre !== 'All') {
      result = result.filter(m => m.genres.includes(selectedGenre));
    }

    // Sort
    result = [...result].sort((a, b) => {
      if (sortOption === 'rating_desc') return b.rating - a.rating;
      if (sortOption === 'year_desc') return b.year - a.year;
      if (sortOption === 'title_asc') return a.title.localeCompare(b.title);
      return 0;
    });

    return result;
  }, [MOVIES, currentView, watchlist, searchTerm, selectedGenre, sortOption]);


  if (!currentUser) {
    return <AuthOverlay onLogin={handleLogin} />;
  }

  const getPageTitle = () => {
    switch (currentView) {
      case 'watchlist': return 'Your Watchlist';
      case 'top_rated': return 'Top Rated Movies';
      default: return 'Popular Movies';
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 pb-16">
      <Navbar 
        user={currentUser} 
        onLogout={handleLogout}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        currentView={currentView}
        onChangeView={handleChangeView}
      />

      {currentView === 'home' && (
        <Hero 
          onRandomMovie={handleRandomMovie} 
          onLearnMore={() => setShowInfoModal(true)} 
        />
      )}

      <main 
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 transition-all duration-500 ${
          currentView === 'home' 
            ? 'mt-4 md:-mt-24' /* Adjusted margin for mobile */
            : 'pt-24'
        }`}
      >
        
        {/* Controls Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-5 bg-gray-900/80 md:bg-gray-900/60 backdrop-blur-xl p-4 md:p-5 rounded-2xl border border-white/5 shadow-2xl ring-1 ring-white/10">
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
            <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
              {getPageTitle()}
            </h2>
            <span className="text-xs font-bold text-gray-300 bg-gray-800/80 px-2.5 py-1 rounded-full border border-gray-700">
              {filteredMovies.length}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row w-full md:w-auto gap-3">
            {/* Genre Filter */}
            <div className="relative group w-full sm:w-44">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-hover:text-yellow-500 transition-colors">
                <Filter size={16} />
              </div>
              <select 
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="pl-10 pr-8 py-2.5 bg-gray-800/50 hover:bg-gray-800 border border-gray-700 text-gray-200 text-sm rounded-lg focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 block w-full appearance-none cursor-pointer transition-all outline-none truncate"
              >
                {GENRES.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>

            {/* Sort Filter */}
            <div className="relative group w-full sm:w-44">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-hover:text-yellow-500 transition-colors">
                <SortAsc size={16} />
              </div>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as SortOption)}
                className="pl-10 pr-8 py-2.5 bg-gray-800/50 hover:bg-gray-800 border border-gray-700 text-gray-200 text-sm rounded-lg focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 block w-full appearance-none cursor-pointer transition-all outline-none truncate"
              >
                <option value="rating_desc">Rating (High to Low)</option>
                <option value="year_desc">Year (New to Old)</option>
                <option value="title_asc">Title (A-Z)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Empty State */}
        {filteredMovies.length === 0 && (
          <div className="text-center py-20 bg-gray-900/30 rounded-2xl border border-dashed border-gray-800 backdrop-blur-sm mx-4 md:mx-0">
            <p className="text-gray-400 text-lg">No movies found matching your criteria.</p>
            {currentView !== 'home' && (
              <button 
                onClick={() => handleChangeView('home')} 
                className="mt-4 text-yellow-500 hover:text-yellow-400 font-semibold underline underline-offset-4 transition-colors"
              >
                Browse all movies
              </button>
            )}
          </div>
        )}

        {/* Movie Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-fadeIn pb-12">
          {filteredMovies.map(movie => (
            <MovieCard 
              key={movie.id} 
              movie={movie} 
              userRating={userRatings[movie.id]} 
              isInWatchlist={watchlist.includes(movie.id)}
              onToggleWatchlist={(e) => toggleWatchlist(e, movie.id)}
              onClick={() => setSelectedMovie(movie)}
            />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-gray-950/80 backdrop-blur-md py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm mb-2">
            Demo project inspired by IMDb. All data is fictional.
          </p>
          <p className="text-gray-600 text-xs">
            © {new Date().getFullYear()} MovieDB React Demo.
          </p>
        </div>
      </footer>

      {/* Movie Modal */}
      {selectedMovie && (
        <MovieModal 
          movie={selectedMovie}
          isInWatchlist={watchlist.includes(selectedMovie.id)}
          userRating={userRatings[selectedMovie.id]}
          onClose={() => setSelectedMovie(null)}
          onToggleWatchlist={() => toggleWatchlist(null, selectedMovie.id)}
          onRate={(r) => handleRate(selectedMovie.id, r)}
        />
      )}

      {/* Info Modal */}
      {showInfoModal && (
        <InfoModal onClose={() => setShowInfoModal(false)} />
      )}
    </div>
  );
};

export default App;