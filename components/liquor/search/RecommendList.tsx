import { useRouter } from 'next/navigation';

function RecommendList() {
  const router = useRouter();
  const handleClick = (text: string) => {
    router.push(`/liquor/search/result?q=${text}`);
  };
  return (
    <section className="border-b border-suldak-gray-200">
      <div className="flex items-center gap-2 px-5 py-3.5">
        <span className="text-suldak-gray-900 text-sm font-semibold">추천</span>
        <div className="text-suldak-gray-500">|</div>
        <div className="flex items-center gap-4 text-suldak-mint-500 text-sm font-semibold">
          <span onClick={() => handleClick}>직장인</span>
          <span onClick={() => handleClick}>위스키 베이스</span>
          <span onClick={() => handleClick}>칵테일</span>
        </div>
      </div>
    </section>
  );
}

export default RecommendList;
