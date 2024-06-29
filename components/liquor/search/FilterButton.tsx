import React, { useState } from 'react';
import FilterIcon from 'assets/icons/ico-filter-filter.svg';
import FilterPopup from './FilterPopup';
function FilterButton() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  return (
    <>
      <button
        className="flex text-suldak-gray-600 text-[14px] items-center gap-0.5"
        onClick={openPopup}
      >
        <FilterIcon />
        필터
      </button>

      <FilterPopup isOpen={isPopupOpen} onClose={closePopup} />
    </>
  );
}

export default FilterButton;
