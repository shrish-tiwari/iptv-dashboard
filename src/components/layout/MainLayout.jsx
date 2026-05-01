import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const MainLayout = () => {
  // Category state ko yahan isliye rakha taaki Navbar isse control kar sake
  const [category, setCategory] = useState('all');

  return (
    <div className="bg-[#141414] min-h-screen text-white font-sans selection:bg-red-600 overflow-x-hidden">
      {/* Navbar common rahega */}
      <Navbar setCategory={setCategory} currentCategory={category} />
      
      <main>
        {/* Outlet ke zariye hum 'category' state niche waale pages (Home) ko bhejenge */}
        <Outlet context={[category, setCategory]} />
      </main>

      {/* Footer common rahega */}
      <Footer />
    </div>
  );
};

export default MainLayout;