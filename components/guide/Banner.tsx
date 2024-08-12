import GuideBnr from 'assets/icons/ico-guide-bnr.svg';
function Banner() {
  return (
    <div className="relative w-[335px] h-[120px]">
      <GuideBnr className="w-full h-full object-cover" />
      <div className="absolute inset-0 flex items-center justify-end">
        <div className="w-full px-4">
          <p className="text-white text-right text-[14px] sm:text-xs md:text-sm font-bold mr-[20px]">
            술닥술닥에 오신 것을 환영합니다!
            <br />
            저는 가이드 아리예요! 🐥
            <br />
            지금부터 술닥술닥 앱을 어떻게
            <br />
            이용하면 좋을지 안내해드릴게요!
          </p>
        </div>
      </div>
    </div>
  );
}

export default Banner;
