import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import Hero from '../components/hero/Hero';
import MovieRow from '../components/movies/MovieRow';
import MovieModal from '../components/movies/MovieModal';
import TrendingRank from '../components/movies/TrendingRank'; 
import MovieSkeleton from '../components/skeleton/MovieSkeleton'; // 👈 Skeleton Import
import HeroSkeleton from '../components/skeleton/HeroSkeleton';   // 👈 Skeleton Import
import { fetchMovies } from '../api/authService'; 
import { CONTENT_DATA } from '../constants/movieData'; 
import { useWatchlist } from '../context/WatchlistContext'; 

const Home = () => {
  const [category] = useOutletContext();
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // API Data States
  const [moviesData, setMoviesData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Watchlist state load kiya
  const { watchlist } = useWatchlist();

  // 1. Fetch Movies from API with Safety Extraction (Untouched Logic)
  useEffect(() => {
    const getMovies = async () => {
      try {
        const res = await fetchMovies();
        const rawData = res.data?.data || res.data?.movies || (Array.isArray(res.data) ? res.data : []);
        setMoviesData(rawData);
      } catch (err) {
        console.error("❌ Error fetching movies from API:", err);
        setMoviesData([]); 
      } finally {
        setLoading(false);
      }
    };
    getMovies();
  }, []);

  // 2. SAFE Data Categorization Logic (Untouched Logic)
  const isDataValid = Array.isArray(moviesData);

  const apiMovies = isDataValid ? moviesData.filter(m => {
    const categoryName = m.category?.name?.toLowerCase() || "";
    const type = m.type?.toLowerCase() || "";
    return type === 'movie' || categoryName === 'movie' || categoryName === 'action' || categoryName === 'drama' || !type;
  }) : [];

  const apiSeries = isDataValid ? moviesData.filter(m => {
    const categoryName = m.category?.name?.toLowerCase() || "";
    const type = m.type?.toLowerCase() || "";
    return type === 'series' || categoryName === 'series' || categoryName === 'web series';
  }) : [];

  const apiShows = isDataValid ? moviesData.filter(m => {
    const categoryName = m.category?.name?.toLowerCase() || "";
    const type = m.type?.toLowerCase() || "";
    return type === 'show' || categoryName === 'shows' || categoryName === 'tv shows';
  }) : [];

  // Agar API se data aaya toh wo dikhega, warna fallback data
  const displayMovies = apiMovies.length > 0 ? apiMovies : CONTENT_DATA.movies;
  const displaySeries = apiSeries.length > 0 ? apiSeries : CONTENT_DATA.webSeries;
  const displayShows = apiShows.length > 0 ? apiShows : CONTENT_DATA.tvShows;

  const allContent = [...displayMovies, ...displaySeries, ...displayShows];
  const heroContent = category === 'series' ? displaySeries : displayMovies;

  // 3. Hero Interval logic (Untouched Logic)
  useEffect(() => {
    if (heroContent.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => 
        prev === heroContent.length - 1 ? 0 : prev + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [heroContent]);

  // --- PREMIUM LOADING SCREEN (Updated with Skeletons) ---
  if (loading && moviesData.length === 0) {
    return (
      <div className="bg-[#141414] min-h-screen overflow-hidden">
        <HeroSkeleton />
        <div className="relative z-20 px-4 md:px-12 -mt-16 md:-mt-20 space-y-8 md:space-y-12">
          <MovieSkeleton />
          <MovieSkeleton />
          <MovieSkeleton />
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section (Untouched) */}
      {heroContent.length > 0 && (
        <Hero item={heroContent[currentIndex]} onMoreInfo={setSelectedMovie} />
      )}

      <div className="relative z-20 px-4 md:px-12 -mt-16 md:-mt-20 pb-10 md:pb-20 text-left space-y-8 md:space-y-12">
        
        {/* --- 🏆 TOP 10 RANKING ROW --- */}
        {(category === 'all' || category === 'movies') && (
           <TrendingRank data={allContent} onSelect={setSelectedMovie} />
        )}

        {(category === 'all' || category === 'movies') && (
           <MovieRow title="Blockbuster Movies" data={displayMovies} onSelect={setSelectedMovie} />
        )}
        
        {(category === 'all' || category === 'series') && (
           <>
              <MovieRow title="Binge-Worthy Web Series" data={displaySeries} onSelect={setSelectedMovie} />
              <MovieRow title="Most Talked About Shows" data={displayShows} onSelect={setSelectedMovie} />
              <MovieRow title="Crime & Thriller Series" data={[...displaySeries].reverse()} onSelect={setSelectedMovie} />
           </>
        )}

        {category === 'shows' && (
           <MovieRow title="International TV Shows" data={displayShows} onSelect={setSelectedMovie} />
        )}

        {category === 'new' && (
           <MovieRow title="Recently Added" data={[...allContent].sort(() => 0.5 - Math.random())} onSelect={setSelectedMovie} />
        )}

        {/* --- MY LIST LOGIC (Untouched) --- */}
        {category === 'mylist' && (
           watchlist.length > 0 ? (
             <MovieRow title="My Watchlist" data={watchlist} onSelect={setSelectedMovie} />
           ) : (
             <div className="py-10 md:py-20 text-center text-zinc-500 text-base md:text-xl border border-dashed border-zinc-700 rounded-xl mx-auto max-w-md animate-in fade-in zoom-in duration-500">
               Your list is empty. Start adding some content!
             </div>
           )
        )}

        {category === 'all' && (
          <>
            <MovieRow title="Trending Now" data={[...allContent].reverse()} onSelect={setSelectedMovie} />
            <MovieRow title="Action & Adventure" data={[...displayMovies, ...displaySeries]} onSelect={setSelectedMovie} />
          </>
        )}
      </div>

      {selectedMovie && (
        <MovieModal 
          movie={selectedMovie} 
          onClose={() => setSelectedMovie(null)} 
          allMovies={allContent}
        />
      )}
    </>
  );
};

export default Home;