'use client';
import { useSearchParams } from 'next/navigation';
import { Liquor } from 'models/liquor';
import { useLiquorSearch } from 'apis/liquor/useLiquorSearch';
import SearchInput from 'components/liquor/search/SearchInput';
import SortDropDown from 'components/liquor/search/SortDropDown';

import LiquorCard from 'components/shared/LiquorCard';
import FilterButton from 'components/liquor/search/FilterButton';
import { useEffect, useState } from 'react';
import NoResultSection from 'components/liquor/search/section/NoResultSection';
import RecommendList from 'components/liquor/search/RecommendList';

function LiquorSearchResultPage() {
  const searchParams = useSearchParams();
  const [searchKey, setSearchKey] = useState('');

  useEffect(() => {
    // 검색 파라미터가 변경될 때마다 새로운 검색 키 생성
    setSearchKey(searchParams.toString());
  }, [searchParams]);

  const { data, isLoading, error } = useLiquorSearch(
    {
      tag: searchParams.get('q') || undefined,
      isRecommend: searchParams.get('isRecommend') || '인기순',
      liquorNamePriKeys: searchParams.get('class') || '',
      tastePriKeys: searchParams.get('taste') || '',
      liquorAbvPriKeys: searchParams.get('abv') || '',
      sellPriKeys: searchParams.get('seller') || '',
    },
    searchKey,
  );
  const liquors: Liquor[] = data?.data.content || [];
  if (!liquors.length) {
    return (
      <main className="flex flex-col min-h-screen">
        <SearchInput />
        <div className="flex-grow flex items-center justify-center">
          <NoResultSection />
        </div>
      </main>
    );
  } else {
    return (
      <main>
        <SearchInput />
        {/* 추천 목록 */}
        <RecommendList/>

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
}

export default LiquorSearchResultPage;
