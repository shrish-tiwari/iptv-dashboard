import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
// import { getMovieWatchData } from '../api/movieService'; // 👈 Ab iski zaroorat nahi
import { useGetMovieWatchDataQuery } from '../redux/api/movieApi'; // 👈 Naya RTK Query Hook
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

// --- Video.js imports ---
import videojs from 'video.js';
import '@videojs/http-streaming'; 
import 'video.js/dist/video-js.css'; 

// --- Quality Levels Plugins ---
import 'videojs-contrib-quality-levels';
import 'videojs-hls-quality-selector';

// --- Custom CSS ---
import '../assets/custom-video-player.css';

const WatchPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    
    // --- 1. RTK Query Hook (LATEST REDUX LOGIC) ---
    // Humne loading aur data ko wahi purane naam de diye hain
    const { data: response, isLoading: loading, error } = useGetMovieWatchDataQuery(id);

    // Stream URL extract karne ka logic bilkul wahi hai jo tune likha tha
    const streamUrl = response?.videoUrl || response?.url || response?.streamUrl || response?.data?.videoUrl || "";

    const videoRef = useRef(null); 
    const playerRef = useRef(null); 

    // Error handling ke liye ek chota useEffect (Logic preserved)
    useEffect(() => {
        if (error) {
            toast.error("Failed to load movie. Please try again later.");
            console.error("Error fetching movie stream:", error);
        }
        if (response && !streamUrl) {
            toast.error("Video stream link not found for this movie!");
        }
    }, [error, response, streamUrl]);

      useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);


    // --- 2. Initialize/Update Video.js Player (LOGIC UNTOUCHED) ---
    useEffect(() => {
        if (streamUrl && videoRef.current) {
            const playerOptions = {
                autoplay: true,
                controls: true,
                responsive: true,
                fluid: true,
                playbackRates: [0.5, 0.75, 1, 1.25, 1.5, 2],
                preload: 'auto',
                sources: [{
                    src: streamUrl,
                    type: 'application/x-mpegURL' 
                }],
                controlBar: {
                    children: [
                        'playToggle',
                        'progressControl',
                        'currentTimeDisplay',
                        'durationDisplay',
                        'volumePanel',
                        'qualitySelector',
                        'playbackRateMenuButton',
                        'fullscreenToggle'
                    ]
                }
            };

            if (!playerRef.current) {
                const player = videojs(videoRef.current, playerOptions, () => {
                    player.play();
                });
                playerRef.current = player;
                player.hlsQualitySelector({ displayLabel: true });
            } else {
                playerRef.current.src(playerOptions.sources);
                playerRef.current.load();
                playerRef.current.play();
            }
        }

        return () => {
            if (playerRef.current) {
                playerRef.current.dispose();
                playerRef.current = null;
            }
        };
    }, [streamUrl]);

    // --- Loading State UI (Refined - NO CHANGES) ---
    if (loading) {
        return (
            <div className="h-screen bg-[#0a0a0a] flex flex-col items-center justify-center text-white">
                <div className="relative w-20 h-20">
                    <div className="absolute inset-0 border-4 border-zinc-800 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-t-red-600 rounded-full animate-spin"></div>
                </div>
                <motion.span 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    transition={{ repeat: Infinity, duration: 1, repeatType: "reverse" }}
                    className="mt-6 text-xl font-black tracking-[0.2em] uppercase text-zinc-400"
                >
                    Buffering...
                </motion.span>
            </div>
        );
    }

    return (
        <div className="h-screen mt-20 py-5 w-full bg-black relative overflow-hidden group">
            {/* Back Button (NO CHANGES) */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="absolut w-fit ml-5 top-10 left-8 z-[100] cursor-pointer flex items-center gap-3 bg-black/40 backdrop-blur-xl border border-white/10 px-5 py-3 rounded-full text-white hover:bg-white hover:text-black transition-all duration-500 shadow-2xl active:scale-90"
                onClick={() => navigate(-1)}
            >
                <FaArrowLeft size={18} />
                <span className="text-sm font-black uppercase tracking-widest">Back to Browse</span>
            </motion.div>

            {/* Video Player Container (NO CHANGES) */}
            <div className="w-full h-full mt-0 flex items-center justify-center bg-black">
                {streamUrl ? (
                    <div data-vjs-player className="w-full h-full">
                        <video
                            ref={videoRef}
                            className="video-js vjs-theme-custom vjs-big-play-centered w-full h-full shadow-2xl"
                        />
                    </div>
                ) : (
                    <div className="h-full w-full flex flex-col items-center justify-center text-zinc-500 bg-[#0a0a0a]">
                        <div className="text-6xl mb-4">⚠️</div>
                        <p className="text-2xl font-black uppercase tracking-tighter">Content Unavailable</p>
                        <p className="text-sm mt-2 text-zinc-600">This stream link has expired or is invalid.</p>
                        <button 
                            onClick={() => navigate(-1)}
                            className="mt-8 px-8 py-2 border border-zinc-700 rounded-md hover:bg-white hover:text-black transition-all font-bold"
                        >
                            Go Back
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WatchPage;