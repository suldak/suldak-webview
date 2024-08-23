import Logo from "assets/pngs/image-logo-big.png";
import Line from "assets/icons/ico-line.svg";
import SmallLine from "assets/icons/ico-line-small.svg";
import Image from "next/image";
function CopySection() {
  return (
    <section className="flex h-[965px] w-full flex-col items-center justify-center bg-suldak-gray-100 py-[120px] text-[20px] font-light text-suldak-gray-900 mobile:h-[648px] mobile:py-[60px] mobile:text-[14px]">
      <div className="mb-[16px] flex h-[56px] w-[397px] items-center rounded-[40px] bg-suldak-mint-100 px-[30px] py-[16px] mobile:mb-[8px] mobile:h-[40px] mobile:w-[276px] mobile:px-[20px] mobile:py-[10px]">
        혼자가 편하지만 가끔 얘기할 사람이 필요해
      </div>
      <div className="mb-[16px] flex h-[56px] w-[385px] items-center text-wrap rounded-[40px] bg-suldak-mint-200 px-[30px] py-[16px] mobile:mb-[8px] mobile:h-[40px] mobile:w-[276px] mobile:px-[20px] mobile:py-[10px]">
        한 잔 하면서 새로운 사람도 만나보고 싶어
      </div>
      <div className="flex h-[56px] w-[337px] items-center rounded-[40px] bg-suldak-mint-100 px-[30px] py-[16px] mobile:h-[40px] mobile:w-[234px] mobile:px-[20px] mobile:py-[10px]">
        나랑 취향이 잘 맞는 사람은 없을까?
      </div>
      <div className="my-[60px] mobile:hidden">
        <Line />
      </div>
      <div className="my-[60px] pc:hidden tablet:hidden">
        <SmallLine />
      </div>
      <div className="mb-[14px] text-[28px] mobile:mb-[10px] mobile:text-center mobile:text-[16px] mobile:font-light">
        서로의 공통분모에서 시작하는 <br className="pc:hidden tablet:hidden" />
        새로운 모임 플랫폼
      </div>
      <div className="mobile:h-[74px] mobile:w-[136px] h-[102px] w-[190px]">
        <Image src={Logo} alt="logo" quality={100} />
      </div>
    </section>
  );
}

export default CopySection;
