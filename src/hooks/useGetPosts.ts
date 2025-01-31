import axios from "axios";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

interface DataItem {
  id: number;
  title: string;
  body: string;
  status: "published" | "draft" | "block";
  topRate: boolean;
}

const fetchPosts = async (): Promise<DataItem[]> => {
  const result = await axios.get<DataItem[]>("http://localhost:5005/posts");
  return result.data;
};

const useGetPosts = (): UseQueryResult<DataItem[]> => {
  return useQuery({ queryKey: ["posts"], queryFn: fetchPosts });
};

export default useGetPosts;
