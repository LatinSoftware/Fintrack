import { api } from '@/lib/api-client'
import { useQuery } from '@tanstack/react-query'
import type { Category } from '../data/schema'

export function useGetCategories() {
  const query = useQuery<Category[], Error, Category[]>({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await api.get<any, Category[]>('/categories')
      return response
    },
    refetchOnWindowFocus: false,
  })

  return query
}
