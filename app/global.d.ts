declare global {
  interface Window {
    authorizationToken?: (token: string) => void;

    FlutterBridge?: {
      postMessage(message: string): void;
    };
    receiveToken?: (token: string) => void;
  }
}

export {};
