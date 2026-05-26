  import React, { useRef } from 'react';
  import { Swiper, SwiperSlide } from 'swiper/react';
  import { Navigation } from 'swiper/modules';
  import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
  import MovieCard from './MovieCard';

  const TrendingRank = ({ data, onSelect }) => {
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    const renderNumber = (index) => (
      <svg className="absolute left-2 top-2 h-10 w-auto z-[60] select-none drop-shadow-lg" viewBox="0 0 100 100">
        <text 
          x="50" y="80" 
          textAnchor="middle"
          fontSize="90" 
          fontWeight="900" 
          stroke="white" 
          strokeWidth="3" 
          fill="rgba(0,0,0,0.7)"
          style={{ fontFamily: 'sans-serif' }}
        >
          {index + 1}
        </text>
      </svg>
    );

    return (
      <div className="group mb-12 relative px-4 sm:px-12">
        <h2 className="text-xl md:text-2xl font-[900] tracking-tight text-zinc-100 mb-6 text-left px-1">
          Top 10 in India Today
        </h2>

        <button 
          ref={prevRef}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 z-50 rounded-full bg-black/60 hover:bg-red-600 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 border border-white/10 shadow-2xl"
        >
          <FaChevronLeft size={14} />
        </button>
        
        <button 
          ref={nextRef}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 z-50 rounded-full bg-black/60 hover:bg-red-600 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 border border-white/10 shadow-2xl"
        >
          <FaChevronRight size={14} />
        </button>

        <Swiper
          modules={[Navigation]}
          spaceBetween={25} // Gap 15 se badha kar 25 kiya
          slidesPerView={2.2}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          breakpoints={{
            640: { slidesPerView: 3.2 },
            1024: { slidesPerView: 4.2 },
            1280: { slidesPerView: 4.8 }
          }}
          // !py-10 add kiya taaki hover expansion ke liye jagah mile
          className="!overflow-visible mx-0 !py-10 -my-10" 
        >
          {data.slice(0, 10).map((movie, index) => (
            <SwiperSlide key={movie.id || movie._id} className="overflow-visible relative">
              <div className="relative isolate">
                {/* {renderNumber(index)} */}
                <MovieCard movie={movie} onSelect={onSelect} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  };

  export default TrendingRank;