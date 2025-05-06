import RecipeIcon from "assets/icons/ico-liquor-recipe.svg";
import DetailMaterial from "./DetailMaterial";
import { LiquorMaterial } from "models/liquor";

interface DetailRecipeProps {
  recipe: string[];
  material: string[];
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
      {material && material.length > 0 && (
        <DetailMaterial material={material} />
      )}
      <div className="flex items-center gap-2">
        <span className="text-lg font-bold text-suldak-gray-900">레시피</span>
        <span className="text-sm text-suldak-red-500">*1oz는 약 30ml에요</span>
      </div>
      <div className="mt-5 flex flex-col">
        {recipe.map((rec, index) => (
          <div className="flex h-auto w-full items-start gap-4" key={index}>
            <div className="relative flex flex-shrink-0 flex-col items-center">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-suldak-gray-300 text-suldak-gray-600">
                {index + 1}
              </div>
              {index < recipe.length - 1 && (
                <div className="h-12 w-px bg-suldak-gray-300" />
              )}
            </div>
            <span className="flex-grow text-gray-500">{rec}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default DetailRecipe;
