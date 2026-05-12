import React from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaInfoCircle } from 'react-icons/fa';

const Hero = ({ item, onMoreInfo }) => {
  if (!item) return null;

  return (
    <div className="relative h-[70vh] md:h-[92vh] w-full flex items-center px-6 md:px-12 overflow-hidden bg-black">
      {/* Background Image with optimized loading */}
      <motion.img 
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2 }}
        src={item.img} 
        className="absolute inset-0 w-full h-full object-cover object-[center_20%] opacity-70" 
        alt="hero" 
      />
      
      {/* Premium Cinematic Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-black/20"></div>
      
      {/* Bottom fade for smooth row transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#141414] to-transparent"></div>
      
      <motion.div 
        key={item.title} 
        initial={{ opacity: 0, y: 30 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1, ease: "easeOut" }} 
        className="relative z-10 max-w-full md:max-w-3xl mt-12 md:mt-0"
      >
        <div className="flex items-center gap-2 mb-4">
           <span className="w-8 h-[2px] bg-red-600"></span>
           <span className="text-red-600 font-black tracking-[0.4em] text-[10px] md:text-xs uppercase">
            {item.type === 'series' ? '🔥 Trending Series' : '🎬 Top Movie'}
          </span>
        </div>
        
        <h1 className="text-5xl sm:text-6xl md:text-8xl font-[1000] mb-4 tracking-tighter drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] italic uppercase leading-[0.9] text-white">
          {item.title}
        </h1>
        
        <p className="text-sm md:text-lg text-zinc-300 mb-8 max-w-sm md:max-w-xl leading-relaxed line-clamp-3 md:line-clamp-none drop-shadow-md">
          {item.desc}
        </p>

        <div className="flex gap-3 md:gap-5">
           <button className="bg-white text-black px-8 py-2.5 rounded-md flex items-center gap-3 font-black text-sm md:text-lg hover:bg-white/90 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)] active:scale-95 group">
             <FaPlay className="text-xs md:text-base group-hover:scale-110 transition-transform" /> Play Now
           </button>
           <button 
              onClick={() => onMoreInfo(item)} 
              className="bg-zinc-500/20 text-white px-8 py-2.5 rounded-md flex items-center gap-3 font-bold text-sm md:text-lg backdrop-blur-md hover:bg-zinc-500/40 border border-white/10 transition-all duration-300 active:scale-95">
              <FaInfoCircle className="text-xs md:text-base" /> More Info
           </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;