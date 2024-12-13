import axios from 'axios';
import { useAuthStore } from '../../frameworks/ui/stores/useAuthStore';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_CLIENT_API_URL,
});

axiosInstance.interceptors.request.use(async config => {
  const token = useAuthStore.getState().token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export { axiosInstance };
