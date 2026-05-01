import React from 'react';
import { useNavigate } from 'react-router-dom';

const MarketingNavbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="absolute top-0 w-full z-50 flex items-center justify-between px-6 md:px-16 py-6">
      <h1 className="text-[#E50914] text-4xl md:text-5xl font-[900] tracking-tighter">IPTV</h1>

      <div className="flex items-center gap-4">
        {/* Language Button */}
        <div className="border border-zinc-500 bg-black/40 px-4 py-1.5 rounded flex items-center gap-2 text-white text-sm">
          <span>🌐 English</span>
          <span className="text-[10px]">▼</span>
        </div>

        {/* Sign In Button */}
        <button 
          onClick={() => navigate('/login')}
          className="bg-[#E50914] text-white px-4 py-1.5 rounded font-bold text-sm hover:bg-[#c10710] transition"
        >
          Sign In
        </button>
      </div>
    </nav>
  );
};

export default MarketingNavbar;