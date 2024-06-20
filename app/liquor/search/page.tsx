'use client';

import RecentSearchSection from 'components/liquor/search/section/RecentSearchSection';
import RecommendedSearchSection from 'components/liquor/search/section/RecommendSearchSection';
import SearchRankingSection from 'components/liquor/search/section/SearchRankingSection';

/** 술 검색 페이지 */
function LiquorSearchPage() {
  return (
    <>
      <RecentSearchSection />
      <RecommendedSearchSection />
      <SearchRankingSection />
    </>
  );
}

export default LiquorSearchPage;
