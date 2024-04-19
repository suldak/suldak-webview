interface LiquorSnackProps {
  imgUrl?: string;
  name?: string;
}

export default function LiquorSnack({ imgUrl, name }: LiquorSnackProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="rounded-full w-14 h-14 bg-suldak-gray-200"></div>
      {/* <img src={imgUrl} alt={name} /> */}
      <span className="text-center text-suldak-gray-900 text-xs font-medium">
        {name}
      </span>
    </div>
  );
}
