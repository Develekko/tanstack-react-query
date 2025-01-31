import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const fetchPosts = async () => {
  const result = await axios.get("http://localhost:5005/posts");
  return result.data;
};

const useGetPosts = () => {
  return useQuery({ queryKey: ["posts"], queryFn: fetchPosts });
};

export default useGetPosts;
