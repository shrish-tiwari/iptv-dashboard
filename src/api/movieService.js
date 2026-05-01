import API from './axiosInstance';

export const getMovieWatchData = async (movieId) => {
    try {
        // Aapka endpoint: /movies/:id/watch
        const response = await API.get(`/api/user/movies/${movieId}/watch`);
        
        console.log("Backend se aaya data:", response.data); // 👈 Yeh check karne ke liye ki backend kya de raha hai
        return response.data; 
    } catch (error) {
        console.error("API Call Error:", error.response?.data || error.message);
        throw error;
    }
};