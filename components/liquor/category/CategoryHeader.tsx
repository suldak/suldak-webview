import { useRouter } from "next/navigation";
import HeadBackIcon from "assets/icons/ico-head-back.svg";

interface CategoryHeaderProps {
  tagValue: string;
}
// 앱으로 돌아가기
const sendMessageToFlutter = () => {
  console.log("Attempting to send message to Flutter...");

  try {
    // FlutterBridge 채널을 통해 메시지 전송
    if (window.FlutterBridge) {
      console.log("Flutter bridge detected, sending message...");
      window.FlutterBridge.postMessage("goBack");
      console.log("Message sent to Flutter successfully");
    } else {
      console.warn(
        "No Flutter bridge detected. Are you running in a Flutter WebView?",
      );
    }
  } catch (error) {
    console.error("Error sending message to Flutter:", error);
  }
};

// 카테고리 헤더 컴포넌트
function CategoryHeader({ tagValue }: CategoryHeaderProps) {
  const router = useRouter();

  return (
    <div className="relative flex h-[48px] w-full items-center border-b px-2 pt-1">
      <HeadBackIcon onClick={sendMessageToFlutter} />
      <div className="border-b-1 relative flex w-full items-center justify-center">
        <div className="mr-8 w-full py-2 text-center"></div>
      </div>
    </div>
  );
}

export default CategoryHeader;
