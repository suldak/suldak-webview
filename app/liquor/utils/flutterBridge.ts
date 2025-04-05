"use client";
import { setToken } from "./tokenStore";
const sendMessageToFlutter = () => {
  console.log("Attempting to send message to Flutter...");

  try {
    // FlutterBridge 채널을 통해 메시지 전송
    if (window.FlutterBridge) {
      console.log("Flutter bridge detected, sending message...");
      window.FlutterBridge.postMessage("goBack");
      console.log("Message sent to Flutter successfully");
    } else {
      console.warn(
        "No Flutter bridge detected. Are you running in a Flutter WebView?",
      );
    }
  } catch (error) {
    console.error("Error sending message to Flutter:", error);
  }
};

// 플러터로부터 토큰을 받는 함수
const receiveTokenFromFlutter = () => {
  // window 객체 존재 여부 확인
  if (typeof window === "undefined") return;
  try {
    // Window 객체에 메서드 추가
    window.receiveToken = (token: string) => {
      console.log("Token received from Flutter");
      setToken(token);
    };

    console.log("Token receiver initialized");
  } catch (error) {
    console.error("Error setting up token receiver:", error);
  }
};

// 플러터에 토큰 요청
const requestTokenFromFlutter = () => {
  // window 객체 존재 여부 확인
  if (typeof window === "undefined") return;
  
  try {
    if (window.FlutterBridge) {
      console.log("Requesting token from Flutter...");
      window.FlutterBridge.postMessage("requestToken");
    } else {
      console.warn(
        "No Flutter bridge detected. Are you running in a Flutter WebView?",
      );
    }
  } catch (error) {
    console.error("Error requesting token from Flutter:", error);
  }
};

export {
  sendMessageToFlutter,
  receiveTokenFromFlutter,
  requestTokenFromFlutter,
};
