"use client";
import { useRef, useState, useEffect } from "react";
import Banner from "components/guide/Banner";
import SearchTab from "components/guide/SearchTab";
import HomeTab from "components/guide/HomeTab";
import GroupTab from "components/guide/GroupTab";
import CommunityTab from "components/guide/CommunityTab";
import MyPageTab from "components/guide/MyPageTab";
import GoBack from "assets/icons/ico-head-back.svg";
const tabs = ["홈", "검색", "모임", "마이페이지", "기타"];

const sectionTitles = {
  홈: "홈",
  검색: "검색",
  모임: "모임",
  마이페이지: "마이페이지 - 알콜도수",
  기타: "커뮤니티 가이드",
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
        behavior: "smooth",
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
      <div className="relative flex items-center justify-center border-b border-suldak-gray-200">
        <button className="absolute left-[12px]">
          <GoBack />
        </button>
        <h1 className="my-[14px] flex text-[18px] font-bold text-suldak-gray-900">
          술닥술닥 가이드
        </h1>
      </div>

      <div
        ref={tabBarRef}
        className="sticky top-0 z-10 flex justify-evenly border-b border-suldak-gray-200 bg-white"
      >
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`flex-1 py-2 text-[16px] font-medium focus:outline-none ${
              activeTab === tab
                ? "border-b-2 border-suldak-mint-500 text-suldak-mint-500"
                : "text-suldak-gray-500"
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
            className="mx-[20px] mt-[20px] text-[20px] font-semibold text-gray-900"
          >
            {sectionTitles[tab as keyof typeof sectionTitles]}
          </h2>
          <div className="flex-col px-[20px] pb-[20px]">
            {tab === "홈" && <HomeTab />}
            {tab === "검색" && <SearchTab />}
            {tab === "모임" && <GroupTab />}
            {tab === "마이페이지" && <MyPageTab />}
            {tab === "기타" && <CommunityTab />}
          </div>
          {index < tabs.length - 1 && (
            <div className="flex h-[10px] shrink-0 items-center justify-center border-suldak-gray-200 bg-suldak-gray-200"></div>
          )}
        </section>
      ))}
    </div>
  );
}

export default AppGuidePage;
