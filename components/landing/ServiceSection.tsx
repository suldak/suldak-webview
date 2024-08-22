import TalkImg from "assets/icons/ico-talk.svg";
import CopyImg1 from "assets/icons/ico-copy-recommend-1.svg";
import CopyImg2 from "assets/icons/ico-copy-recommend-2.svg";

function ServiceSection() {
  return (
    <section className="text-suldak-gray-90 relative flex h-[933px] w-full flex-col bg-suldak-mint-50">
      <div className="relative left-[200px] flex h-full w-full items-center justify-center overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[1143px] w-[1143px] -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-[#E6F8F9]"></div>
        <div className="absolute left-1/2 top-1/2 z-10 h-[826px] w-[826px] -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-suldak-mint-100"></div>

        <div className="relative z-20 flex w-full items-center justify-center">
          <CopyImg1 className="mr-4" />
          <CopyImg2 className="ml-4" />
        </div>
      </div>
      <div className="absolute left-[360px] top-[120px] z-30 flex flex-col">
        <TalkImg className="mb-4" />
        <div className="text-[32px] font-bold">
          좋은 분위기에,
          <br /> 좋은 술이 따른다
          <div className="text-[18px] font-normal">
            당신만을 위한 술 추천 서비스
          </div>
        </div>
      </div>
    </section>
  );
}

export default ServiceSection;
