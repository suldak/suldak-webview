"use client";
import { RecommendKeyword } from "apis/keyword/types";
import { useGetRecommendKeyword } from "apis/keyword/useGetRecommendKeyword";
import { useLiquorSearch } from "apis/liquor/useLiquorSearch";
import LiquorList from "components/liquor/category/LiquorList";
import LoadingCard from "components/shared/LiquorCard/LoadingCard";
import { Liquor, SearchLiquor } from "models/liquor";
import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import FilterButton from "components/liquor/search/FilterButton";
import SearchInput from "components/liquor/search/SearchInput";
import SortDropDown from "components/liquor/search/SortDropDown";
import NoResultSection from "components/liquor/search/section/NoResultSection";
import RecommendSection from "components/liquor/search/section/RecommendSection";
import HeadBackIcon from "assets/icons/ico-head-back.svg";
import SearchInfoSection from "components/liquor/search/section/SearchInfoSection";

const PAGE_SIZE = 20;

function LiquorSearchContent({
  searchParams,
}: {
  searchParams: URLSearchParams;
}) {
  const router = useRouter();
  // 무한스크롤 상태
  const [pageNum, setPageNum] = useState(0);
  const [liquors, setLiquors] = useState<SearchLiquor[]>([]);
  const [hasNext, setHasNext] = useState(true);
  const [isFirstLoading, setIsFirstLoading] = useState(true);

  const { data, isLoading, error } = useLiquorSearch(
    {
      tag: searchParams.get("q") || undefined,
      isRecommend: searchParams.get("isRecommend") || "인기순",
      liquorNamePriKeys: searchParams.get("class") || "",
      tastePriKeys: searchParams.get("taste") || "",
      liquorAbvPriKeys: searchParams.get("abv") || "",
      sellPriKeys: searchParams.get("seller") || "",
      recordSize: PAGE_SIZE,
      liquorDetailPriKeys: searchParams.get("subKey") || "",
      pageNum,
    },
    searchParams.toString() + `-page-${pageNum}`,
  );

  const totalCount = data?.data.totalElements ?? liquors.length;

  useEffect(() => {
    if (data) {
      if (pageNum === 0) {
        setLiquors(data.data.content);
      } else {
        setLiquors((prev) => [...prev, ...data.data.content]);
      }
      setHasNext(!data.data.last);
      setIsFirstLoading(false);
    }
  }, [data, pageNum]);

  // 검색 조건이 바뀌면 초기화
  useEffect(() => {
    setPageNum(0);
    setLiquors([]);
    setHasNext(true);
    setIsFirstLoading(true);
  }, [searchParams.toString()]);

  // 무한스크롤 감지용 ref
  const observerRef = useRef<HTMLDivElement | null>(null);
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && hasNext && !isLoading && !isFirstLoading) {
        setPageNum((prev) => prev + 1);
      }
    },
    [hasNext, isLoading, isFirstLoading],
  );

  useEffect(() => {
    const option = { threshold: 1.0 };
    const observer = new window.IntersectionObserver(handleObserver, option);
    if (observerRef.current) observer.observe(observerRef.current);
    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [handleObserver]);

  const { data: recommendKeywords } = useGetRecommendKeyword();
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
        <SearchInfoSection count={totalCount}>
          <SortDropDown />
          <FilterButton />
        </SearchInfoSection>
      )}
      {liquorSubKey && (
        <SearchInfoSection count={liquors.length}>
          <div />
        </SearchInfoSection>
      )}
      {isFirstLoading ? (
        <section className="flex flex-col items-center justify-center gap-2.5 overflow-y-auto px-[20px]">
          <LoadingCard />
        </section>
      ) : liquors.length === 0 ? (
        <NoResultSection />
      ) : (
        <>
          <LiquorList liquors={liquors} />
          <div ref={observerRef} style={{ height: 1 }} />
        </>
      )}
    </main>
  );
}

export default LiquorSearchContent;
