import { RankingKeyword } from 'apis/keyword/types';
import RankingKeywordItem from './RankingKeywordItem';

interface RankingKeywordListProps {
  keywords: RankingKeyword[];
  startIndex: number;
}

function RankingKeywordList({ keywords, startIndex }: RankingKeywordListProps) {
  return (
    <div className="flex flex-col">
      {keywords.map((keyword, index) => (
        <RankingKeywordItem key={startIndex + index} keyword={keyword} />
      ))}
    </div>
  );
}
export default RankingKeywordList;
