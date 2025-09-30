import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import { api } from '@/lib/api-client'
import type { PaginationResponse, Transaction } from '@/types'

export function useGetTransaction(date: Date) {
  const query = useQuery<PaginationResponse<Transaction>>({
    queryKey: ['transactions', format(date, 'yyyy-MM')],
    queryFn: async () => {
      const dateString = format(date, 'yyyy-MM')
      const url = `/transactions?from=${dateString}&to=${dateString}&limit=9999&offset=0`

      return await api.get<any, PaginationResponse<Transaction>>(url)
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  })

  return {
    transactions: query.data?.data || [],
    pagination: query.data?.meta,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  }
}
