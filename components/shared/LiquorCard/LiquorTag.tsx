import { LiquorTagProps } from './types';
function LiquorTag({ name }: LiquorTagProps) {
  return (
    <div className="flex items-center justify-center bg-white py-1 px-1.5 rounded-sm border border-suldak-gray-300 text-suldak-gray-600 text-xs font-medium">
      {name}
    </div>
  );
}

export default LiquorTag;
