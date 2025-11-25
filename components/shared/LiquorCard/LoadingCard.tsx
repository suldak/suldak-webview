import Image from "next/image";
import DefaultImg from "assets/pngs/image-default-alchol.png";

/** 카드 컴포넌트 */
function LoadingCard({ priority = false }: { priority?: boolean }) {
  return (
    <div className="flex h-[140px] w-[335px] cursor-pointer items-center rounded-[16px] bg-white p-[18px] text-black shadow-suldak-card">
      {/* 이미지 영역 - 기본 주류 이미지 */}
      <div className="h-20 w-20 flex-shrink-0 mobile:mr-4 mobile:h-24 mobile:w-24">
        <Image
          className="h-full w-full rounded-full object-cover"
          src={DefaultImg}
          alt="주류 이미지 로딩 중"
          width={96}
          height={96}
          priority={priority}
        />
      </div>

      {/* 텍스트 영역 */}
      <div className="flex min-w-0 flex-grow flex-col">
        <div className="flex flex-col">
          {/* ALC 도수 영역 */}
          <div className="h-[14px] w-[60px] rounded bg-gray-200"></div>
          {/* 주류 이름 영역 */}
          <div className="mt-[2px] h-[19px] w-[140px] rounded bg-gray-200"></div>
          {/* 주류 설명 영역 */}
          <div className="mt-[2px] h-[16px] w-[180px] rounded bg-gray-200"></div>
        </div>
        {/* 태그 영역 */}
        <div className="mt-2 flex gap-1">
          <div className="h-[20px] w-[45px] rounded bg-gray-200"></div>
          <div className="h-[20px] w-[35px] rounded bg-gray-200"></div>
          <div className="h-[20px] w-[40px] rounded bg-gray-200"></div>
        </div>
      </div>
    </div>
  );
}

export default LoadingCard;
