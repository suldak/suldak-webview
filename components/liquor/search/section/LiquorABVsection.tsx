import { useState } from 'react';
import BeerIcon from 'assets/icons/ico-beer-mug.svg';
import Tag from 'components/shared/Tag';
import { useGetLiquorABV } from 'apis/tag/useGetLiquorABV';
function LiquorABVSection() {
  const liquors = useGetLiquorABV().data;

  // 선택된 liquor의 인덱스를 저장하는 상태
  const [selectedLiquors, setSelectedLiquors] = useState<number[]>([]);
  const isValidLiquors = Array.isArray(liquors) && liquors.length > 0;
  // 태그 클릭 핸들러
  const handleTagClick = (index: number) => {
    setSelectedLiquors((prev) => {
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
      <div className="inline-flex text-[16px] gap-x-[6px] mb-[16px] text-suldak-gray-900 font-bold">
        <BeerIcon /> 알코올 도수
      </div>
      <div className="flex flex-wrap gap-2">
        {isValidLiquors &&
          liquors.map((liquor) => (
            <Tag
              key={liquor.id}
              tagId={liquor.id}
              tagType={selectedLiquors.includes(liquor.id) ? 'blue' : 'gray'}
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
