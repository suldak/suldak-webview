'use client';

import { Suspense } from 'react';
import { useParams } from 'next/navigation';

import LiquorFetcher from 'components/liquor-detail/liquor-fetcher';

export default function LiquorDetailPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <main>
      <Suspense fallback={<>Loading</>}>
        <LiquorFetcher id={parseInt(id)} />
      </Suspense>
    </main>
  );
}
