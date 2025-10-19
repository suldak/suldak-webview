"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import LiquorCategoryContent from "components/liquor/category/LiquorCategoryContent";
import { getToken } from "../../utils/tokenStore";
import "../../utils/flutterBridge";
import { useFlutterToken } from "../../hooks/useFlutterToken";

function CategoryParamsHandler({
  children,
}: {
  children: (params: URLSearchParams) => React.ReactNode;
}) {
  const searchParams = useSearchParams();
  return <>{children(new URLSearchParams(searchParams.toString()))}</>;
}

function LiquorCategoryResultPage() {
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
      console.log("Token updated event received in category result page");
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
    <Suspense fallback>
      <CategoryParamsHandler>
        {(searchParams) => (
          <LiquorCategoryContent searchParams={searchParams} />
        )}
      </CategoryParamsHandler>
    </Suspense>
  );
}

export default LiquorCategoryResultPage;
