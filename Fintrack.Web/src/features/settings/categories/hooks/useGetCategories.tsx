import { api } from '@/lib/api-client'
import type { Category, CategoryType } from '@/types'
import { useQuery } from '@tanstack/react-query'

export function useGetCategories(type?: CategoryType) {
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
