import ReturnIcon from "assets/icons/ico-return.svg";
interface FilterResetButtonProps {
  onReset: () => void;
}

function FilterResetButton({ onReset }: FilterResetButtonProps) {
  return (
    <button
      className="flex h-[60px] w-full items-center justify-center gap-x-[10px] rounded-[15px] py-[20px] text-[18px] font-medium text-suldak-gray-500 xs:text-[15px]"
      onClick={onReset}
    >
      <ReturnIcon />
      초기화
    </button>
  );
}
export default FilterResetButton;
