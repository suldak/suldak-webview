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


  return (
    <span
      className={`inline-flex cursor-default select-none items-center justify-center rounded-30px px-4 py-2.5 text-black ${tagStyle}`}
      onClick={handleClick}
    >
      {children}
    </span>
  );
}

export default Tag;
