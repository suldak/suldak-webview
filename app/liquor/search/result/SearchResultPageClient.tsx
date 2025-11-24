"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import LiquorSearchContent from "components/liquor/search/section/LiquorSearchContent";

function SearchParamsHandler({
  children,
}: {
  children: (params: URLSearchParams) => React.ReactNode;
}) {
  const searchParams = useSearchParams();
  return <>{children(new URLSearchParams(searchParams.toString()))}</>;
}

function LiquorSearchResultPageClient() {
  return (
    <Suspense fallback={null}>
      <SearchParamsHandler>
        {(searchParams) => <LiquorSearchContent searchParams={searchParams} />}
      </SearchParamsHandler>
    </Suspense>
  );
}

export default LiquorSearchResultPageClient;
