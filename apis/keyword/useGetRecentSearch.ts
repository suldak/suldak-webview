import axiosInstance from 'apis/axiosInstance';
import { useQuery } from '@tanstack/react-query';
import { ResponseType } from 'apis/api';
import { SearchText } from 'models/searchText';

const getRecentSearch = async (): Promise<ResponseType<SearchText[]>> => {
  const { data } = await axiosInstance.get<ResponseType<SearchText[]>>(
    `http://122.45.203.134:8080/api/search/search-text`,
    {
      params: {
        searchType: 'LIQUOR',
      },
    },
  );
  console.log('recent', data);
  return data;
};

export const useGetRecentSearch = () => {
  const queryKey = ['liquor-search'];

  const { data } = useQuery({
    queryKey,
    queryFn: () => getRecentSearch(),
    staleTime: 5000,
  });

  return {
    data: data?.data,
  };
};
