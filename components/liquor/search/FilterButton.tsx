import React, { useState } from 'react';
import FilterIcon from 'assets/icons/ico-filter-filter.svg';

interface FilterButtonProps {
  onClick: () => void;
}
function FilterButton({ onClick }: FilterButtonProps) {
  return (
    <>
      <button
        className="flex text-suldak-gray-600 text-[14px] items-center gap-0.5"
        onClick={onClick}
      >
        <FilterIcon />
        필터
      </button>
    </>
  );
}

export default FilterButton;
