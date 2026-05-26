import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaPlus, FaThumbsUp, FaChevronDown, FaCheck } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useWatchlist } from '../../context/WatchlistContext';

const MovieCard = ({ movie, onSelect }) => {
  const navigate = useNavigate(); 
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false); 
  
  const { toggleWatchlist, isInWatchlist } = useWatchlist();
  const movieId = movie._id || movie.id;
  const isAdded = isInWatchlist(movieId);

  const defaultPoster = "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=2070&auto=format&fit=crop";

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handlePlayClick = (e) => {
    e.stopPropagation(); 
    if (movieId) navigate(`/watch/${movieId}`); 
  };

  const handleWatchlistClick = (e) => {
    e.stopPropagation();
    toggleWatchlist(movie);
  };

  const posterImg = movie.posterUrl || movie.thumbnailUrl || movie.img || movie.image || movie.poster || movie.thumb || defaultPoster;
  const movieTitle = movie.title || movie.name;

  // Faster loading trailer link
  const trailerVideo = movie.trailerUrl || "https://vjs.zencdn.net/v/oceans.mp4";

  return (
    <motion.div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      // 👇 Bhai yahan scale 1.3 aur y -25 kiya hai taaki "chipping" na ho
      whileHover={isMobile ? { scale: 1.05, zIndex: 10, y: -5 } : { scale: 1.5, zIndex: 100, y: 0 }} 
      transition={{ duration: 0.3, ease: "easeOut" }}
      onClick={() => onSelect(movie)} 
      className=" h-40 md:h-44 cursor-pointer rounded-lg shadow-2xl border border-white/5 hover:border-zinc-500 bg-[#181818] transform-gpu overflow-hidden"
    >
      {/* 🖼️ Poster Image - Ab ye tabhi dikhega jab video na ho ya hover na ho */}
      <img 
        src={posterImg} 
        onError={(e) => { e.target.onerror = null; e.target.src = defaultPoster; }}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 z-0 ${isHovered && !isMobile ? 'opacity-0' : 'opacity-100'}`} 
        alt={movieTitle} 
      />

      {/* 🎥 Video Preview - Instant Play */}
      {!isMobile && isHovered && (
        <div className="absolute inset-0 z-5 w-full h-full bg-black">
          <video 
            src={trailerVideo}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover z-10 shadow-2xl"
          />
        </div>
      )}
      
      {/* Progress Bar */}
      {movie.progress > 0 && (
         <div className="absolute bottom-0 left-0 w-full h-[4px] bg-zinc-700/50 z-30 group-hover:opacity-0 transition-opacity"> 
          {/* <div className="h-full bg-red-600 shadow-[0_0_8px_rgba(229,9,20,0.8)]" style={{ width: `${movie.progress}%` }}></div> */}
        </div>
      )}

      {/* Info Overlay - Z-index badha diya hai */}
      <div className={`absolute inset-0 z-5 flex flex-col justify-end p-4 opacity-0 transition-all duration-300 bg-gradient-to-t from-black/100 via-black/20 to-transparent ${!isMobile ? 'group-hover:opacity-100' : 'hidden'}`}>
        <div className="flex gap-2 mb-3">
          <div onClick={handlePlayClick} className="bg-white p-2 rounded-full text-black hover:bg-zinc-200 transition-all active:scale-90 shadow-lg cursor-pointer">
            <FaPlay className="text-[10px]" />
          </div>
          <div onClick={handleWatchlistClick} className="bg-zinc-800/80 p-2 rounded-full border border-zinc-600 hover:border-white transition-all active:scale-90 text-white shadow-lg">
            {isAdded ? <FaCheck className="text-[10px] text-green-500" /> : <FaPlus className="text-[10px]" />}
          </div>
          <div className="bg-zinc-800/80 p-2 rounded-full border border-zinc-600 hover:border-white transition-all active:scale-90 text-white shadow-lg">
            <FaThumbsUp className="text-[10px]" />
          </div>
          <div className="ml-auto bg-zinc-800/80 p-2 rounded-full border border-zinc-600 hover:border-white transition-all active:scale-90 text-white shadow-lg">
            <FaChevronDown className="text-[10px]" />
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[10px] font-bold text-white">
            <span className="text-green-500">{movie.match || '98%'} Match</span>
            <span className="border border-zinc-500 px-1 text-zinc-300 text-[8px] rounded-sm uppercase">U/A 18+</span>
            <span className="text-zinc-100 font-black border border-white/20 px-1 rounded-sm bg-black/20 text-[8px]">HD</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {(movie.genres || ["Suspenseful", "Thriller"]).slice(0, 2).map((tag, idx) => (
              <span key={tag} className="text-[9px] text-white flex items-center font-black drop-shadow-md">
                {tag} {idx === 0 && <span className="mx-1 text-zinc-500">•</span>}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MovieCard;