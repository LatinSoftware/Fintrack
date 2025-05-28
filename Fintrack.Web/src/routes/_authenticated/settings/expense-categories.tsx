import SettingsCategories from '@/features/settings/categories'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/settings/expense-categories',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <SettingsCategories type="expense" />
}
