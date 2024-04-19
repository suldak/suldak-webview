'use client';

import Tag from 'components/Tag';
import DeleteIcon from 'assets/icons/ico-head-close.svg';
import SportsMedal from 'assets/icons/ico-sports-medal.svg';

import LiquorRecommendKeyword from 'components/liquor-search/LiquorRecommendKeyword';
import { Suspense } from 'react';
import LiquorRankingKeyword from 'components/liquor-search/LiquorRankingKeyword';

// 최근 검색어 목데이터
const recent = [
  {
    id: 1,
    name: '소주',
  },
  {
    id: 2,
    name: '하이볼',
  },
  {
    id: 3,
    name: '위스키',
  },
  {
    id: 4,
    name: '과일',
  },
  {
    id: 5,
    name: '테스트',
  },
] as const;

/** 술 검색 페이지 */
const LiquorSearchPage = () => {
  return (
    <main className="flex flex-col">
      {/* 최근 검색어 */}
      <section className="px-5">
        <div className="pt-10 pb-2 flex justify-between items-end">
          <span className="text-base font-bold">최근 검색어</span>

          <button className="text-xs font-medium text-suldak-gray-500">
            전체삭제
          </button>
        </div>
        <div className="flex items-start py-2 gap-2 w-full overflow-x-scroll whitespace-nowrap scrollbar-hide">
          {recent.map((liquor) => (
            <Tag tagId={liquor.id} tagType="gray" key={liquor.id}>
              <div className="flex justify-center items-center gap-5px">
                <span>{liquor.name}</span>
                <DeleteIcon />
              </div>
            </Tag>
          ))}
        </div>
      </section>

      {/* 추천 검색어 */}
      <section className="px-5">
        <p className="text-base font-bold pt-10 pb-2">추천 검색어</p>
        <Suspense fallback={<>로딩중...</>}>
          <LiquorRecommendKeyword />
        </Suspense>
      </section>

      {/* 검색 키워드 랭킹 */}
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
          <LiquorRankingKeyword />
        </Suspense>
      </section>
    </main>
  );
};

export default LiquorSearchPage;
