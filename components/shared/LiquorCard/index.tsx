import Image from "next/image";
import { CardProps } from "./types";
import LiquorTag from "./LiquorTag";
import { useRouter } from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

/** 카드 컴포넌트 */
function LiquorCard({
  imgUrl,
  liquorId,
  liquorDetail,
  liquorAbv,
  name,
  liquorSellDtos,
  liquorSnackRes,
  tasteTypeDtos,
}: CardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/liquor/detail/${liquorId}`);
  };

  // 모든 태그를 하나의 배열로 결합
  const allTags = [...liquorSellDtos, ...tasteTypeDtos, ...liquorSnackRes]
    .filter((item) => item?.name)
    .slice(0, 4); // 최대 4개로 제한

  return (
    <div
      className="flex h-card w-full cursor-pointer items-center rounded-2xl bg-white p-[18px] text-black shadow-suldak-card"
      onClick={handleClick}
    >
      <div className="mr-[14px] h-card-image min-w-card-image rounded-full bg-orange-500">
        <Image
          className="h-card-image w-card-image rounded-full bg-orange-500"
          src={`${BASE_URL + imgUrl}`}
          alt="술 이미지"
          width={100}
          height={100}
        />
      </div>

      {/* 텍스트 영역 */}
      <div className="flex flex-col">
        <div className="flex flex-col">
          <p className="text-[12px] font-medium text-suldak-orange-500">
            ALC {liquorAbv}%
          </p>
          <p className="text-[16px] font-semibold text-suldak-gray-900">
            {name || "Name None"}
          </p>
          <p className="flex max-h-[38px] overflow-hidden text-[14px] text-suldak-gray-600">
            {liquorDetail || "주류 정보 추가 예정입니다."}
          </p>
        </div>
        <div className="mt-[2px] flex w-[193px] gap-x-[6px] overflow-hidden">
          {allTags.map((tag, index) => (
            <LiquorTag key={index} name={tag.name} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default LiquorCard;
