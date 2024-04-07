import { useGetRecommendKeyword } from 'apis/keyword/useGetRecommendKeyword';
import Tag from 'components/Tag';

export default function LiquorRecommendKeyword() {
  const { data: recommendKeywords } = useGetRecommendKeyword();

  return (
    <>
      <div className="flex flex-wrap gap-2 py-2">
        {/* {recommendKeywords.map((recLiquor) => (
          <Tag tagId={recLiquor.id} key={recLiquor.id} tagType="blue">
            {recLiquor.text}
          </Tag>
        ))} */}
        {new Array(7).fill(0).map((_, index) => (
          <Tag tagId={index} key={index} tagType="blue">
            {index + 'asdf'}
          </Tag>
        ))}
      </div>
    </>
  );
}
