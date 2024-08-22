import Image from "next/image";
import HeadRight from "assets/icons/ico-head-right.svg";
import HeadImg from "assets/pngs/image-head.png";
import HeadSmallImg from "assets/pngs/image-head-small.png";

interface HeaderProps {
  scrollToReservation: () => void;
}

function Header({ scrollToReservation }: HeaderProps) {
  return (
    <>
      <div className="relative w-full pc:h-[900px]">
        <Image
          src={HeadImg}
          alt="Header Image"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="relative mobile:h-[600px] mobile:w-full pc:hidden">
        <Image
          src={HeadSmallImg}
          alt="Header Image"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <section className="absolute left-1/2 top-[100px] -translate-x-1/2 transform text-center">
        <div className="mb-4 text-nowrap font-GMarket text-[42px] font-medium text-white mobile:text-[20px]">
          나와 우리, 그리고 한 잔의 술
          <div className="text-[64px] font-bold mobile:text-[36px]">
            술닥술닥에서 <br className="pc:hidden" />한 잔 하실래요?
          </div>
        </div>
        <div className="my-[16px] text-[20px] font-medium text-white mobile:text-[14px]">
          관심사를 함께 나누며 즐겁게 한 잔!
          <br />
          당신의 취향을 술닥술닥에서 만나보세요.
        </div>
        <button
          className="mx-auto flex items-center rounded-full bg-white px-[20px] py-[16px] font-bold text-suldak-mint-500"
          onClick={scrollToReservation}
        >
          지금 사전예약하기
          <HeadRight className="ml-2" fill="#08BECA" />
        </button>
      </section>
    </>
  );
}

export default Header;
