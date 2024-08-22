import LiquorTag from "components/shared/LiquorCard/LiquorTag";
interface DetailInfoProps {
  detailAbv?: number;
  name?: string;
  explanation?: string;
  tags?: string[];
}

/** 술 정보 컴포넌트 */
function DetailInfo({
  detailAbv,
  name,
  explanation,
  tags = [],
}: DetailInfoProps) {
  return (
    <>
      <section className="px-5 pb-50px pt-10">
        <div className="flex justify-between">
          <span className="text-xs font-medium text-suldak-orange-500">
            ALC {detailAbv} %
          </span>
        </div>
        <p className="text-22px font-semibold text-suldak-gray-900">{name}</p>
        <div className="leading-5.5 text-base font-medium text-suldak-gray-900">
          {explanation}
        </div>
        <div className="mt-18px flex gap-1.5">
          {/* 실제 태그 우선순위 기반으로 보여주도록 작업 필요 */}
          {tags.slice(0, 3).map((tag) => (
            <LiquorTag key={tag} name={tag} />
          ))}
        </div>
      </section>
    </>
  );
}

export default DetailInfo;
