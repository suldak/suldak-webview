import { useEffect, useState } from "react";
import { receiveTokenFromFlutter, requestTokenFromFlutter } from "../utils/flutterBridge";
import { getToken } from "../utils/tokenStore";

export const useFlutterToken = () => {
  const [isTokenInitialized, setIsTokenInitialized] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // 플러터에서 토큰을 받기 위한 수신자 설정 (항상 실행)
    receiveTokenFromFlutter();

    // 2. 헤더에서 토큰 확인 시도
    const checkHeaderToken = async () => {
      // 이미 토큰이 있으면 스킵
      const existingToken = getToken();
      if (existingToken) {
        console.log("Token already exists, skipping header check");
        return;
      }

      // 헤더에서 토큰 확인

      // 3. 헤더에서도 못 찾았고 아직 초기화되지 않았을 때만 JavaScript 인터페이스로 요청
      if (!isTokenInitialized) {
        console.log("No token found, requesting from Flutter bridge...");
        requestTokenFromFlutter();
        setIsTokenInitialized(true);
      }
    };

    checkHeaderToken();
  }, [isTokenInitialized]);
};
