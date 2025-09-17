import axiosInstance from "apis/axiosInstance";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ResponseType } from "apis/api";
import { RankingKeyword } from "./types";

const getRankingKeyword = async (): Promise<ResponseType<RankingKeyword[]>> => {
  const { data } = await axiosInstance.get<ResponseType<RankingKeyword[]>>(
    `/api/search/text/view/ranking`,
    {
      params: {
        searchHour: 0,
        limitNum: 10,
        searchType: "LIQUOR",
      },
    },
  );

  return data;
};

export const useGetRankingKeyword = () => {
  const { data } = useSuspenseQuery({
    queryKey: ["ranking-keyword"],
    queryFn: getRankingKeyword,
  });

  return {
    data: data.data,
  };
};
