interface FilterApplyButtonProps {
  onApply: () => void;
}

function FilterApplyButton({ onApply }: FilterApplyButtonProps) {
  return (
    <button
      className="flex h-[60px] w-[242px] items-center justify-center rounded-[16px] bg-suldak-mint-500 py-[20px] text-[18px] font-bold text-white"
      onClick={onApply}
    >
      필터 적용하기
    </button>
  );
}

export default FilterApplyButton;
