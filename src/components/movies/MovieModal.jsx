import React, { useEffect } from 'react'; // 👈 useEffect add kiya scroll lock ke liye
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlay, FaPlus, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // 👈 Navigation ke liye import kiya

// update all the useEffect to either to redux-toolkit ya in react-query

/**
 * Helper: Individual Episode Row Component
 */
const EpisodeItem = ({ ep, index, mainImg }) => (
  <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-zinc-800/50 transition cursor-pointer group border-b border-zinc-800/50 last:border-0">
    <span className="text-zinc-500 text-lg font-bold min-w-[25px] pt-1">{index + 1}</span>
    <div className="relative min-w-[120px] md:min-w-[150px]">
      <img src={ep.thumb || mainImg} className="w-full h-16 md:h-24 object-cover rounded shadow-md" alt="" />
    </div>
    <div className="flex-1">
      <div className="flex justify-between items-center mb-1">
        <h4 className="font-bold text-sm md:text-lg text-zinc-100">{ep.title}</h4>
        <span className="text-zinc-400 text-xs md:text-sm">{ep.duration}</span>
      </div>
      <p className="text-xs md:text-sm text-zinc-400 leading-relaxed line-clamp-2 md:line-clamp-3 italic font-light">
        {ep.desc || "No description available for this episode."}
      </p>
    </div>
  </div>
);

/**
 * Helper: Recommendation Card Component
 */
const RecommendationCard = ({ m }) => (
  <div className="bg-[#242424] rounded-lg overflow-hidden group hover:ring-2 hover:ring-zinc-500 transition shadow-lg">
    <img src={m.img} className="h-32 md:h-40 w-full object-cover transition duration-500 group-hover:scale-105" alt="similar" />
    <div className="p-3 md:p-4 text-left">
      <div className="flex justify-between items-center mb-1 md:mb-2">
        <span className="text-xs text-green-500 font-bold">Recommended</span>
        <button className="border border-zinc-500 rounded-full w-6 h-6 flex items-center justify-center hover:bg-white hover:text-black transition md:w-7 md:h-7">
          <FaPlus className="text-xs" />
        </button>
      </div>
      <p className="text-[9px] md:text-[10px] text-zinc-400 line-clamp-2">{m.desc}</p>
    </div>
  </div>
);

/* ============================================================
   ✅ MAIN COMPONENT: MovieModal (Original Version)
   ============================================================ */
