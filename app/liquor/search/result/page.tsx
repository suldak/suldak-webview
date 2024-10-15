"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Liquor } from "models/liquor";
import { useLiquorSearch } from "apis/liquor/useLiquorSearch";
import { useGetRecommendKeyword } from "apis/keyword/useGetRecommendKeyword";
import SearchInput from "components/liquor/search/SearchInput";
import SortDropDown from "components/liquor/search/SortDropDown";
import LiquorCard from "components/shared/LiquorCard";
import FilterButton from "components/liquor/search/FilterButton";
import { Suspense } from "react";
import NoResultSection from "components/liquor/search/section/NoResultSection";

// RecommendKeyword 인터페이스 정의
interface RecommendKeyword {
  id: number;
  isActive: boolean;
  text: string;
}

// SearchParamsHandler 컴포넌트
function SearchParamsHandler({
  children,
}: {
  children: (params: URLSearchParams) => React.ReactNode;
}) {
  const searchParams = useSearchParams();
  return <>{children(new URLSearchParams(searchParams.toString()))}</>;
}

// LiquorSearchContent 컴포넌트
function LiquorSearchContent({
  searchParams,
}: {
  searchParams: URLSearchParams;
}) {
  const router = useRouter();
  const { data, isLoading, error } = useLiquorSearch(
    {
      tag: searchParams.get("q") || undefined,
      isRecommend: searchParams.get("isRecommend") || "인기순",
      liquorNamePriKeys: searchParams.get("class") || "",
      tastePriKeys: searchParams.get("taste") || "",
      liquorAbvPriKeys: searchParams.get("abv") || "",
      sellPriKeys: searchParams.get("seller") || "",
      liquorDetailPriKeys: searchParams.get("subKey") || "",
    },
    searchParams.toString(),
  );

  const { data: recommendKeywords } = useGetRecommendKeyword();

  const liquors: Liquor[] = data?.data.content || [];
  const keywords: RecommendKeyword[] = recommendKeywords || [];

  const handleKeywordClick = (keyword: string) => {
    router.push(`/liquor/search/result?q=${encodeURIComponent(keyword)}`);
  };

  if (!liquors.length) {
    return (
      <main className="flex min-h-screen flex-col">
        <SearchInput />
        <div className="flex flex-grow items-center justify-center">
          <NoResultSection />
        </div>
      </main>
    );
  }

  return (
    <main>
      <SearchInput />
      {/* 추천 목록 */}
      <section className="border-b border-suldak-gray-200">
        <div className="flex items-center gap-2 px-5 py-3.5">
          <span className="text-sm font-semibold text-suldak-gray-900">
            추천
          </span>
          <div className="text-suldak-gray-500">|</div>
          <div className="flex items-center gap-4 text-sm font-semibold text-suldak-mint-500">
            {keywords.slice(0, 3).map((keyword: RecommendKeyword) => (
              <span
                key={keyword.id}
                onClick={() => handleKeywordClick(keyword.text)}
                className="cursor-pointer hover:underline"
              >
                {keyword.text}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 술 검색 목록 */}
      <section className="px-5">
        <div className="flex items-center justify-between pt-3.5">
          <span className="text-xs font-medium text-suldak-gray-600">
            총 {liquors.length ?? 0}종
          </span>
          <div className="flex items-center gap-3 text-sm font-medium leading-5 text-suldak-gray-600">
            <SortDropDown />
            <FilterButton />
          </div>
        </div>
      </section>

      <section
        className="flex flex-col gap-2.5 overflow-y-auto px-5 py-3.5"
        style={{ maxHeight: `calc(100dvh - 100px)` }}
      >
        {liquors.map((liquor: Liquor) => (
          <LiquorCard
            key={liquor.id}
            imgUrl={liquor.liquorPictureUrl || "/default-image-url.jpg"}
            liquorId={liquor.id}
            liquorDetail={liquor.detailExplanation}
            liquorAbv={liquor.detailAbv}
            name={liquor.name}
            liquorSellDtos={liquor.liquorSellDtos}
            liquorSnackRes={liquor.liquorSnackRes}
            tasteTypeDtos={liquor.tasteTypeDtos}
          />
        ))}
      </section>
    </main>
  );
}

function LiquorSearchResultPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchParamsHandler>
        {(searchParams) => <LiquorSearchContent searchParams={searchParams} />}
      </SearchParamsHandler>
    </Suspense>
  );
}

export default LiquorSearchResultPage;
