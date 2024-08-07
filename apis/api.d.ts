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
}
