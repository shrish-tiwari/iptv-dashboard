import { configureStore } from '@reduxjs/toolkit';
import watchlistReducer from './slices/watchlistSlice';
import { movieApi } from './api/movieApi'; // Naya import

export const store = configureStore({
  reducer: {
    watchlist: watchlistReducer,
    // RTK Query ka reducer yahan add kiya
    [movieApi.reducerPath]: movieApi.reducer,
  },
  // Caching ke liye middleware zaroori hai
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(movieApi.middleware),
});