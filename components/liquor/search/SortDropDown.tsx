"use client";
import { Suspense, useState } from "react";
import SortIcon from "assets/icons/ico-filter-sort.svg";
import { useRouter, useSearchParams } from "next/navigation";

type SortOption = "정확도순" | "인기순";

// SearchParamsHandler 컴포넌트
function SearchParamsHandler({
  children,
}: {
  children: (params: URLSearchParams) => React.ReactNode;
}) {
  const searchParams = useSearchParams();
  return <>{children(new URLSearchParams(searchParams.toString()))}</>;
}

// SortDropDownContent 컴포넌트
function SortDropDownContent({
  searchParams,
}: {
  searchParams: URLSearchParams;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<SortOption>("정확도순");
  const router = useRouter();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: SortOption) => {
    setIsOpen(false);
    setSelectedOption(option);
    searchParams.set("sort", option);
    router.push(`?${searchParams.toString()}`);
  };

  return (
    <div className="relative text-[14px]">
      <div
        className="flex cursor-pointer items-center gap-0.5 text-suldak-gray-600"
        onClick={toggleDropdown}
      >
        <SortIcon />
        {selectedOption}
      </div>
      {isOpen && (
        <div className="absolute left-[-40px] top-full mt-1 h-[86px] w-[105px] border border-suldak-gray-500 bg-white text-[14px]">
          <div
            className={`mt-3 px-4 ${
              selectedOption === "정확도순"
                ? "text-suldak-gray-900"
                : "text-suldak-gray-600"
            }`}
            onClick={() => handleOptionClick("정확도순")}
          >
            정확도순
          </div>
          <div
            className={`mt-3 px-4 ${
              selectedOption === "인기순"
                ? "text-suldak-gray-900"
                : "text-suldak-gray-600"
            }`}
            onClick={() => handleOptionClick("인기순")}
          >
            인기순
          </div>
        </div>
      )}
    </div>
  );
}

function SortDropDown() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchParamsHandler>
        {(searchParams) => <SortDropDownContent searchParams={searchParams} />}
      </SearchParamsHandler>
    </Suspense>
  );
}

export default SortDropDown;
