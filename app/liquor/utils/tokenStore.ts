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

// 토큰 가져오기 함수
export const getToken = () => {
  if (typeof window === "undefined") return null;
  
  // 항상 localStorage를 먼저 확인하고 메모리에 복원
  if (typeof window !== "undefined") {
    try {
      const storedToken = localStorage.getItem('authToken');
      if (storedToken && (!userToken || userToken !== storedToken)) {
        console.log("Restoring token from localStorage");
        userToken = storedToken;
      }
    } catch (error) {
      console.error("Error reading token from localStorage:", error);
    }
  }
  
  return userToken;
};
