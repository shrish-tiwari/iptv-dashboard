// src/components/marketing/TrendingRank.jsx
import React from 'react';

const TrendingRank = ({ data }) => {
  return (
    <div className="px-6 md:px-16 py-10 bg-black">
      <h2 className="text-2xl font-bold mb-8 text-white">Trending Now</h2>
      
      {/* Horizontal Scroll Container */}
      <div className="flex gap-12 overflow-x-auto no-scrollbar py-4 px-6">
        {data.slice(0, 10).map((movie, index) => (
          <div key={index} className="relative min-w-[160px] md:min-w-[200px] h-[240px] md:h-[280px] transition-transform hover:scale-105 cursor-pointer">
            
            {/* Rank Number (Netflix Style) */}
            <span className="absolute -left-10 bottom-[-15px] text-[100px] md:text-[140px] font-black leading-none select-none z-0 text-black"
                  style={{ WebkitTextStroke: "2px #555" }}>
              {index + 1}
            </span>

            {/* Movie Poster */}
            <img 
              src={movie.image} 
              className="relative z-10 w-full h-full object-cover rounded-lg shadow-2xl border border-zinc-800" 
              alt={movie.title} 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingRank;