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
    staleTime: 1000 * 60,
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
