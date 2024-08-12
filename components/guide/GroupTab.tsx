import GroupTabImg from 'assets/icons/ico-group-tab.svg';
import GroupHomeTabImg from 'assets/icons/ico-group-home-tab.svg';
import JoinTabImg from 'assets/icons/ico-join-tab.svg';
import NewGroupTabImg from 'assets/icons/ico-new-group-tab.svg';
import MyGroupTabImg from 'assets/icons/ico-my-group-tab.svg';
function GroupTab() {
  return (
    <>
      <p>
        [친구찾기] 탭에서는 모임을 만들거나 다른 사람이 만든 모임에 참여할 수
        있어요
      </p>
      <GroupTabImg />
      <h3 className="text-[16px] text-suldak-mint-500 font-semibold">홈</h3>
      <li>
        모임 유형(온라인/오프라인)과 이야기 카테고리, 모임명 등을 보고 참여하고
        싶은 모임을 찾아보세요👀
      </li>
      <li>[모임 캘린더]에서 날짜별 모임을 한 눈에 볼 수도 있어요</li>
      <GroupHomeTabImg />
      <h3 className="text-[16px] text-suldak-mint-500 font-semibold">
        상세페이지, 프로필
      </h3>
      <li>
        모임에 참여하고 싶다면 상세페이지의 [참가 신청하기] 버튼을 눌러주세요!
      </li>
      <li>
        모임 상세페이지에서는 호스트가 작성한 소개글, 모임 정보와 함께 참여가
        확정된 멤버를 확인할 수 있어요
      </li>
      <li>
        호스트와 멤버의 프로필 사진을 누르면 해당 멤버의 소개글과 술 취향을 볼
        수 있어요
      </li>
      <li>
        모임에 대해 호스트에 물어보고 싶은 점이 있다면 [댓글]로 호스트와
        이야기를 나눠봐요
      </li>
      <JoinTabImg />
      <h3 className="text-[16px] text-suldak-mint-500 font-semibold">
        참여확정, 연락수단
      </h3>
      <li>참여가 확정되면 알림과 함께 상세페이지의 버튼이 바뀌게 될 거에요</li>
      <li>
        [모임 멤버 만나러가기]에서 호스트가 남긴 연락수단과 모임 상세 장소를 꼭
        확인해주세요✨
      </li>
      <div>여기서 잠깐!</div>
      <NewGroupTabImg />
      <h3 className="text-[16px] text-suldak-mint-500 font-semibold">
        모임만들기
      </h3>
      <li>[+] 버튼의 [모임만들기]를 눌러 직접 모임을 생성할 수 있어요!</li>
      <li>
        나누고 싶은 이야기의 카테고리를 선택하고 모임 정보를 입력해서 간단하게
        모임을 만들어봐요!
      </li>
      <MyGroupTabImg />
      <h3 className="text-[16px] text-suldak-mint-500 font-semibold">
        내 모임
      </h3>
      <li>
        [+] 버튼의 [내 모임] - [모임 모아보기]에서는 [내가 만든 모임], [참여
        확정 모임], 그리고 [대기 중인 모임]을 한눈에 볼 수 있어요
      </li>
      <li>[내가 만든 모임]에서는 받은 참여 신청을 확인하고 승인해요</li>
      <li>
        [참여 확정 모임]에서는 내가 보낸 참여 신청 중, 확정된 모임을 확인해요
      </li>
      <li>
        [대기 중인 모임]에서는 내가 보낸 참여 신청 중, 아직 확정되지 않은 모임을
        확인해요
      </li>
      <li>
        [+] 버튼의 [내 모임] - [나의 모임 기록]에서는 내가 지금까지 참여한
        모임을 볼 수 있어요
      </li>
      <li>참여 완료한 모임에 대한 피드백도 보낼 수 있어요</li>
    </>
  );
}
export default GroupTab;
