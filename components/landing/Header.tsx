import Image from 'next/image';
import HeadRight from 'assets/icons/ico-head-right.svg';
import HeadImg from 'assets/pngs/img-head.png';

interface HeaderProps {
  scrollToReservation: () => void;
}

function Header({ scrollToReservation }: HeaderProps) {
  return (
    <>
      <div className="w-full relative h-[900px]">
        <Image
          src={HeadImg}
          alt="Header Image"
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>
      <section className="absolute top-[100px] left-1/2 transform -translate-x-1/2 text-center">
        <div className="mb-4 text-[42px] font-medium font-GMarket text-white text-nowrap">
          나와 우리, 그리고 한 잔의 술
          <div className="text-[64px] font-bold">
            술닥술닥에서 한 잔 하실래요?
          </div>
        </div>
        <div className="text-[20px] text-white my-[16px] font-medium">
          관심사를 함께 나누며 즐겁게 한 잔!
          <br />
          당신의 취향을 술닥술닥에서 만나보세요.
        </div>
        <button
          className="bg-white text-suldak-mint-500 flex font-bold items-center px-[20px] py-[16px] rounded-full mx-auto"
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
