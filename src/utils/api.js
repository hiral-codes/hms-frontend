// utils/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://hms-backend-svkn.onrender.com/',
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
