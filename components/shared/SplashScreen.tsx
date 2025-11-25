"use client";

/** 스켈레톤 애니메이션 클래스 */
const skeletonClass = "animate-pulse bg-suldak-gray-200";

/** 술 상세 페이지 스켈레톤 스플래시 화면 */
function SplashScreen() {
  return (
    <div className="min-h-screen bg-white">
      {/* 이미지 영역 스켈레톤 */}
      <div className="relative">
        <div className={`h-[400px] w-full ${skeletonClass}`} />
        {/* 뒤로가기 버튼 위치 */}
        <div className="absolute left-4 top-4 z-10">
          <div className={`h-10 w-10 rounded-full ${skeletonClass}`} />
        </div>
      </div>

      {/* 정보 영역 스켈레톤 */}
      <section className="px-5 pb-[50px] pt-10">
        {/* 알코올 도수 */}
        <div className={`h-4 w-16 rounded ${skeletonClass}`} />
        {/* 이름 */}
        <div className={`mt-2 h-7 w-40 rounded ${skeletonClass}`} />
        {/* 설명 */}
        <div className="mt-3 space-y-2">
          <div className={`h-5 w-full rounded ${skeletonClass}`} />
          <div className={`h-5 w-4/5 rounded ${skeletonClass}`} />
          <div className={`h-5 w-3/5 rounded ${skeletonClass}`} />
        </div>
        {/* 태그 */}
        <div className="mt-[18px] flex gap-1.5">
          <div className={`h-6 w-16 rounded-full ${skeletonClass}`} />
          <div className={`h-6 w-20 rounded-full ${skeletonClass}`} />
          <div className={`h-6 w-14 rounded-full ${skeletonClass}`} />
        </div>
      </section>

      {/* 구분선 */}
      <div className="h-2.5 w-full bg-suldak-gray-200" />

      {/* 안주 추천 영역 스켈레톤 */}
      <section className="px-5 py-6">
        <div className={`h-6 w-24 rounded ${skeletonClass}`} />
        <div className="mt-4 flex gap-3">
          <div className={`h-20 w-20 rounded-lg ${skeletonClass}`} />
          <div className={`h-20 w-20 rounded-lg ${skeletonClass}`} />
          <div className={`h-20 w-20 rounded-lg ${skeletonClass}`} />
        </div>
      </section>

      {/* 구분선 */}
      <div className="h-2.5 w-full bg-suldak-gray-200" />

      {/* 레시피 영역 스켈레톤 */}
      <section className="px-5 py-6">
        <div className={`h-6 w-20 rounded ${skeletonClass}`} />
        <div className="mt-4 space-y-3">
          <div className={`h-5 w-full rounded ${skeletonClass}`} />
          <div className={`h-5 w-5/6 rounded ${skeletonClass}`} />
          <div className={`h-5 w-4/6 rounded ${skeletonClass}`} />
        </div>
      </section>
    </div>
  );
}

export default SplashScreen;
