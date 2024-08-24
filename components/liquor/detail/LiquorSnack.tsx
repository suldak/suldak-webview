interface LiquorSnackProps {
  imgUrl?: string;
  name?: string;
}

export default function LiquorSnack({ imgUrl, name }: LiquorSnackProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="h-14 w-14 rounded-full bg-suldak-gray-200"></div>
      {/* <img src={imgUrl} alt={name} /> */}
      <span className="text-center text-xs font-medium text-suldak-gray-900">
        {name}
      </span>
    </div>
  );
}
