import "./globals.css";
import Provider from "provider";
import dynamic from "next/dynamic";

// 디버그 패널 (클라이언트 전용, 우측 상단 더블클릭으로 활성화)
const DebugPanel = dynamic(() => import("components/shared/DebugPanel"), {
  ssr: false,
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
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
        <DebugPanel />
      </body>
    </html>
  );
}
