import ContentSection from '../components/content-section'
import type { CategoryType } from './category.types'
import { CategoryDialogs } from './components/category-dialogs'
import { CategoryPrimaryButtons } from './components/category-primary-buttons'
import { categoryColumns } from './components/columns'
import { DataTable } from './components/data-table'
import CategoryProvider from './context/category-context'
import { useGetCategories } from './hooks'

interface Props {
  type: CategoryType
}

export default function SettingsCategories({ type }: Props) {
  const { data } = useGetCategories(type)

  return (
    <CategoryProvider>
      <ContentSection title="Categories" desc="Manage your categories">
        <>
          <CategoryPrimaryButtons />

          <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12">
            <DataTable data={data ?? []} columns={categoryColumns} />
          </div>

          <CategoryDialogs />
        </>
      </ContentSection>
    </CategoryProvider>
  )
}
