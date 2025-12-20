import "./globals.css";
import Provider from "provider";

// Flutter WebView에서 토큰을 받기 위한 초기화 스크립트
// dynamic import보다 먼저 실행되어야 하므로 인라인 스크립트로 삽입
const flutterBridgeScript = `
  (function() {
    // 토큰 저장용 임시 변수 (모듈 로드 전 토큰 수신 시 사용)
    window.__pendingToken = null;
    
    // 토큰 수신 함수 등록 (Flutter에서 호출)
    window.authorizationToken = function(token) {
      console.log('[FlutterBridge] Token received from Flutter');
      if (!token) {
        console.warn('[FlutterBridge] Received empty token');
        return;
      }
      
      // localStorage에 저장
      try {
        localStorage.setItem('authToken', token);
        console.log('[FlutterBridge] Token saved to localStorage');
      } catch (e) {
        console.error('[FlutterBridge] Failed to save token:', e);
      }
      
      // 모듈이 로드된 후 이벤트 발생
      window.__pendingToken = token;
      window.dispatchEvent(new CustomEvent('tokenUpdated', { detail: token }));
    };
    
    // 레거시 함수명도 지원
    window.receiveToken = window.authorizationToken;
    
    console.log('[FlutterBridge] Global token receiver initialized');
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        {/* Flutter WebView 토큰 수신을 위한 초기화 스크립트 - 가장 먼저 실행 */}
        <script dangerouslySetInnerHTML={{ __html: flutterBridgeScript }} />

        {/* 외부 출처 사전 연결로 초기 연결 시간 절약 */}
        <link rel="preconnect" href="https://fastly.jsdelivr.net" />
        <link rel="dns-prefetch" href="https://fastly.jsdelivr.net" />
        <link rel="preconnect" href="https://api.suldak.co.kr" />
        <link rel="dns-prefetch" href="https://api.suldak.co.kr" />

        {/* 폰트 preload로 렌더링 차단 최소화 */}
        <link
          rel="preload"
          href="https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Bold.woff"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />
      </head>
      <body className="mx-auto bg-white font-pretendard text-suldak-gray-900">
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
