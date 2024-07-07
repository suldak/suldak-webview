import React from 'react';

interface FilterApplyButtonProps {
  onClick: () => void;
}

function FilterApplyButton({ onClick }: FilterApplyButtonProps) {
  return (
    <button
      className="py-[20px] px-[72px] inline-flex text-[18px] items-center h-[60px] rounded-2xl bg-suldak-mint-500 text-white"
      onClick={onClick}
    >
      필터 적용하기
    </button>
  );
}

export default FilterApplyButton;
