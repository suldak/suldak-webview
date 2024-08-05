import axiosInstance from 'apis/axiosInstance';
import { useQuery } from '@tanstack/react-query';
import { ResponseType } from 'apis/api';
import { SearchText } from 'models/searchText';

const getRecentSearch = async () => {
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

  const { data, refetch } = useQuery({
    queryKey,
    queryFn: () => getRecentSearch(),
    staleTime: 10000,
  });

  return {
    data: data?.data,
    refetch,
  };
};
