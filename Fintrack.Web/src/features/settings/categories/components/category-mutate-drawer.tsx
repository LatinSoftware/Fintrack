import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
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

import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { categorySchema, CategoryType, type Category } from '../data/schema'
import { showSubmittedData } from '@/utils/show-submitted-data'
import { Textarea } from '@/components/ui/textarea'
import { LoadingButton } from '@/components/loading-button'
import { useCreateOrUpdateCategory } from '../hooks'

interface Props {
  open: boolean
  currentRow?: Category
  onOpenChange: (open: boolean) => void
}

export function CategoryMutateDrawer({
  open,
  currentRow,
  onOpenChange,
}: Props) {
  const { isLoading, createOrUpdate } = useCreateOrUpdateCategory()

  const isUpdate = !!currentRow
  const form = useForm<Category>({
    resolver: zodResolver(categorySchema),
    defaultValues: currentRow ?? {
      name: '',
      description: '',
      type: CategoryType.income,
    },
  })

  const onHandleSubmit = (data: Category) => {
    // do something with the form data

    createOrUpdate(data, {
      onSuccess: () => {
        form.reset()
        onOpenChange(false)
        showSubmittedData(
          data,
          `Category ${isUpdate ? 'updated' : 'created'} successfully`,
        )
      },
    })
  }

  return (
    <div>
      <Sheet
        open={open}
        onOpenChange={(v) => {
          console.log('openChange', v)
          onOpenChange(v)
          form.reset()
        }}
      >
        <SheetContent className="flex flex-col">
          <SheetHeader className="text-left">
            <SheetTitle>{isUpdate ? 'Update' : 'Create'} Category</SheetTitle>
            <SheetDescription>
              {isUpdate
                ? 'Update the category by providing the necessary details.'
                : 'Create a new category by providing the necessary details. '}
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
                  <FormItem className="space-y-1">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Category Name" />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} placeholder="Category Description" />
                    </FormControl>
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
    </div>
  )
}
