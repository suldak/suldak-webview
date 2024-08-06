'use client';

import { useGetRecommendKeyword } from 'apis/keyword/useGetRecommendKeyword';
import { useLiquorSearch } from 'apis/liquor/useLiquorSearch';

import Tag from 'components/shared/Tag';
import { useRouter } from 'next/navigation';

/** 추천 검색어 컴포넌트 */
function RecommendKeyword() {
  const router = useRouter();
  const { data: recommendKeywords } = useGetRecommendKeyword();
  const handleClick = (id: number) => {
    router.push(`/liquor/search/result/${id}`);
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
