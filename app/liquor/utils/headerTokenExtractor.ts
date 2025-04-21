import { setToken } from "./tokenStore";

export const extractTokenFromHeaders = async () => {
  if (typeof window === "undefined") return;

  try {
    // API 엔드포인트를 통해 현재 요청의 헤더 확인
    const response = await fetch("/api/check-headers");
    const data = await response.json();

    // Authorization 헤더가 있으면 토큰 저장
    if (data.headers && data.headers.authorization) {
      console.log("Found Authorization header:", data.headers.authorization);
      setToken(data.headers.authorization);
      return true;
    } else {
      console.log("No Authorization header found in the request");
      return false;
    }
  } catch (error) {
    console.error("Error checking request headers:", error);
    return false;
  }
};
