export interface RecentKeywordProps {}

export interface RecentKeywordResponse {}

interface RankingKeyword {
  isDown: boolean;
  isNew: boolean;
  isUp: boolean;
  ranking: number;
  text: string;
}

export interface RankingKeywordRequestProps {
  limitNum: number;
  searchHour: number;
}

interface RecommendKeyword {
  id: number;
  isActive: boolean;
  text: string;
}

export interface RecommendKeywordRequestProps {
  limitNum?: number;
}
