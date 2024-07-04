import { useState } from 'react';
import BeerIcon from 'assets/icons/ico-beer-mug.svg';
import Tag from 'components/shared/Tag';
import { useGetLiquorABV } from 'apis/tag/useGetLiquorABV';
interface LiquorABVSectionProps {
  selected: number[];
  setSelected: React.Dispatch<React.SetStateAction<number[]>>;
}
function LiquorABVSection({ selected, setSelected }: LiquorABVSectionProps) {
  const { data: liquors } = useGetLiquorABV();
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
    <section className="mt-[40px]">
      <div className="inline-flex text-[16px] gap-x-[6px] mb-[16px] text-suldak-gray-900 font-bold">
        <BeerIcon /> 알코올 도수
      </div>
      <div className="flex flex-wrap gap-x-[8px]">
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

export default LiquorABVSection;
