import { LoadingButton } from '@/components/loading-button'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Textarea } from '@/components/ui/textarea'
import type { Account, Category } from '@/types'
import { TransactionType, type Transaction } from '@/types/transactions'
import { zodResolver } from '@hookform/resolvers/zod'
import { DollarSign, DollarSignIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useTransactionMutation } from '../hooks/useTransactionMutation'
import { DatePicker } from '@/components/datepicker'

interface Props {
  open: boolean
  currentRow?: Transaction | null
  onOpenChange: (open: boolean) => void
  categories: Category[]
  accounts: Account[]
}

const transactionSchema = z.object({
  amount: z
    .string()
    .min(1, 'Amount is required')
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) > 0,
      'Amount must be a positive number',
    ),
  type: z.enum([TransactionType.Income, TransactionType.Expense]),
  categoryId: z.string().min(1, 'Category is required'),
  currencyCode: z
    .string()
    .length(3, 'Currency code must be 3 characters')
    .optional(),
  description: z.string().max(500, 'Description is required').optional(),
  note: z.string().max(200, 'Note must be at most 200 characters').min(1),
  originAccountId: z.string().min(1, 'Origin account is required'),
  transactionDate: z.date(),
})

type TransactionFormData = z.infer<typeof transactionSchema>

export function TransactionMutateDrawer({
  open,
  currentRow,
  onOpenChange,
  categories,
  accounts,
}: Props) {
  const form = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      amount: String(currentRow?.amount),
      type: currentRow?.type || TransactionType.Expense,
      categoryId: currentRow?.category.id,
      description: currentRow?.description || '',
      note: currentRow?.note || '',
      currencyCode: currentRow?.currencyCode || 'DOP',
      transactionDate: new Date(),
      originAccountId: currentRow?.originAccount.id,
    },
  })

  const isUpdate = !!currentRow

  const { create, update, isLoading } = useTransactionMutation()

  const filteredCategories = categories.filter(
    (category) => category.type === form.watch('type'),
  )

  const onSubmit = (data: TransactionFormData) => {
    if (isUpdate && currentRow) {
      update({ id: currentRow.id, data })
    } else {
      create(data)
    }
  }

  return (
    <Sheet
      open={open}
      onOpenChange={(v) => {
        onOpenChange(v)
        form.reset()
      }}
    >
      <SheetContent className="flex flex-col">
        <SheetHeader className="text-center space-y-2">
          <SheetTitle>
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <DollarSignIcon className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight">
              {isUpdate ? 'Edit Transaction' : 'Add Transaction'}
            </h2>
          </SheetTitle>
          <SheetDescription className="text-muted-foreground">
            {isUpdate
              ? 'Update the transaction by providing the necessary details.'
              : 'Record a new income or expense transaction '}
            Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form
            id="transaction-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex-1 space-y-5 px-4"
          >
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Transaction Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl className="w-full">
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select transaction type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={TransactionType.Income}>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                          Income
                        </div>
                      </SelectItem>
                      <SelectItem value={TransactionType.Expense}>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          Expense
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="transactionDate"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <DatePicker
                      date={field.value}
                      onDateChange={field.onChange}
                      className="z-[100]"
                    />
                    <FormMessage />
                  </FormItem>
                )
              }}
            />

            <FormField
              control={form.control}
              name="currencyCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Currency</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl className="w-full">
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select a currency" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="DOP">Dominican Peso</SelectItem>
                      <SelectItem value="USD">Dollar</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <DollarSignIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        {...field}
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        className="pl-10 h-12 text-lg"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl className="w-full">
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {filteredCategories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="originAccountId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl className="w-full">
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {accounts.map((account) => (
                        <SelectItem key={account.id} value={account.id}>
                          {account.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Note</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter transaction note"
                      className="h-12"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Add any additional description..."
                      className="min-h-[100px] resize-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>

        <SheetFooter className="gap-2">
          <Button variant="destructive" disabled={isLoading}>
            Delete
          </Button>
          {isLoading ? (
            <LoadingButton />
          ) : (
            <Button form="transaction-form" type="submit">
              Save Changes
            </Button>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
