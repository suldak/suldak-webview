import LiquorCard from 'components/shared/LiquorCard';
import Tag from 'components/shared/Tag';

export default function Home() {
  return (
    <main className="flex flex-col gap-4 p-5">
      <Tag tagType="blue" tagId={1} selected={true}>
        칵테일
      </Tag>
      <Tag tagType="blue" tagId={2}>
        맥주 <button>x</button>
      </Tag>
      <Tag tagType="gray" tagId={2}>
        test
      </Tag>
    </main>
  );
}
