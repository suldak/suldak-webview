"use client";

import { Suspense, useEffect, useState } from "react";
import RecentSearchSection from "components/liquor/search/section/RecentSearchSection";
import RecommendedSearchSection from "components/liquor/search/section/RecommendSearchSection";
import SearchRankingSection from "components/liquor/search/section/SearchRankingSection";
import { getToken } from "../utils/tokenStore";

/** 술 검색 페이지 */
function LiquorSearchPage() {
  const [hasToken, setHasToken] = useState<boolean>(false);
  const [debugTokenValue, setDebugTokenValue] = useState<string | null>(null);
  const [debugCookieValue, setDebugCookieValue] = useState<string>("");

  // 토큰 상태 체크 및 디버그 정보 업데이트
  useEffect(() => {
    if (typeof window === "undefined") return;

    // 초기 토큰 상태 확인
    const checkToken = () => {
      const token = getToken();
      setHasToken(!!token);
      setDebugTokenValue(token); // 디버그용 상태 업데이트
      setDebugCookieValue(document.cookie); // 디버그용 쿠키 상태 업데이트

      // 토큰 유무에 따라 필요한 로직 수행 (예: API 호출)
      if (token) {
        console.log("Token found, proceeding with authenticated actions.");
      } else {
        console.log(
          "No token found, proceeding with public actions or using fallback.",
        );
        // 필요한 경우 환경 변수 토큰 사용 로직 호출 등
      }
    };

    checkToken();

    // tokenUpdated 이벤트 리스너 제거
    // const handleTokenUpdate = () => {
    //   console.log("Token updated event received");
    //   checkToken();
    // };
    // window.addEventListener("tokenUpdated", handleTokenUpdate);
    // return () => {
    //   window.removeEventListener("tokenUpdated", handleTokenUpdate);
    // };
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
          Cookies: {debugCookieValue || "(empty)"}
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
