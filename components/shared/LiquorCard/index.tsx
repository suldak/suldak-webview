import Image from 'next/image';
import { CardProps } from './types';
import LiquorTag from './LiquorTag';
import { useRouter } from 'next/navigation';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

/** 카드 컴포넌트 */
const LiquorCard = ({
  imgUrl,
  liquorId,
  liquorDetail,
  liquorAbv,
  name,
  liquorSellDtos,
  liquorSnackRes,
  tasteTypeDtos,
}: CardProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/liquor/detail/${liquorId}`);
  };

  return (
    <div
      className="w-full rounded-2xl flex items-center gap-3.5 h-card text-black bg-white shadow-suldak-card pl-[18px] py-[18px] cursor-pointer"
      onClick={handleClick}
    >
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
            ALC {liquorAbv}%
          </p>
          <p className="text-suldak-gray-900 text-base font-semibold">
            {name || 'Name None'}
          </p>
          <p className="text-suldak-gray-600 text-sm font-medium leading-4">
            {liquorDetail || 'Detail None'}
          </p>
        </div>
        <div className="flex flex-wrap flex-row gap-1.5">
          {liquorSellDtos.map(
            (liquorSell, index) =>
              liquorSell?.name && (
                <LiquorTag key={index} name={liquorSell.name} />
              ),
          )}
          {tasteTypeDtos.map(
            (taste, index) =>
              taste.name && <LiquorTag key={index} name={taste.name} />,
          )}
          {liquorSnackRes.map(
            (liquorSnack, index) =>
              liquorSnack?.name && (
                <LiquorTag key={index} name={liquorSnack.name} />
              ),
          )}
        </div>
      </div>
    </div>
  );
};
export default LiquorCard;
