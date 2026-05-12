import React, { useState, useEffect } from 'react';
import { FaSearch, FaBell, FaChevronDown } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from "../../hooks/useAuth";
import { Search, Bell } from 'lucide-react'; // Premium icons

const NAV_ITEMS = [
  { name: 'Home', id: 'all', path: '/' },
  { name: 'TV Series', id: 'series', path: '/tv-series' },
  { name: 'Movies', id: 'movies', path: '/movies' },
  { name: 'New & Popular', id: 'new', path: '/' },
  { name: 'My List', id: 'mylist', path: '/mylist' },
];

const Navbar = ({ setCategory, currentCategory }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();
  
  const { logout, user } = useAuth(); 

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = () => {
    logout(); 
  };

  return (
    <nav className={`fixed top-0 w-full z-[100] flex items-center justify-between px-6 md:px-12 py-4 transition-all duration-700 
      ${isScrolled ? 'bg-black/80 backdrop-blur-lg shadow-2xl border-b border-white/5' : 'bg-gradient-to-b from-black/70 to-transparent'}`}>
      
      {/* LEFT: Logo & Main Navigation */}
      <div className="flex items-center gap-10">
        <h1 
          onClick={() => {
            navigate('/'); 
            if(setCategory) setCategory('all'); 
          }} 
          className="text-[#E50914] text-3xl md:text-4xl font-[900] tracking-tighter cursor-pointer hover:scale-105 transition-transform active:scale-95 select-none"
        >
          IPTV
        </h1>

        <div className="hidden lg:flex gap-6 text-sm font-medium">
          {NAV_ITEMS.map((item) => (
            <span 
              key={item.id} 
              onClick={() => {
                navigate(item.path); // Updated to navigate to correct route
                if(setCategory) setCategory(item.id);
              }}
              className={`cursor-pointer transition-all duration-300 relative group
                ${currentCategory === item.id ? 'text-white font-bold' : 'text-zinc-400 hover:text-white'}`}
            >
              {item.name}
              {currentCategory === item.id && (
                <motion.div layoutId="activeTab" className="absolute -bottom-1 left-0 right-0 h-[2px] bg-red-600 rounded-full" />
              )}
            </span>
          ))}
        </div>
      </div>

      {/* RIGHT: Actions & User Menu */}
      <div className="flex items-center gap-6">
        {/* Search Icon - Now navigates to Search Page */}
        <Search 
          onClick={() => navigate('/search')} 
          className="w-5 h-5 cursor-pointer hover:text-red-500 transition-colors" 
        />
        
        {/* Notifications */}
        <div className="relative cursor-pointer group">
          <Bell className="w-5 h-5 hover:text-red-500 transition-colors" />
          <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold animate-pulse">
            3
          </span>
        </div>

        {/* User Profile Menu */}
        <div 
          className="relative" 
          onMouseEnter={() => setShowProfile(true)} 
          onMouseLeave={() => setShowProfile(false)}
        >
          <div className="flex items-center gap-2 cursor-pointer group p-1 rounded-full">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" 
              className="w-8 h-8 rounded-md border-2 border-transparent group-hover:border-white transition-all duration-300" 
              alt="user" 
            />
            <FaChevronDown className={`text-[10px] transition-transform duration-500 ${showProfile ? 'rotate-180' : ''}`} />
          </div>

          <AnimatePresence>
            {showProfile && (
              <motion.div 
                initial={{ opacity: 0, y: 15, scale: 0.95 }} 
                animate={{ opacity: 1, y: 0, scale: 1 }} 
                exit={{ opacity: 0, y: 15, scale: 0.95 }}
                className="absolute right-0 top-12 w-56 bg-[#141414]/95 border border-white/10 py-3 rounded-lg shadow-2xl backdrop-blur-xl overflow-hidden"
              >
                <div className="px-4 py-3 hover:bg-white/10 flex items-center gap-3 text-sm cursor-pointer transition">
                   <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" className="w-8 h-8 rounded shadow-md" alt="avatar" />
                   <div className="flex flex-col">
                      <span className="font-bold text-white">{user?.name || 'User'}</span>
                      <span className="text-[10px] text-zinc-500 italic">Premium Member</span>
                   </div>
                </div>
                
                <div className="h-[1px] bg-white/10 my-2 mx-4" />
                
                <div className="px-4 py-2 hover:bg-white/10 text-xs cursor-pointer transition text-zinc-300">Account Settings</div>
                <div className="px-4 py-2 hover:bg-white/10 text-xs cursor-pointer transition text-zinc-300">Help Center</div>
                
                <div 
                  onClick={handleSignOut}
                  className="px-4 py-3 hover:bg-red-600 hover:text-white text-xs font-black text-red-500 mt-2 border-t border-white/5 text-center uppercase cursor-pointer transition-all duration-300"
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