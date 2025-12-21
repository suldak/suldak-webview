"use client";
import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { getToken } from "app/liquor/utils/tokenStore";
import { addDebugLog } from "components/shared/DebugPanel";

// 디버그 로그 헬퍼
const debugLog = (
  type: "info" | "success" | "warning" | "error",
  message: string,
) => {
  console.log(`[${type.toUpperCase()}] ${message}`);
  try {
    addDebugLog(type, message);
  } catch {
    // DebugPanel이 아직 로드되지 않은 경우 무시
  }
};

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 5000,
});

axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getToken();
  const endpoint = config.url || "unknown";

  if (token) {
    // 사용자 토큰이 있으면 우선 사용
    (config.headers as any)["Authorization"] = token;
    debugLog("info", `API 호출: ${endpoint} (토큰 있음)`);
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
        debugLog("info", `API 호출: ${endpoint} (개발 토큰)`);
      } else {
        debugLog("warning", `API 호출: ${endpoint} (토큰 없음 - 개발환경)`);
      }
    } else {
      // 프로덕션에서는 토큰 없으면 경고
      debugLog("error", `API 호출: ${endpoint} (토큰 없음 - 프로덕션!)`);
    }
  }

  return config;
});

// 응답 인터셉터 (에러 처리 등을 위해)
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    const endpoint = response.config.url || "unknown";
    debugLog("success", `API 성공: ${endpoint} (${response.status})`);

    // 응답 데이터 구조 로깅 (디버깅용)
    try {
      const data = response.data;
      if (data) {
        const hasData = data.data !== undefined;
        const dataType = hasData
          ? Array.isArray(data.data)
            ? "array"
            : typeof data.data
          : "undefined";
        const contentLength =
          hasData && data.data?.content ? data.data.content.length : "N/A";
        debugLog(
          "info",
          `응답 구조: success=${data.success}, data=${dataType}, content길이=${contentLength}`,
        );
      }
    } catch (e) {
      // 로깅 실패 시 무시
    }

    return response;
  },
  (error: any) => {
    const endpoint = error.config?.url || "unknown";
    const status = error.response?.status || "network error";

    // 401 에러 등이 발생하면 토큰 문제일 수 있음
    if (error.response && error.response.status === 401) {
      debugLog("error", `API 401 인증 실패: ${endpoint} - 토큰 문제 가능성`);
    } else {
      debugLog("error", `API 실패: ${endpoint} (${status})`);
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
