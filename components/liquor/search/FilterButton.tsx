"use client";
import FilterIcon from "assets/icons/ico-filter-filter.svg";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

// SearchParamsHandler 컴포넌트
function SearchParamsHandler({
  children,
}: {
  children: (params: URLSearchParams) => React.ReactNode;
}) {
  const searchParams = useSearchParams();
  return <>{children(new URLSearchParams(searchParams.toString()))}</>;
}

// FilterButtonContent 컴포넌트
function FilterButtonContent({
  searchParams,
}: {
  searchParams: URLSearchParams;
}) {
  const router = useRouter();

  const handleClick = () => {
    searchParams.set("filter", "open");
    // Parallel Routes를 사용하여 필터 페이지로 이동
    router.push(`/liquor/search/result?${searchParams.toString()}`, {
      scroll: false,
    });
  };

  return (
    <button
      className="flex items-center gap-0.5 text-[14px] text-suldak-gray-600"
      onClick={handleClick}
    >
      <FilterIcon />
      필터
    </button>
  );
}

function FilterButton() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchParamsHandler>
        {(searchParams) => <FilterButtonContent searchParams={searchParams} />}
      </SearchParamsHandler>
    </Suspense>
  );
}

export default FilterButton;
