import Tag from "components/shared/Tag";
import { useGetLiquorName } from "apis/tag/useGetLiquorName";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

interface LiquorClassSectionProps {
  selected: string[];
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
}

function CategoryClassSection({
  selected,
  setSelected,
}: LiquorClassSectionProps) {
  const { data: liquors } = useGetLiquorName();
  const searchParams = useSearchParams();
  const router = useRouter();
  const sectionRef = useRef<HTMLElement>(null);
  const selectedTagRef = useRef<HTMLDivElement>(null);

  const isValidLiquors = Array.isArray(liquors) && liquors.length > 0;
  const queryClass = searchParams.get("q");

  // q 값이 없으면 q=전체로 리다이렉트
  useEffect(() => {
    if (!queryClass) {
      router.push(`/liquor/category/result?q=전체`);
    }
  }, [queryClass, router]);

  // selected 상태 업데이트
  useEffect(() => {
    if (queryClass) {
      setSelected([queryClass]);
    } else {
      setSelected([]);
    }
  }, [queryClass, setSelected]);

  // 선택된 태그로 스크롤
  useEffect(() => {
    const scrollToSelectedTag = () => {
      if (selectedTagRef.current && sectionRef.current) {
        const container = sectionRef.current;
        const selectedElement = selectedTagRef.current;

        // 선택된 요소의 위치 계산
        const containerRect = container.getBoundingClientRect();
        const selectedRect = selectedElement.getBoundingClientRect();

        // 컨테이너의 중앙으로 스크롤
        const scrollTo =
          selectedRect.left +
          container.scrollLeft -
          containerRect.left -
          containerRect.width / 2 +
          selectedRect.width / 2;

        container.scrollTo({
          left: scrollTo,
          behavior: "smooth",
        });
      }
    };

    // DOM이 업데이트된 후 스크롤하기 위해 약간의 지연 추가
    const timeoutId = setTimeout(scrollToSelectedTag, 100);
    return () => clearTimeout(timeoutId);
  }, [queryClass, selected, liquors]); // liquors도 디펜던시에 추가

  // 태그 클릭 핸들러
  const handleTagClick = (name: string) => {
    setSelected((prev) => (prev.includes(name) ? [] : [name]));
    router.push(`/liquor/category/result?q=${name}`);
  };

  return (
    <section
      ref={sectionRef}
      className="flex max-w-full gap-2 overflow-x-scroll scrollbar-hide"
    >
      <div ref={queryClass === "전체" ? selectedTagRef : null}>
        <Tag
          tagId={99}
          tagColor={
            queryClass === "전체" || selected.includes("전체") ? "mint" : "gray"
          }
          selected={queryClass === "전체" || selected.includes("전체")}
          onClick={() => handleTagClick("전체")}
        >
          전체
        </Tag>
      </div>
      {isValidLiquors &&
        liquors.map((liquor) => (
          <div
            key={liquor.id}
            ref={queryClass === liquor.name ? selectedTagRef : null}
          >
            <Tag
              tagId={liquor.id}
              tagColor={
                queryClass === liquor.name || selected.includes(liquor.name)
                  ? "mint"
                  : "gray"
              }
              selected={
                queryClass === liquor.name || selected.includes(liquor.name)
              }
              onClick={() => handleTagClick(liquor.name)}
            >
              {liquor.name}
            </Tag>
          </div>
        ))}
    </section>
  );
}

export default CategoryClassSection;
