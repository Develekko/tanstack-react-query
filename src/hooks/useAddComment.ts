import axios, { AxiosError } from 'axios'
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'

interface commentPost {
    body: string;
    post_id: number;
}

interface commentResponse {
    id: number;
    body: string;
    post_id: number;
}

const requetData = async (data: commentPost): Promise<commentResponse> => {
    const response = await axios.post("http://localhost:5005/comments", data);
    return response.data;
}

export default function useAddComment(): UseMutationResult<commentResponse, AxiosError, commentPost> {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: requetData,
        onMutate: (data) => {
            const queryKey = ["comments", { id: data.post_id }];
            const savedComment = queryClient.getQueryData<commentResponse[]>(queryKey);
            console.log("savedComment", savedComment)
            const newComment = { ...data, id: new Date().getTime() }
            queryClient.setQueryData(queryKey, (comments: commentResponse[]) => {
                console.log([...comments, newComment])
                return [newComment, ...comments]
            })

            return () => {
                queryClient.setQueryData(queryKey, savedComment)
            }
        },
        onError: (error, _, rollBack) => {
            console.log("error", error)
            if (rollBack) {
                rollBack()
            }
        },
        onSuccess: () => {
        }
    })

}
