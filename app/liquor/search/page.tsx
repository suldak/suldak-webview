"use client";

import { Suspense, useEffect, useState } from "react";
import RecentSearchSection from "components/liquor/search/section/RecentSearchSection";
import RecommendedSearchSection from "components/liquor/search/section/RecommendSearchSection";
import SearchRankingSection from "components/liquor/search/section/SearchRankingSection";
import { useFlutterToken } from "../hooks/useFlutterToken";
import { getToken } from "../utils/tokenStore";

/** 술 검색 페이지 */
function LiquorSearchPage() {
  const [hasToken, setHasToken] = useState<boolean>(false);
  const { isTokenInitialized } = useFlutterToken();

  // 토큰 상태 체크 및 업데이트 이벤트 리스너
  useEffect(() => {
    if (typeof window === "undefined") return;

    // 초기 토큰 상태 확인
    const checkToken = () => {
      const token = getToken();
      setHasToken(!!token);
    };

    checkToken();

    // 토큰 업데이트 이벤트 리스너
    const handleTokenUpdate = () => {
      console.log("Token updated event received");
      checkToken();
    };

    window.addEventListener("tokenUpdated", handleTokenUpdate);

    return () => {
      window.removeEventListener("tokenUpdated", handleTokenUpdate);
    };
  }, [isTokenInitialized]);

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
