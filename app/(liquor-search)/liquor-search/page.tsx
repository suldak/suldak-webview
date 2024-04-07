'use client';

import Tag from 'components/Tag';
import DeleteIcon from 'assets/icons/ico-head-close.svg';
import SportsMedal from 'assets/icons/ico-sports-medal.svg';

import LiquorRecommendKeyword from 'components/liquor-search/LiquorRecommendKeyword';
import { Suspense } from 'react';
import LiquorRankingKeyword from 'components/liquor-search/LiquorRankingKeyword';
import LiquorFetcher from 'components/liquor-detail/liquor-fetcher';
export const BASE_URL = 'http://122.45.203.134:8083';

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

// 추천 검색어 목데이터
const recommend = [
  {
    id: 1,
    name: '칵테일',
  },
  {
    id: 2,
    name: '하이볼',
  },
  {
    id: 3,
    name: '편의점 하이볼',
  },
  {
    id: 4,
    name: '소주',
  },
  {
    id: 5,
    name: '아사히 생맥주',
  },
  {
    id: 6,
    name: '카스 레몬 스퀴즈',
  },
  {
    id: 7,
    name: '피곤할 때',
  },
] as const;

const ranking = [
  {
    id: 1,
    rank: 1,
    name: '달달한',
  },
  {
    id: 2,
    rank: 2,
    name: '맥주',
  },
  {
    id: 3,
    rank: 3,
    name: '직장인',
    today: 'up',
  },
  {
    id: 4,
    rank: 4,
    name: '기념일/파티',
    today: 'down',
  },
  {
    id: 5,
    rank: 5,
    name: '상큼한',
  },
  {
    id: 6,
    rank: 6,
    name: '칵테일',
  },
  {
    id: 7,
    rank: 7,
    name: '과일 맥주',
  },
  {
    id: 8,
    rank: 8,
    name: '기분 전환',
    new: true,
  },
  {
    id: 9,
    rank: 9,
    name: '소주',
  },
  {
    id: 10,
    rank: 10,
    name: '하이볼',
  },
];

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
