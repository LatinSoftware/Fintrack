import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatCurrency, type CurrencyCode } from '@/lib/currencies'
import { createColumnHelper, type Row } from '@tanstack/react-table'
import {
  ArrowUpDown,
  Banknote,
  Coins,
  CreditCard,
  MoreHorizontal,
  PiggyBank,
  Trash2,
  TrendingUp,
} from 'lucide-react'
import { AccountType, AccountTypeLabels, type Account } from '@/types/account'
import { format } from 'date-fns'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export const accountTypeIcons: Record<
  AccountType,
  React.ComponentType<{ className?: string }>
> = {
  [AccountType.Checking]: CreditCard,
  [AccountType.Savings]: PiggyBank,
  [AccountType.Investment]: TrendingUp,
  [AccountType.Cash]: Coins,
  [AccountType.Bank]: Banknote,
  [AccountType.CreditCard]: CreditCard,
}

export const columnHelper = createColumnHelper<Account>()
export const accountColumns = [
  columnHelper.accessor('name', {
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        className="h-8 px-2 lg:px-3"
      >
        Account
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const account = row.original
      const Icon = accountTypeIcons[account.type]

      return (
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Icon className="h-4 w-4 text-primary" />
          </div>
          <div>
            <div className="font-medium">{account.name}</div>
            <div className="text-sm text-muted-foreground">
              {AccountTypeLabels[account.type]}
            </div>
          </div>
        </div>
      )
    },
  }),

  columnHelper.accessor('balance', {
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        className="h-8 px-2 lg:px-3 justify-end"
      >
        Balance
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const account = row.original
      const isNegative = account.balance < 0

      return (
        <div className="px-2">
          <span
            className={`font-bold ${
              isNegative
                ? 'text-red-600 dark:text-red-400'
                : 'text-emerald-600 dark:text-emerald-400'
            }`}
          >
            {formatCurrency(
              Math.abs(account.balance),
              account.currencyCode as CurrencyCode,
            )}
          </span>
        </div>
      )
    },
  }),

  columnHelper.accessor('type', {
    header: 'Type',
    cell: ({ row }) => {
      const type = row.getValue('type') as AccountType
      const colors: Record<AccountType, string> = {
        [AccountType.Checking]:
          'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
        [AccountType.Savings]:
          'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
        [AccountType.CreditCard]:
          'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
        [AccountType.Investment]:
          'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300',
        [AccountType.Cash]:
          'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
        [AccountType.Bank]:
          'bg-yellow-100 text-green-600 dark:bg-yellow-900/50 dark:text-yellow-300',
      }

      return (
        <Badge variant="secondary" className={colors[type]}>
          {AccountTypeLabels[type]}
        </Badge>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  }),

  columnHelper.accessor('updatedAt', {
    header: 'Last Updated',
    cell: ({ row }) => (
      <div className="text-sm text-muted-foreground">
        {format(row.getValue('updatedAt'), 'dd/MM/yyyy')}
      </div>
    ),
  }),

  {
    id: 'actions',
    cell: ({ row }: { row: Row<Account> }) => {
      const account = row.original

      return (
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="data-[state=open]:bg-muted flex h-8 w-8 p-0"
            >
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[160px]">
            <DropdownMenuItem
            //   onClick={() => {
            //     setCurrentRow(task)
            //     setOpen('update')
            //   }}
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
            //   onClick={() => {
            //     setCurrentRow(task)
            //     setOpen('delete')
            //   }}
            >
              Delete
              <DropdownMenuShortcut>
                <Trash2 className="mr-2 h-4 w-4" />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
