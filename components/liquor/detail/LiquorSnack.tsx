import Image from "next/image";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

interface LiquorSnackProps {
  imgUrl: string;
  name?: string;
}

// 술 안주 아이콘 컴포넌트
export default function LiquorSnack({ imgUrl, name }: LiquorSnackProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="h-14 w-14 rounded-full bg-suldak-gray-200">
        <Image
          className="h-full w-full rounded-full object-cover"
          src={`${BASE_URL + imgUrl}`}
          alt={`${name} 사진`}
          width={96}
          height={96}
        />
      </div>
      <span className="text-center text-xs font-medium text-suldak-gray-900">
        {name}
      </span>
    </div>
  );
}
