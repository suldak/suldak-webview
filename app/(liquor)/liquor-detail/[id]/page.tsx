import { Suspense } from 'react';
import LineLikeIcon from 'assets/icons/ico-alcohol-like-line.svg';
import FillLineIcon from 'assets/icons/ico-alcohol-like-fill.svg';
import SnackIcon from 'assets/icons/ico-snack.svg';

import LiquorTag from 'components/liquor-detail/liquor-tag';
import LiquorSnack from 'components/liquor-detail/liquor-snack';
import LiquorFetcher from 'components/liquor-detail/liquor-fetcher';

export default function LiquorDetailPage() {
  return (
    <main>
      <Suspense fallback={<>Loading</>}>
        <LiquorFetcher />
      </Suspense>
      {/* 사진 */}
      <section>
        <div>
          <img
            className="w-full object-cover"
            src="https://via.placeholder.com/300"
            alt="주류 사진"
          />
        </div>
      </section>

      {/* 상세정보 */}
      <section className="px-5 pt-10 pb-50px">
        <div className="flex justify-between">
          <span className="text-suldak-orange-500 text-xs font-medium">
            ALC 14%
          </span>
          <span>
            <FillLineIcon />
          </span>
        </div>
        <p className="text-22px font-semibold text-suldak-gray-900">홍초주</p>
        <div className="text-base font-medium text-suldak-gray-900 leading-5.5">
          새콤달콤 홍초로 간단하게 만드는 소주 칵테일 새콤달콤 홍초로 간단하게
          만드는 소주 칵테일 새콤달콤 홍초로 간단하게 만드는 소주 칵테일 홍초로
          간단하게 만드
        </div>
        <div className="flex gap-1.5 mt-18px">
          <LiquorTag name="편의점" />
          <LiquorTag name="달달한" />
          <LiquorTag name="상큼" />
        </div>
      </section>
      <div className="w-full h-2.5 bg-suldak-gray-200" />

      <section className="pt-50px px-5 pb-50px">
        <div className="flex gap-1.5 items-center">
          <SnackIcon />
          <span className="text-suldak-gray-900 font-bold text-lg">
            이런 안주와 어울려요
          </span>
        </div>
        <div className="flex gap-3 mt-5">
          <LiquorSnack name="마른 안주" />
          <LiquorSnack name="치즈" />
        </div>
      </section>
      <div className="w-full h-2.5 bg-suldak-gray-200" />
    </main>
  );
}
