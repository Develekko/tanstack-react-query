import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const fetchData = async () => {
  const response = await axios.get("http://localhost:5005/posts");
  return response.data;
};
const useGetPosts = () => {
  const query = useQuery({
    queryKey: ["posts"],
    queryFn: fetchData,
  });
  return query;
};

export default useGetPosts;
