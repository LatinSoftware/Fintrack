import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { Account } from '@/types/account'
import type { Row } from '@tanstack/react-table'
import { EditIcon, MoreHorizontal, Trash2 } from 'lucide-react'
import { useAccount } from '../context/account-context'

export function AccountTableActions({ row }: { row: Row<Account> }) {
  const { setCurrentRow, setOpen } = useAccount()

  const account = row.original
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="data-[state=open]:bg-muted flex h-8 w-8 p-0 z-50"
        >
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem
          onClick={() => {
            setCurrentRow(account)
            setOpen('update')
          }}
          className="cursor-pointer"
        >
          <EditIcon className="mr-2 h-4 w-4" />
          Edit
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => {
            setCurrentRow(account)
            setOpen('delete')
          }}
          className="cursor-pointer text-red-600 dark:text-red-400"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
