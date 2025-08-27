"use client";

import { Suspense, useEffect, useState } from "react";
import RecentSearchSection from "components/liquor/search/section/RecentSearchSection";
import RecommendedSearchSection from "components/liquor/search/section/RecommendSearchSection";
import SearchRankingSection from "components/liquor/search/section/SearchRankingSection";
import { getToken } from "../utils/tokenStore";
import "../utils/flutterBridge"; // Flutter 브릿지 함수 등록을 위해 필수
import DebugTokenInfo from "components/shared/DebugTokenInfo";
import { useFlutterToken } from "../hooks/useFlutterToken";

/** 술 검색 페이지 */
function LiquorSearchPage() {
  // Flutter 토큰 초기화 훅 사용
  const { isTokenInitialized } = useFlutterToken();

  // 실제 토큰 유무만 상태로 관리
  const [hasToken, setHasToken] = useState<boolean>(false);

  // 토큰 상태 체크 함수
  const checkToken = () => {
    if (typeof window === "undefined") return;
    const token = getToken();
    const currentHasToken = !!token;
    setHasToken(currentHasToken);
  };

  useEffect(() => {
    // 초기 토큰 상태 확인
    checkToken();

    // tokenUpdated 이벤트 리스너 등록 (Flutter에서 토큰을 보냈을 때 상태 업데이트)
    const handleTokenUpdate = (event: Event) => {
      console.log("Token updated event received in page"); // 이벤트 수신 확인용 로그
      // CustomEvent 타입이고 detail에 토큰이 있을 때만 상태 재확인
      if (event instanceof CustomEvent && event.detail) {
        checkToken(); // 상태 및 디버그 정보 업데이트
      } else {
        console.warn("Received tokenUpdated event without valid token detail");
      }
    };
    window.addEventListener("tokenUpdated", handleTokenUpdate);

    // 컴포넌트 언마운트 시 리스너 제거
    return () => {
      window.removeEventListener("tokenUpdated", handleTokenUpdate);
    };
  }, []); // 의존성 배열 비움 (최초 마운트 시에만 실행)

  return (
    <>
      <DebugTokenInfo />
      <RecentSearchSection />
      <Suspense fallback={<div>로딩 중...</div>}>
        <RecommendedSearchSection />
        <SearchRankingSection />
      </Suspense>
    </>
  );
}

export default LiquorSearchPage;
