// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // 요청 헤더에서 Authorization 토큰 가져오기
  const authToken = request.headers.get("Authorization");

  if (authToken) {
    // 토큰을 쿠키에 저장 (JavaScript에서 접근 가능)
    const response = NextResponse.next();
    response.cookies.set("authToken", authToken, {
      path: "/",
      httpOnly: false, // JavaScript에서 접근 가능하도록
      sameSite: "strict",
    });
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // liquor 경로에만 적용
    "/liquor/:path*",
  ],
};
