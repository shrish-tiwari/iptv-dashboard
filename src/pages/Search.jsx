import React, { useState, useEffect } from 'react';
import { Search as SearchIcon, X } from 'lucide-react';
import MovieCard from '../components/movies/MovieCard';
import MovieModal from '../components/movies/MovieModal';
import { fetchMovies } from '../api/authService'; // Same API as Home
import { CONTENT_DATA } from '../constants/movieData'; // Same Fallback as Home

const Search = () => {
  const [query, setQuery] = useState('');
  const [moviesData, setMoviesData] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1. Fetch Data (Same logic as your Home.jsx)
  useEffect(() => {
    const getMovies = async () => {
      try {
        const res = await fetchMovies();
        const rawData = res.data?.data || res.data?.movies || (Array.isArray(res.data) ? res.data : []);
        setMoviesData(rawData);
      } catch (err) {
        console.error("❌ Error fetching movies for search:", err);
        setMoviesData([]); 
      } finally {
        setLoading(false);
      }
    };
    getMovies();
  }, []);

  // 2. Filter Logic
  const allContent = moviesData.length > 0 
    ? moviesData 
    : [...CONTENT_DATA.movies, ...CONTENT_DATA.webSeries, ...CONTENT_DATA.tvShows];

  const filteredResults = allContent.filter(movie => {
    const title = (movie.title || movie.name || "").toLowerCase();
    return title.includes(query.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-[#141414] pt-28 px-6 md:px-12">
      {/* Premium Search Bar */}
      <div className="max-w-4xl mx-auto mb-12">
        <div className="relative flex items-center group">
          <SearchIcon className="absolute left-5 text-zinc-500 group-focus-within:text-red-600 transition-colors" size={22} />
          <input 
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search titles, genres, or people..."
            className="w-full bg-zinc-900/40 border border-zinc-800 text-white pl-14 pr-12 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-600 transition-all text-lg md:text-xl backdrop-blur-xl shadow-2xl"
            autoFocus
          />
          {query && (
            <X 
              className="absolute right-5 text-zinc-500 cursor-pointer hover:text-white" 
              onClick={() => setQuery('')}
              size={22}
            />
          )}
        </div>
      </div>

      {/* Results Grid */}
      {query ? (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h2 className="text-zinc-500 text-sm md:text-lg mb-8 text-left">
            Showing results for: <span className="text-white font-black italic">"{query}"</span>
          </h2>
          
          {filteredResults.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-10 pb-20">
              {filteredResults.map((movie) => (
                <MovieCard 
                  key={movie.id || movie._id} 
                  movie={movie} 
                  onSelect={setSelectedMovie} 
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-32">
              <p className="text-zinc-600 text-xl font-medium">No matches found. Try a different keyword.</p>
            </div>
          )}
        </div>
      ) : (
        /* Empty State */
        <div className="flex flex-col items-center justify-center pt-24 opacity-20 select-none">
          <SearchIcon size={120} className="text-zinc-700 mb-6" strokeWidth={1} />
          <p className="text-xl md:text-2xl font-black uppercase tracking-tighter">Search IPTV Library</p>
        </div>
      )}

      {/* Reuse your MovieModal for Search Results */}
      {selectedMovie && (
        <MovieModal 
          movie={selectedMovie} 
          onClose={() => setSelectedMovie(null)} 
          allMovies={allContent}
        />
      )}
    </div>
  );
};

export default Search;