"use client";

import { useState, useEffect, useCallback } from "react";
import { getToken, requestTokenFromFlutter } from "app/liquor/utils/tokenStore";

interface DebugLog {
  timestamp: string;
  type: "info" | "success" | "warning" | "error";
  message: string;
}

// 전역 로그 저장소
const debugLogs: DebugLog[] = [];
const MAX_LOGS = 50;

// 로그 추가 함수 (외부에서 호출 가능)
export const addDebugLog = (type: DebugLog["type"], message: string) => {
  const now = new Date();
  const timestamp = now.toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    fractionalSecondDigits: 3,
  });

  debugLogs.unshift({ timestamp, type, message });

  // 최대 로그 수 제한
  if (debugLogs.length > MAX_LOGS) {
    debugLogs.pop();
  }

  // 로그 업데이트 이벤트 발생
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("debugLogUpdated"));
  }
};

// 토큰 마스킹 함수
const maskToken = (token: string | null): string => {
  if (!token) return "(없음)";
  if (token.length <= 20) return token.slice(0, 4) + "..." + token.slice(-4);
  return token.slice(0, 10) + "..." + token.slice(-10);
};

function DebugPanel() {
  const [isVisible, setIsVisible] = useState(false);
  const [logs, setLogs] = useState<DebugLog[]>([]);
  const [tokenInfo, setTokenInfo] = useState({
    token: null as string | null,
    source: "unknown",
    flutterBridgeExists: false,
    authFunctionExists: false,
    receiveFunctionExists: false,
  });

  // 더블클릭 감지를 위한 상태
  const [clickCount, setClickCount] = useState(0);
  const [lastClickTime, setLastClickTime] = useState(0);

  // 토큰 정보 업데이트
  const updateTokenInfo = useCallback(() => {
    if (typeof window === "undefined") return;

    const token = getToken();
    let source = "unknown";

    // 토큰 소스 판별
    if (token) {
      const memoryToken = (window as any).__memoryToken;
      const localToken = localStorage.getItem("authToken");
      const envToken = process.env.NEXT_PUBLIC_TOKEN;

      if (memoryToken && token === memoryToken) {
        source = "memory (Flutter)";
      } else if (localToken && token === localToken) {
        source = "localStorage";
      } else if (envToken && token === envToken) {
        source = "환경변수 (개발)";
      }
    }

    setTokenInfo({
      token,
      source,
      flutterBridgeExists: !!(window as any).FlutterBridge,
      authFunctionExists:
        typeof (window as any).authorizationToken === "function",
      receiveFunctionExists: typeof (window as any).receiveToken === "function",
    });
  }, []);

  // 로그 업데이트 리스너
  useEffect(() => {
    const handleLogUpdate = () => {
      setLogs([...debugLogs]);
    };

    const handleTokenUpdate = () => {
      updateTokenInfo();
    };

    window.addEventListener("debugLogUpdated", handleLogUpdate);
    window.addEventListener("tokenUpdated", handleTokenUpdate);

    // 초기 로그 및 토큰 정보 로드
    setLogs([...debugLogs]);
    updateTokenInfo();

    return () => {
      window.removeEventListener("debugLogUpdated", handleLogUpdate);
      window.removeEventListener("tokenUpdated", handleTokenUpdate);
    };
  }, [updateTokenInfo]);

  // 우측 상단 더블클릭 감지
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // 우측 상단 영역 체크 (화면 우측 100px, 상단 100px 영역)
      const isTopRight = e.clientX > window.innerWidth - 100 && e.clientY < 100;

      if (!isTopRight) {
        setClickCount(0);
        return;
      }

      const now = Date.now();
      if (now - lastClickTime < 500) {
        // 500ms 이내 클릭
        setClickCount((prev) => prev + 1);
      } else {
        setClickCount(1);
      }
      setLastClickTime(now);
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [lastClickTime]);

  // 더블클릭 시 패널 토글
  useEffect(() => {
    if (clickCount >= 2) {
      setIsVisible((prev) => !prev);
      setClickCount(0);
      updateTokenInfo();
    }
  }, [clickCount, updateTokenInfo]);

  // 디버그 정보 복사
  const copyDebugInfo = () => {
    const info = {
      timestamp: new Date().toISOString(),
      tokenInfo: {
        hasToken: !!tokenInfo.token,
        tokenPreview: maskToken(tokenInfo.token),
        source: tokenInfo.source,
        flutterBridgeExists: tokenInfo.flutterBridgeExists,
        authFunctionExists: tokenInfo.authFunctionExists,
        receiveFunctionExists: tokenInfo.receiveFunctionExists,
      },
      logs: logs.slice(0, 20),
      userAgent: navigator.userAgent,
      url: window.location.href,
    };

    navigator.clipboard.writeText(JSON.stringify(info, null, 2));
    addDebugLog("success", "디버그 정보가 클립보드에 복사됨");
  };

  // 로그 클리어
  const clearLogs = () => {
    debugLogs.length = 0;
    setLogs([]);
    addDebugLog("info", "로그가 초기화됨");
  };

  // 토큰 초기화 및 재요청
  const resetToken = () => {
    try {
      // 1. localStorage에서 토큰 삭제
      localStorage.removeItem("authToken");
      addDebugLog("info", "localStorage 토큰 삭제됨");

      // 2. 메모리 토큰 초기화
      (window as any).__memoryToken = null;
      addDebugLog("info", "메모리 토큰 초기화됨");

      // 3. Flutter에 새 토큰 요청
      addDebugLog("info", "Flutter에 새 토큰 요청 중...");
      requestTokenFromFlutter();

      // 4. 토큰 정보 업데이트
      setTimeout(() => {
        updateTokenInfo();
        addDebugLog("success", "토큰 초기화 완료 - 새 토큰 대기 중");
      }, 500);
    } catch (error) {
      addDebugLog("error", `토큰 초기화 실패: ${error}`);
    }
  };

  // 토큰 초기화 후 페이지 새로고침
  const resetTokenAndReload = () => {
    resetToken();
    setTimeout(() => {
      addDebugLog("info", "페이지 새로고침 중...");
      window.location.reload();
    }, 1000);
  };

  if (!isVisible) return null;

  const getLogColor = (type: DebugLog["type"]) => {
    switch (type) {
      case "success":
        return "text-green-400";
      case "warning":
        return "text-yellow-400";
      case "error":
        return "text-red-400";
      default:
        return "text-gray-300";
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] overflow-auto bg-black/80 p-4">
      <div className="mx-auto max-w-lg rounded-lg border border-gray-700 bg-gray-900 shadow-2xl">
        {/* 헤더 */}
        <div className="flex items-center justify-between border-b border-gray-700 p-3">
          <h2 className="text-sm font-bold text-white">🔧 Debug Panel</h2>
          <button
            onClick={() => setIsVisible(false)}
            className="text-xl leading-none text-gray-400 hover:text-white"
          >
            ×
          </button>
        </div>

        {/* 토큰 정보 */}
        <div className="space-y-2 border-b border-gray-700 p-3">
          <h3 className="mb-2 text-xs font-semibold text-white">
            📌 토큰 상태
          </h3>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="text-gray-400">토큰:</div>
            <div
              className={tokenInfo.token ? "text-green-400" : "text-red-400"}
            >
              {maskToken(tokenInfo.token)}
            </div>

            <div className="text-gray-400">소스:</div>
            <div className="text-blue-400">{tokenInfo.source}</div>

            <div className="text-gray-400">FlutterBridge:</div>
            <div
              className={
                tokenInfo.flutterBridgeExists
                  ? "text-green-400"
                  : "text-red-400"
              }
            >
              {tokenInfo.flutterBridgeExists ? "✓ 존재" : "✗ 없음"}
            </div>

            <div className="text-gray-400">authorizationToken():</div>
            <div
              className={
                tokenInfo.authFunctionExists ? "text-green-400" : "text-red-400"
              }
            >
              {tokenInfo.authFunctionExists ? "✓ 등록됨" : "✗ 미등록"}
            </div>

            <div className="text-gray-400">receiveToken():</div>
            <div
              className={
                tokenInfo.receiveFunctionExists
                  ? "text-green-400"
                  : "text-yellow-400"
              }
            >
              {tokenInfo.receiveFunctionExists
                ? "✓ 등록됨"
                : "- 미등록 (미사용)"}
            </div>
          </div>
        </div>

        {/* 버튼들 */}
        <div className="flex flex-wrap gap-2 border-b border-gray-700 p-3">
          <button
            onClick={updateTokenInfo}
            className="flex-1 rounded bg-blue-600 px-3 py-2 text-xs text-white hover:bg-blue-700"
          >
            🔄 새로고침
          </button>
          <button
            onClick={copyDebugInfo}
            className="flex-1 rounded bg-green-600 px-3 py-2 text-xs text-white hover:bg-green-700"
          >
            📋 복사
          </button>
          <button
            onClick={clearLogs}
            className="flex-1 rounded bg-gray-600 px-3 py-2 text-xs text-white hover:bg-gray-700"
          >
            🗑️ 로그삭제
          </button>
        </div>

        {/* 토큰 관리 버튼 */}
        <div className="flex gap-2 border-b border-gray-700 p-3">
          <button
            onClick={resetToken}
            className="flex-1 rounded bg-orange-600 px-3 py-2 text-xs text-white hover:bg-orange-700"
          >
            🔑 토큰 초기화
          </button>
          <button
            onClick={resetTokenAndReload}
            className="flex-1 rounded bg-red-600 px-3 py-2 text-xs text-white hover:bg-red-700"
          >
            🔄 초기화 + 새로고침
          </button>
        </div>

        {/* 이벤트 로그 */}
        <div className="p-3">
          <h3 className="mb-2 text-xs font-semibold text-white">
            📝 이벤트 로그 ({logs.length})
          </h3>
          <div className="max-h-64 overflow-auto rounded bg-black p-2 font-mono text-xs">
            {logs.length === 0 ? (
              <div className="text-gray-500">로그가 없습니다</div>
            ) : (
              logs.map((log, index) => (
                <div key={index} className="py-0.5">
                  <span className="text-gray-500">[{log.timestamp}]</span>{" "}
                  <span className={getLogColor(log.type)}>{log.message}</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* 안내 */}
        <div className="border-t border-gray-700 p-3">
          <p className="text-center text-xs text-gray-500">
            우측 상단을 더블클릭하여 닫기
          </p>
        </div>
      </div>
    </div>
  );
}

export default DebugPanel;
