import TalkImg from "assets/icons/ico-talk.svg";
import GroupCarousel from "./GroupCarousel";

function GroupSection() {
  return (
    <section className="flex h-[920px] w-full flex-col py-[184px] text-suldak-gray-900 mobile:h-[443px] mobile:py-[60px] mobile:text-center tablet:text-center pc:pr-[215px]">
      <div className="flex h-[142px] w-[390px] flex-col text-[32px] mobile:justify-center mobile:text-[22px] tablet:w-full tablet:justify-center pc:ml-[18%] pc:w-[309px]">
        <div className="flex flex-col font-bold mobile:items-center tablet:items-center">
          <div className="mobile:mb-[8px] tablet:mb-[8px]">
            <TalkImg />
          </div>
          내가 있는 그곳이 바로! <br />
          만남의 장소
        </div>
        <p className="text-[18px] mobile:text-[14px]">
          손쉽게 만날 수 있는 온/오프라인 모임만들기
        </p>
      </div>
      <GroupCarousel />
    </section>
  );
}

export default GroupSection;
