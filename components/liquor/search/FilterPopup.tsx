"use client";

import { useEffect, useState } from "react";
import CloseIcon from "assets/icons/ico-close-black.svg";
import LiquorClassSection from "./section/LiquorClassSection";
import LiquorTasteSection from "./section/LiquorTasteSection";
import LiquorSellerSection from "./section/LiquorSellerSection";
import FilterResetButton from "./FilterResetButton";
import FilterApplyButton from "./FilterApplyButton";
import LiquorABVSection from "./section/LiquorABVsection";
import { LiquorSearchParams } from "apis/api";
import { useRouter } from "next/navigation";

interface FilterPopupProps {
  onClose: () => void;
  onApply: (newOptions: LiquorSearchParams) => void;
}

function FilterPopup({ onClose, onApply }: FilterPopupProps) {
  const router = useRouter();
  const [selectedClass, setSelectedClass] = useState<number[]>([]);
  const [selectedTaste, setSelectedTaste] = useState<number[]>([]);
  const [selectedABV, setSelectedABV] = useState<number[]>([]);
  const [selectedSeller, setSelectedSeller] = useState<number[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setSelectedClass([]);
    setSelectedTaste([]);
    setSelectedABV([]);
    setSelectedSeller([]);
    setIsVisible(true);
  }, []);

  const handleReset = () => {
    setSelectedClass([]);
    setSelectedTaste([]);
    setSelectedABV([]);
    setSelectedSeller([]);
  };

  const handleApply = () => {
    const searchParams: string[] = [];
    if (selectedClass.length)
      searchParams.push(`class=${selectedClass.join(",")}`);
    if (selectedTaste.length)
      searchParams.push(`taste=${selectedTaste.join(",")}`);
    if (selectedABV.length) searchParams.push(`abv=${selectedABV.join(",")}`);
    if (selectedSeller.length)
      searchParams.push(`seller=${selectedSeller.join(",")}`);

    const queryString = searchParams.join("&");
    router.push(`/liquor/search/result?${queryString}`);
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300); // 애니메이션이 끝난 후 onClose 호출
  };

  return (
    <div
      className={`fixed inset-y-0 right-0 z-50 w-full bg-white shadow-lg transition-transform duration-300 ease-in-out ${
        isVisible ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="relative flex h-full flex-col justify-center overflow-y-scroll p-[20px] scrollbar-hide">
        <button className="absolute right-4 top-4" onClick={handleClose}>
          <CloseIcon />
        </button>

        <div className="flex items-center justify-center text-[18px] font-bold text-suldak-gray-900">
          필터
        </div>
        <div className="absolute left-0 top-[48px] w-full border-t border-suldak-gray-200"></div>
        <div className="flex h-full w-full flex-col">
          <div className="mt-[20px]"></div>
          <div className="gap-y-[40px]">
            <LiquorClassSection
              selected={selectedClass}
              setSelected={setSelectedClass}
            />
            <LiquorTasteSection
              selected={selectedTaste}
              setSelected={setSelectedTaste}
            />
            <LiquorABVSection
              selected={selectedABV}
              setSelected={setSelectedABV}
            />
            <LiquorSellerSection
              selected={selectedSeller}
              setSelected={setSelectedSeller}
            />

            <div className="flex w-full items-end">
              <div className="inline-flex h-[60px] grow-[1]">
                <FilterResetButton onReset={handleReset} />
              </div>
              <div className="inline-flex h-[60px] grow-[3]">
                <FilterApplyButton onApply={handleApply} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterPopup;
