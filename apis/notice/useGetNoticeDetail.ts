import axiosInstance from "apis/axiosInstance";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ResponseType } from "apis/api";
import { Notice } from "models/notice";

const getNoticDetail = async (noticeId: number) => {
  try {
    const { data } = await axiosInstance.get<ResponseType<Notice>>(
      `/api/notice/view/${noticeId}`,
    );

    return data;
  } catch (error) {
    console.error("Error fetching notice detail:", error);
    throw error;
  }
};

export const useGetNoticeDetail = (id: number) => {
  const { data } = useSuspenseQuery({
    queryKey: ["notice-detail", id],
    queryFn: () => getNoticDetail(id),
  });

  return {
    data: data?.data,
  };
};
