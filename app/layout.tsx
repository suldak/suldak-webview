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
        {/* 토큰 초기화 스크립트 */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
          // 페이지 로드 시 실행
          (function() {
            try {
              // 토큰 확인 함수
              const checkForToken = function() {
                // 1. 쿠키에서 토큰 확인
                const getCookieToken = function() {
                  const cookies = document.cookie.split(';');
                  for (let i = 0; i < cookies.length; i++) {
                    const cookie = cookies[i].trim();
                    if (cookie.startsWith('authToken=')) {
                      return cookie.substring('authToken='.length, cookie.length);
                    }
                  }
                  return null;
                };
                
                const cookieToken = getCookieToken();
                if (cookieToken) {
                  console.log('Found token in cookie, saving to localStorage');
                  localStorage.setItem('authToken', cookieToken);
                  return true;
                }
                
                // 2. 로컬 스토리지 확인
                const storedToken = localStorage.getItem('authToken');
                if (storedToken) {
                  console.log('Using stored token');
                  return true;
                }
                
                return false;
              };
              
              // 토큰이 없으면 FlutterBridge에 요청
              if (!checkForToken()) {
                let attempts = 0;
                const maxAttempts = 5;
                
                const requestToken = function() {
                  if (attempts >= maxAttempts) return;
                  
                  attempts++;
                  console.log('Requesting token from Flutter, attempt ' + attempts);
                  
                  if (window.FlutterBridge) {
                    try {
                      window.FlutterBridge.postMessage('requestToken');
                    } catch (e) {
                      console.error('Error requesting token:', e);
                    }
                  }
                };
                
                // 즉시 한번 요청
                setTimeout(requestToken, 500);
                
                // 1초마다 재시도 (최대 5회)
                const interval = setInterval(() => {
                  // 토큰이 이미 설정되었으면 중단
                  if (checkForToken()) {
                    clearInterval(interval);
                    return;
                  }
                  
                  requestToken();
                  
                  if (attempts >= maxAttempts) {
                    clearInterval(interval);
                  }
                }, 1000);
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
