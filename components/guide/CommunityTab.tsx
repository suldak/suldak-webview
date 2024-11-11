function CommunityTab() {
  return (
    <div className="mb-[73px] flex w-full flex-col">
      <p className="px-[20px]">
        📍 모임을 만들거나 참여하기 전에 꼭&nbsp;
        <span className="text-suldak-mint-500 underline">커뮤니티 가이드</span>
        를 확인해주세요 📍
      </p>
      <div className="flex w-full flex-col px-[20px]">
        <div className="mb-[24px] mt-[12px] w-full whitespace-normal rounded-[16px] bg-suldak-mint-50 px-[16px] py-[16px] text-suldak-gray-700">
          <ul className="list-disc space-y-2 px-[16px]">
            <li className="indent">
              술닥술닥 서비스는 만 19세 이상만 이용할 수 있어요
            </li>
            <li className="indent">
              술을 강요하거나 과도한 음주는 하지 않도록 주의해주세요
            </li>
            <li className="indent">
              서로에 대한 기본적인 예의는 꼭 지켜주세요
            </li>
            <li className="indent">
              모임 중에 발생하는 금전적인 문제를 포함한 다른 기타 문제는
              호스트와 참여 멤버끼리 해결해야 해요
            </li>
            <li className="indent">
              모임과 특정 멤버에 대해 불만이나 알려주실 부분이 있다면 모임
              [피드백]이나 [신고하기], 술닥술닥 카카오톡 채널을 활용해주세요
            </li>
          </ul>
        </div>
      </div>
      <p className="px-[20px] pb-2">
        술닥술닥은 건강하고 깨끗한 술 문화와 커뮤니티를 위해 노력하고 있어요!
      </p>
      <p className="px-[20px]">
        술닥술닥을 이용하시는 모든 회원분들이 저희 서비스를 통해 즐거운 시간을
        보내셨으면 좋겠어요🐥
      </p>
    </div>
  );
}
export default CommunityTab;
