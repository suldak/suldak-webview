"use client";

//메모리 변수
let userToken: string | null = null;

//토큰 설정 함수
export const setToken = (token: string) => {
  if (typeof window === "undefined") return null;
  userToken = token;
 
  // 로컬 스토리지에도 저장
  try {
    localStorage.setItem("authToken", token);
  } catch (error) {
    console.error("Error saving token to localStorage:", error);
  }
};

//토큰 가져오기 함수
export const getToken = () => {
  if (typeof window === "undefined") return;
  // 메모리에 없으면 로컬 스토리지에서 복구
  if (!userToken) {
    try {
      userToken = localStorage.getItem("authToken");
      if (userToken) {
        console.log("Token restored from localStorage");
      }
    } catch (error) {
      console.error("Error reading token from localStorage:", error);
    }
  }

  return userToken;
};
