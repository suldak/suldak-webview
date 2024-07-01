import axiosInstance from 'apis/axiosInstance';
import { useQuery } from '@tanstack/react-query';
import { ResponseType } from 'apis/api';
import { Liquor } from 'models/liquor';

type LiquorSearchParams = {
  tag: string;
  isRecommend?: string;
  liquorNamePriKeys?: string;
  liquorDetailPriKeys?: string;
  liquorAbvPriKeys?: string;
  sellPriKeys?: string;
};

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

export const useLiquorSearch = ({
  tag,
  isRecommend,
  ...priKeys
}: LiquorSearchParams) => {
  const queryKey = tag ? ['liquor-search', tag] : [];
  return useQuery({
    queryKey,
    queryFn: () =>
      getLiquorSearch({
        tag,
        isRecommend: isRecommend === '인기순' ? 'false' : 'true',
        ...priKeys,
      }),
    select: (data) => ({ data: data.data }),
  });
};
