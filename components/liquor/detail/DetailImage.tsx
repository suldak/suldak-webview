import Image from "next/image";
import DefaultImg from "assets/pngs/image-default-alchol.png";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

interface DetailImageProps {
  name?: string;
  imgUrl?: string;
}

/** 술 상세 이미지 컴포넌트 */
function DetailImage({ name = "술", imgUrl }: DetailImageProps) {
  // DefaultImg를 import한 경우, 해당 이미지의 실제 경로를 가져와야 합니다
  const defaultImgSrc = DefaultImg?.src || DefaultImg;

  // 유효한 이미지 URL인지 검증
  const isValidImageUrl = (url?: string): boolean => {
    if (!url) return false;
    if (url === "null" || url.includes("null")) return false;
    if (!url.trim()) return false;
    return true;
  };

  // 이미지 소스 결정
  const imageSource = isValidImageUrl(imgUrl)
    ? `${BASE_URL}${imgUrl}`
    : defaultImgSrc;

  console.log("[Image] 🖼 Using image source:", imageSource);

  return (
    <section className="flex">
      <Image
        className=""
        src={imageSource}
        alt={`${name} 사진`}
        height={400}
        width={500}
        priority // 이미지를 우선적으로 로드
        unoptimized={isValidImageUrl(imgUrl)} // 외부 이미지는 Next.js 최적화를 건너뜀
      />
    </section>
  );
}

export default DetailImage;
