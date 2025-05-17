import Tag from "components/shared/Tag";

interface DetailMaterialProps {
  material: string[];
}

/** 술 재료 */
function DetailMaterial({ material }: DetailMaterialProps) {
  return (
    <div className="pb-[50px]">
      <div className="flex items-center gap-1.5 pb-3">
        <span className="text-[16px] font-semibold text-suldak-gray-900">
          필요 재료
        </span>
      </div>
      <div className="flex flex-wrap gap-[8px]">
        {material.map((item, index) => (
          <Tag key={`${item}-${index}`} tagId={index} tagColor="gray">
            {item}
          </Tag>
        ))}
      </div>
    </div>
  );
}

export default DetailMaterial;
