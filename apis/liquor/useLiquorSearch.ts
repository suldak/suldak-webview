import axiosInstance from 'apis/axiosInstance';
import { useQuery } from '@tanstack/react-query';
import { ResponseType } from 'apis/api';
import { Liquor } from 'models/liquor';

const getLiquorSearch = async (
  tag: string,
): Promise<ResponseType<{ content: Liquor[] }>> => {
  const { data } = await axiosInstance.get<ResponseType<{ content: Liquor[] }>>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/liquor/view/liquor-search/`,
    {
      params: {
        searchTag: tag,
      },
    },
  );
  return data;
};

export const useLiquorSearch = (tag: string, options?: unknown) => {
  const queryKey = tag ? ['liquor-search', tag] : [];

  const { data } = useQuery({
    queryKey,
    queryFn: () => getLiquorSearch(tag),
    ...options,
  });

  return {
    data: data?.data,
  };
};
