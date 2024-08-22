import TalkImg from "assets/icons/ico-talk.svg";
import CopyImg1 from "assets/pngs/image-copy-1.png";
import CopyImg2 from "assets/pngs/image-copy-2.png";
import Image from "next/image";

function ServiceSection() {
  return (
    <section className="text-suldak-gray-90 relative flex h-[933px] w-full flex-col bg-suldak-mint-50 mobile:h-[600px]">
      <div className="relative flex h-full w-full overflow-hidden mobile:flex-col pc:left-[200px] pc:items-center pc:justify-center">
        <div className="absolute left-1/2 top-1/2 h-[1143px] w-[1143px] -translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-full bg-[#E6F8F9] mobile:mt-[88px] mobile:h-[515px] mobile:w-[515px]"></div>
        <div className="absolute left-1/2 top-1/2 z-10 h-[826px] w-[826px] -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-suldak-mint-100 mobile:mt-[64px] mobile:h-[268px] mobile:w-[268px]"></div>

        <div className="relative z-20 flex w-full items-center justify-center mobile:top-[216px]">
          <div className="mobile: relative h-[693px] w-[320px] mobile:h-[320px] mobile:w-[148px] pc:mr-4">
            <Image src={CopyImg1} alt="copy-image1" fill quality={100} />
          </div>
          <div className="mobile: relative h-[693px] w-[320px] mobile:h-[320px] mobile:w-[148px]">
            <Image src={CopyImg2} alt="copy-image2" fill quality={100} />
          </div>
        </div>
      </div>
      <div className="absolute z-30 flex w-full flex-col mobile:top-[60px] mobile:items-center mobile:text-center pc:left-[360px] pc:top-[120px]">
        <TalkImg className="mobile:mb-[8px] pc:mb-4" />
        <div className="text-[32px] font-bold mobile:text-[22px]">
          좋은 분위기에,
          <br /> 좋은 술이 따른다
          <div className="text-[18px] font-normal mobile:text-[14px]">
            당신만을 위한 술 추천 서비스
          </div>
        </div>
      </div>
    </section>
  );
}

export default ServiceSection;
