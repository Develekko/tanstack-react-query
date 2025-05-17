import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from "axios";
import { Post, TopRatePost } from "../types";

const UpdateRate = async (rate:TopRatePost): Promise<Post> => {
    const result = await axios.patch(`http://localhost:5005/posts/${rate.postId}`, {
        topRate: rate.rateValue,
    });
    return result.data;
}


export const useUpdateRate = (): UseMutationResult<Post, AxiosError, TopRatePost> => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: UpdateRate,
        onMutate: (data) => {
            const queryKey =  ["posts",{"paginate":data.pageNumber,"searchQuery":data.search,"selectedPostStatus":data.filter}]
            const savedPosts = queryClient.getQueryData<Post[]>( queryKey)
            queryClient.setQueryData<Post[]>(queryKey,(prevState: Post[] | undefined) => {
                    return prevState?.map((post) => {
                        console.log("post", post)
                        console.log("data", data)
                        if (post.id === data.postId) {
                            return { ...post, topRate: data.rateValue };
                        }
                        return post;
                    }) || [];
                })
            return ()=>{
                queryClient.setQueryData(queryKey, savedPosts)
            }
        },
        onError: (_, __, rollBack) => {
            if (rollBack) {
                rollBack()
            }
        },
    })
}