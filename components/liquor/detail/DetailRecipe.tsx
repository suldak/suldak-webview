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
    <section className="mb-[50px] mt-[50px] px-5">
      <div className="flex items-center gap-[2px] pb-[20px]">
        <RecipeIcon />
        <span className="text-[18px] font-bold text-suldak-gray-900">
          직접 만들어볼까요?
        </span>
      </div>
      {material && material.length > 0 && (
        <DetailMaterial material={material} />
      )}
      <div className="flex items-center gap-2">
        <span className="text-[16px] font-semibold text-suldak-gray-900">
          레시피
        </span>
        <span className="text-sm text-suldak-red-500">*1oz는 약 30ml에요</span>
      </div>
      <div className="mt-[20px] flex flex-col">
        {recipe.map((rec, index) => (
          <div
            className="my-[9px] flex h-auto w-full items-start gap-x-[10px]"
            key={index}
          >
            <div className="relative flex flex-shrink-0 flex-col items-start">
              <div className="flex h-[21px] w-[21px] items-center justify-center rounded-full bg-suldak-gray-300 text-suldak-gray-600">
                {index + 1}
              </div>
              {index < recipe.length - 1 && (
                <div className="h-12 bg-suldak-gray-300" />
              )}
            </div>
            <span className="flex-grow text-base leading-normal text-gray-500">
              {rec}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default DetailRecipe;
