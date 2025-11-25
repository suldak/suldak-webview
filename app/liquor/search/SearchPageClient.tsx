"use client";

import dynamic from "next/dynamic";
import { Suspense, useEffect, useState } from "react";
import { getToken } from "../utils/tokenStore";
import "../utils/flutterBridge"; // Flutter 브릿지 함수 등록을 위해 필수
import { useFlutterToken } from "../hooks/useFlutterToken";
import SkeletonTag from "components/shared/Tag/SkeletonTag";
import RankingKeywordSkeleton from "components/liquor/search/ranking/RankingKeywordSkeleton";

// 섹션 컴포넌트들을 동적 로딩하여 초기 번들 크기 감소
const RecentSearchSection = dynamic(
  () => import("components/liquor/search/section/RecentSearchSection"),
  { ssr: false },
);

const RecommendedSearchSection = dynamic(
  () => import("components/liquor/search/section/RecommendSearchSection"),
  { ssr: false },
);

const SearchRankingSection = dynamic(
  () => import("components/liquor/search/section/SearchRankingSection"),
  { ssr: false },
);

/** 토큰 확인 중 표시할 스켈레톤 UI */
function SearchPageSkeleton() {
  return (
    <>
      {/* 검색창 헤더 스켈레톤 */}
      <section>
        <div className="flex items-center justify-center gap-x-[8px] pl-[12px] pr-[20px] pt-[2px]">
          <div className="h-[44px] w-[44px] animate-pulse rounded-full bg-suldak-gray-300" />
          <div className="h-[44px] flex-1 animate-pulse rounded-full bg-suldak-gray-300" />
        </div>
        {/* 최근 검색어 섹션 스켈레톤 */}
        <div className="flex items-end justify-between px-5 pb-2 pt-10">
          <div className="h-[19px] w-[90px] animate-pulse rounded bg-suldak-gray-300" />
          <div className="h-[14px] w-[50px] animate-pulse rounded bg-suldak-gray-300" />
        </div>
        <div className="px-5">
          <div className="inline-flex h-[54px] w-max items-start gap-2">
            {[...Array(4)].map((_, index) => (
              <SkeletonTag key={index} />
            ))}
          </div>
        </div>
      </section>

      {/* 추천 검색어 섹션 스켈레톤 */}
      <section className="px-5">
        <div className="h-[19px] w-[90px] animate-pulse rounded bg-suldak-gray-300 pb-2 pt-[40px]" />
        <div className="flex flex-wrap gap-2 py-2 pt-[48px]">
          {[...Array(5)].map((_, index) => (
            <SkeletonTag key={index} />
          ))}
        </div>
      </section>

      {/* 검색 랭킹 섹션 스켈레톤 */}
      <section className="px-5">
        <div className="flex items-center justify-start gap-2 pb-2 pt-10">
          <div className="h-[19px] w-[130px] animate-pulse rounded bg-suldak-gray-300" />
        </div>
        <RankingKeywordSkeleton />
      </section>
    </>
  );
}

/** 술 검색 페이지 (CSR 전용 클라이언트) */
function LiquorSearchPageClient() {
  useFlutterToken();
  const [hasToken, setHasToken] = useState<boolean>(false);

  const checkToken = () => {
    if (typeof window === "undefined") return;
    const token = getToken();
    setHasToken(!!token);
  };

  useEffect(() => {
    checkToken();
    const handleTokenUpdate = (event: Event) => {
      if (event instanceof CustomEvent && event.detail) {
        checkToken();
      }
    };

    window.addEventListener("tokenUpdated", handleTokenUpdate);
    return () => {
      window.removeEventListener("tokenUpdated", handleTokenUpdate);
    };
  }, []);

  if (!hasToken) {
    return <SearchPageSkeleton />;
  }

  return (
    <>
      <RecentSearchSection />
      <Suspense fallback={<div>로딩 중...</div>}>
        <RecommendedSearchSection />
        <SearchRankingSection />
      </Suspense>
    </>
  );
}

export default LiquorSearchPageClient;
