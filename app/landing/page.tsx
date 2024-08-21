'use client';
import { useEffect, useRef, useState } from 'react';
import CopySection from 'components/landing/CopySection';
import ServiceSection from 'components/landing/ServiceSection';
import ReviewSection from 'components/landing/ReviewSection';
import Header from 'components/landing/Header';
import GroupSection from 'components/landing/GroupSection';
import ReservationSection from 'components/landing/ReservationSection';
import NavigationBar from 'components/landing/NavigationBar';
import ReservationToaster from 'components/landing/ReservationToaster';

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
      <ReservationToaster />
    </div>
  );
}

export default LandingPage;
