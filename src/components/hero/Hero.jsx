import React from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaInfoCircle } from 'react-icons/fa';

const Hero = ({ item, onMoreInfo }) => {
  if (!item) return null;

  return (
    <div className="relative h-[60vh] md:h-[85vh] w-full flex items-center px-4 md:px-12 pt-20 md:pt-0">
      <img 
        src={item.img} 
        className="absolute inset-0 w-full h-full object-cover object-center transition-all duration-1000" 
        alt="hero" 
      />
      
      {/* Overlays for Netflix-like fade effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-[#141414]/30 to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent"></div>
      
      <motion.div 
        key={item.title} 
        initial={{ opacity: 0, x: -50 }} 
        animate={{ opacity: 1, x: 0 }} 
        transition={{ duration: 0.8 }} 
        className="relative z-10 max-w-full md:max-w-2xl mt-0 md:mt-20 text-left p-4 md:p-0"
      >
        <span className="text-red-600 font-bold tracking-[0.3em] text-xs md:text-sm uppercase mb-2 block">
          {item.type === 'series' ? '🔥 Trending Series' : '🎬 Top Movie'}
        </span>
        
        <h1 className="text-4xl sm:text-5xl md:text-8xl font-[900] mb-2 md:mb-4 tracking-tighter drop-shadow-2xl italic uppercase leading-tight">
          {item.title}
        </h1>
        
        <p className="text-sm md:text-lg text-zinc-300 mb-4 md:mb-8 max-w-sm md:max-w-lg leading-relaxed line-clamp-3 md:line-clamp-none">
          {item.desc}
        </p>

        <div className="flex gap-2 md:gap-4">
           <button className="bg-white text-black px-6 py-2 rounded flex items-center gap-2 font-bold text-sm md:text-lg hover:bg-zinc-200 transition shadow-xl active:scale-95">
             <FaPlay className="text-xs md:text-base" /> Play
           </button>
           <button 
              onClick={() => onMoreInfo(item)} 
              className="bg-zinc-500/40 text-white px-6 py-2 rounded flex items-center gap-2 font-bold text-sm md:text-lg backdrop-blur-md hover:bg-zinc-500/60 border border-white/20 active:scale-95">
              <FaInfoCircle className="text-xs md:text-base" /> More Info
           </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;