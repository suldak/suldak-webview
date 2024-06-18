import axiosInstance from 'apis/axiosInstance';
import { useSuspenseQuery } from '@tanstack/react-query';
import { ResponseType } from 'apis/api';
import { Liquor } from 'models/liquor';

const getLiquorSearch = async (
  tag: string,
): Promise<ResponseType<Liquor[]>> => {
  const { data } = await axiosInstance.get<ResponseType<Liquor[]>>(
    `http://122.45.203.134:8080/api/liquor/view/liquor-search/${tag}`,
    {
      params: {
        searchTag: tag,
      },
    },
  );

  return data;
};

export const useGetLiquorSearch = (tag: string) => {
  const { data } = useSuspenseQuery({
    queryKey: ['liquor-search', tag],
    queryFn: () => getLiquorSearch(tag),
  });

  return {
    data: data?.data,
  };
};
