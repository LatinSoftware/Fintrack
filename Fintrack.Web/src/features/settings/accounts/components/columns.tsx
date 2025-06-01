import { createColumnHelper } from '@tanstack/react-table'
import type { Account } from '../account.type'
import { DataTableColumnHeader } from '@/components/datatable/data-table-column-header'
import { Badge } from '@/components/ui/badge'
import { DataTableRowActions } from './data-table-row-actions'

export const columnHelper = createColumnHelper<Account>()
export const accountColumns = [
  columnHelper.accessor('name', {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" className="pl-4" />
    ),
    cell: (info) => <div className="w-[80px] pl-4">{info.getValue()}</div>,
  }),
  columnHelper.accessor('type', {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" className="pl-4" />
    ),
    cell: (info) => {
      const type = info.getValue()
      const label = type
        .replace('_', ' ')
        .replace(/\b\w/g, (l) => l.toUpperCase())
      const colorMap: Record<string, string> = {
        bank: 'bg-blue-100 text-blue-800',
        cash: 'bg-green-100 text-green-800',
        credit_card: 'bg-red-100 text-red-800',
      }

      return (
        <Badge className={`rounded px-2 py-1 text-xs ${colorMap[type] || ''}`}>
          {label}
        </Badge>
      )
    },
  }),
  columnHelper.accessor('currencyCode', {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Currency" />
    ),
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('balance', {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Balance" />
    ),
    cell: (info) => {
      const row = info.row.original
      try {
        const formatted = new Intl.NumberFormat('en-EN', {
          style: 'currency',
          currency: row.currencyCode,
        }).format(row.balance)
        return formatted
      } catch {
        return `$${row.balance.toFixed(2)}`
      }
    },
    enableSorting: false,
  }),
  columnHelper.accessor('description', {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: (info) => {
      return (
        <span className="max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]">
          {info.getValue()}
        </span>
      )
    },
    enableSorting: false,
  }),
  {
    id: 'actions',
    cell: ({ row }: any) => <DataTableRowActions row={row} />,
  },
]
