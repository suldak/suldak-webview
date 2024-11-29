function SearchRankingSkeleton() {
  return (
    <section className="px-5">
      <div className="flex items-center justify-start gap-2 pb-2 pt-10">
        <div className="flex items-center gap-1">
          <div className="h-5 w-5 animate-pulse rounded-full bg-gray-200" />
          <span className="text-base font-bold">검색 키워드 랭킹</span>
        </div>
        <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
      </div>
      <div className="flex items-center gap-14">
        <div className="flex flex-col">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="my-1 flex items-center gap-3">
              <div className="flex w-2.5 items-center justify-center text-sm font-bold text-suldak-gray-700">
                {index + 1}
              </div>
              <div className="h-5 w-24 animate-pulse rounded bg-gray-200" />
            </div>
          ))}
        </div>
        <div className="flex flex-col">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="my-1 flex items-center gap-3">
              <div className="flex w-2.5 items-center justify-center text-sm font-bold text-suldak-gray-700">
                {index + 6}
              </div>
              <div className="h-5 w-24 animate-pulse rounded bg-gray-200" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SearchRankingSkeleton;
