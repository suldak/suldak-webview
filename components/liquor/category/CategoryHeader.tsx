import { useRouter } from "next/navigation";
import HeadBackIcon from "assets/icons/ico-head-back.svg";

interface CategoryHeaderProps {
  tagValue: string;
}
// 앱으로 돌아가기
const sendMessageToFlutter = () => {
  console.log("Attempting to send message to Flutter...");

  try {
    // Android의 경우
    if (window.AndroidBridge) {
      console.log("Android bridge detected, sending message...");
      window.AndroidBridge.goBack();
      console.log("Message sent to Android successfully");
    }
    // iOS의 경우
    else if (window.webkit && window.webkit.messageHandlers) {
      console.log("iOS bridge detected, sending message...");
      window.webkit.messageHandlers.goBack.postMessage("goBack");
      console.log("Message sent to iOS successfully");
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
