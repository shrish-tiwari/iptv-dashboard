// src/components/skeleton/MovieSkeleton.jsx
const MovieSkeleton = () => {
  return (
    <div className="px-4 md:px-12 py-8">
      <div className="h-8 w-48 bg-zinc-800 animate-pulse mb-6 rounded"></div>
      <div className="flex gap-4 overflow-hidden">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div 
            key={i} 
            className="min-w-[160px] md:min-w-[240px] aspect-video bg-zinc-800 animate-pulse rounded-md"
          ></div>
        ))}
      </div>
    </div>
  );
};

export default MovieSkeleton;