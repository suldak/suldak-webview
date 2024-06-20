'use client';
import { Suspense } from 'react';
import RankingKeyword from '../RankingKeyword';
import CurrentTimeDisplay from '../CurrentTimeDisplay';
import SportsMedal from 'assets/icons/ico-sports-medal.svg';
function SearchRankingSection() {
  return (
    <section className="px-5">
      <div className="pt-10 pb-2 flex justify-start items-center gap-2">
        <div className="flex items-center gap-1">
          <SportsMedal />
          <span className="text-base font-bold">검색 키워드 랭킹</span>
        </div>
        <button className="text-xs font-medium text-suldak-gray-500">
          <CurrentTimeDisplay />
        </button>
      </div>
      <Suspense fallback={<>로딩중...</>}>
        <RankingKeyword />
      </Suspense>
    </section>
  );
}

export default SearchRankingSection;
