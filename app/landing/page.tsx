'use client';
import Image from 'next/image';
import HeadRight from 'assets/icons/ico-head-right.svg';
import HeadImg from 'assets/pngs/img-head.png';
import TalkImg from 'assets/icons/ico-talk.svg';
import { useEffect, useState } from 'react';
import GroupCarousel from 'components/landing/GroupCarousel';
import DescriptSection from 'components/landing/DescriptSection';
import ServiceSection from 'components/landing/ServiceSection';
function LandingPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="w-full flex flex-col items-center justify-center">
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
        <div className="mb-4 text-[70px]  font-WAGURI text-white text-nowrap">
          나와 우리, 그리고 한 잔의 술 <br />
          술닥술닥에서 한 잔 하실래요?
        </div>
        <div className="text-[20px] text-white my-[16px]">
          관심사를 함께 나누며 즐겁게 한 잔!
          <br />
          당신의 취향을 술닥술닥에서 만나보세요.
        </div>
        <button className="bg-white text-suldak-mint-500 flex items-center px-4 py-2 rounded-full mx-auto">
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
    </div>
  );
}

export default LandingPage;
