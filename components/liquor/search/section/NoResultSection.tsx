import NoResultIcon from 'assets/icons/ico-no-result.svg';
import PensiveFace from 'assets/icons/ico-pensive-face.svg';
function NoResultSection() {
  return (
    <div className="flex-row gap-y-[12px] items-center">
      <div className="flex justify-center mb-[12px]">
        <NoResultIcon />
      </div>
      <div className="flex justify-center text-suldak-gray-900">
        검색 결과가 없어요&nbsp;
        <PensiveFace />
      </div>
      <div className="flex justify-center text-suldak-gray-600">
        다른 검색어를 입력하거나
      </div>
      <div className="flex justify-center text-suldak-gray-600">
        검색 랭킹을 참고해 보는 건 어떨까요?
      </div>
    </div>
  );
}

export default NoResultSection;
