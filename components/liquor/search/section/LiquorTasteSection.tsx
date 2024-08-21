import TasteIcon from 'assets/icons/ico-taste-good-emoji.svg';
import Tag from 'components/shared/Tag';
import { useGetLiquorTaste } from 'apis/tag/useGetLiquorTaste';

interface LiquorTasteSectionProps {
  selected: number[];
  setSelected: React.Dispatch<React.SetStateAction<number[]>>;
}
function LiquorTasteSection({
  selected,
  setSelected,
}: LiquorTasteSectionProps) {
  const { data: liquors } = useGetLiquorTaste();
  const isValidLiquors = Array.isArray(liquors) && liquors.length > 0;
  // 태그 클릭 핸들러
  const handleTagClick = (index: number) => {
    setSelected((prev) => {
      if (prev.includes(index)) {
        // 이미 선택된 경우, 선택 해제
        return prev.filter((i) => i !== index);
      } else {
        // 선택되지 않은 경우, 선택
        return [...prev, index];
      }
    });
  };

  return (
    <section className="mt-[40px]">
      <div className="inline-flex text-[16px] gap-x-[6px]  mb-[16px] text-suldak-gray-900 font-bold">
        <TasteIcon />맛
      </div>
      <div className="flex flex-wrap gap-2">
        {isValidLiquors &&
          liquors.map((liquor) => (
            <Tag
              key={liquor.id}
              tagId={liquor.id}
              tagColor={selected.includes(liquor.id) ? 'blue' : 'gray'}
              selected={selected.includes(liquor.id)}
              onClick={() => handleTagClick(liquor.id)}
            >
              {liquor.name}
            </Tag>
          ))}
      </div>
    </section>
  );
}

export default LiquorTasteSection;
