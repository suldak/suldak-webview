"use client";
import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { getToken } from "app/liquor/utils/tokenStore";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 5000,
});

axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getToken();

  if (token) {
    // 플러터 앱과 같은 형식으로 설정
    (config.headers as any)["Authorization"] = token;
    console.log("사용자 토큰 사용 중"); // 테스트용 코드
    if (typeof window !== "undefined" && (window as any).__setLastApiToken) {
      (window as any).__setLastApiToken(token);
    }
    if (typeof window !== "undefined" && (window as any).__debugLog) {
      (window as any).__debugLog("사용자 토큰 사용 중");
    }
  } else {
    // 토큰이 없으면 환경변수 사용
    const envToken = process.env.NEXT_PUBLIC_TOKEN;
    if (envToken) {
      (config.headers as any)["Authorization"] = envToken;
      console.log("Using environment token for API request");
      if (typeof window !== "undefined" && (window as any).__setLastApiToken) {
        (window as any).__setLastApiToken(envToken);
      }
      if (typeof window !== "undefined" && (window as any).__debugLog) {
        (window as any).__debugLog("환경변수 토큰 사용 중");
      }
    } else {
      console.warn("No token available for API request");
      if (typeof window !== "undefined" && (window as any).__debugLog) {
        (window as any).__debugLog("토큰 없음: API 요청 불가");
      }
    }
  }

  return config;
});

// 응답 인터셉터 (에러 처리 등을 위해)
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: any) => {
    // 401 에러 등이 발생하면 토큰 문제일 수 있음
    if (error.response && error.response.status === 401) {
      console.warn("Received 401 unauthorized error. Token might be invalid.");
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
