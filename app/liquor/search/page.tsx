'use client';

import { Suspense } from 'react';
import RecentSearchSection from 'components/liquor/search/section/RecentSearchSection';
import RecommendedSearchSection from 'components/liquor/search/section/RecommendSearchSection';
import SearchRankingSection from 'components/liquor/search/section/SearchRankingSection';

/** 술 검색 페이지 */
function LiquorSearchPage() {
  return (
    <>
      <RecentSearchSection />
      <Suspense fallback={<RecommendedSearchSkeleton />}>
        <RecommendedSearchSection />
      </Suspense>
      <Suspense fallback={<SearchRankingSkeleton />}>
        <SearchRankingSection />
      </Suspense>
    </>
  );
}

function RecommendedSearchSkeleton() {
  return (
    <section className="px-5">
      <p className="text-base font-bold pt-10 pb-2">추천 검색어</p>
      <div className="flex flex-wrap gap-2 py-2">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-300 mr-2 mb-2 animate-pulse"
          >
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </div>
        ))}
      </div>
    </section>
  );
}

function SearchRankingSkeleton() {
  return (
    <section className="px-5">
      <div className="pt-10 pb-2 flex justify-start items-center gap-2">
        <div className="flex items-center gap-1">
          <div className="w-5 h-5 bg-gray-200 rounded-full animate-pulse" />
          <span className="text-base font-bold">검색 키워드 랭킹</span>
        </div>
        <div className="w-20 h-4 bg-gray-200 rounded animate-pulse" />
      </div>
      <div className="flex items-center gap-14">
        <div className="flex flex-col">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="flex items-center gap-3 my-1">
              <div className="flex items-center justify-center text-suldak-gray-700 font-bold text-sm w-2.5">
                {index + 1}
              </div>
              <div className="w-24 h-5 bg-gray-200 rounded animate-pulse" />
            </div>
          ))}
        </div>
        <div className="flex flex-col">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="flex items-center gap-3 my-1">
              <div className="flex items-center justify-center text-suldak-gray-700 font-bold text-sm w-2.5">
                {index + 6}
              </div>
              <div className="w-24 h-5 bg-gray-200 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default LiquorSearchPage;
