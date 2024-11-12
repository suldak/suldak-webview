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
    <div className="relative flex h-[48px] w-full items-center border-b px-2 pt-1">
      <HeadBackIcon onClick={handleBackHome} />
      <div className="border-b-1 relative flex w-full items-center justify-center">
        <div className="mr-8 w-full py-2 text-center"></div>
      </div>
    </div>
  );
}

export default CategoryHeader;
