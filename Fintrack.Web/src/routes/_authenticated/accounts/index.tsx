import { AccountPage } from '@/features/accounts'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/accounts/')({
  component: AccountPage,
})
