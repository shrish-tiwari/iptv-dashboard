import { createSlice } from '@reduxjs/toolkit';

// 1. LocalStorage se purani list load karo (Refresh karne par data na jaye)
const initialState = {
  items: JSON.parse(localStorage.getItem('myWatchlist')) || []
};

const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState,
  reducers: {
    // 2. Toggle logic (Exactly same as your context logic)
    toggleWatchlist: (state, action) => {
      const movie = action.payload;
      const isExist = state.items.find(m => (m.id || m._id) === (movie.id || movie._id));

      if (isExist) {
        // Agar exist karta hai toh remove karo
        state.items = state.items.filter(m => (m.id || m._id) !== (movie.id || movie._id));
      } else {
        // Agar nahi hai toh add karo
        state.items.push(movie);
      }

      // 3. LocalStorage update karo
      localStorage.setItem('myWatchlist', JSON.stringify(state.items));
    }
  }
});

export const { toggleWatchlist } = watchlistSlice.actions;
export default watchlistSlice.reducer;

