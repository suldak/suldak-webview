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
    // 사용자 토큰이 있으면 우선 사용
    (config.headers as any)["Authorization"] = token;
    console.log("사용자 토큰 사용 중");
    if (typeof window !== "undefined" && (window as any).__setLastApiToken) {
      (window as any).__setLastApiToken(token);
    }
    if (typeof window !== "undefined" && (window as any).__debugLog) {
      (window as any).__debugLog("사용자 토큰 사용 중");
    }
  } else {
    // 개발/디버깅 환경에서만 환경변수 토큰 사용
    const isDevelopment =
      process.env.NODE_ENV === "development" ||
      (typeof window !== "undefined" &&
        window.location.hostname === "localhost");

    if (isDevelopment) {
      const envToken = process.env.NEXT_PUBLIC_TOKEN;
      if (envToken) {
        (config.headers as any)["Authorization"] = envToken;
        console.log("개발환경: 환경변수 토큰 사용");
        if (
          typeof window !== "undefined" &&
          (window as any).__setLastApiToken
        ) {
          (window as any).__setLastApiToken(envToken);
        }
        if (typeof window !== "undefined" && (window as any).__debugLog) {
          (window as any).__debugLog("개발환경: 환경변수 토큰 사용");
        }
      } else {
        console.warn("개발환경: 환경변수 토큰도 없음");
        if (typeof window !== "undefined" && (window as any).__debugLog) {
          (window as any).__debugLog("개발환경: 환경변수 토큰도 없음");
        }
      }
    } else {
      // 프로덕션에서는 토큰 없으면 요청 차단
      console.warn("프로덕션: 사용자 토큰 없음 - API 요청 차단");
      if (typeof window !== "undefined" && (window as any).__debugLog) {
        (window as any).__debugLog(
          "프로덕션: 사용자 토큰 없음 - API 요청 차단",
        );
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
