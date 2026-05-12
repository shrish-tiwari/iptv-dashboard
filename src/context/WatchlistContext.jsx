import React, { createContext, useContext, useState, useEffect } from 'react';

const WatchlistContext = createContext();

export const WatchlistProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState([]);

  // LocalStorage se purani list load karo (Refresh karne par data na jaye)
  useEffect(() => {
    const savedList = JSON.parse(localStorage.getItem('myWatchlist')) || [];
    setWatchlist(savedList);
  }, []);

  const toggleWatchlist = (movie) => {
    setWatchlist((prev) => {
      const isExist = prev.find(m => (m.id || m._id) === (movie.id || movie._id));
      let newList;
      if (isExist) {
        newList = prev.filter(m => (m.id || m._id) !== (movie.id || movie._id));
      } else {
        newList = [...prev, movie];
      }
      localStorage.setItem('myWatchlist', JSON.stringify(newList));
      return newList;
    });
  };

  const isInWatchlist = (movieId) => {
    return watchlist.some(m => (m.id || m._id) === movieId);
  };

  return (
    <WatchlistContext.Provider value={{ watchlist, toggleWatchlist, isInWatchlist }}>
      {children}
    </WatchlistContext.Provider>
  );
};

export const useWatchlist = () => useContext(WatchlistContext);