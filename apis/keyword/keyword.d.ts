export interface RecentKeywordProps {}

export interface RecentKeywordResponse {}

interface RecommendKeyword {
  id: number;
  isActive: boolean;
  text: string;
}

export interface RecommendKeywordProps {
  limitNum?: number;
}
