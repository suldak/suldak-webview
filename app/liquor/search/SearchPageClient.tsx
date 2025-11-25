"use client";

import dynamic from "next/dynamic";
import { Suspense, useEffect, useState } from "react";
import { getToken } from "../utils/tokenStore";
import "../utils/flutterBridge"; // Flutter 브릿지 함수 등록을 위해 필수
import { useFlutterToken } from "../hooks/useFlutterToken";

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

/** 술 검색 페이지 (CSR 전용 클라이언트) */
function LiquorSearchPageClient() {
  useFlutterToken();
  // lazy initialization으로 초기 렌더링 시 토큰 동기 확인 (뒤로가기 시 빈 화면 방지)
  const [hasToken, setHasToken] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return !!getToken();
  });

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
    return null;
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
