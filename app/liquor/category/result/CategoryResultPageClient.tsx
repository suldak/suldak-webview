"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import LiquorCategoryContent from "components/liquor/category/LiquorCategoryContent";
import { getToken } from "../../utils/tokenStore";
import "../../utils/flutterBridge";
import { useFlutterToken } from "../../hooks/useFlutterToken";
import SplashScreen from "components/shared/SplashScreen";
import ErrorBoundary from "components/shared/ErrorBoundary";

function CategoryParamsHandler({
  children,
}: {
  children: (params: URLSearchParams) => React.ReactNode;
}) {
  const searchParams = useSearchParams();
  return <>{children(new URLSearchParams(searchParams.toString()))}</>;
}

function CategoryResultPageClient() {
  // Flutter 토큰 초기화 훅 사용
  const { isTokenInitialized } = useFlutterToken();

  const [hasToken, setHasToken] = useState<boolean>(false);

  useEffect(() => {
    if (isTokenInitialized) {
      setHasToken(!!getToken());
    }
  }, [isTokenInitialized]);

  useEffect(() => {
    const handleTokenUpdate = (event: Event) => {
      if (event instanceof CustomEvent && event.detail) {
        setHasToken(true);
      }
    };
    window.addEventListener("tokenUpdated", handleTokenUpdate);

    return () => {
      window.removeEventListener("tokenUpdated", handleTokenUpdate);
    };
  }, []);

  if (!isTokenInitialized || !hasToken) {
    return <SplashScreen />;
  }

  return (
    <ErrorBoundary>
      <Suspense fallback={<SplashScreen />}>
        <CategoryParamsHandler>
          {(searchParams) => (
            <LiquorCategoryContent searchParams={searchParams} />
          )}
        </CategoryParamsHandler>
      </Suspense>
    </ErrorBoundary>
  );
}

export default CategoryResultPageClient;
