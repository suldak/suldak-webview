import { useState } from "react";
import CartIcon from "assets/icons/ico-shopping-cart.svg";
import Tag from "components/shared/Tag";
import { useGetLiquorSeller } from "apis/tag/useGetLiquorSeller";

interface LiquorSellerSectionProps {
  selected: number[];
  setSelected: React.Dispatch<React.SetStateAction<number[]>>;
}

function LiquorSellerSection({
  selected,
  setSelected,
}: LiquorSellerSectionProps) {
  const { data: liquors } = useGetLiquorSeller();
  const isValidLiquors = Array.isArray(liquors) && liquors.length > 0;

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
    <section className="my-[40px]">
      <div className="mb-[16px] inline-flex items-center gap-x-[6px] text-[16px] font-bold text-suldak-gray-900">
        <CartIcon />
        구매 가능 장소
      </div>
      <div className="flex flex-wrap gap-x-[8px]">
        {isValidLiquors &&
          liquors.map((liquor) => (
            <Tag
              key={liquor.id}
              tagId={liquor.id}
              tagColor={selected.includes(liquor.id) ? "blue" : "gray"}
              selected={selected.includes(liquor.id) ? true : false}
              onClick={() => handleTagClick(liquor.id)}
            >
              {liquor.name}
            </Tag>
          ))}
      </div>
    </section>
  );
}

export default LiquorSellerSection;
