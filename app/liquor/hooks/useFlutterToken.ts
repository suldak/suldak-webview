import { useEffect, useState } from "react";
import { getToken, requestTokenFromFlutter } from "../utils/tokenStore";
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

/**
 * 토큰 초기화 상태를 관리하는 훅.
 * 헤더 주입 방식으로 변경됨에 따라 로직 단순화.
 */
export const useFlutterToken = () => {
  const [isTokenInitialized, setIsTokenInitialized] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    debugLog("info", "useFlutterToken 훅 실행");

    // 기존 토큰 확인
    const existingToken = getToken();

    if (existingToken) {
      // 토큰이 이미 있으면 초기화 완료
      debugLog("success", "기존 토큰 발견 - 초기화 완료");
      setIsTokenInitialized(true);
    } else {
      // 토큰이 없으면 플러터에 요청
      debugLog("warning", "토큰 없음 - Flutter에 요청 시작");
      requestTokenFromFlutter();

      // 토큰 수신 대기를 위한 이벤트 리스너
      const handleTokenUpdate = () => {
        debugLog("success", "tokenUpdated 이벤트 수신 - 초기화 완료");
        setIsTokenInitialized(true);
      };

      window.addEventListener("tokenUpdated", handleTokenUpdate);

      // 일정 시간 후 초기화 상태로 간주 (타임아웃)
      const timeout = setTimeout(() => {
        const hasToken = !!getToken();
        if (hasToken) {
          debugLog("info", "타임아웃 - 토큰 있음");
        } else {
          debugLog("error", "타임아웃 (3초) - 토큰 없이 강제 초기화");
        }
        setIsTokenInitialized(true);
      }, 3000);

      return () => {
        window.removeEventListener("tokenUpdated", handleTokenUpdate);
        clearTimeout(timeout);
      };
    }
  }, []);

  return { isTokenInitialized };
};
