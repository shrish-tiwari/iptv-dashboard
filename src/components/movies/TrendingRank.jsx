import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import MovieCard from './MovieCard';

const TrendingRank = ({ data, onSelect }) => {
  // SVG Numbers for Top 10
  const renderNumber = (index) => (
    <svg className="absolute -left-10 bottom-0 h-[70%] w-auto z-[-1] select-none opacity-80" viewBox="0 0 100 100">
      <text 
        x="0" y="90" 
        fontSize="100" 
        fontWeight="900" 
        stroke="rgba(255,255,255,0.5)" 
        strokeWidth="1" 
        fill="black"
        style={{ fontFamily: 'sans-serif' }}
      >
        {index + 1}
      </text>
    </svg>
  );

  return (
    <div className="group mb-12 relative px-6 sm:px-12 overflow-hidden">
      <h2 className="text-xl md:text-2xl font-[900] tracking-tight text-zinc-100 mb-6 text-left px-1">
        Top 10 in India Today
      </h2>

      <Swiper
        modules={[Navigation]}
        spaceBetween={50} // Gap increased for numbers
        slidesPerView={2.2}
        navigation
        breakpoints={{
          640: { slidesPerView: 3.2 },
          1024: { slidesPerView: 4.2 },
          1280: { slidesPerView: 4.8 }
        }}
        className="!overflow-visible !pb-12"
      >
        {data.slice(0, 10).map((movie, index) => (
          <SwiperSlide key={movie.id || movie._id} className="!overflow-visible relative">
            <div className="relative pl-12"> {/* Space for the number */}
              {renderNumber(index)}
              <MovieCard movie={movie} onSelect={onSelect} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TrendingRank;