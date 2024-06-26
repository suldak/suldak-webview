import React, { useState } from 'react';
import CloseIcon from 'assets/icons/ico-close-black.svg';
import LiquorClassSection from './section/LiquorClassSection';
import LiquorTasteSection from './section/LiquorTasteSection';
import LiquorABVSection from './section/LiquorABVSection';
import LiquorSellerSection from './section/LiquorSellerSection';
import FilterResetButton from './FilterResetButton';
import FilterApplyButton from './FilterApplyButton';
// FilterPopup props 타입 정의
interface FilterPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

// 팝업 컴포넌트
function FilterPopup({ isOpen, onClose }: FilterPopupProps) {
  return (
    <div
      className={`fixed inset-y-0 right-0  w-full bg-white shadow-lg transition-transform duration-300 ease-in-out transform ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="flex-col overflow-y-scroll justify-center h-full p-[20px] relative">
        <button className="absolute top-4 right-4" onClick={onClose}>
          <CloseIcon />
        </button>
        <div className="flex items-center justify-center text-[18px] text-suldak-gray-900  font-bold">
          필터
        </div>
        <br className="w-full border-spacing-1 border-suldak-gray-900" />
        <div className="gap-y-[40px]">
          <LiquorClassSection />
          <LiquorTasteSection />
          <LiquorABVSection />
          <LiquorSellerSection />
        </div>
        <div className="flex gap-x-[12px]">
          <FilterResetButton />
          <FilterApplyButton />
        </div>
      </div>
    </div>
  );
}

export default FilterPopup;
