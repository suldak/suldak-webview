"use client";

import { setToken } from "./token-store";

/**
 * Flutter로부터 토큰을 받아오는 함수입니다.
 */
export const receiveTokenFromFlutter = (token: string) => {
  if (typeof window === "undefined") return;

  try {
    if (!token) {
      return;
    }

    setToken(token);

    // 토큰 업데이트 이벤트 발생
    const tokenUpdateEvent = new CustomEvent("tokenUpdated", {
      detail: token,
    });
    window.dispatchEvent(tokenUpdateEvent);
  } catch (error) {
    //
  }
};

/**
 * Flutter에게 메시지를 전송하는 함수입니다.
 * @param message - 전송할 메시지
 */
export const sendMessageToFlutter = (message: string) => {
  if (typeof window === "undefined") {
    return;
  }

  try {
    if (window.FlutterBridge && window.FlutterBridge.postMessage) {
      window.FlutterBridge.postMessage(message);
    } else {
      // 브릿지가 존재하지 않음
    }
  } catch {
    // 브릿지가 존재하지 않음
  }
};

/**
 * Flutter에게 토큰을 요청하는 함수입니다.
 */
export const requestTokenToFlutter = () => {
  if (typeof window === "undefined") return;

  const attemptRequest = (retryCount = 0) => {
    try {
      if (window.FlutterBridge && window.FlutterBridge.postMessage) {
        window.FlutterBridge.postMessage("authorizationToken");
      } else {
        // FlutterBridge가 없으면 최대 3번까지 재시도 (500ms 간격)
        if (retryCount < 3) {
          console.log(`토큰 ${retryCount + 1}번 요청`);
          setTimeout(() => attemptRequest(retryCount + 1), 500);
        }
      }
    } catch (error) {
      //
    }
  };

  attemptRequest();
};

if (typeof window !== "undefined") {
  window.receiveToken = receiveTokenFromFlutter;

  window.authorizationToken = receiveTokenFromFlutter;
}
