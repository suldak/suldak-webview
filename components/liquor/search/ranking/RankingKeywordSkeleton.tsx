function RankingKeywordSkeleton() {
  return (
    <div className="flex items-center gap-x-[40px]">
      <div className="flex flex-col gap-y-[13px]">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="flex items-center gap-x-3">
            <div className="flex w-2.5 items-center justify-center text-[14px] font-bold text-suldak-gray-700">
              {index + 1}
            </div>
            <div className="h-[17px] w-[80px] animate-pulse rounded-lg bg-suldak-gray-300" />
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-y-[13px]">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="flex items-center gap-x-3">
            <div className="flex w-2.5 items-center justify-center text-[14px] font-bold text-suldak-gray-700">
              {index + 6}
            </div>
            <div className="h-[17px] w-[80px] animate-pulse rounded-lg bg-suldak-gray-300" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default RankingKeywordSkeleton;
