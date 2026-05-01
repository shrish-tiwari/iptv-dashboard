import API from './axiosInstance';

export const fetchCompanies = () => API.get('/api/user/companies');
export const fetchPlans = (companyId) => API.get(`/api/user/plans/${companyId}`);
export const getMe = () => API.get('/api/user/me');
export const registerUser = (userData) => API.post('/api/user/register', userData);
export const loginUser = (loginData) => API.post('/api/user/login', loginData);

// Plan update endpoint
export const updatePlan = (planData) => API.post('/api/user/plan-update', planData);

// --- MOVIES SECTION ---
// Naya Endpoint: Dashboard par movies dikhane ke liye
export const fetchMovies = () => API.get('/api/user/movies');

export const logoutUser = () => API.post('/api/user/logout');