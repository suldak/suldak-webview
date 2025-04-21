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

// 쿠키에서 토큰 가져오기
const getTokenFromCookie = () => {
  if (typeof window === "undefined") return null;

  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith("authToken=")) {
      return cookie.substring("authToken=".length, cookie.length);
    }
  }
  return null;
};

// 토큰 가져오기 함수
export const getToken = () => {
  if (typeof window === "undefined") return null;

  // 1. 메모리에 있으면 반환
  if (userToken) return userToken;

  // 2. 메모리에 없으면 쿠키 확인
  const cookieToken = getTokenFromCookie();
  if (cookieToken) {
    console.log("Token found in cookie");
    userToken = cookieToken;
    // 쿠키에서 발견한 토큰을 로컬 스토리지에도 저장
    try {
      localStorage.setItem("authToken", cookieToken);
    } catch (error) {
      console.error("Error saving cookie token to localStorage:", error);
    }
    return userToken;
  }

  // 3. 쿠키에도 없으면 로컬 스토리지 확인
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
