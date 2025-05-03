"use client";

import { Suspense, useEffect, useState } from "react";
import RecentSearchSection from "components/liquor/search/section/RecentSearchSection";
import RecommendedSearchSection from "components/liquor/search/section/RecommendSearchSection";
import SearchRankingSection from "components/liquor/search/section/SearchRankingSection";
import { getToken } from "../utils/tokenStore";

/** 술 검색 페이지 */
function LiquorSearchPage() {
  const [hasToken, setHasToken] = useState<boolean>(false);

  // 토큰 상태 체크
  useEffect(() => {
    if (typeof window === "undefined") return;

    // 초기 토큰 상태 확인
    const checkToken = () => {
      const token = getToken();
      setHasToken(!!token);
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
