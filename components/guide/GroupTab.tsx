import GroupTabImg from "assets/icons/ico-group-tab.svg";
import GroupHomeTabImg from "assets/icons/ico-group-home-tab.svg";
import JoinTabImg from "assets/icons/ico-join-tab.svg";
import NewGroupTabImg from "assets/icons/ico-new-group-tab.svg";
import MyGroupTabImg from "assets/icons/ico-my-group-tab.svg";

function GroupTab() {
  return (
    <div className="flex w-full flex-col justify-center">
      <p className="mb-[20px] px-[20px]">
        [친구찾기] 탭에서는 모임을 만들거나 다른 사람이 만든 모임에 참여할 수
        있어요
      </p>
      <div className="flex justify-center">
        <GroupTabImg />
      </div>
      <div className="mb-[40px] mt-[12px] px-[20px]">
        <h3 className="text-[16px] font-semibold text-suldak-mint-500">홈</h3>
        <ul className="list-disc space-y-2 pl-[20px]">
          <li className="indent">
            모임 유형(온라인/오프라인)과 이야기 카테고리, 모임명 등을 보고
            참여하고 싶은 모임을 찾아보세요👀
          </li>
          <li className="indent">
            [모임 캘린더]에서 날짜별 모임을 한 눈에 볼 수도 있어요
          </li>
        </ul>
      </div>
      <div className="flex justify-center">
        <GroupHomeTabImg />
      </div>
      <div className="mb-[40px] mt-[12px] px-[20px]">
        <h3 className="text-[16px] font-semibold text-suldak-mint-500">
          상세페이지, 프로필
        </h3>
        <ul className="list-disc space-y-2 pl-[20px]">
          <li className="indent">
            모임에 참여하고 싶다면 상세페이지의 [참가 신청하기] 버튼을
            눌러주세요!
          </li>
          <li className="indent">
            모임 상세페이지에서는 호스트가 작성한 소개글, 모임 정보와 함께
            참여가 확정된 멤버를 확인할 수 있어요
          </li>
          <li className="indent">
            호스트와 멤버의 프로필 사진을 누르면 해당 멤버의 소개글과 술 취향을
            볼 수 있어요
          </li>
          <li className="indent">
            모임에 대해 호스트에 물어보고 싶은 점이 있다면 [댓글]로 호스트와
            이야기를 나눠봐요
          </li>
        </ul>
      </div>
      <div className="flex justify-center">
        <JoinTabImg />
      </div>
      <div className="mb-[40px] mt-[12px] px-[20px]">
        <h3 className="text-[16px] font-semibold text-suldak-mint-500">
          참여확정, 연락수단
        </h3>
        <ul className="list-disc space-y-2 pl-[20px]">
          <li className="indent">
            참여가 확정되면 알림과 함께 상세페이지의 버튼이 바뀌게 될 거에요
          </li>
          <li className="indent">
            [모임 멤버 만나러가기]에서 호스트가 남긴 연락수단과 모임 상세 장소를
            꼭 확인해주세요✨
          </li>
        </ul>
        <div className="mt-[12px] rounded-[16px] bg-suldak-mint-50 p-[16px] text-suldak-gray-700">
          <p className="text-[16px] font-semibold">📌 여기서 잠깐!</p>
          <ul className="list-disc space-y-2 pl-[20px] text-[14px]">
            <li className="indent">
              모든 모임은 “
              <span className="font-semibold text-suldak-mint-500">
                호스트 승인제
              </span>
              ”로 이루어져요. (호스트 승인제란, 멤버가 참여 신청을 하면 호스트가
              해당 신청을 확인 후 승인하는 제도입니다)
            </li>
            <li className="indent">
              <span className="font-semibold text-suldak-mint-500">
                호스트는 모임 시작 3시간 전까지 받은 신청에 대한 답
              </span>
              을 해야 하고, 참여 멤버는 최소 모임 시작 3시간 전까지는 모임 참여
              신청에 대한 확답을 받을 수 있습니다.
            </li>
            <li className="indent text-[12px] text-suldak-gray-500">
              모임 최소 인원(참여 확정 인원 호스트 포함 3명)을 충족하지 않았다면
              해당 모임은 자동 취소됩니다.
            </li>
          </ul>
        </div>
      </div>
      <div className="flex justify-center">
        <NewGroupTabImg />
      </div>
      <div className="mb-[40px] mt-[12px] px-[20px]">
        <h3 className="text-[16px] font-semibold text-suldak-mint-500">
          모임만들기
        </h3>
        <ul className="list-disc space-y-2 pl-[20px]">
          <li className="indent">
            [+] 버튼의 [모임만들기]를 눌러 직접 모임을 생성할 수 있어요!
          </li>
          <li className="indent">
            나누고 싶은 이야기의 카테고리를 선택하고 모임 정보를 입력해서
            간단하게 모임을 만들어봐요!
          </li>
        </ul>
      </div>
      <div className="flex justify-center">
        <MyGroupTabImg />
      </div>
      <div className="mb-[20px] mt-[12px] px-[20px]">
        <h3 className="text-[16px] font-semibold text-suldak-mint-500">
          내 모임
        </h3>
        <ul className="list-disc space-y-2 pl-[20px]">
          <li className="indent">
            [+] 버튼의 [내 모임] - [모임 모아보기]에서는 [내가 만든 모임], [참여
            확정 모임], 그리고 [대기 중인 모임]을 한눈에 볼 수 있어요
          </li>
          <li className="indent">
            [내가 만든 모임]에서는 받은 참여 신청을 확인하고 승인해요
          </li>
          <li className="indent">
            [참여 확정 모임]에서는 내가 보낸 참여 신청 중, 확정된 모임을
            확인해요
          </li>
          <li className="indent">
            [대기 중인 모임]에서는 내가 보낸 참여 신청 중, 아직 확정되지 않은
            모임을 확인해요
          </li>
          <li className="indent">
            [+] 버튼의 [내 모임] - [나의 모임 기록]에서는 내가 지금까지 참여한
            모임을 볼 수 있어요
          </li>
          <li className="indent">
            참여 완료한 모임에 대한 피드백도 보낼 수 있어요
          </li>
        </ul>
      </div>
    </div>
  );
}

export default GroupTab;
