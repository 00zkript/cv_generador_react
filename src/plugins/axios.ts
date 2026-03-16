import axios from 'axios';

const URL_API = import.meta.env.VITE_API_URL_BASE || 'http://localhost:3000';

const api = axios.create({
    baseURL: URL_API,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('auth_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('auth_token');
            localStorage.removeItem('auth_user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;
