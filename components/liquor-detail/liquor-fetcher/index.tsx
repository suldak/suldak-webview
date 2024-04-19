import { useGetLiquorDetail } from 'apis/liquor/useGetLiquorDetail';
import SnackIcon from 'assets/icons/ico-snack.svg';

import LiquorTag from '../liquor-tag';
import LiquorSnack from '../liquor-snack';
// import { BASE_URL } from 'app/(liquor-search)/liquor-search/page';

export default function LiquorFetcher({ id }: { id: number }) {
  const { data } = useGetLiquorDetail(id);
  console.log(data);

  return (
    <>
      <section>
        <div>
          <img
            className="w-full object-cover"
            // src={`${BASE_URL}${data.liquorPictureUrl}`}
            alt={`${data.name} 사진`}
          />
        </div>
      </section>

      {/* 상세정보 */}
      <section className="px-5 pt-10 pb-50px">
        <div className="flex justify-between">
          <span className="text-suldak-orange-500 text-xs font-medium">
            ALC {data.detailAbv} %
          </span>
        </div>
        <p className="text-22px font-semibold text-suldak-gray-900">
          {data.name}
        </p>
        <div className="text-base font-medium text-suldak-gray-900 leading-5.5">
          {data.detailExplanation}
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
          {data.liquorSnackRes.map((snack) => (
            <LiquorSnack key={snack.id} name={snack.name} />
          ))}
        </div>
      </section>
      <div className="w-full h-2.5 bg-suldak-gray-200" />
    </>
  );
}
