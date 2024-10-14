import axiosInstance from 'apis/axiosInstance';
import { useQuery } from '@tanstack/react-query';
import { ResponseType } from 'apis/api';
import { SearchText } from 'models/searchText';

const getRecentSearch = async () => {
  const { data } = await axiosInstance.get<ResponseType<SearchText[]>>(
    `/api/search/search-text`,
    {
      params: {
        searchType: 'LIQUOR',
      },
    },
  );

  return data;
};

export const useGetRecentSearch = () => {
  const queryKey = ['recent-searches'];

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
