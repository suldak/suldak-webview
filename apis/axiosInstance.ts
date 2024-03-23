import axios from 'axios';

export const BASE_URL = 'http://122.45.203.134:8080';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});

axiosInstance.interceptors.request.use((config) => {
  config.headers[
    'Authorization'
  ] = `Bearer eyJyZWdEYXRlIjoxNzExMTEyNjc4NTg3LCJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI0ODZkNmFhYy1hODlmLTRiNDktODE3My00ZjBjNDZlNzhhOGMiLCJpZCI6NiwiaWF0IjoxNzExMTEyNjc4LCJleHAiOjE3MTkwNjE0Nzh9.7ghONbhgxp9pjqDtnkXqOEdr_REpyOF9p0XbHuPs7AU`;

  return config;
});

export default axiosInstance;
