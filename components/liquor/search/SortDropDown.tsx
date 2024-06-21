'use client';
import React, { useState } from 'react';
import SortIcon from 'assets/icons/ico-filter-sort.svg';
import { useRouter, useSearchParams } from 'next/navigation';

type SortOption = '정확도순' | '인기순';

function SortDropDown() {
  const [isOpen, setIsOpen] = useState(false); // 드롭다운 메뉴를 열고닫기 위함
  const [isSelected, setIsSelected] = useState<SortOption>('정확도순'); // 메뉴 선택, 텍스트 적용을 위함
  const router = useRouter();
  const searchParams = useSearchParams();

  //const currentSort = (searchParams.get('sort') as SortOption) || '정확도순';

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: SortOption) => {
    setIsOpen(false);
    setIsSelected(option);
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', option);
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="relative text-[]">
      <div
        className="flex items-center gap-0.5 cursor-pointer text-suldak-gray-600"
        onClick={toggleDropdown}
      >
        <SortIcon />
        {isSelected}
      </div>
      {isOpen && (
        <div className="w-[105px] h-[86px] absolute top-full left-[-40px] mt-1 bg-white border border-suldak-gray-500">
          <div
            className={`mt-3 px-4 ${
              isSelected === '정확도순'
                ? 'text-suldak-gray-900'
                : 'text-suldak-gray-600'
            }`}
            onClick={() => handleOptionClick('정확도순')}
          >
            정확도순
          </div>
          <div
            className={`mt-3 px-4 ${
              isSelected === '인기순'
                ? 'text-suldak-gray-900'
                : 'text-suldak-gray-600'
            }`}
            onClick={() => handleOptionClick('인기순')}
          >
            인기순
          </div>
        </div>
      )}
    </div>
  );
}

export default SortDropDown;
