import React, { useRef } from 'react'; // Sirf zaruri imports rakhe hain
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, FreeMode } from 'swiper/modules'; 
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
// 👇 Ye imported MovieCard ab poori app mein use hoga
import MovieCard from './MovieCard'; 

// Swiper Styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';

const MovieRow = ({ title, data, onSelect }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="group mb-12 relative px-4 sm:px-12">
      {/* Title Section - Untouched */}
      <h2 className="text-xl md:text-2xl font-black mb-4 text-zinc-100 group-hover:text-white transition-colors duration-300 inline-flex items-center gap-2 text-left w-full">
        {title} 
        <span className="text-xs text-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-1 sm:text-base cursor-pointer">
          Explore All &gt;
        </span>
      </h2>

      {/* Navigation Arrows - Untouched */}
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

      {/* Swiper Slider - All your settings are PRESERVED */}
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
            {/* Using the Imported MovieCard */}
            <MovieCard movie={movie} onSelect={onSelect} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MovieRow;