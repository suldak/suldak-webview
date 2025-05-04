import { setToken } from "./tokenStore";

const sendMessageToFlutter = () => {
  // window 객체 존재 여부 확인
  if (typeof window === "undefined") return;

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
const receiveTokenFromFlutter = (token: string) => {
  // window 객체 존재 여부 확인
  if (typeof window === "undefined") return;

  try {
    console.log("Token received from Flutter");

    if (!token) {
      console.warn("Received empty token from Flutter");
      return;
    }

    // 토큰 저장
    setToken(token);

    // 토큰 업데이트 이벤트 발생
    const tokenUpdateEvent = new CustomEvent("tokenUpdated", {
      detail: token,
    });
    window.dispatchEvent(tokenUpdateEvent);

    console.log("Token receiver processed the token");
  } catch (error) {
    console.error("Error in receiveTokenFromFlutter:", error);
  }
};

// Flutter가 호출할 수 있도록 전역 스코프에 함수 등록
if (typeof window !== "undefined") {
  (window as any).receiveToken = receiveTokenFromFlutter;
}

export {
  sendMessageToFlutter,
  receiveTokenFromFlutter, // Flutter 호출용으로 전역 등록, export도 유지
  // requestTokenFromFlutter, // 제거됨
};
