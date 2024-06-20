import LiquorTag from 'components/shared/LiquorCard/LiquorTag';
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
      <section className="px-5 pt-10 pb-50px">
        <div className="flex justify-between">
          <span className="text-suldak-orange-500 text-xs font-medium">
            ALC {detailAbv} %
          </span>
        </div>
        <p className="text-22px font-semibold text-suldak-gray-900">{name}</p>
        <div className="text-base font-medium text-suldak-gray-900 leading-5.5">
          {explanation}
        </div>
        <div className="flex gap-1.5 mt-18px">
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
