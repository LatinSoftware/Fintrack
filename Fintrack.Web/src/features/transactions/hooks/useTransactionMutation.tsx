import { api } from '@/lib/api-client'
import type { Transaction, TransactionMutate } from '@/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { format } from 'date-fns'

export function useTransactionMutation() {
  const queryClient = useQueryClient()

  const handleSuccess = (data: Transaction) => {
    console.log('Transaction created successfully:', data)
    queryClient.invalidateQueries({
      queryKey: ['transactions', format(data.transactionDate, 'yyyy-MM-dd')],
    })
  }

  const createMutation = useMutation({
    mutationFn: async (data: TransactionMutate) => {
      const url = '/transactions'
      const payload = {
        ...data,
        amount: Number(data.amount), // Convert amount to number
      }

      return api.post<TransactionMutate, Transaction>(url, payload)
    },
    onSuccess: handleSuccess,
    onError: (error) => {
      console.error('Error creating transaction:', error)
    },
  })

  return {
    create: createMutation.mutate,
    isLoading: createMutation.isPending,
  }
}
