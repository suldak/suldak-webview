"use client";

let userToken: string | null = null;

export const setToken = (token: string) => {
  if (typeof window === "undefined") return null;
  userToken = token;
  localStorage.setItem("authToken", token); //로컬스토리지를 사용해 토큰 저장
  //console.log("Token set:", token);
};

export const getToken = () => {
  if (typeof window === "undefined") return;
  if (!userToken && typeof window !== "undefined") {
    userToken = localStorage.getItem("authToken");
  }

  return userToken;
};
