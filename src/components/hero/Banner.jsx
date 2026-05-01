import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const bannerData = [
  {
    id: 1,
    title: "WAR MACHINE",
    img: "https://images.unsplash.com/photo-1536440136628-849c177e76a1"
  },
  {
    id: 2,
    title: "GLADIATOR II",
    img: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf"
  },
  {
    id: 3,
    title: "AVENGERS",
    img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23"
  }
];

const Banner = () => {
  return (
    <div className="w-full h-[60vh]">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 3000 }}
        loop={true}
        pagination={{ clickable: true }}
        className="h-full"
      >
        {bannerData.map(item => (
          <SwiperSlide key={item.id}>
            <div className="relative h-full w-full">
              <img 
                src={item.img} 
                className="w-full h-full object-cover"
                alt="banner"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50 flex items-center px-10">
                <h1 className="text-white text-4xl font-bold">
                  {item.title}
                </h1>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;