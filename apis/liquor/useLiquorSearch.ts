import axiosInstance from 'apis/axiosInstance';
import { useQuery } from '@tanstack/react-query';
import { LiquorSearchParams, ResponseType } from 'apis/api';
import { Liquor } from 'models/liquor';

const getLiquorSearch = async ({
  tag,
  isRecommend,
  ...priKeys
}: LiquorSearchParams): Promise<ResponseType<{ content: Liquor[] }>> => {
  const { data } = await axiosInstance.get<ResponseType<{ content: Liquor[] }>>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/liquor/view/liquor-search/`,
    {
      params: {
        searchTag: tag,
        isRecommend,
        ...priKeys,
      },
    },
  );
  return data;
};

export const useLiquorSearch = (
  { tag, isRecommend, ...priKeys }: LiquorSearchParams,
  searchKey: string,
) => {
  return useQuery({
    queryKey: ['liquor-search', searchKey],
    queryFn: () =>
      getLiquorSearch({
        tag,
        isRecommend: isRecommend === '인기순' ? 'false' : 'true',
        ...priKeys,
      }),
    select: (data) => ({ data: data.data }),
    enabled: !!searchKey,
  });
};
app / (liquor - search) / liquor - search / [query] / layout.tsx;