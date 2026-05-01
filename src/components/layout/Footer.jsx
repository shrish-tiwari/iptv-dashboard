// src/components/layout/Footer.jsx
import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

/**
 * Footer Links Data: Organized for easy management
 */
const FOOTER_LINKS = [
  "Audio Description", "Help Centre", "Gift Cards", "Media Centre",
  "Investor Relations", "Jobs", "Terms of Use", "Privacy",
  "Legal Notices", "Cookie Preferences", "Corporate Information", "Contact Us"
];

/**
 * Social Media Icons Data
 */
const SOCIAL_LINKS = [
  { Icon: FaFacebookF, href: "#" },
  { Icon: FaInstagram, href: "#" },
  { Icon: FaTwitter, href: "#" },
  { Icon: FaYoutube, href: "#" },
];

/**
 * Footer Component
 * Standard Netflix-style multi-column footer.
 */
const Footer = () => {
  return (
    <footer className="bg-black py-10 md:py-20 text-zinc-400 text-sm border-t border-zinc-900">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        
        {/* --- 1. CONTACT INFO (New addition from Screenshot) --- */}
        <div className="mb-8 text-base">
          <p className="hover:underline cursor-pointer">Questions? Call 000-800-919-1694</p>
        </div>
        
        {/* --- 2. SOCIAL ICONS --- */}
        <div className="flex gap-6 mb-8 justify-start">
          {SOCIAL_LINKS.map(({ Icon, href }, index) => (
            <a 
              key={index} 
              href={href} 
              className="text-white opacity-80 hover:opacity-100 transition-all duration-300"
            >
              <Icon className="text-2xl" />
            </a>
          ))}
        </div>

        {/* --- 3. LINKS GRID --- */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-y-4 gap-x-8 mb-10 text-xs md:text-[13px]">
          {FOOTER_LINKS.map((link, index) => (
            <div key={index}>
              <a href="#" className="hover:underline transition-all opacity-80 hover:opacity-100">
                {link}
              </a>
            </div>
          ))}
        </div>

        {/* --- 4. SERVICE & LANGUAGE ACTIONS --- */}
        <div className="flex flex-col gap-6 items-start mb-8">
          {/* Service Code Button */}
          <button className="border border-zinc-600 text-zinc-400 px-4 py-1.5 text-xs hover:text-white hover:border-white transition-all">
            Service Code
          </button>

          {/* Language Selector (Added to match your screenshot) */}
          <div className="relative inline-block">
             <button className="flex items-center gap-2 border border-zinc-700 px-4 py-1.5 rounded text-sm bg-black/50 hover:bg-zinc-800 transition">
                <span>🌐 English</span>
                <span className="text-[10px]">▼</span>
             </button>
          </div>
        </div>

        {/* --- 5. COPYRIGHT & REGION --- */}
        <div className="text-[11px] opacity-60">
          <p className="mb-1">© {new Date().getFullYear()} IPTV Dashboard, Inc. {`{402-8a9b-4e6c}`}</p>
          <p className="tracking-widest uppercase font-bold mt-2">IPTV India</p>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;