import React from 'react';
import { motion } from 'framer-motion';
import { Bell, Info, Play } from 'lucide-react';
import { CONTENT_DATA } from '../constants/movieData';

const NewPopular = () => {
  // Hum dummy "Coming Soon" data create kar rahe hain
  const comingSoon = [
    { id: 101, title: 'Squid Game S2', date: 'Dec 26', desc: 'The game never ends. Cash-strapped players accept a strange invitation to compete in children’s games.', img: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2070&auto=format&fit=crop' },
    { id: 102, title: 'Stranger Things 5', date: 'Coming 2025', desc: 'The final battle for Hawkins begins. Eleven and the gang face their biggest threat yet from the Upside Down.', img: 'https://images.unsplash.com/photo-1627873649417-c67f701f1949?q=80&w=2070&auto=format&fit=crop' },
  ];

  return (
    <div className="min-h-screen bg-[#141414] pt-24 pb-20 px-4 md:px-20">
      <h1 className="text-2xl md:text-4xl font-black mb-10 text-left border-l-4 border-red-600 pl-4 uppercase tracking-tighter">
        New & Popular
      </h1>

      <div className="grid grid-cols-1 gap-16 max-w-6xl">
        {comingSoon.map((item) => (
          <motion.div 
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row gap-8 group"
          >
            {/* Left: Date */}
            <div className="flex flex-col items-start min-w-[80px]">
              <span className="text-zinc-500 font-bold uppercase text-sm tracking-widest">{item.date.split(' ')[0]}</span>
              <span className="text-3xl font-black text-white">{item.date.split(' ')[1] || 'TBA'}</span>
            </div>

            {/* Right: Content Card */}
            <div className="flex-1 bg-zinc-900/30 rounded-2xl overflow-hidden border border-white/5 hover:border-zinc-700 transition-all shadow-2xl">
              <div className="relative h-64 md:h-96">
                <img src={item.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60" alt="" />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent"></div>
                
                <div className="absolute bottom-6 left-6 flex gap-4">
                   <button className="bg-white text-black px-6 py-2 rounded-md font-bold flex items-center gap-2 hover:bg-zinc-200 transition">
                     <Bell size={18} /> Remind Me
                   </button>
                   <button className="bg-zinc-700/50 backdrop-blur-md text-white px-6 py-2 rounded-md font-bold flex items-center gap-2 hover:bg-zinc-600 transition border border-white/10">
                     <Info size={18} /> Info
                   </button>
                </div>
              </div>

              <div className="p-8 text-left">
                <h2 className="text-2xl md:text-4xl font-black mb-4 italic uppercase tracking-tighter text-white">
                  {item.title}
                </h2>
                <p className="text-zinc-400 text-sm md:text-lg leading-relaxed max-w-3xl italic">
                  "{item.desc}"
                </p>
                <div className="mt-6 flex flex-wrap gap-2 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                  <span>Suspenseful</span>
                  <span>•</span>
                  <span>Drama</span>
                  <span>•</span>
                  <span>Thriller</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default NewPopular;