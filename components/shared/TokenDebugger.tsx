"use client";

import { useEffect, useState, useRef } from "react";
import { getToken } from "app/liquor/utils/tokenStore";

/** 토큰 디버그 정보 표시 컴포넌트
 * 활성화 방법: 화면 오른쪽 상단을 5번 연속 탭
 */
function TokenDebugger() {
  const [tokenInfo, setTokenInfo] = useState<{
    type: string;
    preview: string;
  } | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const tapCountRef = useRef(0);
  const tapTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 탭 감지 영역 핸들러
  const handleTap = () => {
    tapCountRef.current += 1;

    // 이전 타임아웃 클리어
    if (tapTimeoutRef.current) {
      clearTimeout(tapTimeoutRef.current);
    }

    // 5번 탭하면 토글
    if (tapCountRef.current >= 5) {
      setIsVisible((prev) => !prev);
      tapCountRef.current = 0;
      return;
    }

    // 2초 내에 다음 탭이 없으면 카운트 리셋
    tapTimeoutRef.current = setTimeout(() => {
      tapCountRef.current = 0;
    }, 2000);
  };

  useEffect(() => {
    const checkToken = () => {
      const token = getToken();

      if (!token) {
        setTokenInfo({ type: "없음", preview: "-" });
        return;
      }

      // 토큰 타입 판별 (환경변수 토큰과 비교)
      const envToken = process.env.NEXT_PUBLIC_TOKEN;
      const isEnvToken = envToken && token === envToken;

      // 토큰 앞 10자 + 뒤 6자만 표시 (마스킹)
      const preview =
        token.length > 20
          ? `${token.slice(0, 10)}...${token.slice(-6)}`
          : token.slice(0, 10) + "...";

      setTokenInfo({
        type: isEnvToken ? "🔧 환경변수" : "👤 사용자",
        preview,
      });
    };

    checkToken();

    // 토큰 업데이트 이벤트 리스닝
    const handleTokenUpdate = () => checkToken();
    window.addEventListener("tokenUpdated", handleTokenUpdate);

    return () => {
      window.removeEventListener("tokenUpdated", handleTokenUpdate);
      if (tapTimeoutRef.current) {
        clearTimeout(tapTimeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      {/* 탭 감지 영역 - 오른쪽 상단 */}
      <div
        className="fixed right-0 top-0 z-[9998] h-16 w-16"
        onClick={handleTap}
        aria-hidden="true"
      />

      {/* 디버그 정보 패널 */}
      {isVisible && tokenInfo && (
        <div className="fixed bottom-4 left-4 right-4 z-[9999] rounded-lg bg-black/90 p-3 text-xs text-white shadow-lg">
          <div className="mb-1 flex items-center justify-between">
            <span className="font-bold text-yellow-400">🔍 토큰 디버거</span>
            <button
              onClick={() => setIsVisible(false)}
              className="text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>
          <div className="space-y-1">
            <div>
              <span className="text-gray-400">타입: </span>
              <span
                className={
                  tokenInfo.type.includes("사용자")
                    ? "text-green-400"
                    : "text-orange-400"
                }
              >
                {tokenInfo.type}
              </span>
            </div>
            <div>
              <span className="text-gray-400">토큰: </span>
              <span className="font-mono text-blue-300">
                {tokenInfo.preview}
              </span>
            </div>
          </div>
          <div className="mt-2 border-t border-gray-700 pt-2 text-[10px] text-gray-500">
            오른쪽 상단 5번 탭하여 활성화/비활성화
          </div>
        </div>
      )}
    </>
  );
}

export default TokenDebugger;
