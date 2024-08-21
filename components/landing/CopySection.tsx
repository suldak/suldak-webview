import Logo from 'assets/icons/ico-logo.svg';
import Line from 'assets/icons/ico-line.svg';
function CopySection() {
  return (
    <section className="flex flex-col font-light items-center justify-center  w-full py-[120px] h-[965px] text-[20px] bg-suldak-gray-100 text-suldak-gray-900">
      <div className="flex w-[397px] h-[56px] bg-suldak-mint-100 px-[30px] py-[16px] rounded-[40px] mb-[16px] items-center">
        혼자가 편하지만 가끔 얘기할 사람이 필요해
      </div>
      <div className="flex items-center w-[385px] h-[56px] text-wrap bg-suldak-mint-200 px-[30px] py-[16px] rounded-[40px] mb-[16px]">
        한 잔 하면서 새로운 사람도 만나보고 싶어
      </div>
      <div className="flex items-center w-[337px] h-[56px] bg-suldak-mint-100 px-[30px] py-[16px] rounded-[40px]">
        나랑 취향이 잘 맞는 사람은 없을까?
      </div>
      <Line className="my-[45px]" />
      <div className="text-[28px] my-[14px]">
        서로의 공통분모에서 시작하는 새로운 모임 플랫폼
      </div>
      <Logo />
    </section>
  );
}

export default CopySection;
