import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { IconPlus } from '@tabler/icons-react'
import { useAccount } from '../context/account-context'

function DataTableHeader() {
  const { setOpen } = useAccount()

  return (
    <div className="flex items-center justify-between rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-3 shadow-sm">
      <Input placeholder="Search..." className="max-w-sm" />
      <Button
        className="space-x-1"
        onClick={() => {
          setOpen('create')
        }}
      >
        <span>Create</span> <IconPlus size={18} />
      </Button>
    </div>
  )
}

export default DataTableHeader
