import { Transactions } from '@/features/transactions'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/transactions/')({
  component: Transactions,
})
