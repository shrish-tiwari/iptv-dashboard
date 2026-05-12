import React from 'react';
import { motion } from 'framer-motion';

const PROFILES = [
  { id: 1, name: 'Senior Dev', color: 'bg-blue-500', img: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png' },
  { id: 2, name: 'Developer', color: 'bg-red-500', img: 'https://occ-0-1492-3663.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABdpkabKqQAInOAbdbCc9-tOCf8lrI2IP9fZqJsQBn63k64DYDdZlp7Nsh3S6vAt8S7_G9V065tV4-38708S00e6zOux2-A.png?r=e6e' },
  { id: 3, name: 'Guest', color: 'bg-green-500', img: 'https://occ-0-1492-3663.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABfNXUMbeVgnpNA4-iyCcGhS86n2V78GisGNoN_Q8Xz6pPptS8_2o03S3-p9VpXwZ9oK6F7Zp5-Fp8O-x8rU6L6XG6y6z.png?r=f71' },
  { id: 4, name: 'Kids', color: 'bg-yellow-500', img: 'https://occ-0-1492-3663.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABXvX4YhK8XhL7Lh5X9P8pP-kS0LzR5Z0Q9oPZ3L8l-S6vAt8S7_G9V065tV4-38708S00e6zOux2-A.png?r=e6e' },
];

const Profiles = ({ onSelect }) => {
  return (
    <div className="fixed inset-0 bg-[#141414] z-[1000] flex flex-col items-center justify-center overflow-hidden">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-white text-3xl md:text-5xl font-medium mb-10 tracking-wide"
      >
        Who's watching?
      </motion.h1>

      <div className="flex flex-wrap justify-center gap-6 md:gap-10">
        {PROFILES.map((profile) => (
          <motion.div 
            key={profile.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex flex-col items-center group cursor-pointer"
            onClick={() => onSelect(profile)}
          >
            <div className={`w-28 h-28 md:w-40 md:h-40 rounded overflow-hidden border-2 border-transparent group-hover:border-white transition-all duration-300 relative`}>
              <img src={profile.img} alt={profile.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all"></div>
            </div>
            <span className="text-zinc-500 text-lg md:text-xl mt-4 group-hover:text-white transition-colors">
              {profile.name}
            </span>
          </motion.div>
        ))}
      </div>

      <motion.button 
        whileHover={{ color: 'white', borderColor: 'white' }}
        className="mt-20 border border-zinc-600 text-zinc-600 px-8 py-2 uppercase tracking-[0.2em] text-sm md:text-base transition-all"
      >
        Manage Profiles
      </motion.button>
    </div>
  );
};

export default Profiles;