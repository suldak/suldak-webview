"use client";

import { Suspense, useEffect, useState } from "react";
import RecentSearchSection from "components/liquor/search/section/RecentSearchSection";
import RecommendedSearchSection from "components/liquor/search/section/RecommendSearchSection";
import SearchRankingSection from "components/liquor/search/section/SearchRankingSection";
import { getToken } from "../utils/tokenStore";
import "../utils/flutterBridge"; // Flutter 브릿지 함수 등록을 위해 필수

/** 술 검색 페이지 */
function LiquorSearchPage() {
  // 실제 토큰 유무만 상태로 관리
  const [hasToken, setHasToken] = useState<boolean>(false);
  const [userToken, setUserToken] = useState<string | null>(null);
  const [envToken, setEnvToken] = useState<string | null>(null);

  // 토큰 상태 체크 함수
  const checkToken = () => {
    if (typeof window === "undefined") return;
    const token = getToken();
    setUserToken(token);
    setHasToken(!!token);
    // 환경변수 토큰은 클라이언트에서 process.env로 접근 불가하므로 window에서 직접 할당 필요
    // 빌드 타임에 NEXT_PUBLIC_TOKEN이 노출되어 있다면 아래처럼 사용 가능
    // (next.config.mjs에서 NEXT_PUBLIC_ 접두어가 붙은 변수만 클라이언트로 노출됨)
    // @ts-ignore
    setEnvToken(process.env.NEXT_PUBLIC_TOKEN || null);
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
      {/* 디버그용 토큰 비교 영역 (운영 배포 전 삭제 권장) */}
      <div
        style={{
          background: "#eee",
          padding: 8,
          marginBottom: 16,
          fontSize: 12,
        }}
      >
        <div>
          <b>사용자 토큰(userToken):</b> {userToken || "(없음)"}
        </div>
        <div>
          <b>환경 토큰(envToken):</b> {envToken || "(없음)"}
        </div>
        <div>
          <b>두 토큰이 동일한가?</b>{" "}
          {userToken && envToken
            ? userToken === envToken
              ? "예"
              : "아니오"
            : "비교 불가"}
        </div>
      </div>
      <RecentSearchSection />
      <Suspense fallback={<div>로딩 중...</div>}>
        <RecommendedSearchSection />
        <SearchRankingSection />
      </Suspense>
    </>
  );
}

export default LiquorSearchPage;
