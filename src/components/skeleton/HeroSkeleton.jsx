import React from 'react';

const HeroSkeleton = () => {
  return (
    <div className="relative h-[70vh] md:h-[92vh] w-full bg-zinc-900 animate-pulse flex items-center px-6 md:px-12">
      <div className="space-y-6 w-full max-w-2xl">
        <div className="h-4 w-32 bg-zinc-800 rounded"></div>
        <div className="h-16 md:h-24 w-3/4 bg-zinc-800 rounded"></div>
        <div className="h-4 w-full bg-zinc-800 rounded"></div>
        <div className="h-4 w-2/3 bg-zinc-800 rounded"></div>
        <div className="flex gap-4">
          <div className="h-12 w-32 bg-zinc-800 rounded"></div>
          <div className="h-12 w-32 bg-zinc-800 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default HeroSkeleton;