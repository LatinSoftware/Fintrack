import { api } from '@/lib/api-client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type Category } from '../data/schema'

export function useDeleteCategory() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (id: string) => api.delete(`/categories/${id}`),

    onMutate: async (categoryId: string) => {
      await queryClient.cancelQueries({ queryKey: ['categories'] })

      const previousCategories = queryClient.getQueryData<Category[]>([
        'categories',
      ])

      // Optimistically update the cache
      queryClient.setQueryData<Category[]>(
        ['categories'],
        (old) => old?.filter((c) => c.id !== categoryId) ?? [],
      )

      // Return rollback context
      return { previousCategories }
    },

    onError: (_err, _categoryId, context) => {
      // Rollback to previous state if error
      if (context?.previousCategories) {
        queryClient.setQueryData(['categories'], context.previousCategories)
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
    },
  })

  return mutation
}
