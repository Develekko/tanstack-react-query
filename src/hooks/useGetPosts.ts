import axios from "axios";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

interface PostItem {
  id: number;
  title: string;
  body: string;
  status: "published" | "draft" | "block";
  topRate: boolean;
}

const fetchPosts = async () => {
  const result = await axios.get("http://localhost:5005/posts");
  return result.data;
};

const useGetPosts = (): UseQueryResult<PostItem[]> => {
  return useQuery({ queryKey: ["posts"], queryFn: fetchPosts });
};

export default useGetPosts;
