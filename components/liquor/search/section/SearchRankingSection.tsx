"use client";
import { Suspense } from "react";
import CurrentTimeDisplay from "../CurrentTimeDisplay";
import SportsMedal from "assets/icons/ico-sports-medal.svg";
import RankingKeyword from "../ranking/RankingKeyword";
import RankingKeywordSkeleton from "../ranking/RankingKeywordSkeleton";

function SearchRankingSection() {
  return (
    <section className="px-5">
      <div className="flex items-center justify-start gap-2 pb-2 pt-10">
        <div className="flex items-center gap-1">
          <SportsMedal />
          <span className="text-base font-bold">검색 키워드 랭킹</span>
        </div>
        <CurrentTimeDisplay />
      </div>
      <Suspense fallback={<RankingKeywordSkeleton />}>
        <RankingKeyword />
      </Suspense>
    </section>
  );
}

export default SearchRankingSection;
