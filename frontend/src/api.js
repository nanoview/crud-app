import axios from "axios";

const backendURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const api = axios.create({
    baseURL: backendURL
});

// Add auth token to requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
