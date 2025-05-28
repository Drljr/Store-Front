import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000', // Your backend URL
    withCredentials: true, // Include cookies for sessions if needed
});

export default api;

export const setAuthToken = (token) => {
    if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete api.defaults.headers.common['Authorization'];
    }
};