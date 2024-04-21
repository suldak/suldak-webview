'use client';

import { useGetLiquorDetail } from 'apis/liquor/useGetLiquorDetail';
import DetailImage from './DetailImage';
import DetailInfo from './DetailInfo';
import DetailSnack from './DetailSnack';

/** 술 상세 컴포넌트 */
function LiquorDetail({ id }: { id: number }) {
  const { data: liquor } = useGetLiquorDetail(id);

  // 표시할 태그 목록
  const newTags = [
    liquor.liquorNameDto.name,
    ...liquor.liquorSellDtos.map((sell) => sell.name),
    ...liquor.stateTypeDtos.map((state) => state.name),
    ...liquor.tasteTypeDtos.map((taste) => taste.name),
  ];

  return (
    <>
      <DetailImage name={liquor.name} imgUrl={liquor.liquorPictureUrl} />
      <DetailInfo
        name={liquor.name}
        detailAbv={liquor.detailAbv}
        explanation={liquor.detailExplanation}
        tags={newTags}
      />
      <div className="w-full h-2.5 bg-suldak-gray-200" />
      <DetailSnack snacks={liquor.liquorSnackRes} />
      <div className="w-full h-2.5 bg-suldak-gray-200" />
    </>
  );
}

export default LiquorDetail;
