import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { Post, RemovePost } from "../types";

const removePost = async (post: RemovePost): Promise<RemovePost> => {
    const response = await axios.delete(`http://localhost:5005/posts/${post.postId}`);
    return response.data;
};

export default function useRemovePost(): UseMutationResult<RemovePost, AxiosError, RemovePost> {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: removePost,
        onMutate: (data) => {
            const queryKey = ["posts", {"paginate":data.pageNumber,"searchQuery":data.search,"selectedPostStatus":data.filter}];
            console.log("queryKey", queryKey);
            const savedPosts = queryClient.getQueryData<Post[]>(queryKey);
            queryClient.setQueryData<Post[]>(queryKey, (prevState: Post[] | undefined) => {
                return prevState?.filter((post) => post.id !== data.postId) || [];
            });
            return () => {
                queryClient.setQueryData(queryKey, savedPosts);
            };
        },
        onError: (error, _, rollBack) => {
            console.log("error", error);
            if (rollBack) {
                rollBack();
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey:["posts"],exact:false});
            console.log("success");
        }
    });
}
