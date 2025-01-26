import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "axios";
import { DataItem } from "../types";

const fetchData = async (q: string): Promise<DataItem> => {
  const response = await axios.get(`http://localhost:5005/posts?q=${q}`);
  return response.data;
};
const useSearch = (q: string): UseQueryResult<DataItem[]> => {
  return useQuery({
    queryKey: ["posts", "search", { q }],
    queryFn: () => fetchData(q),
    staleTime: 1000 * 60 * 5,
    enabled: q.length > 0,
  });
};

export default useSearch;
