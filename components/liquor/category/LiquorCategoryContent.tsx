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
  const [isRestoringState, setIsRestoringState] = useState(false);

  // searchKey 생성 - 빈 문자열이 아니도록 보장
  const searchKey = searchParams.toString() || "default";
  const queryKey = `${searchKey}-page-${pageNum}`;
  const stateKey = `category-state-${searchKey}`;
  const scrollKey = `category-scroll-${searchKey}`;

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

  // 브라우저 자동 스크롤 복원 방지
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    return () => {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "auto";
      }
    };
  }, []);

  // 컴포넌트 마운트 시 한 번만 상태 복원 시도
  useEffect(() => {
    const savedState = sessionStorage.getItem(stateKey);
    const savedScroll = sessionStorage.getItem(scrollKey);

    console.log("[LiquorCategoryContent] 🔍 Mount - Checking saved state:", {
      hasSavedState: !!savedState,
      savedScroll,
    });

    if (savedState && savedScroll) {
      try {
        const { savedLiquors, savedPageNum, savedHasNext } =
          JSON.parse(savedState);
        console.log("[LiquorCategoryContent] ✅ Restoring state:", {
          pageNum: savedPageNum,
          liquorsCount: savedLiquors.length,
          scrollPosition: savedScroll,
        });

        setIsRestoringState(true);
        setLiquors(savedLiquors);
        setPageNum(savedPageNum);
        setHasNext(savedHasNext);
        setIsFirstLoading(false);

        // 즉시 스크롤 설정 (깜빡임 방지)
        const scrollPosition = parseInt(savedScroll);
        window.scrollTo(0, scrollPosition);

        // 렌더링 후 한 번 더 확인
        requestAnimationFrame(() => {
          setTimeout(() => {
            window.scrollTo(0, scrollPosition);
            console.log(
              "[LiquorCategoryContent] 📍 Scrolled to:",
              scrollPosition,
              "Current:",
              window.scrollY,
            );
            setIsRestoringState(false);
          }, 50);
        });
      } catch (e) {
        console.error("[LiquorCategoryContent] ❌ Failed to restore state:", e);
        setIsRestoringState(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // 마운트 시 한 번만 실행

  // 데이터 업데이트
  useEffect(() => {
    console.log("[LiquorCategoryContent] 📦 Data effect:", {
      hasData: !!data,
      pageNum,
      isRestoringState,
    });

    // 상태 복원 중이면 데이터 업데이트 건너뛰기
    if (isRestoringState) {
      console.log(
        "[LiquorCategoryContent] ⏭️ Skipping data update (restoring state)",
      );
      return;
    }

    if (data?.data?.content) {
      if (pageNum === 0) {
        setLiquors(data.data.content);
      } else {
        setLiquors((prev) => [...prev, ...data.data.content]);
      }
      setHasNext(data.data.content.length === PAGE_SIZE);
      setIsFirstLoading(false);
    }
  }, [data, pageNum, isRestoringState]);

  // 로딩 상태 체크 (캐시에서 즉시 반환되는 경우를 위해)
  useEffect(() => {
    console.log("[LiquorCategoryContent] ⏳ Loading check:", {
      isLoading,
      isFetching,
      hasData: !!data,
    });

    // 상태 복원 중이면 건너뛰기
    if (isRestoringState) return;

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
  }, [isLoading, isFetching, data, isRestoringState]);

  // 스크롤 위치를 실시간으로 저장
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      // 디바운스: 스크롤이 멈춘 후 100ms 뒤에 저장
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        if (liquors.length > 0) {
          sessionStorage.setItem(scrollKey, window.scrollY.toString());
          console.log(
            "[LiquorCategoryContent] 📍 Scroll position saved:",
            window.scrollY,
          );
        }
      }, 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      clearTimeout(scrollTimeout);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [liquors.length, scrollKey]);

  // 컴포넌트 언마운트 시 상태 저장 (스크롤은 별도로 저장됨)
  useEffect(() => {
    return () => {
      // 데이터가 있을 때만 저장
      if (liquors.length > 0) {
        console.log("[LiquorCategoryContent] 💾 Saving state before unmount:", {
          pageNum,
          liquorsCount: liquors.length,
        });

        sessionStorage.setItem(
          stateKey,
          JSON.stringify({
            savedLiquors: liquors,
            savedPageNum: pageNum,
            savedHasNext: hasNext,
          }),
        );
      }
    };
  }, [liquors, pageNum, hasNext, stateKey]);

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
