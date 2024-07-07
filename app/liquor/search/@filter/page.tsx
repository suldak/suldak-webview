'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import FilterPopup from 'components/liquor/search/FilterPopup';

function FilterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const showFilter = searchParams.get('filter') === 'true';

  const handleClose = () => {
    router.push('/liquor/search/result');
  };

  if (!showFilter) {
    return null;
  }

  return <FilterPopup isOpen={true} onClose={handleClose} />;
}
export default FilterPage;
