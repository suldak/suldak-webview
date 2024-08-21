import TalkImg from 'assets/icons/ico-talk.svg';
import CopyImg1 from 'assets/icons/ico-copy-recommend-1.svg';
import CopyImg2 from 'assets/icons/ico-copy-recommend-2.svg';

function ServiceSection() {
  return (
    <section className="flex flex-col h-[933px] w-full relative text-suldak-gray-90 bg-suldak-mint-50">
      <div className="flex w-full h-full left-[200px] items-center justify-center relative overflow-hidden">
        <div className="absolute w-[1143px] h-[1143px] bg-[#E6F8F9] rounded-full left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute w-[826px] h-[826px] bg-suldak-mint-100 rounded-full z-10 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>

        <div className="relative z-20 flex justify-center items-center w-full">
          <CopyImg1 className="mr-4" />
          <CopyImg2 className="ml-4" />
        </div>
      </div>
      <div className="flex flex-col absolute z-30 top-[120px] left-[360px]">
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
