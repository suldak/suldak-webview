import axiosInstance from 'apis/axiosInstance';
import { useSuspenseQuery } from '@tanstack/react-query';
import { ResponseType } from 'apis/api';
import { RankingKeyword } from './types';

const getRankingKeyword = async (): Promise<ResponseType<RankingKeyword[]>> => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const { data } = await axiosInstance.get<ResponseType<RankingKeyword[]>>(
    `http://122.45.203.134:8080/api/search/text/view/ranking`,
    {
      params: {
        searchHour: 14,
      },
    }
  );

  return data;
};

export const useGetRankingKeyword = () => {
  const { data } = useSuspenseQuery({
    queryKey: ['ranking-keyword'],
    queryFn: getRankingKeyword,
  });

  return {
    data: data.data,
  };
};
