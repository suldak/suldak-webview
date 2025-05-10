"use client";

import { Suspense } from "react";
import { useParams } from "next/navigation";
import NoticeDetail from "components/notice/detail/NoticeDetail";

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
