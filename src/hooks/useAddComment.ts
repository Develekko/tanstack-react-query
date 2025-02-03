import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
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
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: requestData,
    onMutate: (data) => {
      // old dat
      const savedComments = queryClient.getQueryData([
        "comments",
        { post_id: data.post_id },
      ]);

      const newComments = { ...data, id: new Date() };

      queryClient.setQueryData(
        ["comments", { post_id: data.post_id }],
        (comments: CommentResponse[]) => {
          return [newComments, ...comments];
        }
      );

      return () => {
        queryClient.setQueryData(
          ["comments", { post_id: data.post_id }],
          savedComments
        );
      };
    },
    onError: (_, __, rollBack) => {
      if (rollBack) {
        rollBack();
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"], exact: false });
    },
  });
};

export default useAddComment;
