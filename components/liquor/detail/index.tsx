'use client';

import { useGetLiquorDetail } from 'apis/liquor/useGetLiquorDetail';
import DetailImage from './DetailImage';
import DetailInfo from './DetailInfo';
import DetailSnack from './DetailSnack';

/** 술 상세 컴포넌트 */
function LiquorDetail({ id }: { id: number }) {
  const { data: liquor } = useGetLiquorDetail(id);
  console.log(liquor);

  console.log(liquor.liquorDetailDto);
  // 표시할 태그 목록

  return (
    <>
      <DetailImage name={liquor.name} imgUrl={liquor.liquorPictureUrl} />
      <DetailInfo
        name={liquor.name}
        detailAbv={liquor.detailAbv}
        explanation={liquor.detailExplanation}
      />
      <div className="w-full h-2.5 bg-suldak-gray-200" />
      <DetailSnack snacks={liquor.liquorSnackRes} />
      <div className="w-full h-2.5 bg-suldak-gray-200" />
    </>
  );
}

export default LiquorDetail;
