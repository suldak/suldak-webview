import React from "react";

interface SearchInfoSectionProps {
  count: number;
  children?: React.ReactNode; // children을 선택적 prop으로 정의
}

const SearchInfoSection = ({ count, children }: SearchInfoSectionProps) => {
  return (
    <section className="h-[44px] px-[20px]">
      <div className="flex items-center justify-between pt-3.5">
        <span className="text-xs font-medium text-suldak-gray-600">
          총 {count}종
        </span>
        <div className="flex items-center gap-3 text-sm font-medium leading-5 text-suldak-gray-600">
          {children}
        </div>
      </div>
    </section>
  );
};

export default SearchInfoSection;
