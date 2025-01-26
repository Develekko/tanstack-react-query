import axios from "axios";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { DataItem, PostStatusType } from "../types/index";

const fetchData = async (
  selectedStatus: PostStatusType,
  paginate: number
): Promise<DataItem[]> => {
  if (selectedStatus === "all") {
    const response = await axios.get<DataItem[]>(
      `http://localhost:5005/posts?_page=${paginate}&_limit=5`
    );
    return response.data;
  } else {
    const response = await axios.get<DataItem[]>(
      `http://localhost:5005/posts?status=${selectedStatus}`
    );
    return response.data;
  }
};
const useGetPosts = (
  selectedStatus: PostStatusType,
  paginate: number
): UseQueryResult<DataItem[]> => {
  return useQuery({
    queryKey: ["posts", { selectedStatus, paginate }],
    queryFn: () => fetchData(selectedStatus, paginate),
    staleTime: 1000 * 60 * 5,
  });
};

export default useGetPosts;
