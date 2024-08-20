// 최근검색어 옆 현재시각을 띄우기 위한 컴포넌트
import { useEffect, useState } from 'react';

function CurrentTimeDisplay() {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateCurrentTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      setCurrentTime(`${hours}시 기준`);
    };

    updateCurrentTime(); // 즉시 실행
    const interval = setInterval(updateCurrentTime, 60000); // 1분마다 업데이트

    return () => clearInterval(interval);
  }, []);

  return <div className="text-sm text-gray-500">{currentTime}</div>;
}

export default CurrentTimeDisplay;
