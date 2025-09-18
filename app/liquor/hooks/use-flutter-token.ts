"use client";

import { useCallback, useEffect } from "react";
import {
  requestTokenToFlutter,
  sendMessageToFlutter,
} from "../utils/flutter-bridge";
import { getToken } from "../utils/token-store";

interface UseFlutterTokenReturn {
  requestToken: () => void;
  sendMessage: (message: string) => void;
}

/**
 * Flutter WebView와의 통신을 위한 커스텀 훅입니다.
 * 토큰 상태를 관리하지 않고, 필요할 때 가져와서 사용합니다.
 */
export const useFlutterToken = (): UseFlutterTokenReturn => {
  // 초기화 및 이벤트 리스너 등록
  useEffect(() => {
    // 토큰이 없으면 Flutter에 요청
    const existingToken = getToken();
    if (!existingToken) {
      console.log("토큰이 없어서 토큰 요청함");
      requestTokenToFlutter();
    }

    // tokenUpdated 이벤트 리스너 등록
    const handleTokenUpdate = (event: Event) => {
      console.log("Token updated event received in hook");
    };

    window.addEventListener("tokenUpdated", handleTokenUpdate);
    // 일정 시간 후 초기화 상태로 간주 (타임아웃)
    const timeout = setTimeout(() => {
      console.log("토큰 요청 타임아웃, 강제 초기화");
    }, 3000);

    return () => {
      window.removeEventListener("tokenUpdated", handleTokenUpdate);
      clearTimeout(timeout);
    };
  }, []);

  const requestToken = useCallback(() => {
    requestTokenToFlutter();
  }, []);

  const sendMessage = useCallback((message: string) => {
    sendMessageToFlutter(message);
  }, []);

  return {
    requestToken,
    sendMessage,
  };
};
