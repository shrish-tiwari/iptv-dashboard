// src/components/skeleton/MovieSkeleton.jsx
import React from 'react';

const MovieSkeleton = () => {
  return (
    <div className="px-4 md:px-12 py-8 transition-all duration-500">
      {/* Title Skeleton - Refined color for better contrast */}
      <div className="h-8 w-48 bg-zinc-800/80 animate-pulse mb-6 rounded-md shadow-sm"></div>
      
      {/* Cards Skeleton Row - Same mapping logic preserved */}
      <div className="flex gap-4 overflow-hidden select-none">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div 
            key={i} 
            className="min-w-[160px] md:min-w-[240px] aspect-video bg-zinc-800/40 animate-pulse rounded-lg border border-white/5 shadow-inner"
          >
             {/* Subtle internal glow for premium feel */}
             <div className="w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieSkeleton;