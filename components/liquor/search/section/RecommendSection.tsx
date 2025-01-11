import { RecommendKeyword } from "apis/keyword/types";

function RecommendSection({
  keywords,
  onClick,
}: {
  keywords: RecommendKeyword[];
  onClick: (keyword: string) => void;
}) {
  return (
    <section className="border-b border-suldak-gray-200">
      <div className="flex items-center gap-2 px-[20px] py-3.5">
        <span className="text-sm font-semibold text-suldak-gray-900">추천</span>
        {keywords.length > 0 && (
          <>
            <div className="text-suldak-gray-500">|</div>
            <div className="flex items-center gap-4 text-sm font-semibold text-suldak-mint-500">
              {keywords.slice(0, 3).map((keyword: RecommendKeyword) => (
                <span
                  key={keyword.id}
                  onClick={() => onClick(keyword.text)}
                  className="cursor-pointer"
                >
                  {keyword.text}
                </span>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default RecommendSection;
