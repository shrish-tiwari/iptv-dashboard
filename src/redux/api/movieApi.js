import { createApi } from '@reduxjs/toolkit/query/react';
import API from '../../api/axiosInstance'; // Check karna ye path sahi ho

const axiosBaseQuery = () => async ({ url, method, data, params }) => {
  try {
    const result = await API({ url, method, data, params });
    return { data: result.data };
  } catch (axiosError) {
    let err = axiosError.response?.data || axiosError.message;
    return { error: err };
  }
};

export const movieApi = createApi({
  reducerPath: 'movieApi',
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    // 1. Watch Page ka data (Existing)
    getMovieWatchData: builder.query({
      query: (movieId) => ({
        url: `/api/user/movies/${movieId}/watch`,
        method: 'GET',
      }),
    }),

    // 2. Home Page ke liye saari movies (Added)
    getAllMovies: builder.query({
      query: () => ({
        url: '/api/user/movies', // 👈 Backend endpoint check kar lena yahi hai na
        method: 'GET',
      }),
    }),
  }),
});

// ⚠️ SABSE IMPORTANT LINE: Naye hooks yahan export ho rahe hain
export const { 
    useGetMovieWatchDataQuery, 
    useGetAllMoviesQuery 
} = movieApi;