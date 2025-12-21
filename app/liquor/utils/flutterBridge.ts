import { setToken, requestTokenFromFlutter } from "./tokenStore";
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

const sendMessageToFlutter = () => {
  // window 객체 존재 여부 확인
  if (typeof window === "undefined") return;

  debugLog("info", "Flutter로 goBack 메시지 전송 시도");

  try {
    // FlutterBridge 채널을 통해 메시지 전송
    if (window.FlutterBridge) {
      window.FlutterBridge.postMessage("goBack");
      debugLog("success", "goBack 메시지 전송 완료");
    } else {
      debugLog("warning", "FlutterBridge 없음 - goBack 불가");
    }
  } catch (error) {
    debugLog("error", `goBack 전송 오류: ${error}`);
  }
};

// 플러터로부터 토큰을 받는 함수 (미사용 - authorizationToken이 실제 사용됨)
const receiveTokenFromFlutter = (token: string) => {
  // window 객체 존재 여부 확인
  if (typeof window === "undefined") return;

  try {
    debugLog("info", "receiveToken으로 토큰 수신 (비권장 경로)");

    if (!token) {
      debugLog("warning", "수신된 토큰이 비어있음");
      return;
    }

    // 토큰 저장
    setToken(token);

    // 토큰 업데이트 이벤트 발생
    const tokenUpdateEvent = new CustomEvent("tokenUpdated", {
      detail: token,
    });
    window.dispatchEvent(tokenUpdateEvent);

    debugLog("success", "receiveToken 처리 완료");
  } catch (error) {
    debugLog("error", `receiveToken 오류: ${error}`);
  }
};

// Flutter가 호출할 수 있도록 전역 스코프에 함수 등록 (미사용이지만 호환성을 위해 유지)
if (typeof window !== "undefined") {
  (window as any).receiveToken = receiveTokenFromFlutter;
  debugLog("info", "receiveToken 함수 등록 (미사용)");
}

export {
  sendMessageToFlutter,
  receiveTokenFromFlutter,
  requestTokenFromFlutter,
};
