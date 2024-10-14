import axiosInstance from 'apis/axiosInstance';
import { useQuery } from '@tanstack/react-query';
import { ResponseType } from 'apis/api';
import { SellerType } from 'models/liquor';

const getLiquorSeller = async (): Promise<
  ResponseType<{ content: SellerType[] }>
> => {
  const { data } = await axiosInstance.get<
    ResponseType<{ content: SellerType[] }>
  >(`/api/tag/view/liquor-sell/`);
  return data;
};

export const useGetLiquorSeller = () => {
  const queryKey = ['liquor-seller'];

  const { data } = useQuery({
    queryKey,
    queryFn: () => getLiquorSeller(),
    staleTime: 10000,
  });

  return {
    data: data?.data,
  };
};
