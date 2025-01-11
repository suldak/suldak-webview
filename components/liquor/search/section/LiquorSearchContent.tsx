"use client";
import { RecommendKeyword } from "apis/keyword/types";
import { useGetRecommendKeyword } from "apis/keyword/useGetRecommendKeyword";
import { useLiquorSearch } from "apis/liquor/useLiquorSearch";
import LiquorList from "components/liquor/category/LiquorList";
import LoadingCard from "components/shared/LiquorCard/LoadingCard";
import { Liquor } from "models/liquor";
import { useState } from "react";
import { useRouter } from "next/navigation";
import FilterButton from "components/liquor/search/FilterButton";
import SearchInput from "components/liquor/search/SearchInput";
import SortDropDown from "components/liquor/search/SortDropDown";
import NoResultSection from "components/liquor/search/section/NoResultSection";
import RecommendSection from "components/liquor/search/section/RecommendSection";
import HeadBackIcon from "assets/icons/ico-head-back.svg";
import SearchInfoSection from "components/liquor/search/section/SearchInfoSection";

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
      recordSize: 100, // 최대 100개 까지의 목록을 가져옵니다.
      liquorDetailPriKeys: searchParams.get("subKey") || "",
    },
    searchParams.toString(),
  );

  const { data: recommendKeywords } = useGetRecommendKeyword();

  const liquors: Liquor[] = data?.data.content || [];
  const keywords: RecommendKeyword[] = recommendKeywords || [];
  const liquorSubKey = searchParams.get("subKey");
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const handleKeywordClick = (keyword: string) => {
    router.push(`/liquor/search/result?q=${encodeURIComponent(keyword)}`);
  };

  if (error) {
    return (
      <main className="flex min-h-screen flex-col">
        <SearchInput />
        <div className="flex flex-grow items-center justify-center">
          <p>오류가 발생했습니다. 다시 시도해주세요.</p>
        </div>
      </main>
    );
  }
  const handleBackHome = () => {
    router.push(`/`);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStartX) return;

    const touchEndX = e.touches[0].clientX;
    const diffX = touchEndX - touchStartX;

    if (diffX > 100) {
      // 스와이프 거리가 100px 이상일 때만 동작
      handleBackHome();
      setTouchStartX(null); // 스와이프 처리 후 초기화
    }
  };

  const handleTouchEnd = () => {
    setTouchStartX(null); // 터치 종료 시 초기화
  };

  return (
    <main
      className="flex min-h-screen flex-col pb-[10px]"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {!liquorSubKey && (
        <div className="flex items-center justify-center gap-x-[8px] pl-[12px] pr-[20px] pt-[2px]">
          <HeadBackIcon onClick={handleBackHome} />
          <SearchInput />
        </div>
      )}
      {!liquorSubKey && (
        <RecommendSection keywords={keywords} onClick={handleKeywordClick} />
      )}
      {!liquorSubKey && (
        <SearchInfoSection count={isLoading ? 0 : liquors.length}>
          <SortDropDown />
          <FilterButton />
        </SearchInfoSection>
      )}
      {liquorSubKey && (
        <SearchInfoSection count={isLoading ? 0 : liquors.length}>
          <div />
        </SearchInfoSection>
      )}
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

export default LiquorSearchContent;
