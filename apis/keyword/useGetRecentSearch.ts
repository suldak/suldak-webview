import axiosInstance from 'apis/axiosInstance';
import { useQuery } from '@tanstack/react-query';
import { ResponseType } from 'apis/api';
import { SearchText } from 'models/searchText';

const getRecentSearch = async (): Promise<ResponseType<SearchText[]>> => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const { data } = await axiosInstance.get<ResponseType<SearchText[]>>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/search/search-text`,
    {
      params: {
        searchType: 'LIQUOR',
      },
    },
  );
  return data;
};

export const useGetRecentSearch = () => {
  const queryKey = ['liquor-search'];

  const { data } = useQuery({
    queryKey,
    queryFn: () => getRecentSearch(),
  });

  return {
    data: data?.data,
  };
};
