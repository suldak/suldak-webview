export interface ResponseType<T> {
  data: T;
  message: string;
  success: boolean;
  errorCode?: number;
}

export interface LiquorSearchParams {
  tag?: string;
  isRecommend?: string;
  liquorNamePriKeys?: string;
  liquorDetailPriKeys?: string;
  liquorAbvPriKeys?: string;
  sellPriKeys?: string;
  tastePriKeys?: string;
  statePriKeys?: number;
  recordSize?: number; // 술 목록 recordSize
  pageNum?: number; // 페이지네이션을 위한 pageNum
}
