import React, { useState } from 'react';
import CloseIcon from 'assets/icons/ico-close-black.svg';
import LiquorClassSection from './section/LiquorClassSection';
import LiquorTasteSection from './section/LiquorTasteSection';
import LiquorABVSection from './section/LiquorABVSection';
import LiquorSellerSection from './section/LiquorSellerSection';
// FilterPopup props 타입 정의
interface FilterPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

// 팝업 컴포넌트
function FilterPopup({ isOpen, onClose }: FilterPopupProps) {
  return (
    <div
      className={`fixed inset-y-0 right-0 w-full bg-white shadow-lg transition-transform duration-300 ease-in-out transform ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="h-full overflow-auto p-6 relative">
        <button className="absolute top-4 right-4 text-2xl" onClick={onClose}>
          <CloseIcon />
        </button>
        <div className="justify-center text-[18px] font-bold">필터</div>
        <LiquorClassSection />
        <LiquorTasteSection />
        <LiquorABVSection />
        <LiquorSellerSection />
      </div>
    </div>
  );
}

export default FilterPopup;
