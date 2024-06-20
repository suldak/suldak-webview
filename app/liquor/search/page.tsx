'use client';
import { Suspense } from 'react';

import DeleteIcon from 'assets/icons/ico-head-close.svg';
import SportsMedal from 'assets/icons/ico-sports-medal.svg';
import RecommendKeyword from 'components/liquor/search/RecommendKeyword';
import RankingKeyword from 'components/liquor/search/RankingKeyword';
import SearchInput from 'components/liquor/search/SearchInput';
import Tag from 'components/shared/Tag';
import { useGetRecentSearch } from 'apis/keyword/useGetRecentSearch';
import { SearchText } from 'models/searchText';

/** 술 검색 페이지 */
function LiquorSearchPage() {
  const { data: recent } = useGetRecentSearch(); // 최근검색어

  return (
    <>
      {/* 최근 검색어 */}
      <section className="px-5">
        <SearchInput />
        <div className="pt-10 pb-2 flex justify-between items-end">
          <span className="text-base font-bold">최근 검색어</span>

          <button className="text-xs font-medium text-suldak-gray-500">
            전체삭제
          </button>
        </div>
        <div className="flex items-start py-2 gap-2 w-full overflow-x-scroll whitespace-nowrap scrollbar-hide">
          {recent && Array.isArray(recent) && recent.length > 0 ? (
            recent.map((search: SearchText, index: number) => (
              <Tag tagId={index} tagType="gray" key={index}>
                <div className="flex justify-center items-center gap-5px">
                  <span>{search.searchText}</span>
                  <DeleteIcon />
                </div>
              </Tag>
            ))
          ) : (
            <span>최근 검색어가 없습니다.</span>
          )}
        </div>
      </section>

      {/* 추천 검색어 영역 */}
      <section className="px-5">
        <p className="text-base font-bold pt-10 pb-2">추천 검색어</p>
        <div className="flex flex-wrap gap-2 py-2">
          <Suspense fallback={<>로딩중...</>}>
            <RecommendKeyword />
          </Suspense>
        </div>
      </section>

      {/* 검색어 순위 영역 */}

      <section className="px-5">
        <div className="pt-10 pb-2 flex justify-start items-center gap-2">
          <div className="flex items-center gap-1">
            <SportsMedal />
            <span className="text-base font-bold">검색 키워드 랭킹</span>
          </div>

          <button className="text-xs font-medium text-suldak-gray-500">
            18시 기준
          </button>
        </div>

        {/* 순위 목록 */}
        <Suspense fallback={<>로딩중...</>}>
          <RankingKeyword />
        </Suspense>
      </section>
    </>
  );
}

export default LiquorSearchPage;
