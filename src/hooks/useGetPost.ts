import axios from "axios"
import { useQuery, useQueryClient, UseQueryResult } from "@tanstack/react-query"
import { Post } from "../types"

interface UseGetPostProps {
  id: string;
}

const fetchData = async ({ id }: UseGetPostProps): Promise<Post> => {
  const response = await axios.get(`http://localhost:5005/posts/${id}`);
  return response.data;
};

export default function useGetPost({ id }: UseGetPostProps): UseQueryResult<Post> {
  const queryClient = useQueryClient();
  let cachedData: Post | undefined
  if (id) {
    cachedData = queryClient.getQueryData<Post>(["post", { "id": +id }])
  }

  return useQuery<Post>({
    queryKey: ["post", { id: +id }],
    queryFn: () => fetchData({ id }),
    initialData: cachedData,
  });
}
