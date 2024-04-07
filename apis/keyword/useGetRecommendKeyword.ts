import axiosInstance from 'apis/axiosInstance';
import { useSuspenseQuery } from '@tanstack/react-query';
import { RecommendKeyword } from './keyword';
import { ResponseType } from 'apis/api';

export const getRecommendKeyword = async (): Promise<
  ResponseType<RecommendKeyword[]>
> => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const { data } = await axiosInstance.get<ResponseType<RecommendKeyword[]>>(
    `http://122.45.203.134:8080/api/search/text/view/recommend`
  );

  return data;
};

export const useGetRecommendKeyword = () => {
  return useSuspenseQuery({
    queryKey: ['recommend-keyword'],
    queryFn: getRecommendKeyword,
  });
};
