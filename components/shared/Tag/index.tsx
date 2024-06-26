'use client';
import { TagProps } from './types';

/** Tag 컴포넌트 */
function Tag({ children, tagType, tagId, selected, onClick }: TagProps) {
  let tagStyle = '';

  if (selected) {
    tagStyle += 'border border-suldak-mint-500 text-suldak-mint-500';
  } else {
    switch (tagType) {
      case 'blue':
        tagStyle = 'bg-suldak-mint-50 text-suldak-mint-500 text-[14px] font-medium';
        break;
      case 'gray':
        tagStyle =
          'bg-white text-suldak-gray-900 border-suldak-gray-400 text-[14px]  border';
        break;
    }
  }

  const handleClick = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    if (onClick) {
      onClick(tagId);
    }
  };

  return (
    <span
      className={`inline-flex items-center justify-center py-2.5 px-4 rounded-30px text-black ${tagStyle}`}
      onClick={handleClick}
    >
      {children}
    </span>
  );
}
export default Tag;
