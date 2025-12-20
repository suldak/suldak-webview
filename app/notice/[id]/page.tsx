"use client";

import dynamic from "next/dynamic";
import { Suspense, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useFlutterToken } from "app/liquor/hooks/useFlutterToken";
import { getToken } from "app/liquor/utils/tokenStore";
import "app/liquor/utils/flutterBridge";
import ErrorBoundary from "components/shared/ErrorBoundary";

// react-markdown 등 무거운 라이브러리를 포함한 NoticeDetail을 동적 로드
const NoticeDetail = dynamic(
  () => import("components/notice/detail/NoticeDetail"),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-gray-600" />
      </div>
    ),
  },
);

/** 공지사항 페이지 */
export default function NoticeDetailPage() {
  const { id } = useParams<{ id: string }>();
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
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-gray-600" />
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <Suspense>
        <NoticeDetail id={parseInt(id)} />
      </Suspense>
    </ErrorBoundary>
  );
}
