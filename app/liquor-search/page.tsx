import Image from 'next/image';

import Tag from 'components/Tag';
import DeleteIcon from 'assets/icons/ico-head-close.svg';

/** 술 검색 페이지 */
const LiquorSearchPage = () => {
  return (
    <main className="flex flex-col ">
      {/* 최근 검색어 */}
      <section className="px-5">
        <div className="pt-10 pb-2 flex justify-between items-end">
          <span className="text-base font-bold">최근 검색어</span>

          <button className="text-xs font-medium text-suldak-gray-500">
            전체삭제
          </button>
        </div>
        <div className="flex gap-2 w-full overflow-x-auto whitespace-nowrap">
          <Tag tagId={2} tagType="gray">
            <div className="flex justify-center items-center gap-5px">
              소주 <Image alt="삭제" src={DeleteIcon} />
            </div>
          </Tag>
          <Tag tagId={2} tagType="gray">
            <div className="flex justify-center items-center gap-5px">
              하이볼 <Image alt="삭제" src={DeleteIcon} />
            </div>
          </Tag>
          <Tag tagId={2} tagType="gray">
            <div className="flex justify-center items-center gap-5px">
              위스키 <Image alt="삭제" src={DeleteIcon} />
            </div>
          </Tag>
          <Tag tagId={2} tagType="gray">
            <div className="flex justify-center items-center gap-5px">
              과일 <Image alt="삭제" src={DeleteIcon} />
            </div>
          </Tag>
        </div>
      </section>

      {/* 추천 검색어 */}
      <section className="px-5">
        <p className="text-base font-bold">추천 검색어</p>
        <div className="flex flex-wrap gap-2 py-2">
          <Tag tagId={1} tagType="blue">
            칵테일
          </Tag>
          <Tag tagId={1} tagType="blue">
            하이볼
          </Tag>
          <Tag tagId={1} tagType="blue">
            편의점 하이볼
          </Tag>
          <Tag tagId={1} tagType="blue">
            소주
          </Tag>
          <Tag tagId={1} tagType="blue">
            아사히 생맥주
          </Tag>
          <Tag tagId={1} tagType="blue">
            카스 레몬 스퀴즈
          </Tag>
          <Tag tagId={1} tagType="blue">
            피곤할 때
          </Tag>
        </div>
      </section>
    </main>
  );
};

export default LiquorSearchPage;
