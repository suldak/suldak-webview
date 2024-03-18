import LiquorCard from 'components/LiquorCard';

export default function Home() {
  return (
    <main className="flex flex-col gap-4 p-5">
      {/* <Card />
      <Card />
      <Card /> */}
      <LiquorCard
        imgUrl="/api/file/download/3a4a2da1c777406b9bbbcae17ab8b237_1708006440648"
        liquorId={5}
        liquorDetail="처음처럼 회사에서 만든 제로소주, 숙취가 별로 없다."
        liquorAbv={16.5}
        name="새로"
      />
      <LiquorCard
        imgUrl="/api/file/download/9a71ce2ba9d64bcbac22a964907d789f_1708139200916"
        liquorId={5}
        liquorDetail="처음처럼 회사에서 만든 제로소주, 숙취가 별로 없다."
        liquorAbv={16.5}
        name="새로"
      />
      <LiquorCard
        imgUrl="/api/file/download/b1921f7560bd4ae9bbed65615725aa1e_1708232807725"
        liquorId={5}
        liquorDetail="한 줄 테 스 트"
        liquorAbv={16.5}
        name="새로"
      />
    </main>
  );
}
