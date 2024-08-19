import React, { ReactNode } from 'react';

interface GroupCardProps {
  children?: ReactNode;
}

function GroupCard({ children }: GroupCardProps) {
  return (
    <div className="flex flex-col flex-wrap p-[40px]  w-[450px] h-[347px] rounded-[20px] bg-white shadow-suldak-card">
      {children}
    </div>
  );
}

export default GroupCard;
