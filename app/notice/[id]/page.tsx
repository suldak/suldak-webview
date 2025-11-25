"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { useParams } from "next/navigation";

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
  return (
    <>
      <Suspense>
        <NoticeDetail id={parseInt(id)} />
      </Suspense>
    </>
  );
}
