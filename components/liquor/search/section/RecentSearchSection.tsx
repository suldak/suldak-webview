'use client';
import { useGetRecentSearch } from 'apis/keyword/useGetRecentSearch';
import { useRouter } from 'next/navigation';
import Tag from 'components/shared/Tag';
import SearchInput from '../SearchInput';
import DeleteIcon from 'assets/icons/ico-head-close.svg';
import { SearchText } from 'models/searchText';
import { useCleanRecentSearch } from 'apis/keyword/useCleanRecentSearch';
import { useDeleteRecentSearch } from 'apis/keyword/useDeleteRecentSearch';

function RecentSearchSection() {
  const router = useRouter();
  const { data: recent, refetch } = useGetRecentSearch();
  const cleanRecentSearchMutation = useCleanRecentSearch();
  const deleteRecentSearchMutation = useDeleteRecentSearch();

  const isValidRecent = Array.isArray(recent) && recent.length > 0;

  const handleRecentClick = (event: React.MouseEvent<HTMLSpanElement>) => {
    const searchValue = event.currentTarget.textContent;
    if (searchValue) {
      router.push(`/liquor/search/result?q=${searchValue}`);
    }
  };

  const handleCleanClick = async () => {
    try {
      await cleanRecentSearchMutation.mutateAsync();
      await refetch();
    } catch (error) {
      console.error('Failed to clean recent searches:', error);
    }
  };
  const handleDeleteClick = async (id: number) => {
    try {
      await deleteRecentSearchMutation.mutateAsync(id);
      await refetch();
    } catch (error) {
      console.error('Failed to delete recent search text:', error);
    }
  };

  return (
    <section className="px-5">
      <SearchInput />
      <div className="pt-10 pb-2 flex justify-between items-end">
        <span className="text-base font-bold">최근 검색어</span>
        <button
          className="text-xs font-medium text-suldak-gray-500"
          onClick={handleCleanClick}
        >
          전체삭제
        </button>
      </div>
      <div className="flex items-start py-2 gap-2 w-full overflow-x-scroll whitespace-nowrap scrollbar-hide">
        {isValidRecent ? (
          recent.map((search: SearchText, index: number) => (
            <Tag tagId={index} tagColor="gray" key={index}>
              <div className="flex justify-center items-center gap-5px">
                <span onClick={handleRecentClick}>{search.searchText}</span>
                <DeleteIcon onClick={() => handleDeleteClick(search.id)} />
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
