import { api } from '@/lib/api-client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { Category } from '../data/schema'

export function useCreateOrUpdateCategory() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async (data: Category) => {
      let response

      if (data.id) {
        response = await api.put<Category, Category>(
          `/categories/${data.id}`,
          data,
        )
      } else {
        response = await api.post<Category, Category>('/categories', data)
      }

      return response
    },

    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['categories'],
      })
    },
  })

  return {
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.isError,
    createOrUpdate: mutation.mutate,
  }
}
