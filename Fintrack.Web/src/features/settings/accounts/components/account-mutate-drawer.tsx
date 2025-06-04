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
import { AccountType, type Account } from '../account.type'
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

interface Props {
  open: boolean
  currentRow?: Account
  onOpenChange: (open: boolean) => void
}

function AccountMutateDrawer({ open, currentRow, onOpenChange }: Props) {
  const isUpdate = !!currentRow

  const isLoading = false

  const onHandleSubmit = (data: AccountMutation) => {
    // do something with the form data

    showSubmittedData(
      data,
      `Account ${isUpdate ? 'updated' : 'created'} successfully`,
    )

    // createOrUpdate(data, {
    //   onSuccess: () => {
    //     form.reset()
    //     onOpenChange(false)
    //     showSubmittedData(
    //       data,
    //       `Category ${isUpdate ? 'updated' : 'created'} successfully`,
    //     )
    //   },
    // })
  }

  const form = useForm<AccountMutation>({
    resolver: zodResolver(accountMutationScheme),
    // defaultValues: (currentRow as AccountMutation) ?? {
    //   name: '',
    //   balance: 0.0,
    // },
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

            <FormField
              control={form.control}
              name="balance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Initial Balance</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="0.00"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value))
                      }
                    />
                  </FormControl>
                  <FormDescription>
                    The starting balance for this account.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="currencyCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Currency</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. USD, EUR" {...field} />
                  </FormControl>
                  <FormDescription>
                    The currency used for this account.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Type</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an account type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.values(AccountType).map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
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
