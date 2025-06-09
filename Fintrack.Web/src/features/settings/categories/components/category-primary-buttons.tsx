import { Button } from '@/components/ui/button'
import { IconPlus } from '@tabler/icons-react'
import { useCategory } from '../context/category-context'

export function CategoryPrimaryButtons() {
  const { setOpen } = useCategory()
  return (
    <div className="flex gap-2">
      <Button
        className="space-x-1"
        onClick={() => {
          console.log('Create Category opening')
          setOpen('create')
        }}
      >
        <span>Create Category</span> <IconPlus size={18} />
      </Button>
    </div>
  )
}
