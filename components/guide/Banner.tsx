import AriImg from "assets/icons/ico-ari.svg";
function Banner() {
  return (
    <div className="flex justify-center">
      <div className="relative m-[20px] flex h-[120px] w-full items-center justify-center rounded-[16px] bg-suldak-mint-500">
        <div className="xs:pr-0 pr-[20px]">
          <AriImg />
        </div>
        <p className="flex text-[14px] text-white">
          술닥술닥에 오신 것을 환영합니다! <br />
          저는 가이드 아리예요! 🐥
          <br />
          지금부터 술닥술닥 앱을 어떻게
          <br />
          이용하면 좋을지 안내해드릴게요!
        </p>
      </div>
    </div>
  );
}

export default Banner;
