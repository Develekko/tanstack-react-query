import axios from "axios";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { type PostStatusType } from "../types/index";
interface DataItem {
  id: number;
  title: string;
  body: string;
  status: "published" | "draft" | "block";
  topRate: boolean;
}

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
  const query = useQuery({
    queryKey: ["posts", { selectedStatus }],
    queryFn: () => fetchData(selectedStatus),
    staleTime: 1000 * 10,
  });
  return query;
};

export default useGetPosts;
