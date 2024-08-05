import axiosInstance from 'apis/axiosInstance';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const cleanRecentSearch = async () => {
  const { data } = await axiosInstance.delete(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/search/search-text/clean`,
  );
  console.log('recent', data);
  return data;
};

export const useCleanRecentSearch = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cleanRecentSearch,
    onSuccess: () => {
      // 성공 시 최근 검색어 쿼리를 무효화하여 재fetching 유도
      queryClient.invalidateQueries({ queryKey: ['recentSearches'] });
    },
  });
};
