interface LiquorTagProps {
  name?: string;
}

export default function LiquorTag({ name }: LiquorTagProps) {
  return (
    <div
      className="border border-suldak-gray-300 px-1.5 py-1 flex items-center justify-center rounded-sm
    text-suldak-gray-600 text-xs font-medium"
    >
      {name}
    </div>
  );
}
