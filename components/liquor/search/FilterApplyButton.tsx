interface FilterApplyButtonProps {
  onApply: () => void;
}

function FilterApplyButton({ onApply }: FilterApplyButtonProps) {
  return (
    <button
      className="inline-flex h-[60px] items-center rounded-2xl bg-suldak-mint-500 px-[72px] py-[20px] text-[18px] text-white"
      onClick={onApply}
    >
      필터 적용하기
    </button>
  );
}

export default FilterApplyButton;
