import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { useGetCategories } from './hooks'




export default function SettingsCategories() {

  const { data, isLoading, isError, error } = useGetCategories()

  return (
    <>
      <Header />

      <Main fixed>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Categories settings
          </h1>
          <p className="text-muted-foreground">
            Manage your categories here. You can add, edit, or delete categories
            as needed.
          </p>

          <div className="mt-6 space-y-4">
            {isLoading && <p>Loading...</p>}
            {isError && <p>Error: {error.message}</p>}
            {data && (
              <ul className="space-y-2">
                {data.map((category) => (
                  <li key={category.id} className="border p-4 rounded-md">
                    <h2 className="text-lg font-semibold">{category.name}</h2>
                    <p>{category.description}</p>
                  </li>
                ))}
              </ul>
            )}
            </div>
          
        </div>
      </Main>
    </>
  )
}
