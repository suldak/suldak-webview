"use client";

import DetailImage from "./DetailImage";
import DetailInfo from "./DetailInfo";
import DetailSnack from "./DetailSnack";
import DetailRecipe from "./DetailRecipe";
import HeadBackIcon from "assets/icons/ico-head-back-circle.svg";
import { Liquor } from "models/liquor";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useCallback, useEffect } from "react";
import { sendMessageToFlutter } from "app/liquor/utils/flutterBridge";

/** 술 상세 컴포넌트 */
function LiquorDetail({ liquorData }: { liquorData: Liquor }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const handleBack = useCallback(() => {
    const fromApp = searchParams.get("source") === "app";
    const hasHistory = window.history.length > 1;

    if (fromApp) {
      sendMessageToFlutter();
    } else if (hasHistory) {
      router.back();
    } else {
      sendMessageToFlutter();
    }
  }, [searchParams, router]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  }, []);

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!touchStartX) return;

      const touchEndX = e.touches[0].clientX;
      const diffX = touchEndX - touchStartX;

      if (diffX > 100) {
        handleBack();
        setTouchStartX(null);
      }
    },
    [touchStartX, handleBack],
  );

  const handleTouchEnd = useCallback(() => {
    setTouchStartX(null);
  }, []);

  useEffect(() => {
    return () => {
      setTouchStartX(null);
    };
  }, []);

  if (!liquorData) {
    return <div>데이터를 불러오는 중입니다...</div>;
  }

  // 표시할 태그 목록
  const newTags = [
    liquorData.liquorNameDto?.name,
    ...(liquorData.liquorSellDtos?.map((sell) => sell.name) || []),
    ...(liquorData.stateTypeDtos?.map((state) => state.name) || []),
    ...(liquorData.tasteTypeDtos?.map((taste) => taste.name) || []),
  ].filter(Boolean);

  return (
    <>
      <div
        className="relative"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <DetailImage
          name={liquorData.name}
          imgUrl={liquorData.liquorPictureUrl}
        />
        <div className="absolute left-4 top-4 z-10">
          <HeadBackIcon onClick={handleBack} />
        </div>
      </div>
      <DetailInfo
        name={liquorData.name}
        detailAbv={liquorData.detailAbv}
        explanation={liquorData.detailExplanation}
        tags={newTags}
      />
      <div className="h-2.5 w-full bg-suldak-gray-200" />
      <DetailSnack snacks={liquorData.liquorSnackRes} />
      <div className="h-2.5 w-full bg-suldak-gray-200" />
      <DetailRecipe
        recipe={liquorData.liquorRecipe}
        material={liquorData.liquorMaterialList}
      />
    </>
  );
}

export default LiquorDetail;
