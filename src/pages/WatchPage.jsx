import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { getMovieWatchData } from '../api/movieService';
import toast from 'react-hot-toast';

// --- Video.js imports ---
import videojs from 'video.js';
import '@videojs/http-streaming'; // HLS plugin for parsing .m3u8
import 'video.js/dist/video-js.css'; // Video.js ka default CSS (base styling)

// --- Quality Levels Plugins ---
// videojs-contrib-quality-levels: Yeh backend mein quality levels ko detect karta hai
import 'videojs-contrib-quality-levels';
// videojs-hls-quality-selector: Yeh UI mein dropdown provide karta hai quality switch karne ke liye
import 'videojs-hls-quality-selector';

// --- Custom CSS for a Netflix-like look (optional but recommended) ---
// **IMPORTANT:** Path updated to use the '@' alias defined in vite.config.js
import '../assets/custom-video-player.css';


const WatchPage = () => {
    console.log("WatchPage component is rendering");

    const { id } = useParams();
    const navigate = useNavigate();
    const [streamUrl, setStreamUrl] = useState("");
    const [loading, setLoading] = useState(true);

    const videoRef = useRef(null); // Ref for the actual <video> element
    const playerRef = useRef(null); // Ref for the Video.js player instance

    // --- 1. Fetch Movie Stream URL ---
    useEffect(() => {
        const fetchVideo = async () => {
            try {
                setLoading(true);
                const response = await getMovieWatchData(id);
                console.log("API response for movie watch:", response);

                // Safely get video URL from various possible backend keys
                const videoUrl = response.videoUrl || response.url || response.streamUrl || response.data?.videoUrl;

                if (videoUrl) {
                    setStreamUrl(videoUrl);
                } else {
                    toast.error("Video stream link not found for this movie!");
                }
            } catch (err) {
                toast.error("Failed to load movie. Please try again later.");
                console.error("Error fetching movie stream:", err);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchVideo();
    }, [id]); // Re-fetch if movie ID changes

    // --- 2. Initialize/Update Video.js Player ---
    useEffect(() => {
        // Only proceed if streamUrl is available and video element exists
        if (streamUrl && videoRef.current) {
            // Video.js player configuration options
            const playerOptions = {
                autoplay: true, // Auto-play the video
                controls: true, // Show default player controls
                responsive: true, // Player adjusts to container size
                fluid: true, // Player takes up 100% width of its parent container
                playbackRates: [0.5, 0.75, 1, 1.25, 1.5, 2], // Playback speed options
                preload: 'auto', // Preload video metadata
                sources: [{
                    src: streamUrl,
                    type: 'application/x-mpegURL' // Specify HLS stream type
                }],
                // Custom component order for control bar (for a Netflix-like feel)
                controlBar: {
                    children: [
                        'playToggle',
                        'progressControl',
                        'currentTimeDisplay',
                        'durationDisplay',
                        'volumePanel',
                        'qualitySelector', // Add quality selector button here
                        'playbackRateMenuButton', // Add playback speed button
                        'fullscreenToggle'
                    ]
                }
            };

            // Initialize or update the player instance
            if (!playerRef.current) {
                // Player does not exist, create a new one
                const player = videojs(videoRef.current, playerOptions, () => {
                    console.log('Video.js player is ready and initialized!');
                    // Optionally, play when ready
                    player.play();
                });
                playerRef.current = player;

                // --- Initialize HLS Quality Selector ---
                // This will add the quality dropdown button to the control bar
                player.hlsQualitySelector({
                    displayLabel: true, // Shows "Auto", "720p", etc. labels
                });
            } else {
                // Player already exists, update its source if streamUrl changes
                console.log('Updating video source to:', streamUrl);
                playerRef.current.src(playerOptions.sources);
                playerRef.current.load(); // Load the new source
                playerRef.current.play(); // Auto-play the new source
            }
        }

        // Cleanup function: Dispose the player when component unmounts
        return () => {
            if (playerRef.current) {
                playerRef.current.dispose();
                playerRef.current = null;
                console.log('Video.js player disposed on unmount.');
            }
        };
    }, [streamUrl]); // Re-run this effect when streamUrl changes

    // --- Loading State UI ---
    if (loading) {
        return (
            <div className="h-screen bg-black flex items-center justify-center text-white">
                <div className="animate-spin h-10 w-10 border-4 border-red-600 border-t-transparent rounded-full"></div>
                <span className="ml-3 text-lg">Loading Movie...</span>
            </div>
        );
    }

    // --- Main Component Render ---
    return (
        <div className="h-screen w-full bg-black relative">
            {/* Back Button */}
            <div
                className="absolute top-24 left-6 z-50 cursor-pointer text-gray-200 flex items-center gap-2 bg-black/50 px-4 py-2 rounded-md hover:bg-red-600 hover:text-white transition-all duration-300"
                onClick={() => navigate(-1)}
            >
                <FaArrowLeft size={20} />
                <span className="hidden md:block text-lg font-semibold">Back</span>
            </div>

            {/* Video Player Container */}
            <div className="w-full h-full flex items-center justify-center bg-zinc-900">
                {streamUrl ? (
                    <div data-vjs-player className="w-full h-full flex items-center justify-center">
                        <video
                            ref={videoRef}
                            // Apply custom class for styling Video.js player
                            className="video-js vjs-theme-custom vjs-big-play-centered"
                            // `vjs-theme-custom` will be defined in our custom CSS
                        />
                    </div>
                ) : (
                    <div className="h-full w-full flex flex-col items-center justify-center text-zinc-400 text-xl md:text-2xl font-semibold">
                        <p>No video available at the moment.</p>
                        <p className="text-sm mt-2">Please check back later or try a different movie.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WatchPage;