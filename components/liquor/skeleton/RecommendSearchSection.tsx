function RecommendSearchSkeleton() {
  return (
    <section className="px-5">
      <p className="pb-2 pt-10 text-base font-bold">추천 검색어</p>
      <div className="flex flex-wrap gap-2 py-2">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className="mb-2 mr-2 inline-block animate-pulse rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-300"
          >
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </div>
        ))}
      </div>
    </section>
  );
}
export default RecommendSearchSkeleton;
