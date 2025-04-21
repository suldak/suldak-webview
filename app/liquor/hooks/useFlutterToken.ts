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

    // 항상 receiveTokenFromFlutter 설정 (JavaScript 인터페이스)
    receiveTokenFromFlutter();

    // localStorage에서 토큰 확인
    const existingToken = getToken();

    // 토큰이 없고 아직 초기화되지 않았을 때만 요청
    if (!existingToken && !isTokenInitialized) {
      console.log("No token found, requesting from Flutter...");

      // 토큰 요청 시도
      setTimeout(() => {
        requestTokenFromFlutter();
        setIsTokenInitialized(true);
      }, 500); // 약간의 지연을 두어 페이지 로드 완료 후 요청
    } else {
      setIsTokenInitialized(true);
    }
  }, [isTokenInitialized]);
};
