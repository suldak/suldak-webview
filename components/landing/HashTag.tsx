interface HashTagProps {
  content: string;
  color: "green" | "orange" | "gray";
}

const colorClasses = {
  green: "text-green-500 border-green-500",
  gray: "text-gray-600 border-gray-300",
  orange: "text-orange-500 border-orange-500",
};

function HashTag({ content, color }: HashTagProps) {
  return (
    <div
      className={`flex h-[53px] items-center justify-center text-[24px] font-normal mobile:h-[22px] mobile:px-[6px] mobile:py-[4px] mobile:text-[12px] ${colorClasses[color]} rounded-lg border px-[14px] py-[12px] mobile:rounded-[2px]`}
    >
      {content}
    </div>
  );
}

export default HashTag;
