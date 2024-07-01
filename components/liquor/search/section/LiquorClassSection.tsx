import { useState } from 'react';
import CockTailIcon from 'assets/icons/ico-cocktail-glass.svg';
import Tag from 'components/shared/Tag';
import { useGetLiquorName } from 'apis/tag/useGetLiquorName';

interface LiquorClassSectionProps {
  selected: number[];
  setSelected: React.Dispatch<React.SetStateAction<number[]>>;
}

function LiquorClassSection({
  selected,
  setSelected,
}: LiquorClassSectionProps) {
  const { data: liquors } = useGetLiquorName();

  // 선택된 liquor의 인덱스를 저장하는 상태
  const [selectedLiquors, setSelectedLiquors] = useState<number[]>([]);
  const isValidLiquors = Array.isArray(liquors) && liquors.length > 0;
  // 태그 클릭 핸들러
  const handleTagClick = (index: number) => {
    setSelected((prev) => {
      if (prev.includes(index)) {
        return prev.filter((i) => i !== index);
      } else {
        return [...prev, index];
      }
    });
  };

  return (
    <section>
      <div className="inline-flex text-[16px] mb-[16px] gap-x-[6px]  text-suldak-gray-900 font-bold">
        <CockTailIcon />
        주종
      </div>
      <div className="flex flex-wrap gap-x-[8px]">
        {isValidLiquors &&
          liquors.map((liquor) => (
            <Tag
              key={liquor.id}
              tagId={liquor.id}
              tagType={selected.includes(liquor.id) ? 'selected' : 'gray'}
              onClick={() => handleTagClick(liquor.id)}
            >
              {liquor.name}
            </Tag>
          ))}
      </div>
    </section>
  );
}

export default LiquorClassSection;
