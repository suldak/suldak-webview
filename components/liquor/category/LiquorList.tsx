import LiquorCard from "components/shared/LiquorCard";
import { SearchLiquor } from "models/liquor";

function LiquorList({ liquors }: { liquors: SearchLiquor[] }) {
  return (
    <section className="flex h-full w-full flex-col items-center justify-center">
      {liquors.map((liquor: SearchLiquor, index: number) => (
        <div key={liquor.liquorId} className="mt-[10px]">
          <LiquorCard
            imgUrl={liquor.liquorPictureUrl}
            liquorId={liquor.liquorId}
            liquorDetail={liquor.summaryExplanation}
            liquorAbv={liquor.detailAbv}
            name={liquor.name}
            liquorSellDtos={[]}
            liquorSnackRes={[]}
            tasteTypeDtos={liquor.tagList}
            priority={index < 4}
          />
        </div>
      ))}
    </section>
  );
}

export default LiquorList;
