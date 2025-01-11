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

export default sendMessageToFlutter;
