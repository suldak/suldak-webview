import axiosInstance from 'apis/axiosInstance';
import { useSuspenseQuery } from '@tanstack/react-query';
import { RecommendKeyword } from './types';
import { ResponseType } from 'apis/api';

const getRecommendKeyword = async (): Promise<
  ResponseType<RecommendKeyword[]>
> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const { data } = await axiosInstance.get<ResponseType<RecommendKeyword[]>>(
    `http://122.45.203.134:8080/api/search/text/view/recommend`
  );

  return data;
};

/**
 * 추천 검색어를 가져오는 훅
 */
export const useGetRecommendKeyword = () => {
  const { data } = useSuspenseQuery({
    queryKey: ['recommend-keyword'],
    queryFn: getRecommendKeyword,
  });

  return {
    data: data.data,
  };
};
