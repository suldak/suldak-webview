"use client";

import { Suspense } from "react";
import RecentSearchSection from "components/liquor/search/section/RecentSearchSection";
import RecommendedSearchSection from "components/liquor/search/section/RecommendSearchSection";
import SearchRankingSection from "components/liquor/search/section/SearchRankingSection";
import { useFlutterToken } from "../hooks/useFlutterToken";

/** 술 검색 페이지 */
function LiquorSearchPage() {
  // 이 페이지에서만 플러터 토큰을 요청
  useFlutterToken();
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
