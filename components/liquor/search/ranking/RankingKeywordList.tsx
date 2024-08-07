import { RankingKeyword } from 'apis/keyword/types';
import RankingKeywordItem from './RankingKeywordItem';

interface RankingKeywordListProps {
  keywords: RankingKeyword[];
  startIndex: number;
  isLoading?: boolean;
}

function RankingKeywordList({
  keywords,
  startIndex,
  isLoading = false,
}: RankingKeywordListProps) {
  return (
    <div className="flex flex-col">
      {keywords.map((keyword, index) => (
        <RankingKeywordItem
          key={startIndex + index}
          keyword={keyword}
          isLoading={isLoading}
        />
      ))}
    </div>
  );
}
export default RankingKeywordList;
