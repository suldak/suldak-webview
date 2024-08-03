'use client';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { Liquor } from 'models/liquor';
import { useLiquorSearch } from 'apis/liquor/useLiquorSearch';
import SearchInput from 'components/liquor/search/SearchInput';
import SortDropDown from 'components/liquor/search/SortDropDown';

import LiquorCard from 'components/shared/LiquorCard';
import FilterButton from 'components/liquor/search/FilterButton';

function LiquorSearchResultPage() {
  const searchParams = useSearchParams();

  const tag = searchParams.get('q') || undefined;
  const isRecommend = searchParams.get('isRecommend') || '인기순';
  const priKeys = {
    liquorNamePriKeys: searchParams.get('class')?.split(',').join() || '',
    tastePriKeys: searchParams.get('taste')?.split(',').join() || '',
    liquorAbvPriKeys: searchParams.get('abv')?.split(',').join() || '',
    sellPriKeys: searchParams.get('seller')?.split(',').join() || '',
  };

  console.log('class', priKeys);

  const { data, isLoading, error } = useLiquorSearch({
    tag,
    isRecommend,
    ...priKeys,
  });
  console.log('data2', data);
  const liquors: Liquor[] = data?.data.content || [];

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
            총 {liquors.length ?? 0}종
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
        {liquors.map((liquor: Liquor) => (
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
}

export default LiquorSearchResultPage;
