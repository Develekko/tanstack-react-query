import axios from "axios";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { Comment } from "../types";

interface UseGetCommentsProps {
  id: string;
  signal?: AbortSignal;
}

// ✅ Use Vite environment variable
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5005";

export const fetchComments = async ({ id, signal }: UseGetCommentsProps): Promise<Comment[]> => {

  const response = await axios.get(`${API_BASE_URL}/comments?post_id=${id}&_sort=id&_order=desc`, { signal });
  return response.data;
};

const useGetComments = ({ id }: UseGetCommentsProps): UseQueryResult<Comment[]> => {
  return useQuery<Comment[]>({
    queryKey: ["comments", { id: +id }],
    queryFn: ({ signal }) => fetchComments({ id, signal }),
    staleTime: 1000 * 10, // 10 seconds
    refetchInterval: 1000 * 60 * 60, // 5 seconds
  });
};

export default useGetComments;
