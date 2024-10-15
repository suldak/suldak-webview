"use client";
import { Suspense } from "react";
import RecommendKeyword from "../RecommendKeyword";
import SkeletonTag from "components/shared/Tag/SkeletonTag";

function RecommendedSearchSection() {
  return (
    <section className="px-5">
      <p className="pb-2 pt-10 text-base font-bold">추천 검색어</p>
      <div className="flex flex-wrap gap-2 py-2">
        <Suspense fallback={<SkeletonLoading />}>
          <RecommendKeyword />
        </Suspense>
      </div>
    </section>
  );
}
function SkeletonLoading() {
  return (
    <>
      {[...Array(6)].map((_, index) => (
        <SkeletonTag key={index} />
      ))}
    </>
  );
}
export default RecommendedSearchSection;
