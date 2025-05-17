import axios from 'axios'
import { Post } from '../types'
import { useQuery, UseQueryResult } from '@tanstack/react-query'

const fetchData = async (searchQuery: string): Promise<Post[]> => {
  const response = await axios.get(`http://localhost:5005/posts?q=${searchQuery}`)
  return response.data
}
export default function useSearch(searchQuery: string): UseQueryResult<Post[]> {

  return useQuery({
    queryKey: ['posts', 'search', { searchQuery }],
    queryFn: () => fetchData(searchQuery),
    enabled: !!searchQuery, // Only run the query if searchQuery is not empty
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}
