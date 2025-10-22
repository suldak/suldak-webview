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

  // searchKey 생성 - 빈 문자열이 아니도록 보장
  const searchKey = searchParams.toString() || "default";
  const queryKey = `${searchKey}-page-${pageNum}`;

  const { data, isLoading, error, isFetching, isSuccess } =
    useLiquorCategorySearch(
      {
        liquorNamePriKeys: liquorNamePriKeys,
        recordSize: PAGE_SIZE,
        pageNum,
      },
      queryKey,
    );

  console.log("[LiquorCategoryContent] 🔍 Query State:", {
    searchKey,
    queryKey,
    isLoading,
    isFetching,
    isSuccess,
    hasData: !!data,
    liquorsLength: liquors.length,
    isFirstLoading,
  });

  const totalCount = data?.data.totalElements ?? liquors.length;

  // 검색 조건이 바뀌면 초기화 (가장 먼저 실행되어야 함)
  useEffect(() => {
    console.log(
      "[LiquorCategoryContent] 🔄 Search params changed, resetting state",
    );
    setPageNum(0);
    setLiquors([]);
    setHasNext(true);
    setIsFirstLoading(true);
  }, [searchParams.toString()]);

  // 데이터 업데이트
  useEffect(() => {
    console.log("[LiquorCategoryContent] 📦 Data effect:", {
      hasData: !!data,
      pageNum,
    });
    if (data?.data?.content) {
      if (pageNum === 0) {
        setLiquors(data.data.content);
      } else {
        setLiquors((prev) => [...prev, ...data.data.content]);
      }
      setHasNext(data.data.content.length === PAGE_SIZE);
      setIsFirstLoading(false);
    }
  }, [data, pageNum]);

  // 로딩 상태 체크 (캐시에서 즉시 반환되는 경우를 위해)
  useEffect(() => {
    console.log("[LiquorCategoryContent] ⏳ Loading check:", {
      isLoading,
      isFetching,
      hasData: !!data,
    });
    // 로딩도 아니고 fetching도 아닌데 데이터가 있으면 캐시에서 온 것
    if (!isLoading && !isFetching && data?.data?.content) {
      console.log(
        "[LiquorCategoryContent] ✅ Data from cache, stopping loading",
      );
      setIsFirstLoading(false);
      // 캐시된 데이터로 liquors 설정
      if (pageNum === 0 && liquors.length === 0) {
        setLiquors(data.data.content);
        setHasNext(data.data.content.length === PAGE_SIZE);
      }
    }
  }, [isLoading, isFetching, data]);

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
      {isFirstLoading && !data ? (
        <section className="flex flex-col items-center justify-center gap-2.5 overflow-y-auto px-[20px]">
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
        </section>
      ) : liquors.length === 0 && !isLoading ? (
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
