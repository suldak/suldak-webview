'use client';
import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import FilterPopup from 'components/liquor/search/FilterPopup';
import { useFilterContext } from 'app/context/FilterContext';
import { LiquorSearchParams } from 'apis/api';
import { useLiquorSearch } from 'apis/liquor/useLiquorSearch';

function FilterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const showFilter = searchParams.get('filter') === 'true';
  const { setFilterOptions } = useFilterContext();
  const { refetch } = useLiquorSearch({
    /* 초기 파라미터 */
  });

  const handleClose = () => {
    router.push('/liquor/search/result');
  };

  const handleApply = (newOptions: LiquorSearchParams) => {
    setFilterOptions(newOptions);
    refetch(); // 새로운 옵션으로 데이터를 다시 가져옵니다.
    router.push('/liquor/search/result');
  };

  if (!showFilter) {
    return null;
  }

  return (
    <FilterPopup isOpen={true} onClose={handleClose} onApply={handleApply} />
  );
}

export default FilterPage;
