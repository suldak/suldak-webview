"use client";

// 메모리 변수
let userToken: string | null = null;

// 토큰 설정 함수
export const setToken = (token: string) => {
  if (typeof window === "undefined") return null;
  userToken = token;

  // 로컬 스토리지에도 저장
  try {
    localStorage.setItem("authToken", token);
    console.log("Token set and saved to localStorage");
  } catch (error) {
    console.error("Error saving token to localStorage:", error);
  }
};

// 토큰 가져오기 함수
export const getToken = () => {
  if (typeof window === "undefined") return null;

  // 1. 메모리에 있으면 반환
  if (userToken) return userToken;

  // 2. 쿠키에도 없으면 로컬 스토리지 확인
  try {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      console.log("Token restored from localStorage");
      userToken = storedToken;
      return userToken;
    }
  } catch (error) {
    console.error("Error reading token from localStorage:", error);
  }

  return null;
};

// Flutter 앱으로부터 토큰을 받기 위한 함수
if (typeof window !== "undefined") {
  (window as any).authorizationToken = (token: string) => {
    console.log("Received token from Flutter: ", token);
    setToken(token);
  };
}
