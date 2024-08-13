import GuideBnr from 'assets/icons/ico-guide-bnr.svg';
function Banner() {
  return (
    <div className="flex justify-center">
      <div className="relative w-[335px] h-[120px] m-[20px]">
        <GuideBnr className="w-full h-full object-cover" />
        <div className="absolute inset-0 flex items-center justify-end">
          <div className="w-full ">
            <p className="text-white  text-[14px] text-left pl-[132px]">
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
    </div>
  );
}

export default Banner;
