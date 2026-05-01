import React, { useState } from 'react';
import MarketingNavbar from '../components/marketing/MarketingNavbar';
import MarketingHero from '../components/marketing/MarketingHero';
import TrendingRank from '../components/marketing/TrendingRank';
import ReasonsSection from '../components/marketing/ReasonsSection';
import Footer from '../components/layout/Footer';
import { CONTENT_DATA } from '../constants/movieData';
import { FaPlus, FaTimes } from 'react-icons/fa'; // FAQ ke liye icons

const LandingPage = () => {
  return (
    <div className="bg-black min-h-screen text-white overflow-x-hidden">
      {/* 1. Header with Sign In button */}
      <MarketingNavbar />

      {/* 2. Main Hero Section */}
      <MarketingHero />
      
      {/* Netflix Style Divider */}
      <div className="h-2 w-full bg-[#232323]" />

      {/* 3. Rest of the sections */}
      <div className="relative z-20 bg-black">
        
        {/* Trending Section */}
        <div className="py-10">
           <TrendingRank data={CONTENT_DATA.movies} />
        </div>

        <div className="h-2 w-full bg-[#232323]" />

        {/* Reasons/Features Section */}
        <div className="py-10">
           <ReasonsSection />
        </div>

        <div className="h-2 w-full bg-[#232323]" />

        {/* 4. New FAQ Section (Netflix ke landing page ka zaroori hissa) */}
        <FAQSection />

        <div className="h-2 w-full bg-[#232323]" />

        <Footer />
      </div>
    </div>
  );
};

// --- FAQ Section Component (Merging inside for simplicity) ---
const FAQSection = () => {
  const faqs = [
    { q: "What is IPTV?", a: "IPTV is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries and more." },
    { q: "How much does it cost?", a: "Watch IPTV on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee." },
    { q: "Where can I watch?", a: "Watch anywhere, anytime. Sign in with your account to watch instantly on the web at iptv.com." },
    { q: "How do I cancel?", a: "IPTV is flexible. There are no annoying contracts and no commitments. You can easily cancel your account online in two clicks." }
  ];

  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="py-16 px-4 max-w-5xl mx-auto">
      <h2 className="text-3xl md:text-5xl font-black text-center mb-10">Frequently Asked Questions</h2>
      <div className="space-y-2">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-[#2d2d2d] hover:bg-[#414141] transition-colors cursor-pointer">
            <button 
              className="w-full flex justify-between items-center p-6 text-xl md:text-2xl text-left focus:outline-none"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <span>{faq.q}</span>
              {openIndex === index ? <FaTimes /> : <FaPlus />}
            </button>
            <div className={`overflow-hidden transition-all duration-300 max-h-0 ${openIndex === index ? 'max-h-[500px] border-t border-black p-6' : ''}`}>
              <p className="text-xl md:text-2xl">{faq.a}</p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Bottom Email Signup (Netflix style) */}
      <div className="mt-12 text-center">
        <p className="text-lg mb-4">Ready to watch? Enter your email to create or restart your membership.</p>
        <div className="flex flex-col md:flex-row gap-2 max-w-2xl mx-auto">
          <input 
            type="email" 
            placeholder="Email address" 
            className="flex-1 p-4 bg-black/50 border border-gray-600 rounded text-white"
          />
          <button className="bg-red-600 px-8 py-3 text-2xl font-bold rounded hover:bg-red-700 transition">Get Started</button>
        </div>
      </div>
    </section>
  );
};

export default LandingPage;