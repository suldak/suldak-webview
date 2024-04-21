'use client';

import { Suspense } from 'react';
import { useParams } from 'next/navigation';
import LiquorDetail from 'components/liquor/detail';

/** 술 상세 페이지 */
function LiquorDetailPage() {
  const { id } = useParams<{ id: string }>();
  return (
    <div>
      <Suspense fallback={<>로딩중...</>}>
        <LiquorDetail id={parseInt(id)} />
      </Suspense>
    </div>
  );
}

export default LiquorDetailPage;
