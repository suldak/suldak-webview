"use client";
import { useGetRankingKeyword } from "apis/keyword/useGetRankingKeyword";
import RankingKeywordList from "./RankingKeywordList";

function RankingKeyword() {
  const { data: rankingKeywords = [] } = useGetRankingKeyword();

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
