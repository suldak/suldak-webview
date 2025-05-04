"use client";

import { Suspense, useEffect, useState } from "react";
import RecentSearchSection from "components/liquor/search/section/RecentSearchSection";
import RecommendedSearchSection from "components/liquor/search/section/RecommendSearchSection";
import SearchRankingSection from "components/liquor/search/section/SearchRankingSection";
import { getToken, setToken } from "../utils/tokenStore";
import "../utils/flutterBridge";

/** 술 검색 페이지 */
function LiquorSearchPage() {
  const [hasToken, setHasToken] = useState<boolean>(false);
  const [debugTokenValue, setDebugTokenValue] = useState<string | null>(null);
  const [debugCookieValue, setDebugCookieValue] = useState<string>("");

  // 토큰 상태 체크 및 디버그 정보 업데이트
  const checkToken = () => {
    if (typeof window === "undefined") return;
    const token = getToken();
    setHasToken(!!token);
    setDebugTokenValue(token);
    setDebugCookieValue(document.cookie); // 쿠키는 이제 토큰과 직접 관련 없지만 디버깅 위해 유지

    if (token) {
      console.log("Token found, proceeding with authenticated actions.");
    } else {
      console.log(
        "No token found, proceeding with public actions or using fallback.",
      );
    }
  };

  useEffect(() => {
    // 초기 토큰 상태 확인
    checkToken();

    // tokenUpdated 이벤트 리스너 등록
    const handleTokenUpdate = (event: Event) => {
      console.log("Token updated event received in page");
      // CustomEvent 타입인지 확인하고 detail에서 토큰 추출
      if (event instanceof CustomEvent) {
        const newToken = event.detail;
        if (newToken) {
          // 상태 업데이트 (이미 setToken에서 메모리/스토리지는 업데이트 됨)
          checkToken(); // 상태 및 디버그 정보 업데이트
        } else {
          console.warn("Received tokenUpdated event with no token in detail");
        }
      } else {
        // 일반 Event 타입인 경우 (이 경우는 없어야 함)
        checkToken(); // 일단 상태 체크 다시 실행
      }
    };
    window.addEventListener("tokenUpdated", handleTokenUpdate);

    // 컴포넌트 언마운트 시 리스너 제거
    return () => {
      window.removeEventListener("tokenUpdated", handleTokenUpdate);
    };
  }, []); // 의존성 배열 비움 (최초 마운트 시에만 실행)

  return (
    <>
      {/* --- 디버깅 정보 표시 시작 --- */}
      <div
        style={{
          position: "sticky",
          top: 0,
          left: 0,
          width: "100%",
          backgroundColor: "rgba(255, 200, 200, 0.9)", // 눈에 띄는 배경색
          padding: "8px",
          fontSize: "10px",
          zIndex: 9999, // 다른 요소 위에 표시
          borderBottom: "1px solid red",
          fontFamily: "monospace",
          wordBreak: "break-all",
        }}
      >
        <p style={{ margin: 0, fontWeight: "bold" }}>-- DEBUG INFO --</p>
        <p style={{ margin: "2px 0 0 0" }}>
          Detected Token: {debugTokenValue ? debugTokenValue : "null"}
        </p>
        <p style={{ margin: "2px 0 0 0" }}>
          Cookies: {debugCookieValue || "(empty)"} {/* 쿠키는 토큰과 무관 */}
        </p>
      </div>
      {/* --- 디버깅 정보 표시 끝 --- */}

      <RecentSearchSection />
      <Suspense>
        <RecommendedSearchSection />
      </Suspense>
      <Suspense>
        <SearchRankingSection />
      </Suspense>
    </>
  );
}

export default LiquorSearchPage;
