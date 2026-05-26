import React, { useRef } from 'react'; 
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, FreeMode } from 'swiper/modules'; 
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import MovieCard from './MovieCard'; 

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';

const MovieRow = ({ title, data, onSelect }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="group mb-12 relative px-4 sm:px-12">
      <h2 className="text-xl md:text-2xl font-black mb-4 text-zinc-100 group-hover:text-white transition-colors duration-300 inline-flex items-center gap-2 text-left w-full">
        {title} 
        <span className="text-xs text-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-1 sm:text-base cursor-pointer">
          Explore All &gt;
        </span>
      </h2>

      <div 
        ref={prevRef}
        className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 z-50 rounded-full bg-black/60 hover:bg-red-600 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer border border-white/10 shadow-2xl"
      >
        <FaChevronLeft size={14} />
      </div>
      
      <div 
        ref={nextRef}
        className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 z-50 rounded-full bg-black/60 hover:bg-red-600 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer border border-white/10 shadow-2xl"
      >
        <FaChevronRight size={14} />
      </div>

      <Swiper 
        modules={[Navigation, FreeMode]}
        spaceBetween={20} // Space 10 se 20 kiya
        slidesPerView={2.2}
        speed={600}
        grabCursor={true}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        breakpoints={{ 
          640: { slidesPerView: 3.2, freeMode: false }, 
          1024: { slidesPerView: 4.2, freeMode: false }, 
          1280: { slidesPerView: 5.2, freeMode: false }
        }}
        // py-10 aur -my-10 se card cut-off nahi hoga
        className="!overflow-visible !py-10 -my-10"
      >
        {data && data.map((movie, index) => (
          <SwiperSlide key={movie.id || movie._id || index} className="!overflow-visible transition-all duration-200">
            <MovieCard movie={movie} onSelect={onSelect} />
          </SwiperSlide>
        ))}
      </Swiper>

    </div>
  );
};

export default MovieRow;