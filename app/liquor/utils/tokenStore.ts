"use client";

// 메모리 변수
let userToken: string | null = null;

// 토큰 설정 함수
export const setToken = (token: string) => {
  if (typeof window === "undefined") return null;
  userToken = token;

  // 로컬 스토리지에도 저장
  try {
    localStorage.setItem("authToken", token);
    console.log("Token set and saved to localStorage");
  } catch (error) {
    console.error("Error saving token to localStorage:", error);
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
      console.log("Token restored from localStorage");
      userToken = storedToken;
      return userToken;
    }
  } catch (error) {
    console.error("Error reading token from localStorage:", error);
  }

  // 3. 개발환경에서 환경변수 토큰 사용
  if (isDevelopment()) {
    const envToken = process.env.NEXT_PUBLIC_TOKEN;
    if (envToken) {
      console.log("개발환경: 환경변수 토큰 사용");
      return envToken;
    }
  }

  return null;
};

// Flutter 앱으로부터 토큰을 받기 위한 함수
if (typeof window !== "undefined") {
  (window as any).authorizationToken = (token: string) => {
    if (typeof window !== "undefined" && (window as any).__debugLog) {
      (window as any).__debugLog("Flutter에서 토큰 수신: " + token);
    }
    setToken(token);
    window.dispatchEvent(new CustomEvent("tokenUpdated", { detail: token }));
  };
}

// 플러터로 토큰을 요청하는 함수 (지연 재시도 로직 포함)
export const requestTokenFromFlutter = () => {
  if (typeof window === "undefined") return;

  const attemptRequest = (retryCount = 0) => {
    try {
      console.log(
        `Requesting token from Flutter... (attempt ${retryCount + 1})`,
      );

      // FlutterBridge 채널을 통해 토큰 요청
      if (
        (window as any).FlutterBridge &&
        (window as any).FlutterBridge.postMessage
      ) {
        (window as any).FlutterBridge.postMessage("authorizationToken");
        console.log("Token request sent to Flutter");

        if (typeof window !== "undefined" && (window as any).__debugLog) {
          (window as any).__debugLog("플러터에 토큰 요청 전송");
        }
      } else {
        console.warn(
          `FlutterBridge not available for token request (attempt ${retryCount + 1})`,
        );

        if (typeof window !== "undefined" && (window as any).__debugLog) {
          (window as any).__debugLog(
            `FlutterBridge 없음: 토큰 요청 불가 (시도 ${retryCount + 1})`,
          );
        }

        // FlutterBridge가 없으면 최대 3번까지 재시도 (500ms 간격)
        if (retryCount < 3) {
          setTimeout(() => attemptRequest(retryCount + 1), 500);
        }
      }
    } catch (error) {
      console.error("Error requesting token from Flutter:", error);
    }
  };

  attemptRequest();
};
