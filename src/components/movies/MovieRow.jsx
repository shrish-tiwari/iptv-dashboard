import React, { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, FreeMode } from 'swiper/modules'; 
import { motion } from 'framer-motion';
import { FaPlay, FaPlus, FaThumbsUp, FaChevronDown, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // 👈 Navigation ke liye import kiya

// Swiper Styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';

/**
 * MovieCard Component: Backend property compatibility updated
 */
const MovieCard = ({ movie, onSelect }) => {
  const navigate = useNavigate(); // 👈 Hook initialize kiya
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // --- PLAY HANDLER ---
  const handlePlayClick = (e) => {
    e.stopPropagation(); // Taaki card click (modal) trigger na ho
    const movieId = movie._id || movie.id;
    if (movieId) {
      navigate(`/watch/${movieId}`); // 👈 /movies/:id/watch route par bhejega
    }
  };

  const posterImg = movie.posterUrl || movie.thumbnailUrl || movie.img || movie.image || movie.poster || movie.thumb;
  const movieTitle = movie.title || movie.name;

  return (
    <motion.div 
      whileHover={isMobile ? {
        scale: 1.05,
        zIndex: 10,
        y: -5,
      } : {
        scale: 1.6,
        zIndex: 100,
        y: -50,
      }} 
      transition={{ 
        type: "spring", 
        stiffness: 400, 
        damping: 25, 
        delay: 0.1 
      }}
      onClick={() => onSelect(movie)} 
      className="group relative h-40 md:h-44 cursor-pointer rounded-md shadow-2xl border border-transparent hover:border-zinc-700 bg-[#181818] transform-gpu overflow-hidden"
    >
      <img 
        src={posterImg || 'https://via.placeholder.com/300x450?text=No+Poster'} 
        className="w-full h-full object-cover transition-all duration-300 group-hover:brightness-75" 
        alt={movieTitle} 
      />
      
      {movie.progress > 0 && (
        <div className="absolute bottom-0 left-0 w-full h-[3px] bg-zinc-600 z-30 group-hover:hidden">
          <div className="h-full bg-red-600" style={{ width: `${movie.progress}%` }}></div>
        </div>
      )}

      <div className={`absolute inset-0 flex flex-col justify-end p-3 opacity-0 transition-opacity duration-300 bg-gradient-to-t from-black/100 via-black/40 to-transparent ${!isMobile ? 'group-hover:opacity-100' : 'hidden'}`}>
        <div className="flex gap-2 mb-3">
          {/* 👇 Play Button Update kiya hai */}
          <div 
            onClick={handlePlayClick}
            className="bg-white p-1.5 rounded-full text-black hover:bg-zinc-200 transition-colors cursor-pointer"
          >
            <FaPlay className="text-[8px]" />
          </div>
          <div className="bg-zinc-800/80 p-1.5 rounded-full border border-zinc-500 hover:border-white transition-colors text-white">
            <FaPlus className="text-[8px]" />
          </div>
          <div className="bg-zinc-800/80 p-1.5 rounded-full border border-zinc-500 hover:border-white transition-colors text-white">
            <FaThumbsUp className="text-[8px]" />
          </div>
          <div className="ml-auto bg-zinc-800/80 p-1.5 rounded-full border border-zinc-500 hover:border-white transition-colors text-white">
            <FaChevronDown className="text-[8px]" />
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[8px] font-bold">
            <span className="text-green-500">{movie.match || '98%'} Match</span>
            <span className="border border-zinc-500 px-1 text-zinc-300 text-[7px]">U/A 18+</span>
            <span className="text-zinc-300">{movie.seasons || movie.duration || "1 Season"}</span>
            <span className="border border-zinc-600 px-1 rounded text-[7px]">HD</span>
          </div>
          
          <div className="flex flex-wrap gap-1">
            {(movie.genres || ["Suspenseful", "Thriller"]).slice(0, 2).map(tag => (
              <span key={tag} className="text-[8px] text-zinc-100 flex items-center font-medium">
                {tag} <span className="mx-1 text-zinc-500 last:hidden">•</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const MovieRow = ({ title, data, onSelect }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="group mb-12 relative px-4 sm:px-12">
      <h2 className="text-xl md:text-2xl font-black mb-4 text-zinc-100 group-hover:text-white transition-colors duration-300 inline-flex items-center gap-2">
        {title} 
        <span className="text-xs text-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-1 sm:text-base cursor-pointer">
          Explore All &gt;
        </span>
      </h2>

      <div 
        ref={prevRef}
        className="prev-arrow absolute left-0 top-[45px] bottom-0 w-12 z-40 hidden md:flex items-center justify-center bg-black/40 hover:bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer text-white border-r border-zinc-800/50"
      >
        <FaChevronLeft className="text-2xl transition-transform hover:scale-125" />
      </div>
      
      <div 
        ref={nextRef}
        className="next-arrow absolute right-0 top-[45px] bottom-0 w-12 z-40 hidden md:flex items-center justify-center bg-black/40 hover:bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer text-white border-l border-zinc-800/50"
      >
        <FaChevronRight className="text-2xl transition-transform hover:scale-125" />
      </div>

      <Swiper 
        modules={[Navigation, FreeMode]}
        spaceBetween={10}
        slidesPerView={2.2}
        speed={600}
        grabCursor={true}
        touchStartPreventDefault={false}
        touchReleaseOnEdges={true}
        passiveListeners={true}
        freeMode={{
            enabled: true,
            sticky: true,
            momentumRatio: 0.5,
        }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        onSwiper={(swiper) => {
           swiper.navigation.init();
           swiper.navigation.update();
        }}
        breakpoints={{ 
          640: { slidesPerView: 3.2, freeMode: false }, 
          1024: { slidesPerView: 4.2, freeMode: false }, 
          1280: { slidesPerView: 5.2, freeMode: false }
        }}
        style={{ touchAction: 'pan-y' }}
        className="!overflow-visible"
      >
        {data && data.map((movie, index) => (
          <SwiperSlide key={movie.id || movie._id || index} className="!overflow-visible transition-all duration-200 hover:!z-50">
            <MovieCard movie={movie} onSelect={onSelect} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MovieRow;