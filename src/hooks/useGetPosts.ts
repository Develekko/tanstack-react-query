import axios from "axios";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { DataItem, PostStatusType } from "../types";

const fetchPosts = async (
  selectedStatus: PostStatusType
): Promise<DataItem[]> => {
  if (selectedStatus === "all") {
    const result = await axios.get<DataItem[]>("http://localhost:5005/posts");
    return result.data;
  } else {
    const result = await axios.get<DataItem[]>(
      `http://localhost:5005/posts?status=${selectedStatus}`
    );
    return result.data;
  }
};

const useGetPosts = (
  selectedStatus: PostStatusType
): UseQueryResult<DataItem[]> => {
  return useQuery({
    queryKey: ["posts", { selectedStatus }],
    queryFn: () => fetchPosts(selectedStatus),
    staleTime: 1000 * 10,
    refetchInterval: 1000 * 15,
  });
};

export default useGetPosts;
