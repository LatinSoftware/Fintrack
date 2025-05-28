import SettingsCategories from '@/features/settings/categories'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/settings/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <SettingsCategories type="income" />
}
