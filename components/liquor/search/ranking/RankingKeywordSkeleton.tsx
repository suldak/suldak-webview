function RankingKeywordSkeleton() {
  return (
    <div className="flex items-center gap-14">
      <div className="flex flex-col">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="flex items-center gap-3 my-1">
            <div className="flex items-center justify-center text-suldak-gray-700 font-bold text-sm w-2.5">
              {index + 1}
            </div>
            <div className="w-[118px] h-[18px] bg-suldak-gray-300 rounded-lg animate-pulse" />
          </div>
        ))}
      </div>
      <div className="flex flex-col">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="flex items-center gap-3 my-1">
            <div className="flex items-center justify-center text-suldak-gray-700 font-bold text-sm w-2.5">
              {index + 6}
            </div>
            <div className="w-[118px] h-[18px] bg-suldak-gray-300 rounded-lg animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default RankingKeywordSkeleton;
