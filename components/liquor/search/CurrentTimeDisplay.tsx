// 최근검색어 옆 현재시각을 띄우기 위한 컴포넌트
import React, { useEffect, useState } from 'react';

function CurrentTimeDisplay() {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateCurrentTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}시 기준`);
    };

    updateCurrentTime();
    const interval = setInterval(updateCurrentTime, 60 * 60 * 1000); // 1시간(60분)마다 업데이트

    return () => clearInterval(interval);
  }, []);

  return <>{currentTime}</>;
}

export default CurrentTimeDisplay;
