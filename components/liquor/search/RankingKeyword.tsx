'use client';

import { useGetRankingKeyword } from 'apis/keyword/useGetRankingKeyword';

import TodayUp from 'assets/icons/ico-today-up.svg';
import TodayDown from 'assets/icons/ico-today-down.svg';

/** 검색어 순위 컴포넌트 */
function RankingKeyword() {
  const { data: rankingKeywords } = useGetRankingKeyword();

  return (
    <>
      <div className="flex items-center gap-14">
        {/* 순위 좌측 1~5 */}
        <div className="flex flex-col">
          {rankingKeywords.slice(0, 5).map((keyword, index) => (
            <div className="flex items-center gap-3" key={index}>
              <div className="flex items-center justify-center text-suldak-gray-700 font-bold text-sm w-2.5">
                {keyword.ranking}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-suldak-gray-900 font-medium text-sm">
                  {keyword.text}
                </span>
                {keyword.isNew ? (
                  <span className="text-suldak-red-500 font-bold text-2xs">
                    NEW!
                  </span>
                ) : null}
                {keyword.isUp && <TodayUp />}
                {keyword.isDown && <TodayDown />}
              </div>
            </div>
          ))}
        </div>
        {/* 순위 우측 1~5 */}
        <div>
          {rankingKeywords.slice(5, 10).map((keyword, index) => (
            <div className="flex items-center gap-3" key={index + 5}>
              <div className="flex items-center justify-center text-suldak-gray-700 font-bold text-sm w-2.5">
                {keyword.ranking}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-suldak-gray-900 font-medium text-sm">
                  {keyword.text}
                </span>
                {keyword.isNew ? (
                  <span className="text-suldak-red-500 font-bold text-2xs">
                    NEW!
                  </span>
                ) : null}
                {keyword.isUp && <TodayUp />}
                {keyword.isDown && <TodayDown />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default RankingKeyword;
