import { Suspense } from 'react';

import SportsMedal from 'assets/icons/ico-sports-medal.svg';

import RecommendKeyword from 'components/liquor/search/RecommendKeyword';
import RankingKeyword from 'components/liquor/search/RankingKeyword';

function LiquorSearchPage() {
  return (
    <>
      {/* 추천 검색어 영역 */}
      <section className="px-5">
        <p className="text-base font-bold pt-10 pb-2">추천 검색어</p>
        <div className="flex flex-wrap gap-2 py-2">
          <Suspense>
            <RecommendKeyword />
          </Suspense>
        </div>
      </section>

      {/* 검색어 순위 영역 */}

      <section className="px-5">
        <div className="pt-10 pb-2 flex justify-start items-center gap-2">
          <div className="flex items-center gap-1">
            <SportsMedal />
            <span className="text-base font-bold">검색 키워드 랭킹</span>
          </div>

          <button className="text-xs font-medium text-suldak-gray-500">
            18시 기준
          </button>
        </div>

        {/* 순위 목록 */}
        <Suspense fallback={<>로딩중...</>}>
          <RankingKeyword />
        </Suspense>
      </section>
    </>
  );
}

export default LiquorSearchPage;
