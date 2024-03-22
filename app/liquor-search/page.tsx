'use client';

import Tag from 'components/Tag';
import DeleteIcon from 'assets/icons/ico-head-close.svg';
import SportsModal from 'assets/icons/ico-sports-medal.svg';

/** 술 검색 페이지 */
const LiquorSearchPage = () => {
  return (
    <main className="flex flex-col">
      {/* 최근 검색어 */}
      <section className="px-5">
        <div className="pt-10 pb-2 flex justify-between items-end">
          <span className="text-base font-bold">최근 검색어</span>

          <button className="text-xs font-medium text-suldak-gray-500">전체삭제</button>
        </div>
        <div className="flex items-start py-2 gap-2 w-full overflow-x-scroll whitespace-nowrap">
          <Tag tagId={2} tagType="gray">
            <div className="flex justify-center items-center gap-5px">
              <span>소주</span>
              <DeleteIcon />
            </div>
          </Tag>

          <Tag tagId={2} tagType="gray">
            <div className="flex justify-center items-center gap-5px">
              <span>하이볼</span>
              <DeleteIcon />
            </div>
          </Tag>
          <Tag tagId={2} tagType="gray">
            <div className="flex justify-center items-center gap-5px">
              <span>위스키</span>
              <DeleteIcon />
            </div>
          </Tag>
          <Tag tagId={2} tagType="gray">
            <div className="flex justify-center items-center gap-5px">
              <span>과일</span>
              <DeleteIcon />
            </div>
          </Tag>
          <Tag tagId={2} tagType="gray">
            <div className="flex justify-center items-center gap-5px">
              <span>TEST</span> <DeleteIcon />
            </div>
          </Tag>
        </div>
      </section>

      {/* 추천 검색어 */}
      <section className="px-5">
        <p className="text-base font-bold pt-10 pb-2">추천 검색어</p>
        <div className="flex flex-wrap gap-2 py-2">
          <Tag tagId={1} tagType="blue">
            칵테일
          </Tag>
          <Tag tagId={1} tagType="blue">
            하이볼
          </Tag>
          <Tag tagId={1} tagType="blue">
            편의점 하이볼
          </Tag>
          <Tag tagId={1} tagType="blue">
            소주
          </Tag>
          <Tag tagId={1} tagType="blue">
            아사히 생맥주
          </Tag>
          <Tag tagId={1} tagType="blue">
            카스 레몬 스퀴즈
          </Tag>
          <Tag tagId={1} tagType="blue">
            피곤할 때
          </Tag>
        </div>
      </section>

      {/* 검색 키워드 랭킹 */}
      <section className="px-5">
        <div className="pt-10 pb-2 flex justify-start items-center gap-2">
          <div className="flex items-center gap-1">
            <SportsModal />
            <span className="text-base font-bold">최근 검색어</span>
          </div>

          <button className="text-xs font-medium text-suldak-gray-500">18시 기준</button>
        </div>
      </section>
    </main>
  );
};

export default LiquorSearchPage;
