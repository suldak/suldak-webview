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
                  return true; // 쿠키에서 토큰을 찾으면 로컬 스토리지에 저장하고 true 반환
                }
                
                // 2. 로컬 스토리지 확인 (쿠키에 없으면 로컬 스토리지 확인)
                const storedToken = localStorage.getItem('authToken');
                if (storedToken) {
                  console.log('Using stored token from localStorage');
                  return true; // 로컬 스토리지에 토큰이 있으면 true 반환
                }
                
                return false; // 쿠키와 로컬 스토리지 모두에 토큰이 없음
              };
              
              // 토큰 확인 실행 (FlutterBridge 요청 부분 제거됨)
              if (!checkForToken()) {
                console.log('No token found in cookies or localStorage. Waiting for potential header injection or using fallback.');
                // 필요한 경우 여기에 환경 변수 토큰 사용 등의 대체 로직 추가 가능
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
