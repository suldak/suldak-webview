"use client";

import dynamic from "next/dynamic";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useFlutterToken } from "app/liquor/hooks/useFlutterToken";
import { getToken } from "app/liquor/utils/tokenStore";
import "app/liquor/utils/flutterBridge"; // Flutter 브릿지 함수 등록을 위해 필수
import LoadingCard from "components/shared/LiquorCard/LoadingCard";

// LiquorSearchContent를 동적 로딩하여 초기 번들 크기 감소
const LiquorSearchContent = dynamic(
  () => import("components/liquor/search/section/LiquorSearchContent"),
  { ssr: false },
);

function SearchParamsHandler({
  children,
}: {
  children: (params: URLSearchParams) => React.ReactNode;
}) {
  const searchParams = useSearchParams();
  return <>{children(new URLSearchParams(searchParams.toString()))}</>;
}

/** 토큰 확인 중 표시할 스켈레톤 UI */
function SearchResultSkeleton() {
  return (
    <main className="flex min-h-screen flex-col pb-[10px]">
      {/* 검색창 헤더 스켈레톤 */}
      <div className="flex items-center justify-center gap-x-[8px] pl-[12px] pr-[20px] pt-[2px]">
        <div className="h-[44px] w-[44px] animate-pulse rounded-full bg-suldak-gray-300" />
        <div className="h-[44px] flex-1 animate-pulse rounded-full bg-suldak-gray-300" />
      </div>

      {/* 추천 키워드 스켈레톤 */}
      <div className="mt-[10px] px-5">
        <div className="flex gap-2">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="h-[28px] w-[60px] animate-pulse rounded-full bg-suldak-gray-300"
            />
          ))}
        </div>
      </div>

      {/* 검색 정보 영역 스켈레톤 */}
      <div className="flex items-center justify-between px-5 py-3">
        <div className="h-[16px] w-[80px] animate-pulse rounded bg-suldak-gray-300" />
        <div className="flex gap-2">
          <div className="h-[32px] w-[70px] animate-pulse rounded bg-suldak-gray-300" />
          <div className="h-[32px] w-[50px] animate-pulse rounded bg-suldak-gray-300" />
        </div>
      </div>

      {/* 주류 카드 스켈레톤 */}
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

function LiquorSearchResultPageClient() {
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
    return <SearchResultSkeleton />;
  }

  return (
    <Suspense fallback={<SearchResultSkeleton />}>
      <SearchParamsHandler>
        {(searchParams) => <LiquorSearchContent searchParams={searchParams} />}
      </SearchParamsHandler>
    </Suspense>
  );
}

export default LiquorSearchResultPageClient;
