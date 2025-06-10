import { LoadingButton } from '@/components/loading-button'
import { Button } from '@/components/ui/button'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  Form,
} from '@/components/ui/form'

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { useForm } from 'react-hook-form'
import { AccountType, AccountTypeLabels, type Account } from '@/types/account'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  accountMutationScheme,
  type AccountMutation,
} from '../schemes/account.scheme'
import { showSubmittedData } from '@/utils/show-submitted-data'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { CurrencyInput, CurrencySelect } from '@/components/currency'

interface Props {
  open: boolean
  currentRow?: Account | null
  onOpenChange: (open: boolean) => void
}

const accountTypes = [
  {
    value: AccountType.Checking,
    label: AccountTypeLabels[AccountType.Checking],
  },
  { value: AccountType.Savings, label: AccountTypeLabels[AccountType.Savings] },
  {
    value: AccountType.CreditCard,
    label: AccountTypeLabels[AccountType.CreditCard],
  },
  {
    value: AccountType.Investment,
    label: AccountTypeLabels[AccountType.Investment],
  },
  { value: AccountType.Cash, label: AccountTypeLabels[AccountType.Cash] },
  { value: AccountType.Bank, label: AccountTypeLabels[AccountType.Bank] },
]

function AccountMutateDrawer({ open, currentRow, onOpenChange }: Props) {
  const isUpdate = !!currentRow

  const isLoading = false

  const onHandleSubmit = (data: AccountMutation) => {
    // do something with the form data

    showSubmittedData(
      data,
      `Account ${isUpdate ? 'updated' : 'created'} successfully`,
    )
  }

  const form = useForm<AccountMutation>({
    resolver: zodResolver(accountMutationScheme),
    defaultValues: (currentRow as AccountMutation) ?? {
      name: '',
      balance: 0.0,
    },
  })

  return (
    <Sheet
      open={open}
      onOpenChange={(v) => {
        onOpenChange(v)
        form.reset()
      }}
    >
      <SheetContent className="flex flex-col">
        <SheetHeader className="text-left">
          <SheetTitle>{isUpdate ? 'Update' : 'Create'} Account</SheetTitle>
          <SheetDescription>
            {isUpdate
              ? 'Update the account by providing the necessary details.'
              : 'Create a new account by providing the necessary details. '}
            Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form
            id="category-form"
            className="flex-1 space-y-5 px-4"
            onSubmit={form.handleSubmit(onHandleSubmit)}
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Main Savings Account" {...field} />
                  </FormControl>
                  <FormDescription>
                    The name you'll use to identify this account.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <CurrencySelect
              control={form.control}
              name="currencyCode"
              label="Currency"
            />

            <CurrencyInput
              control={form.control}
              name="balance"
              label="Initial Balance"
              description="Current balance"
              currencyCode={form.watch('currencyCode') || 'USD'}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Type</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl className="w-full">
                      <SelectTrigger>
                        <SelectValue placeholder="Select an account type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {accountTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    The type of account you're creating.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Optional account description"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Any additional details about this account.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <SheetFooter className="gap-2">
          <SheetClose asChild>
            <Button variant="outline" disabled={isLoading}>
              Close
            </Button>
          </SheetClose>
          {isLoading ? (
            <LoadingButton />
          ) : (
            <Button form="category-form" type="submit">
              Save Changes
            </Button>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default AccountMutateDrawer
