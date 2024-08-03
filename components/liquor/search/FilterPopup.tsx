'use client';

import React, { useState } from 'react';
import CloseIcon from 'assets/icons/ico-close-black.svg';
import LiquorClassSection from './section/LiquorClassSection';
import LiquorTasteSection from './section/LiquorTasteSection';
import LiquorSellerSection from './section/LiquorSellerSection';
import FilterResetButton from './FilterResetButton';
import FilterApplyButton from './FilterApplyButton';
import LiquorABVSection from './section/LiquorABVsection';
import { LiquorSearchParams } from 'apis/api';

interface FilterPopupProps {
  onClose: () => void;
  onApply: (newOptions: LiquorSearchParams) => void;
}

function FilterPopup({ onClose, onApply }: FilterPopupProps) {
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

  const handleApply = () => {
    const newOptions: LiquorSearchParams = {
      liquorNamePriKeys: selectedClass.join(','),
      tastePriKeys: selectedTaste.join(','),
      liquorAbvPriKeys: selectedABV.join(','),
      sellPriKeys: selectedSeller.join(','),
    };
    onApply(newOptions);
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
