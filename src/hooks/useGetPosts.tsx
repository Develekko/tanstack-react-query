import axios from "axios";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { Post, PostStatusType } from "../types";

interface UseGetPostsProps {
  selectedPostStatus: PostStatusType;
  searchQuery: string;
  paginate: number;
}

// ✅ Use Vite environment variable
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5005";

export const fetchPosts = async ({ selectedPostStatus, searchQuery, paginate }: UseGetPostsProps): Promise<Post[]> => {
  const queryParams = new URLSearchParams();

  if (selectedPostStatus !== "all") {
    queryParams.append("status", selectedPostStatus);
  }

  if (searchQuery) {
    queryParams.append("q", searchQuery);
  }
  if (paginate) {
    queryParams.append("_page", paginate.toString());
    queryParams.append("_limit", "5");
  }


  const response = await axios.get(`${API_BASE_URL}/posts?${queryParams.toString()}`);
  return response.data;
};

const useGetPosts = ({ selectedPostStatus, searchQuery, paginate }: UseGetPostsProps): UseQueryResult<Post[]> => {
  return useQuery<Post[]>({
    queryKey: ["posts", { selectedPostStatus, searchQuery, paginate }],
    queryFn: () => fetchPosts({ selectedPostStatus, searchQuery, paginate }),
    staleTime: 1000 * 10, // 10 seconds
    refetchInterval: 1000 * 60 * 60, // 5 seconds
  });
};

export default useGetPosts;
