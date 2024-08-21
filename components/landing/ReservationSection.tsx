'use client';
import Image from 'next/image';
import ReservationImg from 'assets/pngs/bg-reservation.png';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useEnrollReservation } from 'apis/landing/useEnrollReservation';

const ReservationSection = React.forwardRef<HTMLDivElement, {}>(
  (_props, ref) => {
    const [email, setEmail] = useState('');
    const enrollMutation = useEnrollReservation();

    const handleSubscribe = () => {
      if (email.trim()) {
        enrollMutation.mutate(email, {
          onSuccess: (data) => {
            if (process.env.NODE_ENV === 'development') {
              console.log('Enrollment response:', data);
            }
            toast.success('성공적으로 등록되었습니다!');
            setEmail(''); // 성공 시 입력 필드 초기화
          },
          onError: (error) => {
            toast.error(' 오류: 다시 시도해주세요.');
          },
        });
      }
    };

    return (
      <div className="w-full relative h-[684px]" ref={ref}>
        <Image
          src={ReservationImg}
          alt={'사전예약'}
          layout="fill"
          objectFit="cover"
        />
        <div className="absolute w-full inset-0 flex flex-col items-center justify-center text-white z-10">
          <div className="text-[80px] font-bold">술닥술닥 사전예약</div>
          <div className="text-[30px] mb-[40px]">
            메일주소를 입력하시면 술닥술닥의 오픈 소식을 알려드릴게요!
          </div>
          <div className="flex justify-center text-[25px]">
            <input
              className="w-[809px] h-[68px] text-black bg-white/50 rounded-[10px] px-4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
            />
            <button
              className="rounded-[10px] ml-[20px] text-[25px] bg-white text-suldak-mint-500 w-[233px] h-[68px] font-bold"
              onClick={handleSubscribe}
              disabled={enrollMutation.isPending || !email.trim()}
            >
              {enrollMutation.isPending ? '처리 중...' : 'Subscribe'}
            </button>
          </div>
        </div>
      </div>
    );
  },
);

ReservationSection.displayName = 'ReservationSection';

export default ReservationSection;
