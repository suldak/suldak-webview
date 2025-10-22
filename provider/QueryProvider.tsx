"use client";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

interface Props {
  children?: React.ReactNode;
}

const QueryProvider = ({ children }: Props) => {
  // useState를 사용하여 queryClient를 한 번만 생성 (성능 최적화)
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // 5분 동안 캐시 메모리에 보관 (가비지 컬렉션 시간)
            // 뒤로가기 시 빠르게 데이터 표시 가능
            gcTime: 1000 * 60 * 5,

            // 30초 동안 데이터를 fresh 상태로 유지 (기본값)
            // 개별 쿼리에서 필요에 따라 오버라이드 가능
            staleTime: 1000 * 30,

            // 네트워크 오류 시 재시도 횟수 (0으로 유지하여 빠른 에러 표시)
            retry: 0,

            // 브라우저 포커스 시 자동 refetch 방지
            refetchOnWindowFocus: false,

            // 재연결 시 자동 refetch 방지
            refetchOnReconnect: false,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default QueryProvider;
