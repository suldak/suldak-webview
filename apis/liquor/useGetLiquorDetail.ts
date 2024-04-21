import axiosInstance from 'apis/axiosInstance';
import { useSuspenseQuery } from '@tanstack/react-query';
import { ResponseType } from 'apis/api';
import { Liquor } from 'models/liquor';

const getLiquorDetail = async (id: number): Promise<ResponseType<Liquor>> => {
  const { data } = await axiosInstance.get<ResponseType<Liquor>>(
    `http://122.45.203.134:8080/api/liquor/${id}`
  );

  return data;
};

export const useGetLiquorDetail = (id: number) => {
  const { data } = useSuspenseQuery({
    queryKey: ['liquor-detail', id],
    queryFn: () => getLiquorDetail(id),
  });

  return {
    data: data?.data,
  };
};
