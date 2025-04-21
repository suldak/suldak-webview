"use client";

import { Suspense, useEffect, useState } from "react";
import RecentSearchSection from "components/liquor/search/section/RecentSearchSection";
import RecommendedSearchSection from "components/liquor/search/section/RecommendSearchSection";
import SearchRankingSection from "components/liquor/search/section/SearchRankingSection";
import { useFlutterToken } from "../hooks/useFlutterToken";
import { getToken } from "../utils/tokenStore";

/** 술 검색 페이지 */
function LiquorSearchPage() {
  const [tokenState, setTokenState] = useState<string | null>(null);

  // 이 페이지에서만 플러터 토큰을 요청
  useFlutterToken();

  // 토큰 업데이트 이벤트 리스너 추가
  useEffect(() => {
    if (typeof window === "undefined") return;

    // 초기 토큰 상태 설정
    setTokenState(getToken());

    // 토큰 업데이트 이벤트 리스너
    const handleTokenUpdate = (event: CustomEvent) => {
      console.log("Token updated event received");
      setTokenState(event.detail);

    };

    window.addEventListener("tokenUpdated", handleTokenUpdate as EventListener);

    return () => {
      window.removeEventListener(
        "tokenUpdated",
        handleTokenUpdate as EventListener,
      );
    };
  }, []);



  return (
    <>
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
