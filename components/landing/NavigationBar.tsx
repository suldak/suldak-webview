"use client";

import SmallLogo from "assets/pngs/image-logo-small.png";
import HeadRight from "assets/icons/ico-head-right.svg";
import Image from "next/image";

interface NavigationProps {
  scrollToReservation?: () => void;
}

function NavigationBar({ scrollToReservation }: NavigationProps) {
  return (
    <div className="fixed bottom-0 z-40 flex w-full justify-center">
      <div className="w-full max-w-[1200px] bg-white shadow-suldak-card mobile:rounded-t-[20px] pc:rounded-[12px]">
        <div className="flex items-center justify-between px-6 py-4 text-[20px]">
          <div className="flex items-center">
            <div className="relative h-[48px] w-[90px] mobile:h-[42px] mobile:w-[78px] pc:mr-[20px]">
              <Image src={SmallLogo} alt="logo" fill />
            </div>
            <div className="mobile:hidden">즐거운 술 문화를 위한 플랫폼</div>
          </div>
          <div className="flex space-x-4">
            {scrollToReservation && (
              <button
                className="flex items-center rounded-[30px] bg-suldak-mint-500 px-[20px] py-[10px] text-[16px] text-white mobile:text-[14px]"
                onClick={scrollToReservation}
              >
                사전예약
                <HeadRight className="ml-2" fill="white" />
              </button>
            )}
            <button className="flex items-center rounded-[30px] bg-suldak-mint-500 px-[20px] py-[10px] text-[16px] text-white mobile:hidden">
              블로그 보기
              <HeadRight className="ml-2" fill="white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavigationBar;
