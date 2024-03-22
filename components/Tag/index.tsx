'use client';
import { ComponentPropsWithRef } from 'react';
import { TagProps } from './types';

/** Tag 컴포넌트 */
const Tag = ({ children, tagType, tagId, selected, onClick }: TagProps) => {
  let tagStyle = '';

  if (selected) {
    tagStyle += 'border border-suldak-mint-500 text-suldak-mint-500';
  } else {
    switch (tagType) {
      case 'blue':
        tagStyle = 'bg-suldak-mint-50 text-suldak-mint-500 text-sm font-medium';
        break;
      case 'gray':
        tagStyle =
          'bg-white text-suldak-gray-900 border-suldak-gray-400 text-sm border';
        break;
    }
  }

  return (
    <div
      className={`flex items-center justify-center py-2.5 px-4 rounded-30px text-black ${tagStyle}`}
    >
      {children}
    </div>
  );
};

export default Tag;
