import axios from 'axios';

const API = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'https://t9qh1f8s-5000.inc1.devtunnels.ms',
    withCredentials: "include", // Sabse important line: Cookies allow karne ke liye
});

// Request Interceptor
API.interceptors.request.use((config) => {
    // Agar token localStorage mein hai toh bhej do (Dual support)
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default API;