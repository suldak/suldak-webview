import "./globals.css";
import Provider from "provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="mx-auto bg-white font-pretendard text-suldak-gray-900">
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
