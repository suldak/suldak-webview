/** 카드 컴포넌트 */
function LoadingCard() {
  return (
    <div className="flex h-card w-full cursor-pointer items-center rounded-2xl bg-white p-[18px] text-black shadow-suldak-card">
      <div className="mr-[14px] h-card-image min-w-card-image rounded-full bg-orange-500"></div>

      {/* 텍스트 영역 */}
      <div className="flex flex-col">
        <div className="flex flex-col">
          <p className="text-[12px] font-medium text-suldak-orange-500"></p>
          <p className="text-[16px] font-semibold text-suldak-gray-900"></p>
          <p className="flex max-h-[38px] overflow-hidden text-[14px] text-suldak-gray-600"></p>
        </div>
        <div className="mt-[2px] flex w-[193px] gap-x-[6px] overflow-hidden"></div>
      </div>
    </div>
  );
}

export default LoadingCard;
