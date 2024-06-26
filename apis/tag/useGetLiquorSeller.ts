import axiosInstance from 'apis/axiosInstance';
import { useQuery } from '@tanstack/react-query';
import { ResponseType } from 'apis/api';
import { TasteType } from 'models/liquor';

const getLiquorSeller = async (): Promise<
  ResponseType<{ content: TasteType[] }>
> => {
  const { data } = await axiosInstance.get<
    ResponseType<{ content: TasteType[] }>
  >(`${process.env.NEXT_PUBLIC_BASE_URL}/api/tag/view/liquor-sell/`);
  return data;
};

export const useGetLiquorSeller = () => {
  const queryKey = ['liquor-taste-type'];

  const { data } = useQuery({
    queryKey,
    queryFn: () => getLiquorSeller(),
    staleTime: 10000,
  });

  return {
    data: data?.data,
  };
};
