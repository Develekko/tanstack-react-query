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
  const queryClint = useQueryClient();

  return useMutation({
    mutationFn: requestData,
    onMutate: (data) => {
      // old data
      const savedComments = queryClint.getQueryData([
        "comments",
        { post_id: data.post_id.toString() },
      ]);

      //optimistic update
      const comment = { ...data, id: new Date() };

      queryClint.setQueryData(
        ["comments", { post_id: data.post_id.toString() }],
        (comments: CommentResponse[]) => {
          return [comment, ...comments];
        }
      );

      //the rollback
      return () => {
        queryClint.setQueryData(
          ["comments", { post_id: data.post_id.toString() }],
          savedComments
        );
      };
    },
    onError: (_, __, rollback) => {
      if (rollback) {
        rollback();
      }
    },
    onSuccess: () => {
      queryClint.invalidateQueries({ queryKey: ["comments"], exact: false });
    },
  });
};

export default useAddComment;
