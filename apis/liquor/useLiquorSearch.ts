import axiosInstance from "apis/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { LiquorSearchParams, ResponseType } from "apis/api";
import { Liquor, SearchLiquor, SearchLiquorTag } from "models/liquor";

const getLiquorSearch = async ({
  tag,
  isRecommend,
  ...priKeys
}: LiquorSearchParams): Promise<
  ResponseType<{
    content: SearchLiquor[];
    empty: boolean;
    first: boolean;
    last: boolean;
    number: number;
    numberOfElements: number;
    pageable: any;
    size: number;
    sort: any;
    totalElements: number;
    totalPages: number;
  }>
> => {
  const { data } = await axiosInstance.get<
    ResponseType<{
      content: SearchLiquor[];
      empty: boolean;
      first: boolean;
      last: boolean;
      number: number;
      numberOfElements: number;
      pageable: any;
      size: number;
      sort: any;
      totalElements: number;
      totalPages: number;
    }>
  >(`/api/liquor/view/liquor-search/`, {
    params: {
      searchTag: tag,
      isRecommend,
      ...priKeys,
    },
  });

  return data;
};

export const useLiquorSearch = (
  { tag, isRecommend, ...priKeys }: LiquorSearchParams,
  searchKey: string,
) => {
  return useQuery({
    queryKey: ["liquor-search", searchKey],
    queryFn: () =>
      getLiquorSearch({
        tag,
        isRecommend: isRecommend === "인기순" ? "false" : "true",
        ...priKeys,
      }),
    select: (data) => ({ data: data.data }),
    enabled: !!searchKey,
    // 검색 결과는 30초 동안만 fresh 상태 유지 (기본값 사용)
    // 30초 이내 뒤로가기는 캐시 사용, 이후는 새로 불러오기
  });
};

const getLiquorCategorySearch = async ({
  liquorNamePriKeys,
  ...priKeys
}: LiquorSearchParams): Promise<
  ResponseType<{
    content: SearchLiquor[];
    empty: boolean;
    first: boolean;
    last: boolean;
    number: number;
    numberOfElements: number;
    pageable: any;
    size: number;
    sort: any;
    totalElements: number;
    totalPages: number;
  }>
> => {
  const { data } = await axiosInstance.get<
    ResponseType<{
      content: SearchLiquor[];
      empty: boolean;
      first: boolean;
      last: boolean;
      number: number;
      numberOfElements: number;
      pageable: any;
      size: number;
      sort: any;
      totalElements: number;
      totalPages: number;
    }>
  >(`/api/liquor/view/liquor-search/`, {
    params: {
      liquorNamePriKeys,
      ...priKeys,
    },
  });

  return data;
};

export const useLiquorCategorySearch = (
  { liquorNamePriKeys, ...priKeys }: LiquorSearchParams,
  searchKey: string,
) => {
  return useQuery({
    queryKey: ["liquor-category-search", searchKey, liquorNamePriKeys],
    queryFn: () =>
      getLiquorCategorySearch({
        liquorNamePriKeys,
        ...priKeys,
      }),
    select: (data) => ({ data: data.data }),
    enabled: !!searchKey && liquorNamePriKeys !== undefined,
  });
};
