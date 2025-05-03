import { useEffect, useState } from "react";
import { getToken } from "../utils/tokenStore";

/**
 * 토큰 초기화 상태를 관리하는 훅.
 * 헤더 주입 방식으로 변경됨에 따라 로직 단순화.
 */
export const useFlutterToken = () => {
  const [isTokenInitialized, setIsTokenInitialized] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // 컴포넌트 마운트 시 토큰 존재 여부와 관계없이 초기화 상태로 간주
    // 실제 토큰 사용은 getToken()을 통해 각 컴포넌트/API 호출 시점에 수행
    setIsTokenInitialized(true);

    // flutterBridge 관련 로직 제거
    // receiveTokenFromFlutter();
    // const existingToken = getToken();
    // if (!existingToken) {
    //   setTimeout(() => {
    //     requestTokenFromFlutter();
    //   }, 300);
    // }
  }, []); // 최초 마운트 시에만 실행하도록 의존성 배열 비움

  return { isTokenInitialized };
};
