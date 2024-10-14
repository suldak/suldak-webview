import axiosInstance from 'apis/axiosInstance';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const deleteRecentSearch = async (id: number) => {
  const { data } = await axiosInstance.delete(
    `/api/search/search-text/${id}`,
  );
  return data;
};

export const useDeleteRecentSearch = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteRecentSearch(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recent-searches'] });
    },
  });
};
