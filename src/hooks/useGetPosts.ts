import axios from "axios";
import { useQuery } from "@tanstack/react-query";

interface DataItem {
  id: number;
  title: string;
  body: string;
  status: "published" | "draft" | "block";
  topRate: boolean;
}

const fetchData = async (): Promise<DataItem[]> => {
  const response = await axios.get<DataItem[]>("http://localhost:5005/posts");
  return response.data;
};
const useGetPosts = () => {
  const query = useQuery<DataItem[], Error>({
    queryKey: ["posts"],
    queryFn: fetchData,
  });
  return query;
};

export default useGetPosts;
