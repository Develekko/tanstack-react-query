import axios from "axios";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { DataItem } from "../types";

const fetData = async (q: string): Promise<DataItem[]> => {
  const response = await axios.get<DataItem[]>(
    `http://localhost:5005/posts?q=${q}`
  );
  return response.data;
};

const useSearch = (q: string): UseQueryResult<DataItem[]> => {
  return useQuery({
    queryKey: ["posts", "search", { q }],
    queryFn: () => fetData(q),
    staleTime: 1000 * 60 * 5,
    enabled: q.length > 0,
  });
};

export default useSearch;
