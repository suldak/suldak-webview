import Image from "next/image";
import { CardProps } from "./types";
import LiquorTag from "./LiquorTag";
import { useRouter } from "next/navigation";
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
      className="flex h-card w-full cursor-pointer items-center gap-3.5 rounded-2xl bg-white py-[18px] pl-[18px] text-black shadow-suldak-card"
      onClick={handleClick}
    >
      <div className="h-card-image min-w-card-image rounded-full bg-orange-500">
        <Image
          className="h-card-image w-card-image rounded-full bg-orange-500"
          src={`${BASE_URL + imgUrl}`}
          alt="술 이미지"
          width={100}
          height={100}
        />
      </div>

      {/* 텍스트 영역 */}
      <div className="flex flex-col gap-1.5">
        <div className="flex flex-col gap-0.5">
          <p className="text-xs font-medium text-suldak-orange-500">
            ALC {liquorAbv}%
          </p>
          <p className="text-base font-semibold text-suldak-gray-900">
            {name || "Name None"}
          </p>
          <p className="text-sm font-medium leading-4 text-suldak-gray-600">
            {liquorDetail || "Detail None"}
          </p>
        </div>
        <div className="flex flex-row flex-wrap gap-1.5">
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
