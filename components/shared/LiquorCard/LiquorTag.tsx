import { LiquorTagProps } from "./types";
function LiquorTag({ name }: LiquorTagProps) {
  return (
    <div className="text-overflow: ellipsis flex items-center justify-center whitespace-nowrap rounded-sm border border-suldak-gray-300 bg-white px-1.5 py-1 text-[12px] font-medium text-suldak-gray-600">
      {name}
    </div>
  );
}

export default LiquorTag;
