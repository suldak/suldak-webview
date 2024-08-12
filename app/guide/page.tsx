'use client';
import { useRef, useState, useEffect } from 'react';
import HomeTabImg from 'assets/icons/ico-home-tab.svg';
import CategoryTabImg from 'assets/icons/ico-category-tab.svg';
import RecommendTabImg from 'assets/icons/ico-recommend-tab.svg';
import SearchTabImg from 'assets/icons/ico-search-tab.svg';
import FilterTabImg from 'assets/icons/ico-filter-tab.svg';
import GroupTabImg from 'assets/icons/ico-group-tab.svg';
import GroupHomeTabImg from 'assets/icons/ico-group-home-tab.svg';
import JoinTabImg from 'assets/icons/ico-join-tab.svg';
import NewGroupTabImg from 'assets/icons/ico-new-group-tab.svg';
import MyGroupTabImg from 'assets/icons/ico-my-group-tab.svg';
import MyPageTabImg from 'assets/icons/ico-mypage-tab.svg';
import Banner from 'components/guide/Banner';

const tabs = ['홈', '검색', '모임', '마이페이지', '기타'];

function AppGuidePage() {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const refs = useRef<Record<string, HTMLHeadingElement | null>>(
    tabs.reduce((acc, tab) => ({ ...acc, [tab]: null }), {}),
  );
  const tabBarRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (tab: string) => {
    if (refs.current[tab] && tabBarRef.current) {
      const tabBarHeight = tabBarRef.current.offsetHeight;
      const elementPosition = refs.current[tab]!.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - tabBarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    const observers = tabs.map((tab) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveTab(tab);
          }
        },
        { threshold: 0.5 },
      );

      if (refs.current[tab]) {
        observer.observe(refs.current[tab]!);
      }

      return observer;
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  return (
    <div className="flex-col justify-center text-[14px]">
      <h1 className="flex text-[18px]">술닥술닥 가이드</h1>

      <div
        ref={tabBarRef}
        className="sticky top-0 bg-white z-10 flex justify-around border-b border-gray-200"
      >
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`py-2 px-4 text-sm font-medium focus:outline-none ${
              activeTab === tab
                ? 'text-gray-700 border-b-2 border-gray-700'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => scrollToSection(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <Banner />

      {tabs.map((tab, index) => (
        <section key={tab}>
          <h2
            ref={(el) => (refs.current[tab] = el)}
            className="text-[20px] text-gray-900 mt-[20px]  mx-[20px] font-semibold"
          >
            {tab}
          </h2>
          <div className="flex-col mx-[20px]">
            {tab === '홈' && (
              <>
                [홈] 탭에서는 취향에 맞는 술 추천과 술닥술닥의 다양한 콘텐츠를
                만나볼 수 있어요
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
                    아직 취향 선택을 하지 않았거나 변경하고 싶다면,[마이페이지]
                    탭의 [프로필 설정]에서 설정해 주세요!
                  </li>
                  <RecommendTabImg />
                  <h3 className="text-[16px] text-suldak-mint-500 font-semibold">
                    블로그
                  </h3>
                  <li>
                    술닥술닥에서 운영하는 블로그에요술에 대한 다양하고 재미있는
                    이야기를 즐길 수 있어요
                  </li>
                  <li>
                    <a href="https://www.suldak.com/">suldak.com</a>
                    에서도 블로그 콘텐츠를 볼 수 있으니 많은 관심 부탁드려요😊
                  </li>
                </div>
              </>
            )}
            {tab === '검색' && (
              <>
                <p>
                  [홈] 탭의 [검색바]를 통해 여러 술 제품을 찾아보고, 나에게 맞는
                  술을 찾을 수 있어요
                </p>
                <SearchTabImg />
                <h3 className="text-[16px] text-suldak-mint-500 font-semibold">
                  추천 키워드, 랭킹
                </h3>
                <li>
                  [추천 검색어]로 빠르고 간단하게 지금 마시고 싶은 술을
                  검색해봐요!
                </li>
                <li>
                  [검색 키워드 랭킹]에서는 어떤 키워드가 많이 검색되고 있는지
                  실시간으로 알 수 있어요
                </li>
                <FilterTabImg />
                <h3 className="text-[16px] text-suldak-mint-500 font-semibold">
                  필터
                </h3>
                <li>
                  제품페이지에는 술에 대한 짧은 소개, 태그, 도수뿐만 아니라
                  어울리는 안주도 추천하고 있어요
                </li>
                <li>
                  칵테일, 하이볼에는 각각의 레시피와 재료 정보도 포함하고 있어
                  직접 만들어 볼 수도 있어요!
                </li>
              </>
            )}
            {tab === '모임' && (
              <>
                <p>
                  [친구찾기] 탭에서는 모임을 만들거나 다른 사람이 만든 모임에
                  참여할 수 있어요
                </p>
                <GroupTabImg />
                <h3 className="text-[16px] text-suldak-mint-500 font-semibold">
                  홈
                </h3>
                <li>
                  모임 유형(온라인/오프라인)과 이야기 카테고리, 모임명 등을 보고
                  참여하고 싶은 모임을 찾아보세요👀
                </li>
                <li>[모임 캘린더]에서 날짜별 모임을 한 눈에 볼 수도 있어요</li>
                <GroupHomeTabImg />
                <h3 className="text-[16px] text-suldak-mint-500 font-semibold">
                  상세페이지, 프로필
                </h3>
                <li>
                  모임에 참여하고 싶다면 상세페이지의 [참가 신청하기] 버튼을
                  눌러주세요!
                </li>
                <li>
                  모임 상세페이지에서는 호스트가 작성한 소개글, 모임 정보와 함께
                  참여가 확정된 멤버를 확인할 수 있어요
                </li>
                <li>
                  호스트와 멤버의 프로필 사진을 누르면 해당 멤버의 소개글과 술
                  취향을 볼 수 있어요
                </li>
                <li>
                  모임에 대해 호스트에 물어보고 싶은 점이 있다면 [댓글]로
                  호스트와 이야기를 나눠봐요
                </li>
                <JoinTabImg />
                <h3 className="text-[16px] text-suldak-mint-500 font-semibold">
                  참여확정, 연락수단
                </h3>
                <li>
                  참여가 확정되면 알림과 함께 상세페이지의 버튼이 바뀌게 될
                  거에요
                </li>
                <li>
                  [모임 멤버 만나러가기]에서 호스트가 남긴 연락수단과 모임 상세
                  장소를 꼭 확인해주세요✨
                </li>
                <div>여기서 잠깐!</div>
                <NewGroupTabImg />
                <h3 className="text-[16px] text-suldak-mint-500 font-semibold">
                  모임만들기
                </h3>
                <li>
                  [+] 버튼의 [모임만들기]를 눌러 직접 모임을 생성할 수 있어요!
                </li>
                <li>
                  나누고 싶은 이야기의 카테고리를 선택하고 모임 정보를 입력해서
                  간단하게 모임을 만들어봐요!
                </li>
                <MyGroupTabImg />
                <h3 className="text-[16px] text-suldak-mint-500 font-semibold">
                  내 모임
                </h3>
                <li>
                  [+] 버튼의 [내 모임] - [모임 모아보기]에서는 [내가 만든 모임],
                  [참여 확정 모임], 그리고 [대기 중인 모임]을 한눈에 볼 수
                  있어요
                </li>
                <li>
                  [내가 만든 모임]에서는 받은 참여 신청을 확인하고 승인해요
                </li>
                <li>
                  [참여 확정 모임]에서는 내가 보낸 참여 신청 중, 확정된 모임을
                  확인해요
                </li>
                <li>
                  [대기 중인 모임]에서는 내가 보낸 참여 신청 중, 아직 확정되지
                  않은 모임을 확인해요
                </li>
                <li>
                  [+] 버튼의 [내 모임] - [나의 모임 기록]에서는 내가 지금까지
                  참여한 모임을 볼 수 있어요
                </li>
                <li>참여 완료한 모임에 대한 피드백도 보낼 수 있어요</li>
              </>
            )}
            {tab === '마이페이지' && (
              <>
                <p>
                  알콜도수는 술닥술닥의 신뢰지수에요. 멤버의 프로필 사진을
                  누르면 해당 멤버의 알콜도수를 확인할 수 있어요!
                </p>
                <MyPageTabImg />
                <h3 className="text-[16px] text-suldak-mint-500 font-semibold">
                  마이페이지
                </h3>
                <li>처음 시작 도수는 25%로, 가장 높은 도수는 99.9%에요</li>
                <li>
                  모임에 열심히 참여하거나 같이 모임을 즐겼던 다른 멤버에게 좋은
                  피드백을 받아 알콜도수를 높일 수 있어요!
                </li>
              </>
            )}
            {tab === '기타' && (
              <div className="flex-col mb-[20px]">
                <p>
                  📍모임을 만들거나 참여하기 전에 꼭 커뮤니티 가이드를
                  확인해주세요📍
                </p>
                <p>
                  술닥술닥은 건강하고 깨끗한 술 문화와 커뮤니티를 위해 노력하고
                  있어요!
                </p>
                <p>
                  술닥술닥을 이용하시는 모든 회원분들이 저희 서비스를 통해
                  즐거운 시간을 보내셨으면 좋겠어요🐥
                </p>
              </div>
            )}
          </div>
          {index < tabs.length - 1 && (
            <div className="flex shrink-0 h-[10px] justify-center items-center bg-gray-200 border-gray-200"></div>
          )}
        </section>
      ))}
    </div>
  );
}

export default AppGuidePage;
