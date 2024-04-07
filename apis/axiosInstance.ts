import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 5000,
});

axiosInstance.interceptors.request.use((config) => {
  config.headers[
    'Authorization'
  ] = `Bearer eyJyZWdEYXRlIjoxNzEyNDY5ODkwNzQ3LCJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyZTQzZDIwNS1jYWRmLTRiMDItYWJiZC05ZjNiYjEzNjZkYWEiLCJpZCI6NiwiaWF0IjoxNzEyNDY5ODkwLCJleHAiOjE3MjAzMzIyOTB9.j3PIisumRiE3Bi0xiS--2mWAzIpaFIdzBOoBaOU40ak`;

  console.log(config);
  return config;
});

export default axiosInstance;
