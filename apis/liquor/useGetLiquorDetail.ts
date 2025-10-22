import axiosInstance from "apis/axiosInstance";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ResponseType } from "apis/api";
import { Liquor } from "models/liquor";

// 서버 컴포넌트용 fetch 함수
export async function fetchLiquorDetail(
  id: number,
): Promise<ResponseType<Liquor>> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3001";
  const url = `${baseUrl}/api/liquor/${id}`;
  const token = process.env.NEXT_PUBLIC_TOKEN;

  console.log("[Server] 🔄 Fetching liquor detail - ID:", id);
  console.log("[Server] 🌐 URL:", url);

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: token || "",
        "Content-Type": "application/json",
      },
    });

    console.log("[Server] ✨ Response status:", response.status);

    if (!response.ok) {
      console.error("[Server] ❌ Response not OK:", {
        status: response.status,
        statusText: response.statusText,
        url: response.url,
      });
      throw new Error(`Failed to fetch liquor detail: ${response.status}`);
    }

    const data = await response.json();
    console.log("[Server] ✅ Data fetched successfully");
    return data;
  } catch (error) {
    console.error("[Server] 🚨 Fetch error:", error);
    throw error;
  }
}

// 클라이언트 컴포넌트용 함수
const getLiquorDetail = async (id: number): Promise<ResponseType<Liquor>> => {
  try {
    console.log("[Client] 🔄 Fetching liquor detail - ID:", id);
    const { data } = await axiosInstance.get<ResponseType<Liquor>>(
      `/api/liquor/${id}`,
    );
    console.log("[Client] ✅ Data fetched successfully");
    return data;
  } catch (error) {
    console.error("[Client] 🚨 Error fetching liquor detail:", error);
    throw error;
  }
};

export const useGetLiquorDetail = (id: number) => {
  const { data } = useSuspenseQuery({
    queryKey: ["liquor-detail", id],
    queryFn: () => getLiquorDetail(id),
    // 상세 페이지는 5분 동안 fresh 상태 유지 (자주 변경되지 않는 데이터)
    staleTime: 1000 * 60 * 5,
    // 5분 이내 뒤로가기 시 refetch 하지 않음
    gcTime: 1000 * 60 * 10,
  });

  return {
    data: data?.data,
  };
};
