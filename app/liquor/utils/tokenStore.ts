"use client";

import { addDebugLog } from "components/shared/DebugPanel";

// 메모리 변수
let userToken: string | null = null;

// 디버그 로그 헬퍼 (DebugPanel이 로드되지 않았을 때도 안전하게 호출)
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

// 토큰 설정 함수
export const setToken = (token: string) => {
  if (typeof window === "undefined") return null;
  userToken = token;

  // 메모리 토큰 추적용 (디버그 패널에서 소스 판별에 사용)
  (window as any).__memoryToken = token;

  // 로컬 스토리지에도 저장
  try {
    localStorage.setItem("authToken", token);
    debugLog("success", `토큰 저장 완료 (길이: ${token.length})`);
  } catch (error) {
    debugLog("error", `localStorage 저장 실패: ${error}`);
  }
};

// 개발환경 체크 함수
const isDevelopment = () => {
  if (typeof window === "undefined") return false;
  return (
    process.env.NODE_ENV === "development" ||
    window.location.hostname === "localhost"
  );
};

// 토큰 가져오기 함수
export const getToken = () => {
  if (typeof window === "undefined") return null;

  // 1. 메모리에 있으면 반환
  if (userToken) return userToken;

  // 2. 로컬 스토리지 확인
  try {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      debugLog("info", "localStorage에서 토큰 복원");
      userToken = storedToken;
      return userToken;
    }
  } catch (error) {
    debugLog("error", `localStorage 읽기 실패: ${error}`);
  }

  // 3. 개발환경에서 환경변수 토큰 사용
  if (isDevelopment()) {
    const envToken = process.env.NEXT_PUBLIC_TOKEN;
    if (envToken) {
      debugLog("info", "개발환경: 환경변수 토큰 사용");
      return envToken;
    }
  }

  return null;
};

// Flutter 앱으로부터 토큰을 받기 위한 함수
if (typeof window !== "undefined") {
  debugLog("info", "authorizationToken 함수 등록 시작");

  (window as any).authorizationToken = (token: string) => {
    debugLog("success", `Flutter에서 토큰 수신 (길이: ${token?.length || 0})`);

    if (!token) {
      debugLog("error", "수신된 토큰이 비어있음");
      return;
    }

    setToken(token);
    window.dispatchEvent(new CustomEvent("tokenUpdated", { detail: token }));
    debugLog("info", "tokenUpdated 이벤트 발생");
  };

  debugLog("success", "authorizationToken 함수 등록 완료");
}

// 플러터로 토큰을 요청하는 함수 (지연 재시도 로직 포함)
export const requestTokenFromFlutter = () => {
  if (typeof window === "undefined") return;

  const attemptRequest = (retryCount = 0) => {
    try {
      debugLog("info", `Flutter에 토큰 요청 시도 #${retryCount + 1}`);

      // FlutterBridge 채널을 통해 토큰 요청
      if (
        (window as any).FlutterBridge &&
        (window as any).FlutterBridge.postMessage
      ) {
        (window as any).FlutterBridge.postMessage("authorizationToken");
        debugLog("success", "Flutter에 토큰 요청 전송 완료");
      } else {
        debugLog("warning", `FlutterBridge 없음 (시도 #${retryCount + 1}/4)`);

        // FlutterBridge가 없으면 최대 3번까지 재시도 (500ms 간격)
        if (retryCount < 3) {
          setTimeout(() => attemptRequest(retryCount + 1), 500);
        } else {
          debugLog("error", "FlutterBridge 연결 실패 - 모든 재시도 소진");
        }
      }
    } catch (error) {
      debugLog("error", `토큰 요청 중 오류: ${error}`);
    }
  };

  attemptRequest();
};
