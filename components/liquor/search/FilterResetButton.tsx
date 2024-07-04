import ReturnIcon from 'assets/icons/ico-return.svg';
interface FilterResetButtonProps {
  onReset: () => void;
}

function FilterResetButton({ onReset }: FilterResetButtonProps) {
  return (
    <button
      className="inline-flex items-center text-[18px] text-suldak-gray-500 py-[20px] gap-x-[10px]"
      onClick={onReset}
    >
      <ReturnIcon />
      초기화
    </button>
  );
}
export default FilterResetButton;
