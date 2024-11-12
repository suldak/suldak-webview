"use client";
import { useGetRecentSearch } from "apis/keyword/useGetRecentSearch";
import { useRouter } from "next/navigation";
import Tag from "components/shared/Tag";
import SearchInput from "../SearchInput";
import DeleteIcon from "assets/icons/ico-head-close.svg";
import { SearchText } from "models/searchText";
import { useCleanRecentSearch } from "apis/keyword/useCleanRecentSearch";
import { useDeleteRecentSearch } from "apis/keyword/useDeleteRecentSearch";

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
      console.error("Failed to clean recent searches:", error);
    }
  };
  const handleDeleteClick = async (id: number) => {
    try {
      await deleteRecentSearchMutation.mutateAsync(id);
      await refetch();
    } catch (error) {
      console.error("Failed to delete recent search text:", error);
    }
  };

  return (
    /**패딩이 두 번 적용 되는 부분이 있어 제거 하였습니다. */
    <section>
      <SearchInput />
      <div className="flex items-end justify-between pb-2 pt-10 px-5">
        <span className="text-base font-bold">최근 검색어</span>
        <button
          className="text-xs font-medium text-suldak-gray-500"
          onClick={handleCleanClick}
        >
          전체삭제
        </button>
      </div>
      <div className="flex h-[54px] w-full items-start gap-2 overflow-x-scroll whitespace-nowrap py-2 scrollbar-hide px-5">
        {isValidRecent ? (
          recent.map((search: SearchText, index: number) => (
            <Tag tagId={index} tagColor="gray" key={index}>
              <div className="flex items-center justify-center gap-5px">
                <span onClick={handleRecentClick}>{search.searchText}</span>
                <DeleteIcon onClick={() => handleDeleteClick(search.id)} />
              </div>
            </Tag>
          ))
        ) : (
          <div className="mt-[18px] flex h-[54px] font-[14px] text-suldak-gray-600">
            검색 시 자동으로 검색어가 저장됩니다.
          </div>
        )}
      </div>
    </section>
  );
}

export default RecentSearchSection;
