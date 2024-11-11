import HomeTabImg from "assets/icons/ico-home-tab.svg";
import CategoryTabImg from "assets/icons/ico-category-tab.svg";
import RecommendTabImg from "assets/icons/ico-recommend-tab.svg";

function HomeTab() {
  return (
    <div className="w-full flex-col items-center justify-center">
      <p className="mb-[20px] px-[20px]">
        [홈] 탭에서는 취향에 맞는 술 추천과 술닥술닥의 다양한 콘텐츠를 만나볼 수
        있어요
      </p>
      <div className="flex w-full justify-center">
        <HomeTabImg />
      </div>
      <div className="mb-[40px] mt-[12px] flex-col px-[20px]">
        <h3 className="text-[16px] font-semibold text-suldak-mint-500">
          카테고리
        </h3>
        <li className="ml-[8px]">카테고리에는 주종별 술이 정리되어 있어요</li>
      </div>
      <div className="flex w-full justify-center">
        <CategoryTabImg />
      </div>
      <div className="mb-[40px] mt-[12px] flex-col px-[20px]">
        <h3 className="text-[16px] font-semibold text-suldak-mint-500">
          술추천
        </h3>

        <ul className="list-disc space-y-2 pl-[20px]">
          <li className="indent">
            가입할 때 선택했던 취향을 기반으로 술을 추천해요
          </li>
          <li>
            아직 취향 선택을 하지 않았거나 변경하고 싶다면,{" "}
            <span className="whitespace-nowrap">[마이페이지]</span> 탭의 [프로필
            설정]에서 설정해 주세요!
          </li>
        </ul>
      </div>
      <div className="flex w-full justify-center">
        <RecommendTabImg />
      </div>
      <div className="mb-[20px] mt-[12px] flex-col px-[20px]">
        <h3 className="text-[16px] font-semibold text-suldak-mint-500">
          블로그
        </h3>
        <ul className="list-disc space-y-2 pl-[20px]">
          <li className="indent">
            술닥술닥에서 운영하는 블로그에요 술에 대한 다양하고 재미있는
            이야기를 즐길 수 있어요
          </li>
          <li>
            <a
              href="https://suldak.tistory.com/"
              className="text-suldak-mint-500 underline"
            >
              https://suldak.tistory.com/
            </a>
            에서도 블로그 콘텐츠를 볼 수 있으니 많은 관심 부탁드려요😊
          </li>
        </ul>
      </div>
    </div>
  );
}
export default HomeTab;
