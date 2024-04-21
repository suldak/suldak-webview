'use client';

import { useGetRecommendKeyword } from 'apis/keyword/useGetRecommendKeyword';

import Tag from 'components/shared/Tag';

/** 추천 검색어 컴포넌트 */
function RecommendKeyword() {
  const { data: recommendKeywords } = useGetRecommendKeyword();

  return (
    <>
      {recommendKeywords.map((recLiquor) => (
        <Tag tagId={recLiquor.id} key={recLiquor.id} tagType="blue">
          {recLiquor.text}
        </Tag>
      ))}
    </>
  );
}

export default RecommendKeyword;
