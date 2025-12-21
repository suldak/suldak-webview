"use client";
import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import {
  getToken,
  clearToken,
  requestTokenFromFlutter,
} from "app/liquor/utils/tokenStore";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 5000,
});

// 토큰 갱신 중인지 추적
let isRefreshing = false;
// 토큰 갱신 대기 중인 요청들
let refreshSubscribers: ((token: string) => void)[] = [];

// 토큰 갱신 완료 시 대기 중인 요청들에게 알림
const onTokenRefreshed = (token: string) => {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
};

// 토큰 갱신 대기열에 추가
const addRefreshSubscriber = (callback: (token: string) => void) => {
  refreshSubscribers.push(callback);
};

// Flutter에서 새 토큰을 받아오는 Promise
const refreshToken = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    // 기존 토큰 삭제
    clearToken();

    // 토큰 업데이트 이벤트 리스너
    const handleTokenUpdate = (event: Event) => {
      if (event instanceof CustomEvent && event.detail) {
        window.removeEventListener("tokenUpdated", handleTokenUpdate);
        resolve(event.detail);
      }
    };

    window.addEventListener("tokenUpdated", handleTokenUpdate);

    // Flutter에 토큰 요청
    requestTokenFromFlutter();

    // 5초 타임아웃
    setTimeout(() => {
      window.removeEventListener("tokenUpdated", handleTokenUpdate);
      reject(new Error("Token refresh timeout"));
    }, 5000);
  });
};

axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getToken();

  if (token) {
    // 사용자 토큰이 있으면 우선 사용
    (config.headers as any)["Authorization"] = token;
    console.log("사용자 토큰 사용 중");
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
      } else {
        console.warn("개발환경: 환경변수 토큰도 없음");
      }
    } else {
      console.warn("프로덕션: 사용자 토큰 없음");
    }
  }

  return config;
});

// 응답 인터셉터 (토큰 갱신 로직 포함)
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // API 응답에서 success: false인 경우 토큰 문제일 수 있음
    if (response.data && response.data.success === false) {
      console.warn("API 응답 success: false - 토큰 갱신 시도");

      const originalRequest = response.config as InternalAxiosRequestConfig & {
        _retry?: boolean;
      };

      // 이미 재시도한 요청이면 그대로 반환
      if (originalRequest._retry) {
        return response;
      }

      originalRequest._retry = true;

      // 토큰 갱신 중이면 대기열에 추가
      if (isRefreshing) {
        return new Promise((resolve) => {
          addRefreshSubscriber((newToken: string) => {
            originalRequest.headers["Authorization"] = newToken;
            resolve(axiosInstance(originalRequest));
          });
        });
      }

      isRefreshing = true;

      // 토큰 갱신 시도
      return refreshToken()
        .then((newToken) => {
          console.log("토큰 갱신 성공, 요청 재시도");
          isRefreshing = false;
          onTokenRefreshed(newToken);
          originalRequest.headers["Authorization"] = newToken;
          return axiosInstance(originalRequest);
        })
        .catch((error) => {
          console.error("토큰 갱신 실패:", error);
          isRefreshing = false;
          return response; // 갱신 실패 시 원래 응답 반환
        });
    }

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
