import { useRouter } from "next/navigation";
import HeadBackIcon from "assets/icons/ico-head-back.svg";

interface CategoryHeaderProps {
  tagValue: string;
}

// 카테고리 헤더 컴포넌트
function CategoryHeader({ tagValue }: CategoryHeaderProps) {
  const router = useRouter();

  const handleBackHome = () => {
    router.push(`/`);
  };

  return (
    <div className="relative w-full pt-1 flex items-center px-2">
      <HeadBackIcon onClick={handleBackHome} />
      <div className="relative flex w-full items-center justify-center">
        <div className="w-full py-2 text-center mr-8">{tagValue}</div>
      </div>
    </div>
  );
}

export default CategoryHeader;