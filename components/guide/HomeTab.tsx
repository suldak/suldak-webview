import HomeTabImg from 'assets/icons/ico-home-tab.svg';
import CategoryTabImg from 'assets/icons/ico-category-tab.svg';
import RecommendTabImg from 'assets/icons/ico-recommend-tab.svg';

function HomeTab() {
  return (
    <>
      <p>
        [홈] 탭에서는 취향에 맞는 술 추천과 술닥술닥의 다양한 콘텐츠를 만나볼 수
        있어요
      </p>
      <HomeTabImg />
      <div>
        <h3 className="text-[16px] text-suldak-mint-500 font-semibold">
          카테고리
        </h3>
        <li>카테고리에는 주종별 술이 정리되어 있어요</li>
        <CategoryTabImg />
        <h3 className="text-[16px] text-suldak-mint-500 font-semibold">
          술추천
        </h3>
        <li>가입할 때 선택했던 취향을 기반으로 술을 추천해요</li>
        <li>
          아직 취향 선택을 하지 않았거나 변경하고 싶다면,[마이페이지] 탭의
          [프로필 설정]에서 설정해 주세요!
        </li>
        <RecommendTabImg />
        <h3 className="text-[16px] text-suldak-mint-500 font-semibold">
          블로그
        </h3>
        <li>
          술닥술닥에서 운영하는 블로그에요술에 대한 다양하고 재미있는 이야기를
          즐길 수 있어요
        </li>
        <li>
          <a href="https://www.suldak.com/">suldak.com</a>
          에서도 블로그 콘텐츠를 볼 수 있으니 많은 관심 부탁드려요😊
        </li>
      </div>
    </>
  );
}
export default HomeTab;
