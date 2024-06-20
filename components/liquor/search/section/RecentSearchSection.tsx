'use client';
import { useGetRecentSearch } from 'apis/keyword/useGetRecentSearch';
import { useRouter } from 'next/navigation';
import Tag from 'components/shared/Tag';
import SearchInput from '../SearchInput';
import DeleteIcon from 'assets/icons/ico-head-close.svg';
import { SearchText } from 'models/searchText';
function RecentSearchSection() {
  const router = useRouter();
  const { data: recent } = useGetRecentSearch();

  const handleRecentClick = (searchValue: string) => () => {
    router.push(`/liquor/search/result?q=${searchValue}`);
  };

  return (
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
                <span onClick={handleRecentClick(search.searchText)}>
                  {search.searchText}
                </span>
                <DeleteIcon />
              </div>
            </Tag>
          ))
        ) : (
          <span>최근 검색어가 없습니다.</span>
        )}
      </div>
    </section>
  );
}

export default RecentSearchSection;
