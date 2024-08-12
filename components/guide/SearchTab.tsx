import SearchTabImg from 'assets/icons/ico-search-tab.svg';
import FilterTabImg from 'assets/icons/ico-filter-tab.svg';
function SearchTab() {
  return (
    <>
      <p>
        [홈] 탭의 [검색바]를 통해 여러 술 제품을 찾아보고, 나에게 맞는 술을 찾을
        수 있어요
      </p>
      <SearchTabImg />
      <h3 className="text-[16px] text-suldak-mint-500 font-semibold">
        추천 키워드, 랭킹
      </h3>
      <li>[추천 검색어]로 빠르고 간단하게 지금 마시고 싶은 술을 검색해봐요!</li>
      <li>
        [검색 키워드 랭킹]에서는 어떤 키워드가 많이 검색되고 있는지 실시간으로
        알 수 있어요
      </li>
      <FilterTabImg />
      <h3 className="text-[16px] text-suldak-mint-500 font-semibold">필터</h3>
      <li>
        제품페이지에는 술에 대한 짧은 소개, 태그, 도수뿐만 아니라 어울리는
        안주도 추천하고 있어요
      </li>
      <li>
        칵테일, 하이볼에는 각각의 레시피와 재료 정보도 포함하고 있어 직접 만들어
        볼 수도 있어요!
      </li>
    </>
  );
}

export default SearchTab;
