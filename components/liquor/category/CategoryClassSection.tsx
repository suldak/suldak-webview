import Tag from "components/shared/Tag";
import { useGetLiquorName } from "apis/tag/useGetLiquorName";
import { useSearchParams, useRouter } from "next/navigation";

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

  const isValidLiquors = Array.isArray(liquors) && liquors.length > 0;
  const queryClass = searchParams.get("q");

  // 태그 클릭 핸들러
  const handleTagClick = (name: string) => {
    setSelected((prev) => (prev.includes(name) ? [] : [name]));

    router.push(`/liquor/category/result?q=${name}`);
  };

  return (
    <section className="flex max-w-full gap-2 overflow-x-scroll scrollbar-hide">
      {isValidLiquors &&
        liquors.map((liquor) => (
          <Tag
            key={liquor.id}
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
        ))}
    </section>
  );
}

export default CategoryClassSection;
