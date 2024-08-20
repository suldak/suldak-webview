'use client';
import Image from 'next/image';
import HeadRight from 'assets/icons/ico-head-right.svg';
import HeadImg from 'assets/pngs/img-head.png';
import TalkImg from 'assets/icons/ico-talk.svg';
import { useEffect, useRef, useState } from 'react';
import GroupCarousel from 'components/landing/GroupCarousel';
import DescriptSection from 'components/landing/DescriptSection';
import ServiceSection from 'components/landing/ServiceSection';
import ReviewSection from 'components/landing/ReviewSection';
import ReservationImg from 'assets/pngs/bg-reservation.png';
import TabBar from 'components/landing/TabBar';
import Logo from 'assets/icons/ico-logo.svg';
function LandingPage() {
  const [isMounted, setIsMounted] = useState(false);
  const reservationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const scrollToReservation = () => {
    reservationRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="w-full flex flex-col items-center justify-center relative">
      <div className="w-full relative aspect-[2.13]">
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
          <HeadRight className="ml-2" />
        </button>
      </section>
      <DescriptSection />

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
      <ServiceSection />
      <ReviewSection />
      <div className="w-full relative h-[684px]" ref={reservationRef}>
        <Image
          src={ReservationImg}
          alt={'사전예약'}
          layout="fill"
          objectFit="cover"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10">
          <div className="text-[80px] font-bold">술닥술닥 사전예약</div>
          <div className="text-[30px] mb-[40px]">
            메일주소를 입력하시면 술닥술닥의 오픈 소식을 알려드릴게요!
          </div>
          <div className="flex">
            <input
              className="w-[809px] h-[68px] px-4 text-black bg-white/50 rounded-[10px]"
              placeholder=""
            />
            <button className="rounded-[10px] ml-[20px] text-[25px] bg-white text-suldak-mint-500 w-[233px] h-[68px] font-bold">
              Subscribe
            </button>
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 justify-center  w-[1200px] flex bg-white text-[20px] items-center rounded-[20px] z-50">
        <Logo />
        <div>즐거운 술 문화를 위한 플랫폼</div>
        <button
          className="bg-suldak-mint-500 rounded-[30px] text-white px-[20px] py-[10px]"
          onClick={scrollToReservation}
        >
          사전예약
          <HeadRight />
        </button>
        <button className="bg-suldak-mint-500 rounded-[30px]  text-white px-[20px] py-[10px]">
          블로그 보기
          <HeadRight />
        </button>
      </div>
    </div>
  );
}

export default LandingPage;
