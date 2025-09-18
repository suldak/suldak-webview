"use client";

let userToken: string | null = null;

/**
 * 인증에 필요한 토큰을 인메모리 변수와 로컬 스토리지에 저장하는 함수입니다.
 * @param {string} token
 */
export const setToken = (token: string) => {
  if (typeof window === "undefined") {
    return null;
  }

  userToken = token;

  try {
    localStorage.setItem("authToken", token);
  } catch (error) {
    // 앱으로 돌아가기
  }
};

/**
 * 인증에 필요한 토큰을 가져오는 함수입니다.
 * @returns {string | null}
 */
export const getToken = () => {
  // 서버 환경일 경우 예외 처리
  if (typeof window === "undefined") {
    return null;
  }

  // 메모리에 토큰이 있을 경우
  if (userToken) {
    return userToken;
  }

  // 메모리에 토큰이 없을 경우 로컬스토리지 확인
  try {
    const authToken = localStorage.getItem("authToken");
    userToken = authToken;
    return authToken;
  } catch (error) {
    // 앱으로 돌아가기
  }

  return null;
};
