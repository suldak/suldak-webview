'use client';

import { useSearchParams } from 'next/navigation';
import { useLiquorSearch } from 'apis/liquor/useLiquorSearch';
import SortIcon from 'assets/icons/ico-filter-sort.svg';
import FilterIcon from 'assets/icons/ico-filter-filter.svg';

// components
import LiquorCard from 'components/shared/LiquorCard';
import SearchInput from 'components/liquor/search/SearchInput';
import { Liquor } from 'models/liquor';

/** 술 검색 결과 페이지 */
const LiquorSearchResultPage = () => {
  const searchParams = useSearchParams();
  const q = searchParams.get('q') ?? '';
  const decodedQ = decodeURIComponent(q);

  const { data: liquors } = useLiquorSearch(decodedQ);
  //console.log('liquor', liquors);

  return (
    <main>
      <SearchInput />
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
        <div className="flex items-center justify-between pt=3.5">
          <span className="text-xs font-medium text-suldak-gray-600">
            총 {liquors?.totalElements ?? 0}종
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
        {liquors?.content?.map((liquor: Liquor) => (
          <LiquorCard
            key={liquor.id} // 고유한 key prop 추가
            imgUrl={liquor.liquorPictureUrl || '/default-image-url.jpg'} // 유효하지 않은 URL 처리
            liquorId={liquor.id}
            liquorDetail={liquor.detailExplanation}
            liquorAbv={liquor.detailAbv}
            name={liquor.name}
            liquorSellDtos={liquor.liquorSellDtos}
            liquorSnackRes={liquor.liquorSnackRes}
            tasteTypeDtos={liquor.tasteTypeDtos}
          />
        ))}
      </section>
    </main>
  );
};

export default LiquorSearchResultPage;
