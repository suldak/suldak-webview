'use client';

import { usePathname, useRouter } from 'next/navigation';

import SortIcon from 'assets/icons/ico-filter-sort.svg';
import FilterIcon from 'assets/icons/ico-filter-filter.svg';

// components
import LiquorCard from 'components/LiquorCard';

/** 술 검색 결과 페이지 */
const LiquorSearchResultPage = () => {
  const router = useRouter();
  console.log(router);
  return (
    <main>
      {/* 추천 목록 */}
      <section className="border-b border-suldak-gray-200">
        <div className="flex items-center gap-2 px-5 py-3.5">
          <span className="text-suldak-gray-900 text-sm font-semibold">
            추천
          </span>
          <div className="text-suldak-gray-500">|</div>
          <div className="flex items-center gap-4 text-suldak-mint-500 text-sm font-semibold">
            <span>직장인</span>
            <span>위스키 베이스</span>
            <span>칵테일</span>
          </div>
        </div>
      </section>

      {/* 술 검색 목록 */}
      <section className="px-5">
        <div className="flex items-center justify-between pt-3.5">
          <span className="text-xs font-medium text-suldak-gray-600">
            총 12종
          </span>

          <div className="flex items-center gap-3 text-sm text-suldak-gray-600 font-medium leading-5">
            <div className="flex items-center gap-0.5">
              <SortIcon />
              정확도순
            </div>
            <div className="flex items-center gap-0.5">
              <FilterIcon />
              필터
            </div>
          </div>
        </div>
      </section>

      <section
        className="flex flex-col px-5 py-3.5 gap-2.5 overflow-y-auto"
        style={{ maxHeight: `calc(100dvh - 100px)` }}
      >
        <LiquorCard
          imgUrl="/api/file/download/3a4a2da1c777406b9bbbcae17ab8b237_1708006440648"
          liquorId={5}
          liquorDetail="처음처럼 회사에서 만든 제로소주, 숙취가 별로 없다."
          liquorAbv={16.5}
          name="새로"
        />
        <LiquorCard
          imgUrl="/api/file/download/9a71ce2ba9d64bcbac22a964907d789f_1708139200916"
          liquorId={5}
          liquorDetail="처음처럼 회사에서 만든 제로소주, 숙취가 별로 없다."
          liquorAbv={16.5}
          name="새로"
        />
        <LiquorCard
          imgUrl="/api/file/download/b1921f7560bd4ae9bbed65615725aa1e_1708232807725"
          liquorId={5}
          liquorDetail="한 줄 테 스 트"
          liquorAbv={16.5}
          name="새로"
        />
        <LiquorCard
          imgUrl="/api/file/download/9a71ce2ba9d64bcbac22a964907d789f_1708139200916"
          liquorId={5}
          liquorDetail="처음처럼 회사에서 만든 제로소주, 숙취가 별로 없다."
          liquorAbv={16.5}
          name="새로"
        />
        <LiquorCard
          imgUrl="/api/file/download/b1921f7560bd4ae9bbed65615725aa1e_1708232807725"
          liquorId={5}
          liquorDetail="한 줄 테 스 트"
          liquorAbv={16.5}
          name="새로"
        />
      </section>
    </main>
  );
};

export default LiquorSearchResultPage;
