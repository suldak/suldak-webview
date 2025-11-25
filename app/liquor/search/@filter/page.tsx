"use client";

import dynamicImport from "next/dynamic";
import { useRouter } from "next/navigation";
import { LiquorSearchParams } from "apis/api";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

// FilterPopup을 동적 import로 변경하여 번들 크기 감소
const FilterPopup = dynamicImport(
  () => import("components/liquor/search/FilterPopup"),
  {
    ssr: false,
    loading: () => (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-suldak-gray-200 border-t-suldak-mint-500" />
      </div>
    ),
  },
);

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
