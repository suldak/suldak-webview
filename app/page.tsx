'use client';
import SortDropDown from 'components/liquor/search/SortDropDown';
import LiquorCard from 'components/shared/LiquorCard';
import Tag from 'components/shared/Tag';

export default function Home() {
  return (
    <main className="flex flex-col gap-4 p-5">
      <Tag tagColor="blue" tagId={1} selected={true}>
        칵테일
      </Tag>
      <Tag tagColor="blue" tagId={2}>
        맥주 <button>x</button>
      </Tag>
      <Tag tagColor="gray" tagId={2}>
        test
      </Tag>
      <SortDropDown />
    </main>
  );
}
