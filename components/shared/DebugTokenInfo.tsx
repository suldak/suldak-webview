"use client";
import { useEffect, useState } from "react";
import { getToken } from "app/liquor/utils/tokenStore";

const DebugTokenInfo = () => {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [envToken, setEnvToken] = useState<string | undefined>(undefined);
  const [lastApiToken, setLastApiToken] = useState<string | null>(null);
  const [logs, setLogs] = useState<string[]>([]);

  // 환경변수 토큰 가져오기
  useEffect(() => {
    setEnvToken(process.env.NEXT_PUBLIC_TOKEN);
  }, []);

  // 현재 저장된 토큰 표시
  useEffect(() => {
    setUserToken(getToken());
  }, []);

  // window에 디버그용 함수 등록 (axiosInstance에서 호출)
  useEffect(() => {
    if (typeof window !== "undefined") {
      (window as any).__setLastApiToken = (token: string) => {
        setLastApiToken(token);
        setLogs((prev) => [
          ...prev,
          `[${new Date().toLocaleTimeString()}] API 요청에 사용된 토큰: ${token}`,
        ]);
      };
      (window as any).__debugLog = (msg: string) => {
        setLogs((prev) => [
          ...prev,
          `[${new Date().toLocaleTimeString()}] ${msg}`,
        ]);
      };
    }
  }, []);

  return (
    <div style={{ background: "#222", color: "#fff", padding: 16, borderRadius: 8, margin: 16 }}>
      <h3>🔎 디버그 토큰 정보</h3>
      <div>저장된 사용자 토큰: <code style={{ color: "#0ff" }}>{userToken || "없음"}</code></div>
      <div>환경변수 토큰: <code style={{ color: "#ff0" }}>{envToken || "없음"}</code></div>
      <div>마지막 API 요청 토큰: <code style={{ color: "#0f0" }}>{lastApiToken || "없음"}</code></div>
      <div style={{ marginTop: 12 }}>
        <b>로그:</b>
        <ul style={{ fontSize: 12, maxHeight: 120, overflow: "auto" }}>
          {logs.map((log, i) => <li key={i}>{log}</li>)}
        </ul>
      </div>
    </div>
  );
};

export default DebugTokenInfo; 