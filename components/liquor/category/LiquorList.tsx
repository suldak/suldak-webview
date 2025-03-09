import LiquorCard from "components/shared/LiquorCard";
import { Liquor } from "models/liquor";

function LiquorList({ liquors }: { liquors: Liquor[] }) {
  return (
    <section className="flex h-full w-full flex-col items-center justify-center">
      {liquors.map((liquor: Liquor) => (
        <div key={liquor.id} className="mt-[10px]">
          <LiquorCard
            imgUrl={liquor.liquorPictureUrl}
            liquorId={liquor.id}
            liquorDetail={liquor.summaryExplanation}
            liquorAbv={liquor.detailAbv}
            name={liquor.name}
            liquorSellDtos={liquor.liquorSellDtos}
            liquorSnackRes={liquor.liquorSnackRes}
            tasteTypeDtos={liquor.tasteTypeDtos}
          />
        </div>
      ))}
    </section>
  );
}

export default LiquorList;
