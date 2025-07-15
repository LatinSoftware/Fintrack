import { useMutation } from '@tanstack/react-query'

export function useTransactionMutation() {
  const createMutation = useMutation({})

  return {
    create: createMutation.mutate,
    isLoading: createMutation.isPending,
  }
}
