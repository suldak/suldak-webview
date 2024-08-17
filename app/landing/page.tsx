'use client';
import Image from 'next/image';
import HeadRight from 'assets/icons/ico-head-right.svg';
import HeadImg from 'assets/pngs/img-head.png';
import { useEffect, useState } from 'react';

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

      <button className="text-text-suldak-mint-500 flex items-center mt-4">
        지금 사전예약하기
        <HeadRight className="ml-2" />
      </button>
    </div>
  );
}

export default LandingPage;
