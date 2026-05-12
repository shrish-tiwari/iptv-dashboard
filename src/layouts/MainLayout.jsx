import React, { useState, useEffect } from 'react'; // Added useEffect
import { Outlet } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Profiles from '../pages/Profiles'; // Profiles page import kiya

const MainLayout = () => {
  const [category, setCategory] = useState('all');
  
  // Naya state: Check karne ke liye ki profile select hui ya nahi
  const [isProfileSelected, setIsProfileSelected] = useState(false);

  // Persistence: Taki refresh karne par baar-baar profile na maange
  useEffect(() => {
    const selected = sessionStorage.getItem('profileSelected');
    if (selected) setIsProfileSelected(true);
  }, []);

  const handleProfileSelect = (profile) => {
    setIsProfileSelected(true);
    sessionStorage.setItem('profileSelected', 'true');
  };

  // Agar profile selected nahi hai, toh sirf Profiles screen dikhao
  if (!isProfileSelected) {
    return <Profiles onSelect={handleProfileSelect} />;
  }

  // Agar profile selected hai, toh aapka PURANA CODE (Untouched) chalege:
  return (
    <div className="bg-[#141414] min-h-screen text-white font-sans selection:bg-red-600 overflow-x-hidden">
      <Navbar setCategory={setCategory} currentCategory={category} />
      
      <main>
        <Outlet context={[category, setCategory]} />
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;