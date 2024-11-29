"use client";

import { Suspense } from "react";
import RecentSearchSection from "components/liquor/search/section/RecentSearchSection";
import RecommendedSearchSection from "components/liquor/search/section/RecommendSearchSection";
import SearchRankingSection from "components/liquor/search/section/SearchRankingSection";
import RecommendSearchSkeleton from "components/liquor/skeleton/RecommendSearchSection";
import SearchRankingSkeleton from "components/liquor/skeleton/SearchRankingSkeleton";

/** 술 검색 페이지 */
function LiquorSearchPage() {
  return (
    <>
      <RecentSearchSection />
      <Suspense fallback={<RecommendSearchSkeleton />}>
        <RecommendedSearchSection />
      </Suspense>
      <Suspense fallback={<SearchRankingSkeleton />}>
        <SearchRankingSection />
      </Suspense>
    </>
  );
}

export default LiquorSearchPage;
