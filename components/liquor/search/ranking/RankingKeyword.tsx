"use client";
import { useGetRankingKeyword } from "apis/keyword/useGetRankingKeyword";
import RankingKeywordList from "./RankingKeywordList";

function RankingKeyword() {
  const { data: rankingKeywords } = useGetRankingKeyword();

  return (
    <div className="flex items-center gap-14">
      <RankingKeywordList
        keywords={rankingKeywords.slice(0, 5)}
        startIndex={0}
      />
      <RankingKeywordList
        keywords={rankingKeywords.slice(5, 10)}
        startIndex={5}
      />
    </div>
  );
}

export default RankingKeyword;
