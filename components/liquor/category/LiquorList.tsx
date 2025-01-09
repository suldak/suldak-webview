import LiquorCard from "components/shared/LiquorCard";
import { Liquor } from "models/liquor";
function LiquorList({ liquors }: { liquors: Liquor[] }) {
  return (
    <section className="gap-y-2. flex h-full w-full flex-col items-center justify-center">
      {liquors.map((liquor: Liquor) => (
        <LiquorCard
          key={liquor.id}
          imgUrl={liquor.liquorPictureUrl}
          liquorId={liquor.id}
          liquorDetail={liquor.summaryExplanation}
          liquorAbv={liquor.detailAbv}
          name={liquor.name}
          liquorSellDtos={liquor.liquorSellDtos}
          liquorSnackRes={liquor.liquorSnackRes}
          tasteTypeDtos={liquor.tasteTypeDtos}
        />
      ))}
    </section>
  );
}

export default LiquorList;
