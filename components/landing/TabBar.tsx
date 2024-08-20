import Logo from 'assets/icons/ico-logo.svg';
import HeadRight from 'assets/icons/ico-head-right.svg';
function TabBar() {
  return (
    <div className="w-[1200px] flex bg-white text-[20px] items-center rounded-[20px]">
      <Logo />
      <div>즐거운 술 문화를 위한 플랫폼</div>
      <button className="bg-suldak-mint-500 rounded-[30px] text-white px-[20px] py-[10px]">
        사전예약
        <HeadRight />
      </button>
      <button className="bg-suldak-mint-500 rounded-[30px]  text-white px-[20px] py-[10px]">
        블로그 보기
        <HeadRight />
      </button>
    </div>
  );
}

export default TabBar;
