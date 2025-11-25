"use client";

import { Suspense, useEffect, useState } from "react";
import { useGetLiquorDetail } from "apis/liquor/useGetLiquorDetail";
import LiquorDetail from "components/liquor/detail/LiquorDetail";
import SplashScreen from "components/shared/SplashScreen";
import { useFlutterToken } from "app/liquor/hooks/useFlutterToken";
import { getToken } from "app/liquor/utils/tokenStore";
import "app/liquor/utils/flutterBridge"; // Flutter 브릿지 함수 등록을 위해 필수

/** 토큰이 준비된 후 데이터를 가져오는 컴포넌트 */
function DetailContent({ id }: { id: number }) {
  const { data } = useGetLiquorDetail(id);

  if (!data) {
    return <SplashScreen />;
  }

  return <LiquorDetail liquorData={data} />;
}

/** 술 상세 페이지 클라이언트 컴포넌트 */
function DetailPageClient({ id }: { id: string }) {
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
    return <SplashScreen />;
  }

  const numericId = parseInt(id);
  if (isNaN(numericId)) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>잘못된 ID입니다.</p>
      </div>
    );
  }

  return (
    <Suspense fallback={<SplashScreen />}>
      <DetailContent id={numericId} />
    </Suspense>
  );
}

export default DetailPageClient;
