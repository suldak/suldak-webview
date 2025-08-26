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
      </body>
    </html>
  );
}
