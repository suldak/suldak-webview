import { LiquorMaterial as LiquorMaterialType } from "models/liquor";

interface DetailSnackProps {
  material: LiquorMaterialType[];
}

/** 술 재료 컴포넌트 */
function DetailMaterial({ material }: DetailSnackProps) {
  if (!material || material.length === 0) {
    return null;
  }

  return (
    <section className="pb-50px">
      <div className="flex items-center gap-1.5">
        <span className="text-lg font-bold text-suldak-gray-900">
          필요 재료
        </span>
      </div>
      <div className="mt-5 flex flex-wrap gap-3"> 
        {material.map((mat, index) => (
          <span key={index} className="inline-flex items-center justify-center border border-suldak-gray-500 rounded-30px px-4 py-2.5 text-suldak-gray-900">
            {mat.name}
          </span>
        ))}
      </div>
    </section>
  );
}

export default DetailMaterial;
