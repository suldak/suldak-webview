'use client';
import { ComponentPropsWithRef } from 'react';

type TagType = 'gray' | 'blue';

interface TagProps extends ComponentPropsWithRef<'div'> {
  tagId: number;
  onDelete?: (id: number) => void;
  tagType: TagType;
}

/** Tag 컴포넌트 */
const Tag = ({ children, onDelete, tagType, tagId }: TagProps) => {
  let tagStyle = '';
  switch (tagType) {
    case 'blue':
      tagStyle = 'bg-suldak-mint-50 text-suldak-mint-500 text-sm font-medium';
      break;
    case 'gray':
      tagStyle = 'bg-white text-suldak-gray-900 border-suldak-gray-400 border';
      break;
  }
  return (
    <div
      className={`flex items-center justify-center w-fit py-2.5 px-4 rounded-full text-black ${tagStyle}`}
    >
      {children}
      {onDelete && <div onClick={() => onDelete(tagId)}>x</div>}
    </div>
  );
};

export default Tag;
