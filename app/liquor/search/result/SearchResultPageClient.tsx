"use client";

import dynamic from "next/dynamic";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useFlutterToken } from "app/liquor/hooks/useFlutterToken";
import { getToken } from "app/liquor/utils/tokenStore";
import "app/liquor/utils/flutterBridge"; // Flutter 브릿지 함수 등록을 위해 필수

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
    return null;
  }

  return (
    <Suspense fallback={null}>
      <SearchParamsHandler>
        {(searchParams) => <LiquorSearchContent searchParams={searchParams} />}
      </SearchParamsHandler>
    </Suspense>
  );
}

export default LiquorSearchResultPageClient;
