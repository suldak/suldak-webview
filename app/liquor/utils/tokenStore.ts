"use client";

let userToken: string | null = null;

export const setToken = (token: string) => {
  if (typeof window === "undefined") return null;
  userToken = token;
  //console.log("Token set:", token);
};

export const getToken = () => {
  if (typeof window === "undefined") return;
  return userToken;
};
