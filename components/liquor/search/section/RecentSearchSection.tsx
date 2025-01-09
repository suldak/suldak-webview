"use client";
import { useGetRecentSearch } from "apis/keyword/useGetRecentSearch";
import { useRouter } from "next/navigation";
import { SearchText } from "models/searchText";
import { useCleanRecentSearch } from "apis/keyword/useCleanRecentSearch";
import { useDeleteRecentSearch } from "apis/keyword/useDeleteRecentSearch";
import Tag from "components/shared/Tag";
import SearchInput from "../SearchInput";
import DeleteIcon from "assets/icons/ico-head-close.svg";
import HeadBackIcon from "assets/icons/ico-head-back.svg";

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
  // 앱으로 돌아가기
  const sendMessageToFlutter = () => {
    console.log("Attempting to send message to Flutter...");

    try {
      // FlutterBridge 채널을 통해 메시지 전송
      if (window.FlutterBridge) {
        console.log("Flutter bridge detected, sending message...");
        window.FlutterBridge.postMessage("goBack");
        console.log("Message sent to Flutter successfully");
      } else {
        console.warn(
          "No Flutter bridge detected. Are you running in a Flutter WebView?",
        );
      }
    } catch (error) {
      console.error("Error sending message to Flutter:", error);
    }
  };
  return (
    /**패딩이 두 번 적용 되는 부분이 있어 제거 하였습니다. */
    <section>
      <div className="flex items-center justify-center gap-x-[8px] pl-[12px] pr-[20px] pt-[2px]">
        <HeadBackIcon onClick={sendMessageToFlutter} />
        <SearchInput />
      </div>
      <div className="flex items-end justify-between px-5 pb-2 pt-10">
        <span className="text-base font-bold">최근 검색어</span>
        <button
          className="text-xs font-medium text-suldak-gray-500"
          onClick={handleCleanClick}
        >
          전체삭제
        </button>
      </div>
      <div className="touch-pan-x overflow-x-scroll whitespace-nowrap px-5 scrollbar-hide">
        <div className="inline-flex h-[54px] w-max items-start gap-2">
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
      </div>
    </section>
  );
}

export default RecentSearchSection;
