'use client';
import { useRef, useState, useEffect } from 'react';
import Banner from 'components/guide/Banner';
import SearchTab from 'components/guide/SearchTab';
import HomeTab from 'components/guide/HomeTab';
import GroupTab from 'components/guide/GroupTab';
import CommunityTab from 'components/guide/CommunityTab';
import MyPageTab from 'components/guide/MyPageTab';

const tabs = ['홈', '검색', '모임', '마이페이지', '기타'];

const sectionTitles = {
  홈: '홈',
  검색: '검색',
  모임: '모임',
  마이페이지: '마이페이지 - 알콜도수',
  기타: '커뮤니티 가이드',
};

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
      const offsetPosition = elementPosition + window.scrollY - tabBarHeight;

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
            className="text-[20px] text-gray-900 mt-[20px] mx-[20px] font-semibold"
          >
            {sectionTitles[tab as keyof typeof sectionTitles]}
          </h2>
          <div className="flex-col mx-[20px]">
            {tab === '홈' && <HomeTab />}
            {tab === '검색' && <SearchTab />}
            {tab === '모임' && <GroupTab />}
            {tab === '마이페이지' && <MyPageTab />}
            {tab === '기타' && <CommunityTab />}
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
