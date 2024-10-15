import axiosInstance from 'apis/axiosInstance';
import { useQuery } from '@tanstack/react-query';
import { ResponseType } from 'apis/api';
import { TasteType } from 'models/liquor';

const getLiquorTaste = async (): Promise<
  ResponseType<{ content: TasteType[] }>
> => {
  const { data } = await axiosInstance.get<
    ResponseType<{ content: TasteType[] }>
  >(`/api/tag/view/taste-type/`);
  return data;
};

export const useGetLiquorTaste = () => {
  const queryKey = ['liquor-taste-type'];

  const { data } = useQuery({
    queryKey,
    queryFn: () => getLiquorTaste(),
    staleTime: 10000,
  });

  return {
    data: data?.data,
  };
};
