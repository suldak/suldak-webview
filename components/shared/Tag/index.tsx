"use client";
import { TagProps } from "./types";

/** Tag 컴포넌트 */
function Tag({ children, tagColor, tagId, selected, onClick }: TagProps) {
  let tagStyle = "";

  if (selected) {
    tagStyle =
      "bg-suldak-mint-50 border border-suldak-mint-500 text-suldak-mint-500 text-[14px] font-medium";
    if (tagColor == "mint") {
      tagStyle = "bg-suldak-mint-500 text-white text-[14px]";
    }
  } else {
    switch (tagColor) {
      case "blue":
        tagStyle =
          "bg-suldak-mint-50 text-suldak-mint-500 text-[14px] font-medium";
        break;
      case "gray":
        tagStyle =
          "bg-white text-suldak-gray-900 border-suldak-gray-400 text-[14px] border";
        break;
      default:
        tagStyle =
          "bg-white text-suldak-gray-900 border-suldak-gray-400 text-[14px] border";
        break;
    }
  }

  const handleClick = (event: React.MouseEvent<HTMLSpanElement>) => {
    if (onClick) {
      onClick(event, children as string);
    }
  };

  // 모든 마우스/터치 관련 이벤트를 방지하는 핸들러
  const preventDefault = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <span
      className={`inline-flex cursor-default select-none items-center justify-center rounded-30px px-4 py-2.5 text-black [-webkit-user-drag:none] [user-drag:none] ${tagStyle}`}
      onClick={handleClick}
      draggable={false}
      onDragStart={preventDefault}
      onMouseDown={preventDefault}
      onTouchStart={preventDefault}
      onTouchMove={preventDefault}
      onTouchEnd={preventDefault}
    >
      {children}
    </span>
  );
}

export default Tag;
