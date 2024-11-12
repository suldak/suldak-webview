"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Liquor } from "models/liquor";
import { useLiquorSearch } from "apis/liquor/useLiquorSearch";
import CategoryHeader from "components/liquor/category/CategoryHeader";
import LiquorCard from "components/shared/LiquorCard";
import NoResultSection from "components/liquor/search/section/NoResultSection";
import LoadingCard from "components/shared/LiquorCard/LoadingCard";
import CategoryFilter from "components/liquor/category/CategoryFilter";

function CategoryParamsHandler({
  children,
}: {
  children: (params: URLSearchParams) => React.ReactNode;
}) {
  const searchParams = useSearchParams();
  return <>{children(new URLSearchParams(searchParams.toString()))}</>;
}

function SearchInfoSection({ count }: { count: number }) {
  return (
    <section className="h-[44px] px-[20px]">
      <div className="flex items-center justify-between pt-3.5">
        <span className="text-xs font-medium text-suldak-gray-600">
          총 {count}종
        </span>
      </div>
    </section>
  );
}

function LiquorList({ liquors }: { liquors: Liquor[] }) {
  return (
    <section className="flex w-full flex-col items-center justify-center gap-y-2.5 overflow-y-auto">
      {liquors.map((liquor: Liquor) => (
        <LiquorCard
          key={liquor.id}
          imgUrl={liquor.liquorPictureUrl || "/default-image-url.jpg"}
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

function LiquorCategoryContent({
  searchParams,
}: {
  searchParams: URLSearchParams;
}) {
  const query = searchParams.get("q");
  const tag = !query || query === "전체" ? undefined : query;

  const { data, isLoading, error } = useLiquorSearch(
    {
      tag,
      recordSize: 100,
    },
    searchParams.toString(),
  );

  const liquors: Liquor[] = data?.data.content || [];
  const tagValue = searchParams.get("q") || "";

  if (error) {
    return (
      <main className="flex min-h-screen flex-col">
        <CategoryHeader tagValue={"404"} />
        <div className="flex flex-grow items-center justify-center">
          <p>오류가 발생했습니다. 다시 시도해주세요.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col pb-[10px]">
      <CategoryHeader tagValue={tagValue} />
      <CategoryFilter />
      <SearchInfoSection count={isLoading ? 0 : liquors.length} />
      {isLoading ? (
        <section className="flex flex-col items-center justify-center gap-2.5 overflow-y-auto px-[20px]">
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
        </section>
      ) : liquors.length === 0 ? (
        <NoResultSection />
      ) : (
        <LiquorList liquors={liquors} />
      )}
    </main>
  );
}

function LiquorCategoryResultPage() {
  return (
    <Suspense fallback>
      <CategoryParamsHandler>
        {(searchParams) => (
          <LiquorCategoryContent searchParams={searchParams} />
        )}
      </CategoryParamsHandler>
    </Suspense>
  );
}

export default LiquorCategoryResultPage;
