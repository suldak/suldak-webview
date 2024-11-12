import RecipeIcon from "assets/icons/ico-liquor-recipe.svg";
import DetailMaterial from "./DetailMaterial";
import { LiquorMaterial as LiquorMaterialType } from "models/liquor";

interface DetailRecipeProps {
  recipe: string[];
  material: LiquorMaterialType[];
}

/** 술 레시피 컴포넌트 */
function DetailRecipe({ recipe, material }: DetailRecipeProps) {
  if (!recipe || recipe.length === 0) {
    return null;
  }

  return (
    <section className="px-5 pb-50px pt-50px">
      <div className="flex items-center gap-1.5 pb-50px">
        <RecipeIcon />
        <span className="text-lg font-bold text-suldak-gray-900">
          직접 만들어볼까요?
        </span>
      </div>
      {material && <DetailMaterial material={material} />}
      <div className="flex items-center gap-2">
        <span className="text-lg font-bold text-suldak-gray-900">레시피</span>
        <span className="text-suldak-red-500 text-sm">*1oz는 약 30ml에요</span>
      </div>
      <div className="mt-5 flex flex-col">
        {recipe.map((rec, index) => (
          <div className="flex items-start gap-4 w-full h-auto" key={index}>
            <div className="relative flex-shrink-0 flex flex-col items-center">
              <div className="rounded-full w-8 h-8 bg-suldak-gray-300 text-suldak-gray-600 flex items-center justify-center">
                {index + 1}
              </div>
              {index < recipe.length -1 && (
                <div className="w-px h-12 bg-suldak-gray-300" />
              )}
            </div>
            <span className="text-gray-500 flex-grow">{rec}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default DetailRecipe;
