import axios from "axios";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { DataItem, PostStatusType } from "../types/index";

const fetchData = async (
  selectedStatus: PostStatusType
): Promise<DataItem[]> => {
  if (selectedStatus === "all") {
    const response = await axios.get<DataItem[]>("http://localhost:5005/posts");
    return response.data;
  } else {
    const response = await axios.get<DataItem[]>(
      `http://localhost:5005/posts?status=${selectedStatus}`
    );
    return response.data;
  }
};
const useGetPosts = (
  selectedStatus: PostStatusType
): UseQueryResult<DataItem[]> => {
  return useQuery({
    queryKey: ["posts", { selectedStatus }],
    queryFn: () => fetchData(selectedStatus),
    staleTime: 1000 * 10,
  });
};

export default useGetPosts;
