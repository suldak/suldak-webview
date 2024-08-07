interface FilterApplyButtonProps {
  onApply: () => void;
}

function FilterApplyButton({ onApply }: FilterApplyButtonProps) {
  return (
    <button
      className="py-[20px] px-[72px] inline-flex text-[18px] items-center h-[60px] rounded-2xl bg-suldak-mint-500 text-white"
      onClick={onApply}
    >
      필터 적용하기
    </button>
  );
}

export default FilterApplyButton;
