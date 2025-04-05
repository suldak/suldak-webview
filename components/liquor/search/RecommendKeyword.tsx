"use client";

import { useGetRecommendKeyword } from "apis/keyword/useGetRecommendKeyword";
import Tag from "components/shared/Tag";
import { useRouter } from "next/navigation";

/** 추천 검색어 컴포넌트 */
function RecommendKeyword() {
  const router = useRouter();
  const { data: recommendKeywords = [] } = useGetRecommendKeyword();

  const handleClick = (
    event: React.MouseEvent<HTMLSpanElement>,
    text: string,
  ) => {
    event.preventDefault();
    router.push(`/liquor/search/result?q=${text}`);
  };

  return (
    <>
      {recommendKeywords.map((recLiquor) => (
        <Tag
          tagId={recLiquor.id}
          key={recLiquor.id}
          tagColor="blue"
          onClick={handleClick}
        >
          {recLiquor.text}
        </Tag>
      ))}
    </>
  );
}

export default RecommendKeyword;
