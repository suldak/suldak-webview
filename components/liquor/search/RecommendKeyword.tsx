"use client";

import { useGetRecommendKeyword } from "apis/keyword/useGetRecommendKeyword";
import { addDebugLog } from "components/shared/DebugPanel";
import Tag from "components/shared/Tag";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// 디버그 로그 헬퍼
const debugLog = (
  type: "info" | "success" | "warning" | "error",
  message: string,
) => {
  console.log(`[${type.toUpperCase()}] ${message}`);
  try {
    addDebugLog(type, message);
  } catch {
    // DebugPanel이 아직 로드되지 않은 경우 무시
  }
};

/** 추천 검색어 컴포넌트 */
function RecommendKeyword() {
  const router = useRouter();
  const { data: recommendKeywords = [] } = useGetRecommendKeyword();

  // 디버깅: 데이터 상태 로깅
  useEffect(() => {
    debugLog(
      "info",
      `[RecommendKeyword] data길이=${recommendKeywords?.length ?? 0}, isArray=${Array.isArray(recommendKeywords)}`,
    );
  }, [recommendKeywords]);

  // 데이터가 없을 경우 처리
  if (
    !recommendKeywords ||
    !Array.isArray(recommendKeywords) ||
    recommendKeywords.length === 0
  ) {
    debugLog("warning", "[RecommendKeyword] 데이터 없음 - 빈 렌더링");
    return <></>;
  }
  const handleClick = (
    event: React.MouseEvent<HTMLSpanElement>,
    text: string,
  ) => {
    event.preventDefault();
    router.push(`/liquor/search/result?q=${text}`);
  };

  return (
    <>
      {recommendKeywords.map((recLiquor) => (
        <Tag
          tagId={recLiquor.id}
          key={recLiquor.id}
          tagColor="blue"
          onClick={handleClick}
        >
          {recLiquor.text}
        </Tag>
      ))}
    </>
  );
}

export default RecommendKeyword;
