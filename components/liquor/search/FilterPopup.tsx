import React, { useState } from 'react';
import CloseIcon from 'assets/icons/ico-close-black.svg';
import LiquorClassSection from './section/LiquorClassSection';
import LiquorTasteSection from './section/LiquorTasteSection';
import LiquorSellerSection from './section/LiquorSellerSection';
import FilterResetButton from './FilterResetButton';
import FilterApplyButton from './FilterApplyButton';
import LiquorABVSection from './section/LiquorABVsection';
// FilterPopup props 타입 정의
interface FilterPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

// 팝업 컴포넌트
function FilterPopup({ isOpen, onClose }: FilterPopupProps) {
  const [selectedClass, setSelectedClass] = useState<number[]>([]);
  const [selectedTaste, setSelectedTaste] = useState<number[]>([]);
  const [selectedABV, setSelectedABV] = useState<number[]>([]);
  const [selectedSeller, setSelectedSeller] = useState<number[]>([]);

  const handleReset = () => {
    setSelectedClass([]);
    setSelectedTaste([]);
    setSelectedABV([]);
    setSelectedSeller([]);
  };
  return (
    <div
      className={`fixed inset-y-0 right-0  w-full bg-white shadow-lg transition-transform duration-300 ease-in-out transform ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="flex-col overflow-y-scroll scrollbar-hide justify-center h-full p-[20px] relative">
        <button className="absolute top-4 right-4" onClick={onClose}>
          <CloseIcon />
        </button>
        <div className="flex items-center justify-center text-[18px] text-suldak-gray-900  font-bold">
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
          <FilterApplyButton />
        </div>
      </div>
    </div>
  );
}

export default FilterPopup;
