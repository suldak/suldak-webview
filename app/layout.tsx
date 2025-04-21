import { Inter } from "next/font/google";
import "./globals.css";
import Provider from "provider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`mx-auto bg-white font-pretendard text-suldak-gray-900 ${inter.className}`}
      >
        <Provider>{children}</Provider>
        {/* 헤더 확인 스크립트 추가 */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
          // 페이지 로드 시 실행
          (function() {
            try {
              // 이미 저장된 토큰이 있는지 확인
              const storedToken = localStorage.getItem('authToken');
              if (storedToken) {
                console.log('Using stored token');
                return;
              }
              
              // window.receiveToken 함수가 있는지 확인 (함수는 나중에 설정될 수 있음)
              const setupTokenRequest = function() {
                // 웹뷰 컨트롤러의 헤더 정보가 직접 접근 불가능하므로
                // 첫 페이지 로드 후 5초 동안 플러터에 토큰을 요청
                let attempts = 0;
                const maxAttempts = 5;
                
                const requestToken = function() {
                  if (attempts >= maxAttempts) return;
                  
                  attempts++;
                  console.log('Requesting token from Flutter, attempt ' + attempts);
                  
                  // FlutterBridge가 있으면 토큰 요청
                  if (window.FlutterBridge) {
                    try {
                      window.FlutterBridge.postMessage('requestToken');
                    } catch (e) {
                      console.error('Error requesting token:', e);
                    }
                  }
                };
                
                // 즉시 한번 요청
                requestToken();
                
                // 1초마다 재시도 (최대 5회)
                const interval = setInterval(() => {
                  // 토큰이 이미 설정되었으면 중단
                  if (localStorage.getItem('authToken')) {
                    clearInterval(interval);
                    return;
                  }
                  
                  requestToken();
                  
                  if (attempts >= maxAttempts) {
                    clearInterval(interval);
                  }
                }, 1000);
              };
              
              // DOM 로드 완료 후 토큰 요청 시작
              if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', setupTokenRequest);
              } else {
                // DOM이 이미 로드됨
                setupTokenRequest();
              }
            } catch (e) {
              console.error('Error in token initialization script:', e);
            }
          })();
        `,
          }}
        />
      </body>
    </html>
  );
}
