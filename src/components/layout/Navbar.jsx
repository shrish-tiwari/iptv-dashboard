import React, { useState, useEffect } from 'react';
import { FaSearch, FaBell, FaChevronDown } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from "../../hooks/useAuth";

/**
 * Navigation Constants
 */
const NAV_ITEMS = [
  { name: 'Home', id: 'all' },
  { name: 'TV Series', id: 'series' },
  { name: 'Movies', id: 'movies' },
  { name: 'New & Popular', id: 'new' },
  { name: 'My List', id: 'mylist' },
];

const Navbar = ({ setCategory, currentCategory }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();
  
  // useAuth se logout aur user data nikala
  const { logout, user } = useAuth(); 

  // --- SCROLL LOGIC ---
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- UPDATED LOGOUT HANDLER ---
  const handleSignOut = () => {
    // Ab ye asli logout trigger karega (API call + cleanup)
    logout(); 
  };

  return (
    <nav className={`fixed top-0 w-full z-[100] flex items-center justify-between px-6 md:px-12 py-3 transition-all duration-500 
      ${isScrolled ? 'bg-[#141414] shadow-2xl border-b border-white/5' : 'bg-transparent'}`}>
      
      {/* LEFT: Logo & Main Navigation */}
      <div className="flex items-center gap-10">
        <h1 
          onClick={() => {
            navigate('/'); 
            setCategory('all'); 
          }} 
          className="text-[#E50914] text-4xl font-[900] tracking-tighter cursor-pointer drop-shadow-lg select-none"
        >
          IPTV
        </h1>

        <div className="hidden lg:flex gap-6 text-sm font-medium">
          {NAV_ITEMS.map((item) => (
            <span 
              key={item.id} 
              onClick={() => {
                navigate('/'); 
                setCategory(item.id);
              }}
              className={`cursor-pointer transition duration-300 
                ${currentCategory === item.id ? 'text-white font-bold' : 'text-gray-300 hover:text-gray-400'}`}
            >
              {item.name}
            </span>
          ))}
        </div>
      </div>

      {/* RIGHT: Actions & User Menu */}
      <div className="flex items-center gap-6 text-xl">
        <FaSearch className="cursor-pointer hover:text-red-600 transition text-lg md:text-xl" />
        
        {/* Notifications */}
        <div className="relative cursor-pointer group">
          <FaBell className="text-lg md:text-xl" />
          <span className="absolute -top-1 -right-1 bg-red-600 text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
            3
          </span>
        </div>

        {/* User Profile Menu */}
        <div 
          className="relative" 
          onMouseEnter={() => setShowProfile(true)} 
          onMouseLeave={() => setShowProfile(false)}
        >
          <div className="flex items-center gap-2 cursor-pointer group">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" 
              className="w-8 h-8 rounded border border-transparent group-hover:border-white transition" 
              alt="user" 
            />
            <FaChevronDown className={`text-xs transition-transform duration-300 ${showProfile ? 'rotate-180' : ''}`} />
          </div>

          {/* Profile Dropdown */}
          <AnimatePresence>
            {showProfile && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 top-10 w-52 bg-black/95 border border-zinc-800 py-4 rounded shadow-2xl backdrop-blur-md"
              >
                <div className="px-4 py-2 hover:bg-zinc-800 flex items-center gap-3 text-sm cursor-pointer transition">
                   <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" className="w-6 h-6 rounded" alt="avatar" />
                   {/* Login hue user ka naam dikhayega, fallback 'User' rakha hai */}
                   <span className="font-bold">{user?.name || 'User'}</span>
                </div>
                
                <hr className="border-zinc-800 my-2" />
                
                <div className="px-4 py-2 hover:bg-zinc-800 text-sm cursor-pointer transition text-zinc-300">
                  Account Settings
                </div>
                
                {/* SIGN OUT BUTTON LINKED */}
                <div 
                  onClick={handleSignOut}
                  className="px-4 py-2 hover:bg-zinc-800 text-sm font-bold text-red-500 mt-2 border-t border-zinc-800 pt-3 text-center uppercase cursor-pointer transition"
                >
                  Sign Out
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;