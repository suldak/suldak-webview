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
  const [isRestoringState, setIsRestoringState] = useState(false);

  // searchKey 생성 - 빈 문자열이 아니도록 보장
  const searchKey = searchParams.toString() || "default";
  const queryKey = `${searchKey}-page-${pageNum}`;
  const stateKey = `search-state-${searchKey}`;
  const scrollKey = `search-scroll-${searchKey}`;

  const { data, isLoading, error, isFetching, isSuccess } = useLiquorSearch(
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
    queryKey,
  );

  console.log("[LiquorSearchContent] 🔍 Query State:", {
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

    console.log("[LiquorSearchContent] 🔍 Mount - Checking saved state:", {
      hasSavedState: !!savedState,
      savedScroll,
    });

    if (savedState && savedScroll) {
      try {
        const { savedLiquors, savedPageNum, savedHasNext } =
          JSON.parse(savedState);
        console.log("[LiquorSearchContent] ✅ Restoring state:", {
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
              "[LiquorSearchContent] 📍 Scrolled to:",
              scrollPosition,
              "Current:",
              window.scrollY,
            );
            setIsRestoringState(false);
          }, 50);
        });
      } catch (e) {
        console.error("[LiquorSearchContent] ❌ Failed to restore state:", e);
        setIsRestoringState(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // 마운트 시 한 번만 실행

  // 데이터 업데이트
  useEffect(() => {
    console.log("[LiquorSearchContent] 📦 Data effect:", {
      hasData: !!data,
      pageNum,
      isRestoringState,
    });

    // 상태 복원 중이면 데이터 업데이트 건너뛰기
    if (isRestoringState) {
      console.log(
        "[LiquorSearchContent] ⏭️ Skipping data update (restoring state)",
      );
      return;
    }

    if (data?.data?.content) {
      if (pageNum === 0) {
        setLiquors(data.data.content);
      } else {
        setLiquors((prev) => [...prev, ...data.data.content]);
      }
      setHasNext(!data.data.last);
      setIsFirstLoading(false);
    }
  }, [data, pageNum, isRestoringState]);

  // 로딩 상태 체크 (캐시에서 즉시 반환되는 경우를 위해)
  useEffect(() => {
    console.log("[LiquorSearchContent] ⏳ Loading check:", {
      isLoading,
      isFetching,
      hasData: !!data,
    });

    // 상태 복원 중이면 건너뛰기
    if (isRestoringState) return;

    // 로딩도 아니고 fetching도 아닌데 데이터가 있으면 캐시에서 온 것
    if (!isLoading && !isFetching && data?.data?.content) {
      console.log("[LiquorSearchContent] ✅ Data from cache, stopping loading");
      setIsFirstLoading(false);
      // 캐시된 데이터로 liquors 설정
      if (pageNum === 0 && liquors.length === 0) {
        setLiquors(data.data.content);
        setHasNext(!data.data.last);
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
            "[LiquorSearchContent] 📍 Scroll position saved:",
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
        console.log("[LiquorSearchContent] 💾 Saving state before unmount:", {
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
      {isFirstLoading && !data ? (
        <section className="flex h-full w-full flex-col items-center justify-center">
          <div className="mt-[10px]">
            <LoadingCard />
          </div>
          <div className="mt-[10px]">
            <LoadingCard />
          </div>
          <div className="mt-[10px]">
            <LoadingCard />
          </div>
          <div className="mt-[10px]">
            <LoadingCard />
          </div>
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

export default LiquorSearchContent;
