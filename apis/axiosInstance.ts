import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 5000,
});

axiosInstance.interceptors.request.use((config) => {
  config.headers[
    'Authorization'
  ] = `Bearer eyJyZWdEYXRlIjoxNzEyNzQ3MDM3MjYyLCJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI4OGFiN2NlMy01ZTQ0LTQzN2EtOThiZi02MDcyOTVhYmIzMjEiLCJpZCI6NiwiaWF0IjoxNzEyNzQ3MDM3LCJleHAiOjE3MjA2MDk0Mzd9.ZlSak3eeBNmiKZz5tJ7T7B4gqPGy-UU_9Y90EZtMb3s`;

  console.log(config);
  return config;
});

export default axiosInstance;
