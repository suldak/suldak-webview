import axiosInstance from 'apis/axiosInstance';
import { useQuery } from '@tanstack/react-query';
import { ResponseType } from 'apis/api';
import { LiquorName } from 'models/liquorName';

const getLiquorNameTag = async (): Promise<
  ResponseType<{ content: LiquorName[] }>
> => {
  const { data } = await axiosInstance.get<
    ResponseType<{ content: LiquorName[] }>
  >(`/api/tag/view/liquor-name/`);
  return data;
};

export const useGetLiquorName = () => {
  const queryKey = ['liquor-name-tag'];

  const { data } = useQuery({
    queryKey,
    queryFn: () => getLiquorNameTag(),
    staleTime: 10000,
  });

  return {
    data: data?.data,
  };
};
