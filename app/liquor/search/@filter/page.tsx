'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import FilterPopup from 'components/liquor/search/FilterPopup';
import { LiquorSearchParams } from 'apis/api';
import { useLiquorSearch } from 'apis/liquor/useLiquorSearch';

export default function FilterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleClose = () => {
    const currentParams = new URLSearchParams(searchParams.toString());
    currentParams.delete('filter');
    router.push(`/liquor/search/result?${currentParams.toString()}`, {
      scroll: false,
    });
  };

  const handleApply = (newOptions: LiquorSearchParams) => {
    const currentParams = new URLSearchParams(searchParams.toString());
    currentParams.delete('filter');
    // URL에 filter option 추가
    Object.entries(newOptions).forEach(([key, value]) => {
      if (value) {
        currentParams.set(key, value);
      }
    });
    router.push(`/liquor/search/result?${currentParams.toString()}`, {
      scroll: false,
    });
  };

  return <FilterPopup onClose={handleClose} onApply={handleApply} />;
}