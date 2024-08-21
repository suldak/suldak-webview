'use client';
import { useEffect, useRef, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import CopySection from 'components/landing/CopySection';
import ServiceSection from 'components/landing/ServiceSection';
import ReviewSection from 'components/landing/ReviewSection';
import Header from 'components/landing/Header';
import GroupSection from 'components/landing/GroupSection';
import ReservationSection from 'components/landing/ReservationSection';
import NavigationBar from 'components/landing/NavigationBar';

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
    <div className="w-full flex flex-col items-center justify-center">
      <Header scrollToReservation={scrollToReservation} />
      <CopySection />
      <GroupSection />
      <ServiceSection />
      <ReviewSection />
      <ReservationSection ref={reservationRef} />
      <NavigationBar scrollToReservation={scrollToReservation} />
      <div className="flex w-full text-black text-[25px] shadow-suldak-card">
        <Toaster
          position="top-center"
          containerStyle={{
            top: 300,
          }}
          toastOptions={{
            duration: 3000,
            style: {
              padding: '16px 24px',
              maxWidth: '90vw',
              width: 'auto',
              fontSize: '25px',
              lineHeight: '1.5',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              background: 'white',
              color: 'black',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              borderRadius: '8px',
            },
            success: {
              icon: (
                <span style={{ fontSize: '30px', marginRight: '8px' }}>✅</span>
              ),
            },
            error: {
              icon: (
                <span style={{ fontSize: '30px', marginRight: '8px' }}>❌</span>
              ),
            },
          }}
        />
      </div>
    </div>
  );
}

export default LandingPage;
