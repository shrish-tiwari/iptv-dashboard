// src/components/marketing/ReasonsSection.jsx
import React from 'react';

const REASONS = [
  { 
    title: "Enjoy on your TV", 
    desc: "Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players and more.", 
    icon: "📺" 
  },
  { 
    title: "Download your shows", 
    desc: "Save your favourites easily and always have something to watch.", 
    icon: "⬇️" 
  },
  { 
    title: "Watch everywhere", 
    desc: "Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.", 
    icon: "📱" 
  },
  { 
    title: "Create profiles for kids", 
    desc: "Send kids on adventures with their favourite characters in a space made just for them.", 
    icon: "🧒" 
  }
];

const ReasonsSection = () => {
  return (
    <div className="px-6 md:px-16 py-16 bg-black">
      <h2 className="text-2xl font-bold mb-8 text-white">More reasons to join</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {REASONS.map((item, i) => (
          <div key={i} className="bg-gradient-to-br from-[#19223d] to-[#210e17] p-8 rounded-2xl flex flex-col justify-between min-h-[220px] border border-white/5">
            <div>
              <h3 className="text-xl font-bold mb-4 text-white">{item.title}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
            <div className="text-4xl self-end filter drop-shadow-lg">{item.icon}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReasonsSection;