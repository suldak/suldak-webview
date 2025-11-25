"use client";

/** 스켈레톤 애니메이션 클래스 */
const skeletonClass = "animate-pulse bg-suldak-gray-200";

/** 검색 페이지 스켈레톤 */
function SearchPageSkeleton() {
  return (
    <div className="min-h-screen bg-white">
      {/* 검색 입력창 영역 */}
      <div className="flex items-center justify-center gap-x-[8px] pl-[12px] pr-[20px] pt-[2px]">
        <div className={`h-10 w-10 rounded-full ${skeletonClass}`} />
        <div className={`h-[52px] flex-1 rounded-full ${skeletonClass}`} />
      </div>

      {/* 최근 검색어 섹션 */}
      <section className="px-5 pt-10">
        <div className="flex items-end justify-between pb-2">
          <div className={`h-5 w-20 rounded ${skeletonClass}`} />
          <div className={`h-4 w-14 rounded ${skeletonClass}`} />
        </div>
        <div className="flex gap-2 pt-2">
          <div className={`h-8 w-16 rounded-full ${skeletonClass}`} />
          <div className={`h-8 w-20 rounded-full ${skeletonClass}`} />
          <div className={`h-8 w-14 rounded-full ${skeletonClass}`} />
          <div className={`w-18 h-8 rounded-full ${skeletonClass}`} />
        </div>
      </section>

      {/* 추천 검색어 섹션 */}
      <section className="px-5 pt-8">
        <div className={`h-5 w-24 rounded ${skeletonClass}`} />
        <div className="flex flex-wrap gap-2 pt-4">
          <div className={`h-8 w-16 rounded-full ${skeletonClass}`} />
          <div className={`h-8 w-20 rounded-full ${skeletonClass}`} />
          <div className={`h-8 w-14 rounded-full ${skeletonClass}`} />
          <div className={`w-18 h-8 rounded-full ${skeletonClass}`} />
          <div className={`h-8 w-12 rounded-full ${skeletonClass}`} />
        </div>
      </section>

      {/* 랭킹 섹션 */}
      <section className="px-5 pt-8">
        <div className={`h-5 w-28 rounded ${skeletonClass}`} />
        <div className="space-y-3 pt-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <div className={`h-6 w-6 rounded ${skeletonClass}`} />
              <div className={`h-5 w-32 rounded ${skeletonClass}`} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default SearchPageSkeleton;
