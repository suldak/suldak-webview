import MyPageTabImg from 'assets/icons/ico-mypage-tab.svg';
function MyPageTab() {
  return (
    <>
      <p>
        알콜도수는 술닥술닥의 신뢰지수에요. 멤버의 프로필 사진을 누르면 해당
        멤버의 알콜도수를 확인할 수 있어요!
      </p>
      <MyPageTabImg />
      <h3 className="text-[16px] text-suldak-mint-500 font-semibold">
        마이페이지
      </h3>
      <li>처음 시작 도수는 25%로, 가장 높은 도수는 99.9%에요</li>
      <li>
        모임에 열심히 참여하거나 같이 모임을 즐겼던 다른 멤버에게 좋은 피드백을
        받아 알콜도수를 높일 수 있어요!
      </li>
    </>
  );
}
export default MyPageTab;
