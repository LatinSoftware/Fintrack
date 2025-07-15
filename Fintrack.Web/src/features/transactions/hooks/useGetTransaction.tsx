import type { Transaction } from '@/types/transactions'
import { useQuery } from '@tanstack/react-query'
import { mockTransactions } from '../data/transaction-data'
import { format } from 'date-fns'

export function useGetTransaction(date: Date) {
  const query = useQuery<Transaction[]>({
    queryKey: ['transactions', format(date, 'yyyy-MM-dd')],
    queryFn: async () => {
      return Promise.resolve(mockTransactions)
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  })

  return {
    transactions: query.data || [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  }
}
