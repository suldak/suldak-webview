import Image from "next/image";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

interface DetailImageProps {
  name?: string;
  imgUrl?: string;
}

/** 술 상세 이미지 컴포넌트 */
function DetailImage({ name = "술", imgUrl }: DetailImageProps) {
  return (
    <section>
      <div className="flex justify-center items-center">
        {/* 이미지 크기는 추후 수정이 필요할 수 있을 것 같습니다. */}
        <Image 
          className="w-full h-auto max-w-[500px] max-h-[400px] object-cover"
          src={
            imgUrl
              ? `${BASE_URL + imgUrl}`
              : "https://via.placeholder.com/300"
          }
          alt={`${name} 사진`}
          width={500}
          height={500}
        />
      </div>
    </section>
  );
}

export default DetailImage;
