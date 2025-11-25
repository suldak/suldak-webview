"use client";

import LoadingCard from "components/shared/LiquorCard/LoadingCard";

/** 검색 결과 페이지 스켈레톤 */
function SearchResultSkeleton() {
  return (
    <main className="flex min-h-screen flex-col pb-[10px]">
      {/* 검색 입력창 영역 */}
      <div className="flex items-center justify-center gap-x-[8px] pl-[12px] pr-[20px] pt-[2px]">
        <div className="h-10 w-10 animate-pulse rounded-full bg-suldak-gray-200" />
        <div className="h-[52px] flex-1 animate-pulse rounded-full bg-suldak-gray-200" />
      </div>

      {/* 추천 키워드 영역 */}
      <div className="flex gap-2 px-5 pt-4">
        <div className="h-8 w-16 animate-pulse rounded-full bg-suldak-gray-200" />
        <div className="h-8 w-20 animate-pulse rounded-full bg-suldak-gray-200" />
        <div className="h-8 w-14 animate-pulse rounded-full bg-suldak-gray-200" />
      </div>

      {/* 검색 결과 정보 영역 */}
      <div className="flex items-center justify-between px-5 py-4">
        <div className="h-5 w-24 animate-pulse rounded bg-suldak-gray-200" />
        <div className="flex gap-2">
          <div className="h-8 w-16 animate-pulse rounded bg-suldak-gray-200" />
          <div className="h-8 w-16 animate-pulse rounded bg-suldak-gray-200" />
        </div>
      </div>

      {/* 로딩 카드 목록 */}
      <section className="flex h-full w-full flex-col items-center justify-center">
        <div className="mt-[10px]">
          <LoadingCard />
        </div>
        <div className="mt-[10px]">
          <LoadingCard />
        </div>
        <div className="mt-[10px]">
          <LoadingCard />
        </div>
        <div className="mt-[10px]">
          <LoadingCard />
        </div>
      </section>
    </main>
  );
}

export default SearchResultSkeleton;
