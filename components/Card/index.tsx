interface CardProps {
  imgUrl?: string;
}

/** 카드 컴포넌트 */
const Card = ({}: CardProps) => {
  return (
    <div className="w-full flex items-center gap-3.5 h-card text-black bg-white shadow-suldak-card p-[18px]">
      <div className="rounded-full w-card-image h-card-image bg-orange-500"></div>

      {/* 텍스트 영역 */}
      <div className="flex flex-col gap-1.5">
        <div className="flex flex-col gap-0.5">
          <p className="text-suldak-orange-500 text-xs font-medium">
            ALC 10~15%
          </p>
          <p className="text-suldak-gray-900 text-base font-semibold">
            피나콜라다
          </p>
          <p className="text-suldak-gray-600 text-sm font-medium">
            럼 베이스의 파인애플 맛 칵테일
          </p>
        </div>
        <div className="flex flex-row gap-1.5">
          <div className="flex items-center justify-center bg-white py-1 px-1.5 rounded-sm border border-suldak-gray-300 text-suldak-gray-600 text-xs font-medium">
            칵테일
          </div>
          <div className="flex items-center justify-center bg-white py-1 px-1.5 rounded-sm border border-suldak-gray-300 text-suldak-gray-600 text-xs font-medium">
            달달한
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
