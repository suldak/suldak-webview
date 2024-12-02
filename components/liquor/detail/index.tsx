"use client";

import { useGetLiquorDetail } from "apis/liquor/useGetLiquorDetail";
import DetailImage from "./DetailImage";
import DetailInfo from "./DetailInfo";
import DetailSnack from "./DetailSnack";
import DetailRecipe from "./DetailRecipe";
import HeadBackIcon from "assets/icons/ico-head-back-circle.svg";
import { useRouter } from "next/navigation";
import { useState } from "react";

/** 술 상세 컴포넌트 */
function LiquorDetail({ id }: { id: number }) {
  const { data: liquor } = useGetLiquorDetail(id);
  const router = useRouter();
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  // 표시할 태그 목록
  const newTags = [
    liquor.liquorNameDto.name,
    ...liquor.liquorSellDtos.map((sell) => sell.name),
    ...liquor.stateTypeDtos.map((state) => state.name),
    ...liquor.tasteTypeDtos.map((taste) => taste.name),
  ];

  const handleBack = () => {
    router.back();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStartX) return;

    const touchEndX = e.touches[0].clientX;
    const diffX = touchEndX - touchStartX;

    if (diffX > 100) {
      // 스와이프 거리가 100px 이상일 때만 동작
      handleBack();
      setTouchStartX(null); // 스와이프 처리 후 초기화
    }
  };

  const handleTouchEnd = () => {
    setTouchStartX(null); // 터치 종료 시 초기화
  };

  return (
    <>
      <div
        className="relative"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <DetailImage name={liquor.name} imgUrl={liquor.liquorPictureUrl} />
        <div className="absolute left-4 top-4 z-10">
          <HeadBackIcon onClick={handleBack} />
        </div>
      </div>
      <DetailInfo
        name={liquor.name}
        detailAbv={liquor.detailAbv}
        explanation={liquor.detailExplanation}
        tags={newTags}
      />
      <div className="h-2.5 w-full bg-suldak-gray-200" />
      <DetailSnack snacks={liquor.liquorSnackRes} />
      <div className="h-2.5 w-full bg-suldak-gray-200" />
      <DetailRecipe
        recipe={liquor.liquorRecipe}
        material={liquor.liquorMaterialDtos}
      />
    </>
  );
}

export default LiquorDetail;
