import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 5000,
});

axiosInstance.interceptors.request.use((config) => {
  config.headers['Authorization'] = process.env.NEXT_PUBLIC_TOKEN;

  console.log(config);

  return config;
});

export default axiosInstance;
