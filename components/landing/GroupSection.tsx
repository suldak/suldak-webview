import TalkImg from 'assets/icons/ico-talk.svg';
import GroupCarousel from './GroupCarousel';

function GroupSection() {
  return (
    <section className="flex flex-col h-[920px] w-full text-suldak-gray-900">
      <div className="text-[32px] ml-[360px] mt-[184px] w-[309px]">
        <div className="font-bold">
          <TalkImg />
          내가 있는 그곳이 바로! <br />
          만남의 장소
        </div>
        <p className="text-[18px]">
          손쉽게 만날 수 있는 온/오프라인 모임만들기
        </p>
      </div>
      <GroupCarousel />
    </section>
  );
}

export default GroupSection;
