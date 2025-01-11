"use client";

import { useGetLiquorDetail } from "apis/liquor/useGetLiquorDetail";
import DetailImage from "./DetailImage";
import DetailInfo from "./DetailInfo";
import DetailSnack from "./DetailSnack";
import DetailRecipe from "./DetailRecipe";
import HeadBackIcon from "assets/icons/ico-head-back-circle.svg";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

/** 술 상세 컴포넌트 */
function LiquorDetail({ id }: { id: number }) {
  const { data: liquor } = useGetLiquorDetail(id);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  // 표시할 태그 목록
  const newTags = [
    liquor.liquorNameDto.name,
    ...liquor.liquorSellDtos.map((sell) => sell.name),
    ...liquor.stateTypeDtos.map((state) => state.name),
    ...liquor.tasteTypeDtos.map((taste) => taste.name),
  ];

  const handleBack = () => {
    // Flutter 브릿지를 통한 뒤로가기
    const sendMessageToFlutter = () => {
      console.log("Attempting to send message to Flutter...");
      try {
        if (window.FlutterBridge) {
          console.log("Flutter bridge detected, sending message...");
          window.FlutterBridge.postMessage("goBack");
          console.log("Message sent to Flutter successfully");
        } else {
          console.warn(
            "No Flutter bridge detected. Are you running in a Flutter WebView?",
          );
        }
      } catch (error) {
        console.error("Error sending message to Flutter:", error);
      }
    };

    // 이전 페이지 존재 여부 확인
    const hasHistory = window.history.length > 1;
    const fromApp = searchParams.get("source") === "app";

    if (fromApp) {
      sendMessageToFlutter();
    } else if (hasHistory) {
      router.back();
    }
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
