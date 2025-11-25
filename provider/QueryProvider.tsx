"use client";

import { useState } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

interface Props {
  children?: React.ReactNode;
}

/**
 * react-query 를 이용한 Provider 입니다.
 * @returns
 */
const QueryProvider = ({ children }: Props) => {
  // useState로 감싸서 QueryClient가 한 번만 생성되도록 함
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            gcTime: 0,
            retry: 0,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryProvider;
