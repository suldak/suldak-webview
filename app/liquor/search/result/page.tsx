'use client';

import { useSearchParams } from 'next/navigation';
import { useLiquorSearch } from 'apis/liquor/useLiquorSearch';

// components
import LiquorCard from 'components/shared/LiquorCard';
import SearchInput from 'components/liquor/search/SearchInput';
import { Liquor } from 'models/liquor';
import SortDropDown from 'components/liquor/search/SortDropDown';
import FilterButton from 'components/liquor/search/FilterButton';

/** 술 검색 결과 페이지 */
const LiquorSearchResultPage = () => {
  const searchParams = useSearchParams();
  const searchInput = searchParams.get('q') ?? '';
  const tag = decodeURIComponent(searchInput);
  const isRecommend = searchParams.get('sort') || '정확도순';

  const { data: liquors } = useLiquorSearch({ tag, isRecommend });

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
            총 {liquors?.data.content.length ?? 0}종
          </span>

          <div className="flex items-center gap-3 text-sm text-suldak-gray-600 font-medium leading-5">
            <SortDropDown />
            <FilterButton />
          </div>
        </div>
      </section>

      <section
        className="flex flex-col px-5 py-3.5 gap-2.5 overflow-y-auto"
        style={{ maxHeight: `calc(100dvh - 100px)` }}
      >
        {liquors?.data.content.map((liquor: Liquor) => (
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
