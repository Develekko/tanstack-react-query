import { useMutation, UseMutationResult } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { CommentPost, CommentResponse } from "../types";

const requestData = async (data: CommentPost): Promise<CommentResponse> => {
  const result = await axios.post<CommentResponse>(
    "http://localhost:5005/comments",
    data
  );
  return result.data;
};

const useAddComment = (): UseMutationResult<
  CommentResponse,
  AxiosError,
  CommentPost
> => {
  return useMutation({
    mutationFn: requestData,
    onSuccess: (response) => {
      console.log(response);
    },
  });
};

export default useAddComment;
