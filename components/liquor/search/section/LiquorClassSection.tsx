import { useState } from 'react';
import CockTailIcon from 'assets/icons/ico-cocktail-glass.svg';
import Tag from 'components/shared/Tag';
import { useGetLiquorName } from 'apis/tag/useGetLiquorName';
function LiquorClassSection() {
  const liquors = useGetLiquorName().data;

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
    <section>
      <div className="inline-flex text-[16px] mb-[16px] text-suldak-gray-900 font-bold">
        <CockTailIcon />
        주종
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

export default LiquorClassSection;