const MovieModal = ({ movie, onClose, allMovies }) => {
  const navigate = useNavigate(); // 👈 Hook initialize kiya

  // ✅ Scroll Lock Logic: Jab modal khule toh background scroll na ho
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (!movie) return null;
  
  // Movie ID handle karne ke liye
  const movieId = movie._id || movie.id;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] flex justify-center items-start overflow-y-auto bg-black/80 backdrop-blur-sm p-4 pt-10 pb-10 scrollbar-hide">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 50 }}
          className="bg-[#181818] max-w-full md:max-w-4xl w-full rounded-xl relative shadow-2xl border border-zinc-800 overflow-hidden"
        >
          {/* Close Action */}
          <button className="absolute right-3 top-3 bg-black/60 w-8 h-8 rounded-full z-[220] flex items-center justify-center hover:bg-red-600 transition shadow-2xl md:right-5 md:top-5" onClick={onClose}>
            <FaTimes className="text-sm md:text-base" />
          </button>
          
          {/* Banner Section */}
          <div className="h-[250px] md:h-[450px] relative group/banner">
             <img src={movie.posterUrl} className="w-full h-full object-cover" alt="banner" />
             
             {/* ✅ CENTER PLAY BUTTON: Senior's Feedback */}
             <div 
               onClick={() => navigate(`/watch/${movieId}`)}
               className="absolute inset-0 flex items-center justify-center z-50 cursor-pointer"
             >
                <motion.div 
                  whileHover={{ scale: 1.2 }}
                  className="w-16 h-16 md:w-24 md:h-24 bg-black/40 rounded-full border-2 border-white flex items-center justify-center backdrop-blur-sm hover:bg-red-600/60 transition-colors"
                >
                  <FaPlay className="text-white text-2xl md:text-4xl ml-1 md:ml-2" />
                </motion.div>
             </div>

             <div className="absolute inset-0 bg-gradient-to-t from-[#181818] to-transparent"></div>
             <div className="absolute bottom-4 left-4 text-left md:bottom-10 md:left-10 z-50">
               <h2 className="text-2xl md:text-5xl font-black mb-2 md:mb-6 drop-shadow-2xl uppercase italic">{movie.title}</h2>
               <div className="flex gap-2 md:gap-4">
                  {/* 👇 Yahan onClick add kiya hai movie play karne ke liye */}
                  <button 
                    onClick={() => navigate(`/watch/${movieId}`)}
                    className="bg-red-600 px-6 py-2 rounded font-bold flex items-center gap-1 text-sm md:px-12 md:py-3 md:text-base hover:bg-red-700 transition shadow-xl"
                  >
                    <FaPlay className="text-xs md:text-base" /> 
                    {movie.progress > 0 ? `Resume (${movie.progress}%)` : 'Play Now'}
                  </button>
                  <button className="bg-zinc-800 p-2 rounded-full border border-zinc-500 hover:border-white transition md:p-4">
                    <FaPlus className="text-xs md:text-base" />
                  </button>
               </div>
             </div>
          </div>

          {/* Meta Information Section */}
          <div className="p-4 md:p-10 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 text-left">
             <div className="md:col-span-2">
                <div className="flex flex-wrap items-center gap-2 md:gap-4 text-green-500 font-bold mb-4 md:mb-6 text-sm md:text-xl">
                  <span>{movie.match} Match</span> 
                  <span className="text-zinc-400 font-normal">{movie.year}</span>
                  <span className="border border-zinc-600 px-1 text-xs text-zinc-400 rounded md:px-2">U/A 16+</span>
                  <span className="text-white bg-zinc-700 px-1 rounded text-[8px] font-black uppercase tracking-tighter md:px-1.5 md:text-[10px]">HD</span>
                </div>
                <p className="text-sm md:text-xl text-zinc-300 leading-relaxed font-light">{movie.desc}</p>
             </div>
             
             <div className="text-xs md:text-sm space-y-2 md:space-y-4 text-left">
                <p><span className="text-zinc-500 font-bold uppercase text-xs block mb-1">Cast:</span> Sri Vishnu, Alan Ritchson, Henry Cavill</p>
                <p><span className="text-zinc-500 font-bold uppercase text-xs block mb-1">Genres:</span> Action, Sci-Fi, Thriller</p>
                <p><span className="text-zinc-500 font-bold uppercase text-xs block mb-1">This title is:</span> Suspenseful, Cinematic</p>
             </div>
          </div>

          {/* Conditional: Episode List */}
          {movie.type === 'series' && movie.episodes && (
            <div className="px-4 md:px-10 pb-10 text-left border-t border-zinc-800 pt-10">
              <h3 className="text-xl md:text-2xl font-black text-zinc-400 uppercase tracking-widest border-l-4 border-red-600 pl-4 mb-6">Episodes</h3>
              <div className="space-y-2">
                {movie.episodes.map((ep, index) => (
                  <EpisodeItem key={ep.id} ep={ep} index={index} mainImg={movie.img} />
                ))}
              </div>
            </div>
          )}

          {/* Recommendations: More Like This */}
          <div className="px-4 pb-10 md:px-10 text-left border-t border-zinc-800 pt-10">
            <h3 className="text-xl md:text-2xl font-black mb-8 text-zinc-400 uppercase tracking-widest border-l-4 border-red-600 pl-4">
              More Like This
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {allMovies.filter(m => m.id !== movie.id).slice(0, 6).map(m => (
                <RecommendationCard key={m.id} m={m} />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

/* ============================================================
   ✅ SECONDARY COMPONENT: MovieModalV2 (Alternate Version)
   ============================================================ */
export const MovieModalV2 = ({ movie, onClose, allMovies }) => {
  const navigate = useNavigate(); // 👈 Hook initialize kiya

  // ✅ Scroll Lock Logic
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (!movie) return null;

  const movieId = movie._id || movie.id;
  console.log("the movie data is "+movie.img);
  
  
  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] flex justify-center items-start overflow-y-auto bg-black/90 backdrop-blur-md p-4 pt-10 pb-10 scrollbar-hide">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="bg-[#181818] max-w-full md:max-w-4xl w-full rounded-xl relative shadow-2xl border border-zinc-800 overflow-hidden"
        >
          <button className="absolute right-5 top-5 bg-black/60 w-10 h-10 rounded-full flex items-center justify-center hover:bg-zinc-800 transition" onClick={onClose}>
            <FaTimes />
          </button>
          
          <div className="h-[250px] md:h-[480px] relative group/banner">
             <img src={movie.img || "/default-banner.jpg"} className="w-full h-full object-cover" alt="banner" />
             
             {/* ✅ CENTER PLAY BUTTON: MovieModalV2 */}
             <div 
               onClick={() => navigate(`/watch/${movieId}`)}
               className="absolute inset-0 flex items-center justify-center z-50 cursor-pointer"
             >
                <motion.div 
                  whileHover={{ scale: 1.2 }}
                  className="w-16 h-16 md:w-24 md:h-24 bg-black/40 rounded-full border-2 border-white flex items-center justify-center backdrop-blur-sm"
                >
                  <FaPlay className="text-white text-2xl md:text-4xl ml-2" />
                </motion.div>
             </div>

             <div className="absolute inset-0 bg-gradient-to-t from-[#181818] to-transparent"></div>
             <div className="absolute bottom-10 left-10 z-50">
               <h2 className="text-3xl md:text-6xl font-black mb-6 uppercase italic">{movie.title}</h2>
               {/* 👇 Yahan onClick add kiya hai */}
               <button 
                 onClick={() => navigate(`/watch/${movieId}`)}
                 className="bg-white text-black px-12 py-3 rounded font-bold flex items-center gap-2 hover:bg-zinc-200 transition"
               >
                 <FaPlay /> {movie.progress > 0 ? "Resume" : "Play Now"}
               </button>
             </div>
          </div>

          <div className="p-6 md:p-10">
             <div className="flex items-center gap-4 text-green-500 font-bold mb-6 text-xl">
                <span>{movie.match} Match</span>
                <span className="text-zinc-400">{movie.year}</span>
             </div>
             <p className="text-lg text-zinc-300 mb-10">{movie.desc}</p>

             {/* Episodes V2 */}
             {movie.type === 'series' && movie.episodes && (
               <div className="mt-10 border-t border-zinc-800 pt-10">
                  <h3 className="text-2xl font-black mb-6 uppercase tracking-widest text-zinc-400">Episodes</h3>
                  <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                    {movie.episodes.map((ep, idx) => (
                       <div key={ep.id} className="flex gap-6 items-start p-4 hover:bg-zinc-800/30 rounded-lg transition group">
                          <span className="text-xl font-bold text-zinc-500 pt-1">{idx + 1}</span>
                          <img src={ep.thumb || movie.img} className="w-32 md:w-44 h-20 md:h-24 object-cover rounded shadow-lg" alt="" />
                          <div className="flex-1">
                             <div className="flex justify-between items-center mb-2">
                                <h4 className="text-lg font-bold text-zinc-100">{ep.title}</h4>
                                <span className="text-zinc-500 text-sm">{ep.duration}</span>
                             </div>
                             <p className="text-sm text-zinc-400 leading-relaxed line-clamp-2 md:line-clamp-3 italic">
                                {ep.desc || "Description for this episode will be available soon."}
                             </p>
                          </div>
                       </div>
                    ))}
                  </div>
               </div>
             )}

             {/* Recommendations V2 */}
             <div className="mt-10 border-t border-zinc-800 pt-10">
               <h3 className="text-2xl font-black mb-6 uppercase tracking-widest text-zinc-400">More Like This</h3>
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                 {allMovies.filter(m => m.id !== movie.id).slice(0, 6).map(m => (
                   <div key={m.id} className="bg-[#242424] rounded-lg overflow-hidden group">
                     <img src={m.img} className="h-32 w-full object-cover group-hover:scale-105 transition duration-500" alt="" />
                     <div className="p-3">
                       <p className="text-sm text-zinc-100 font-bold mb-1">{m.title}</p>
                       <p className="text-xs text-zinc-500 line-clamp-2">{m.desc}</p>
                     </div>
                   </div>
                 ))}
               </div>
             </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default MovieModal;