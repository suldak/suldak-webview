import { SearchLiquor } from "models/liquor";
import { useLiquorCategorySearch } from "apis/liquor/useLiquorSearch";
import CategoryHeader from "components/liquor/category/CategoryHeader";
import NoResultSection from "components/liquor/search/section/NoResultSection";
import LoadingCard from "components/shared/LiquorCard/LoadingCard";
import CategoryFilter from "components/liquor/category/CategoryFilter";
import LiquorList from "components/liquor/category/LiquorList";
import SearchInfoSection from "components/liquor/search/section/SearchInfoSection";
import { useEffect, useRef, useCallback, useState } from "react";

// 임시 카테고리 이름-ID 매핑. 실제로는 API 또는 전역 상태에서 관리되어야 합니다.
const tempCategoryNameToIdMap: { [key: string]: string | undefined } = {
  전체: "",
  소주: "1",
  맥주: "2",
  칵테일: "3",
  하이볼: "4",
  와인: "5",
  양주: "6",
  전통주: "7",
  무알콜: "8",
  기타: "9",
};

const PAGE_SIZE = 20;

function LiquorCategoryContent({
  searchParams,
}: {
  searchParams: URLSearchParams;
}) {
  const categoryNameFromQuery = searchParams.get("q"); // 예: "소주" 또는 "전체"

  // API 호출을 위한 liquorNamePriKeys (ID)
  // categoryNameFromQuery가 null이거나 "전체"이거나 매핑에 없으면 undefined
  const liquorNamePriKeys =
    categoryNameFromQuery &&
    tempCategoryNameToIdMap.hasOwnProperty(categoryNameFromQuery)
      ? tempCategoryNameToIdMap[categoryNameFromQuery]
      : undefined;

  // 헤더에 표시될 값 (카테고리 이름)
  const headerTagValue = categoryNameFromQuery || "전체";

  // 무한스크롤 상태
  const [pageNum, setPageNum] = useState(0);
  const [liquors, setLiquors] = useState<SearchLiquor[]>([]);
  const [hasNext, setHasNext] = useState(true);
  const [isFirstLoading, setIsFirstLoading] = useState(true);

  const { data, isLoading, error } = useLiquorCategorySearch(
    {
      liquorNamePriKeys: liquorNamePriKeys,
      recordSize: PAGE_SIZE,
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
      setHasNext(data.data.content.length === PAGE_SIZE);
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
      <CategoryHeader tagValue={headerTagValue} /> {/* 카테고리 이름 전달 */}
      <CategoryFilter />
      <SearchInfoSection count={totalCount} />
      {isFirstLoading ? (
        <section className="flex flex-col items-center justify-center gap-2.5 overflow-y-auto px-[20px]">
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
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

export default LiquorCategoryContent;
