// src/components/marketing/MarketingHero.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChevronRight, FaGlobe } from 'react-icons/fa';
import PosterGrid from './PosterGrid'; // Ensure path is correct

const MarketingHero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative h-screen w-full flex flex-col bg-black overflow-hidden">
      
      {/* LAYER 1: Background Posters (Sabse Peeche) */}
      <div className="absolute inset-0 z-0">
        <PosterGrid />
      </div>

      {/* LAYER 2: Netflix-style Gradient Overlay (Posters ke upar aur Text ke peeche) */}
      <div className="absolute inset-0 z-10 bg-black/40 bg-gradient-to-t from-black via-transparent to-black"></div>

      {/* LAYER 3: Navbar (Logo, Lang, Sign Out) */}
      <header className="relative z-30 flex items-center justify-between px-6 md:px-16 py-6 w-full">
        {/* Logo */}
        <div 
          onClick={() => navigate('/')} 
          className="text-[#E50914] text-3xl md:text-5xl font-black tracking-tighter cursor-pointer select-none drop-shadow-xl"
        >
          IPTV
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 px-3 py-1 border border-zinc-500 rounded bg-black/50 text-white text-sm backdrop-blur-sm">
            <FaGlobe />
            <select className="bg-transparent outline-none cursor-pointer pr-1">
              <option value="en">English</option>
              <option value="hi">हिन्दी</option>
            </select>
          </div>
          <button 
            onClick={() => navigate('/login')}
            className="bg-[#E50914] text-white px-4 py-1.5 rounded text-sm font-bold hover:bg-[#c10710] transition-colors"
          >
            Sign Out
          </button>
        </div>
      </header>

      {/* LAYER 4: Main Text & Button (Sabse Upar) */}
      <main className="relative z-30 flex-grow flex flex-col items-center justify-center text-center px-4 md:px-10 -mt-20">
        {/* Badi Heading */}
        <h1 className="text-white text-4xl md:text-7xl font-[1000] leading-tight mb-4 drop-shadow-[0_4px_12px_rgba(0,0,0,1)]">
          Unlimited movies, <br /> shows, and more
        </h1>
        
        {/* Choti Heading */}
        <p className="text-white text-xl md:text-2xl font-medium mb-10 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
          Starts at ₹149. Cancel at any time.
        </p>

        {/* Finish Sign-Up Button */}
        <button 
          onClick={() => navigate('/register')}
          className="flex items-center gap-4 bg-[#E50914] text-white px-8 md:px-12 py-4 rounded-md font-bold text-xl md:text-3xl hover:bg-[#c10710] transition-all active:scale-95 shadow-[0_0_20px_rgba(229,9,20,0.3)] group"
        >
          <span>Finish Sign-Up</span>
          <FaChevronRight className="group-hover:translate-x-2 transition-transform" />
        </button>
      </main>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black to-transparent z-20"></div>
    </div>
  );
};

export default MarketingHero;