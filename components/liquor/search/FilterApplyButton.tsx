interface FilterApplyButtonProps {
  onApply: () => void;
}

function FilterApplyButton({ onApply }: FilterApplyButtonProps) {
  return (
    <button
      className="flex h-[60px] w-full items-center justify-center rounded-[16px] bg-suldak-mint-500 py-[20px] text-[18px] font-bold text-white xs:text-[15px]"
      onClick={onApply}
    >
      필터 적용하기
    </button>
  );
}

export default FilterApplyButton;
