"use client";

import { useRouter } from "next/navigation";
import FilterPopup from "components/liquor/search/FilterPopup";
import { LiquorSearchParams } from "apis/api";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

// Parallel Routes에서 빌드 시 정적 생성 방지
export const dynamic = "force-dynamic";

// SearchParamsHandler 컴포넌트 추가
function SearchParamsHandler({
  children,
}: {
  children: (searchParams: URLSearchParams) => React.ReactNode;
}) {
  const searchParams = useSearchParams();
  return <>{children(new URLSearchParams(searchParams.toString()))}</>;
}

export default function FilterPage() {
  const router = useRouter();

  const handleClose = (currentParams: URLSearchParams) => {
    currentParams.delete("filter");
    router.push(`/liquor/search/result?${currentParams.toString()}`, {
      scroll: false,
    });
  };

  const handleApply = (
    currentParams: URLSearchParams,
    newOptions: LiquorSearchParams,
  ) => {
    currentParams.delete("filter");
    // URL에 filter option 추가
    Object.entries(newOptions).forEach(([key, value]) => {
      if (value) {
        currentParams.set(key, value);
      }
    });
    router.push(`/liquor/search/result?${currentParams.toString()}`, {
      scroll: false,
    });
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchParamsHandler>
        {(currentParams) => (
          <FilterPopup
            onClose={() => handleClose(currentParams)}
            onApply={(newOptions) => handleApply(currentParams, newOptions)}
          />
        )}
      </SearchParamsHandler>
    </Suspense>
  );
}
