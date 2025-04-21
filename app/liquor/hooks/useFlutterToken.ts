import { useEffect, useState } from "react";
import {
  receiveTokenFromFlutter,
  requestTokenFromFlutter,
} from "../utils/flutterBridge";
import { getToken } from "../utils/tokenStore";

export const useFlutterToken = () => {
  const [isTokenInitialized, setIsTokenInitialized] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // 플러터에서 토큰을 받기 위한 수신자 설정 (항상 실행)
    receiveTokenFromFlutter();

    // 토큰이 이미 있는지 확인
    const existingToken = getToken();

    // 토큰이 없고 아직 초기화되지 않았을 때만 요청
    if (!existingToken && !isTokenInitialized) {
      // 약간의 지연 후 토큰 요청 (페이지 로드 완료 후)
      setTimeout(() => {
        requestTokenFromFlutter();
        setIsTokenInitialized(true);
      }, 300);
    } else {
      setIsTokenInitialized(true);
    }
  }, [isTokenInitialized]);

  return { isTokenInitialized };
};
