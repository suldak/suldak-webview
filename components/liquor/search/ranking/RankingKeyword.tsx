"use client";
import { useGetRankingKeyword } from "apis/keyword/useGetRankingKeyword";
import { addDebugLog } from "components/shared/DebugPanel";
import RankingKeywordList from "./RankingKeywordList";
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

function RankingKeyword() {
  const { data: rankingKeywords = [] } = useGetRankingKeyword();

  // 디버깅: 데이터 상태 로깅
  useEffect(() => {
    debugLog(
      "info",
      `[RankingKeyword] data길이=${rankingKeywords?.length ?? 0}`,
    );
  }, [rankingKeywords]);

  // 왼쪽(1~5), 오른쪽(6~10) 분리
  const leftKeywords = rankingKeywords.slice(0, 5);
  const rightKeywords = rankingKeywords.slice(5, 10);

  // 오른쪽 컬럼이 5개 미만일 때 placeholder 추가
  const rightColumnLength = rightKeywords.length;
  const rightPlaceholders = Array(5 - rightColumnLength).fill(null);

  return (
    <div className="flex items-start gap-14">
      <RankingKeywordList keywords={leftKeywords} startIndex={0} />
      <RankingKeywordList keywords={rightKeywords} startIndex={5} />
      {/* 오른쪽 컬럼이 5개 미만이면 placeholder로 공간 확보 */}
      {rightColumnLength < 5 && (
        <div className="pointer-events-none invisible absolute flex flex-col gap-y-[13px]">
          {rightPlaceholders.map((_, idx) => (
            <div key={idx} className="h-[24px]" />
          ))}
        </div>
      )}
    </div>
  );
}

export default RankingKeyword;
