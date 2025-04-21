import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

// 현재 요청의 헤더를 확인하기 위한 API 엔드포인트 생성
export async function GET(request: NextRequest) {
  return NextResponse.json({
    headers: Object.fromEntries(request.headers),
    url: request.url,
  });
}
