function RankingKeywordSkeleton() {
  return (
    <div className="flex items-center gap-14">
      <div className="flex flex-col">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="my-1 flex items-center gap-3">
            <div className="flex w-2.5 items-center justify-center text-sm font-bold text-suldak-gray-700">
              {index + 1}
            </div>
            <div className="h-[18px] w-[118px] animate-pulse rounded-lg bg-suldak-gray-300" />
          </div>
        ))}
      </div>
      <div className="flex flex-col">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="my-1 flex items-center gap-3">
            <div className="flex w-2.5 items-center justify-center text-sm font-bold text-suldak-gray-700">
              {index + 6}
            </div>
            <div className="h-[18px] w-[118px] animate-pulse rounded-lg bg-suldak-gray-300" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default RankingKeywordSkeleton;
