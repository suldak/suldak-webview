"use client";
import { useEffect, useState } from "react";
import { getToken } from "app/liquor/utils/tokenStore";

export default function DebugTokenInfo() {
  const [token, setToken] = useState<string | null>(null);
  const [updatedAt, setUpdatedAt] = useState<string>("");

  useEffect(() => {
    // 최초 토큰 상태
    setToken(getToken());
    setUpdatedAt(new Date().toLocaleString());

    // 토큰 업데이트 이벤트 리스너
    const handleTokenUpdate = (event: Event) => {
      if (event instanceof CustomEvent && event.detail) {
        setToken(event.detail);
        setUpdatedAt(new Date().toLocaleString());
      } else {
        setToken(getToken());
        setUpdatedAt(new Date().toLocaleString());
      }
    };
    window.addEventListener("tokenUpdated", handleTokenUpdate);
    return () => window.removeEventListener("tokenUpdated", handleTokenUpdate);
  }, []);

  if (!token) {
    return (
      <div
        style={{
          background: "#fee",
          color: "#900",
          padding: 12,
          borderRadius: 8,
          margin: 8,
          fontSize: 14,
        }}
      >
        <b>🔑 토큰 없음</b>
        <div>API 요청 시 환경변수 토큰 사용</div>
        <div>({updatedAt} 기준)</div>
      </div>
    );
  }

  return (
    <div
      style={{
        background: "#eef",
        color: "#003",
        padding: 12,
        borderRadius: 8,
        margin: 8,
        fontSize: 14,
      }}
    >
      <b>🔑 토큰 상태 (디버그용)</b>
      <div>
        <b>길이:</b> {token.length}자
      </div>
      <div>
        <b>Bearer 포함:</b> {token.startsWith("Bearer ") ? "예" : "아니오"}
      </div>
      <div style={{ wordBreak: "break-all" }}>
        <b>앞 30자:</b> {token.substring(0, 30)}...
      </div>
      <div>
        <b>업데이트 시각:</b> {updatedAt}
      </div>
    </div>
  );
}
