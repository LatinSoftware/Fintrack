import { api } from '@/lib/api-client'
import type { Transaction, TransactionMutate } from '@/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { format } from 'date-fns'
import { toast } from 'sonner'

const BASE_URL = '/transactions'

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
      const url = BASE_URL
      const payload = {
        ...data,
        amount: Number(data.amount), // Convert amount to number
      }

      return api.post<TransactionMutate, Transaction>(url, payload)
    },
    onSuccess: handleSuccess,
    onError: (error) => {
      console.error('Error creating transaction:', error)
      toast.message('Failed to create transaction', {
        description: error?.message,
      })
    },
  })

  const updateMutation = useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string
      data: TransactionMutate
    }) => {
      const url = `${BASE_URL}/${id}`
      const payload = {
        ...data,
        amount: Number(data.amount),
      }

      return api.put<TransactionMutate, Transaction>(url, payload)
    },
    onSuccess: handleSuccess,
    onError: (error) => {
      console.error('Error updating transaction:', error)
      toast.message('Failed to update transaction', {
        description: error?.message,
      })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const url = `${BASE_URL}/${id}`
      return api.delete<TransactionMutate, Transaction>(url)
    },
    onSuccess: handleSuccess,
    onError: (error) => {
      console.error('Error deleting transaction:', error)
      toast.message('Failed to delete transaction', {
        description: error?.message,
      })
    },
  })

  return {
    create: createMutation.mutate,
    update: updateMutation.mutate,
    remove: deleteMutation.mutate,
    isLoading:
      createMutation.isPending ||
      updateMutation.isPending ||
      deleteMutation.isPending,
  }
}
