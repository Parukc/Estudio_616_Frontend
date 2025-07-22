import axios from 'axios';

const API = axios.create({
  baseURL: 'https://estudio616-api.onrender.com', // ✅ URL del backend en Render
  withCredentials: true, // ✅ Muy importante para que se envíe la cookie o token con CORS
});

API.interceptors.request.use((config) => {
  const user = localStorage.getItem('user');
  if (user) {
    const token = JSON.parse(user).token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default API;
