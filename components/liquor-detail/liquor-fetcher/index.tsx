import { useGetLiquorDetail } from 'apis/liquor/useGetLiquorDetail';

export default function LiquorFetcher() {
  const { data } = useGetLiquorDetail(5);
  console.log(data);

  return <></>;
}
