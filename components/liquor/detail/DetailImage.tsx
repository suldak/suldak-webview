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

  // imgUrl이 falsy(undefined, null, empty string)인 경우 defaultImgSrc 사용
  const imageSource =
    imgUrl && imgUrl.trim() ? `${BASE_URL}${imgUrl}` : defaultImgSrc;

  return (
    <section className="flex">
      <Image
        className=""
        src={imageSource}
        alt={`${name} 사진`}
        height={400}
        width={500}
      />
    </section>
  );
}

export default DetailImage;
