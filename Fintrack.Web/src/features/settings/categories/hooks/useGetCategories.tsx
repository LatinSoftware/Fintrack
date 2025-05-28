import { api } from '@/lib/api-client'
import { useQuery } from '@tanstack/react-query'
import type { Category } from '../data/schema'
import type { CategoryType } from '../category.types'

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
