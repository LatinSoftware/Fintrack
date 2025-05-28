import { Button } from '@/components/ui/button'
import { useCategory } from '../context/category-context'
import { IconPlus } from '@tabler/icons-react'

export function CategoryPrimaryButtons() {
  const { setOpen } = useCategory()
  return (
    <div className="flex gap-2">
      <Button className="space-x-1" onClick={() => {
        console.log('Create Category opening')
        setOpen('create')
      }}>
        <span>Create</span> <IconPlus size={18} />
      </Button>
    </div>
  )
}
