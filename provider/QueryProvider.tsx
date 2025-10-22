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

            // 1분 동안 데이터를 fresh 상태로 유지
            // 이 시간 동안은 동일한 쿼리를 재요청하지 않음
            staleTime: 1000 * 60,

            // 네트워크 오류 시 재시도 횟수 (0으로 유지하여 빠른 에러 표시)
            retry: 0,

            // 브라우저 포커스 시 자동 refetch 방지
            refetchOnWindowFocus: false,

            // 컴포넌트 마운트 시 자동 refetch 방지 (뒤로가기)
            refetchOnMount: false,

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
