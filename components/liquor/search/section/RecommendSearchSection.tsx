'use client';
import { Suspense } from 'react';
import RecommendKeyword from '../RecommendKeyword';

function RecommendedSearchSection() {
  return (
    <section className="px-5">
      <p className="text-base font-bold pt-10 pb-2">추천 검색어</p>
      <div className="flex flex-wrap gap-2 py-2">
        <Suspense fallback={<>로딩중...</>}>
          <RecommendKeyword />
        </Suspense>
      </div>
    </section>
  );
}

export default RecommendedSearchSection;
