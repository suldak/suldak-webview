'use client';

import React, { useEffect, useState } from 'react';
import CloseIcon from 'assets/icons/ico-close-black.svg';
import LiquorClassSection from './section/LiquorClassSection';
import LiquorTasteSection from './section/LiquorTasteSection';
import LiquorSellerSection from './section/LiquorSellerSection';
import FilterResetButton from './FilterResetButton';
import FilterApplyButton from './FilterApplyButton';
import LiquorABVSection from './section/LiquorABVsection';
import { LiquorSearchParams } from 'apis/api';
import { useRouter } from 'next/navigation';
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
  
  useEffect(() => {
    // 컴포넌트가 마운트될 때마다 상태 초기화
    setSelectedClass([]);
    setSelectedTaste([]);
    setSelectedABV([]);
    setSelectedSeller([]);
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
      searchParams.push(`class=${selectedClass.join('&')}`);
    if (selectedTaste.length)
      searchParams.push(`taste=${selectedTaste.join('&')}`);
    if (selectedABV.length) searchParams.push(`abv=${selectedABV.join('&')}`);
    if (selectedSeller.length)
      searchParams.push(`seller=${selectedSeller.join('&')}`);

    const queryString = searchParams.join('&');
    console.log('searchParams!', queryString);
    router.push(`/liquor/search/result?${queryString}`);
  };

  return (
    <div className="fixed inset-y-0 right-0 w-full bg-white shadow-lg z-50">
      <div className="flex-col overflow-y-scroll scrollbar-hide justify-center h-full p-[20px] relative">
        <button className="absolute top-4 right-4" onClick={onClose}>
          <CloseIcon />
        </button>
        <div className="flex items-center justify-center text-[18px] text-suldak-gray-900 font-bold">
          필터
        </div>
        <div className="absolute top-[48px] left-0 w-full border-t border-suldak-gray-200"></div>
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
        </div>
        <div className="flex gap-x-[12px]">
          <FilterResetButton onReset={handleReset} />
          <FilterApplyButton onApply={handleApply} />
        </div>
      </div>
    </div>
  );
}

export default FilterPopup;
