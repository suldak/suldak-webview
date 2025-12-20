import { useEffect, useState } from "react";
import {
  getToken,
  requestTokenFromFlutter,
  hasRealToken,
} from "../utils/tokenStore";

/**
 * 토큰 초기화 상태를 관리하는 훅.
 * 헤더 주입 방식으로 변경됨에 따라 로직 단순화.
 */
export const useFlutterToken = () => {
  const [isTokenInitialized, setIsTokenInitialized] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // 진짜 사용자 토큰이 있는지 확인 (환경변수 제외)
    const realTokenExists = hasRealToken();

    if (realTokenExists) {
      // 진짜 토큰이 이미 있으면 초기화 완료
      console.log("기존 사용자 토큰 발견, 초기화 완료");
      setIsTokenInitialized(true);
    } else {
      // 진짜 토큰이 없으면 플러터에 요청 (설령 환경변수 토큰이 있더라도 진짜를 받아와야 함)
      console.log("사용자 토큰 없음, 플러터에 토큰 요청");
      requestTokenFromFlutter();

      // 토큰 수신 대기를 위한 이벤트 리스너
      const handleTokenUpdate = () => {
        console.log("토큰 업데이트 이벤트 수신");
        setIsTokenInitialized(true);
      };

      window.addEventListener("tokenUpdated", handleTokenUpdate);

      // 일정 시간 후 초기화 상태로 간주 (타임아웃) - 환경변수 토큰이라도 쓰기 위해
      const timeout = setTimeout(() => {
        console.log("토큰 요청 타임아웃, 강제 초기화");
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
