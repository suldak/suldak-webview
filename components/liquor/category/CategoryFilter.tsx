"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import CategoryClassSection from "./CategoryClassSection";

// 카테고리 필터 컴포넌트
function CategoryFilter() {
  const searchParams = useSearchParams();
  const [selectedClass, setSelectedClass] = useState<string[]>([]);

  useEffect(() => {
    const queryClass = searchParams.get("q");
    if (queryClass) {
      setSelectedClass([String(queryClass)]);
    } else {
      setSelectedClass([]);
    }
  }, [searchParams]);

  return (
    <div className="bg-white p-4 overflow-hidden">
      <div className="flex items-center gap-4 overflow-x-scroll scrollbar-hide whitespace-nowrap">
        <CategoryClassSection
          selected={selectedClass}
          setSelected={setSelectedClass}
        />
      </div>
    </div>
  );
}

export default CategoryFilter;
