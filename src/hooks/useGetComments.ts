import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "axios";
import { CommentResponse } from "../types";

const fetchData = async (post_id: string): Promise<CommentResponse[]> => {
  const result = await axios.get<CommentResponse[]>(
    `http://localhost:5005/comments?post_id=${post_id}`
  );

  return result.data;
};

const useGetComments = (post_id: string): UseQueryResult<CommentResponse[]> => {
  return useQuery({
    queryKey: ["comments", { post_id }],
    queryFn: () => fetchData(post_id),
  });
};

export default useGetComments;
