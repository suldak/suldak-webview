import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 5000,
});

axiosInstance.interceptors.request.use((config) => {
  config.headers[
    'Authorization'
  ] = `Bearer eyJyZWdEYXRlIjoxNzEyODAyODg1Mzk0LCJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjOGM2YjMwZi05MTNmLTRjMGMtYmZhYS0yZGVmN2ZjZWFmNDMiLCJpZCI6NiwiaWF0IjoxNzEyODAyODg1LCJleHAiOjE3MjA2NjUyODV9.JnECRiOoesjyHJSafdTbtGyvdFXPV5pMa6Wq3qzXLEk`;

  console.log(config);
  return config;
});

export default axiosInstance;
