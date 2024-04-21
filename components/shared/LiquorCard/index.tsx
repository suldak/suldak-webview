import Image from 'next/image';
import { CardProps } from './types';

const BASE_URL = 'http://122.45.203.134:8080';

/** 카드 컴포넌트 */
const LiquorCard = ({
  imgUrl,
  liquorId,
  liquorDetail,
  liquorAbv,
  name,
}: CardProps) => {
  return (
    <div className="w-full rounded-2xl flex items-center gap-3.5 h-card text-black bg-white shadow-suldak-card p-[18px] cursor-pointer">
      <div className="rounded-full min-w-card-image h-card-image bg-orange-500">
        <Image
          className="rounded-full w-card-image h-card-image bg-orange-500"
          src={`${BASE_URL + imgUrl}`}
          alt="술 이미지"
          width={100}
          height={100}
        />
      </div>

      {/* 텍스트 영역 */}
      <div className="flex flex-col gap-1.5">
        <div className="flex flex-col gap-0.5">
          <p className="text-suldak-orange-500 text-xs font-medium">
            ALC 10~15%
          </p>
          <p className="text-suldak-gray-900 text-base font-semibold">
            {name || 'Name None'}
          </p>
          <p className="text-suldak-gray-600 text-sm font-medium leading-4">
            {liquorDetail || 'Detail None'}
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

export default LiquorCard;
