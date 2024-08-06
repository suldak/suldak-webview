
'use client';
import TodayUp from 'assets/icons/ico-today-up.svg';
import TodayDown from 'assets/icons/ico-today-down.svg';
import { RankingKeyword } from 'apis/keyword/types';

interface RankingKeywordItemProps {
  keyword: RankingKeyword;
}

function RankingKeywordItem({ keyword }: RankingKeywordItemProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center justify-center text-suldak-gray-700 font-bold text-sm w-2.5">
        {keyword.ranking}
      </div>
      <div className="flex items-center gap-2">
        <span className="text-suldak-gray-900 font-medium text-sm">
          {keyword.text}
        </span>
        {keyword.isNew && (
          <span className="text-suldak-red-500 font-bold text-2xs">NEW!</span>
        )}
        {keyword.isUp && <TodayUp />}
        {keyword.isDown && <TodayDown />}
      </div>
    </div>
  );
}
export default RankingKeywordItem;