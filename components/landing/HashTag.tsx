interface HashTagProps {
  content: string;
  color: 'green' | 'orange' | 'gray';
}

const colorClasses = {
  green: 'text-green-500 border-green-500',
  gray: 'text-gray-600 border-gray-300',
  orange: 'text-orange-500 border-orange-500',
};

function HashTag({ content, color }: HashTagProps) {
  return (
    <div
      className={`flex font-normal h-[53px] text-[24px] justify-center items-center ${colorClasses[color]} px-[14px] py-[12px] rounded-lg border`}
    >
      {content}
    </div>
  );
}

export default HashTag;
