import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import Hero from '../components/hero/Hero';
import MovieRow from '../components/movies/MovieRow';
import MovieModal from '../components/movies/MovieModal';
import { fetchMovies } from '../api/authService'; // API function
import { CONTENT_DATA } from '../constants/movieData'; // Fallback Data

const Home = () => {
  const [category] = useOutletContext();
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // API Data States
  const [moviesData, setMoviesData] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch Movies from API with Safety Extraction
  useEffect(() => {
    const getMovies = async () => {
      try {
        const res = await fetchMovies();
        
        // --- SAFE DATA EXTRACTION ---
        // Aapke API structure ke mutabik res.data.data mein array hai
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

  // 2. SAFE Data Categorization Logic (Updated for API Object Structure)
  const isDataValid = Array.isArray(moviesData);

  const apiMovies = isDataValid ? moviesData.filter(m => {
    const categoryName = m.category?.name?.toLowerCase() || "";
    const type = m.type?.toLowerCase() || "";
    // Agar type 'movie' ho YA category name 'movie' ho YA category 'action/drama' ho (movies ke liye)
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

  // 3. Hero Interval logic
  useEffect(() => {
    if (heroContent.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => 
        prev === heroContent.length - 1 ? 0 : prev + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [heroContent]);

  // Loading Screen
  if (loading && moviesData.length === 0 && allContent.length === 0) {
    return (
      <div className="h-screen bg-black flex items-center justify-center text-white">
        <div className="animate-pulse text-xl font-bold tracking-widest text-red-600">IPTV LOADING...</div>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      {heroContent.length > 0 && (
        <Hero item={heroContent[currentIndex]} onMoreInfo={setSelectedMovie} />
      )}

      <div className="relative z-20 px-4 md:px-12 -mt-16 md:-mt-20 pb-10 md:pb-20 text-left space-y-8 md:space-y-12">
        
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

        {category === 'mylist' && (
           <div className="py-10 md:py-20 text-center text-zinc-500 text-base md:text-xl border border-dashed border-zinc-700 rounded-xl mx-auto max-w-md">
             Your list is empty. Start adding some content!
           </div>
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