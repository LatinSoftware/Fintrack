import { AccountPage } from '@/features/settings/accounts'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/settings/accounts')({
  component: AccountPage,
})
