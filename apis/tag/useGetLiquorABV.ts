import axiosInstance from 'apis/axiosInstance';
import { useQuery } from '@tanstack/react-query';
import { ResponseType } from 'apis/api';
import { TasteType } from 'models/liquor';

const getLiquorABV = async (): Promise<
  ResponseType<{ content: TasteType[] }>
> => {
  const { data } = await axiosInstance.get<
    ResponseType<{ content: TasteType[] }>
  >(`${process.env.NEXT_PUBLIC_BASE_URL}/api/tag/view/liquor-abv/`);
  return data;
};

export const useGetLiquorABV = () => {
  const queryKey = ['liquor-alchol-volume'];

  const { data } = useQuery({
    queryKey,
    queryFn: () => getLiquorABV(),
    staleTime: 10000,
  });

  return {
    data: data?.data,
  };
};
