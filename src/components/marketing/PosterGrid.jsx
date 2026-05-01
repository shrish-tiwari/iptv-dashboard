import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

// Swiper styles
import 'swiper/css';

const PosterGrid = () => {
  // Sharp & Bright Movie Images
  const moviePosters = [
    "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=600&q=80",
    "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&q=80",
    "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=600&q=80",
    "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600&q=80",
    "https://images.unsplash.com/photo-1616530940355-351fabd9524b?w=600&q=80",
    "https://images.unsplash.com/photo-1542204172-3c1f81706f24?w=600&q=80",
    "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=600&q=80",
    "https://images.unsplash.com/photo-1517604401157-538e96804c24?w=600&q=80",
    "https://images.unsplash.com/photo-1574267432553-4b4628081c31?w=600&q=80",
    "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=600&q=80",
  ];

  const SwiperRow = ({ reverse = false, speed = 8000 }) => (
    <Swiper
      modules={[Autoplay]}
      spaceBetween={20}
      slidesPerView={6}
      loop={true}
      speed={speed}
      autoplay={{
        delay: 0,
        disableOnInteraction: false,
        reverseDirection: reverse,
      }}
      allowTouchMove={false}
      className="w-full overflow-visible"
    >
      {[...moviePosters, ...moviePosters].map((src, index) => (
        <SwiperSlide key={index}>
          <div className="w-full aspect-[2/3] bg-zinc-800 rounded-lg overflow-hidden border border-white/20 shadow-2xl">
            <img 
              src={src} 
              alt="poster" 
              className="w-full h-full object-cover brightness-110 contrast-105 saturate-110" 
              loading="lazy" 
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-zinc-950">
      {/* Tilted Container - Opacity set to 100% for clarity */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] -rotate-12 flex flex-col gap-6 opacity-100">
        <SwiperRow speed={40000} />
        <SwiperRow reverse={true} speed={45000} />
        <SwiperRow speed={38000} />
        <SwiperRow reverse={true} speed={42000} />
      </div>

      {/* LIGHT OVERLAYS: Isse posters saaf dikhenge, bas halka sa darkness hai text padhne ke liye */}
      
      {/* 1. Very light tint */}
      <div className="absolute inset-0 bg-black/10"></div>
      
      {/* 2. Soft Radial: Sirf koono (corners) par andhera karega */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_40%,rgba(0,0,0,0.7)_100%)]"></div>
      
      {/* 3. Bottom Shadow: Form ke piche halka base dene ke liye */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20"></div>
    </div>
  );
};

export default PosterGrid;