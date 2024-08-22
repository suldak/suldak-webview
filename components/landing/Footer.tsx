import React from "react";

interface FooterProps {
  ref?: React.RefObject<HTMLDivElement>;
}

const Footer: React.ForwardRefRenderFunction<HTMLDivElement, FooterProps> = (
  props,
  ref,
) => {
  return (
    <div
      ref={ref}
      className="bg-suldak-mint-600 flex h-[100px] w-full flex-col items-center justify-center py-[31px] text-[12px] text-white mobile:py-[28px] mobile:text-[14px]"
    >
      <div className="flex">
        <div> 푸터 메뉴 |</div>
        <div> 푸터 메뉴 |</div>
        <div> 푸터 메뉴 |</div>
        <div>푸터 메뉴 |</div>
        <div>푸터 메뉴 |</div>
      </div>
      <div>Copyright © 술닥술닥 all rights reserved</div>
    </div>
  );
};

export default React.forwardRef(Footer);
