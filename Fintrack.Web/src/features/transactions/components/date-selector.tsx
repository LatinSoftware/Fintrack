import { PlusIcon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'
import { useTransaction } from '../context/transaction-context'
import { MonthYearPicker } from '@/components/monthyear-picker'

interface DateSelectorProps {
  selectedDate: Date
  onDateChange: (date: Date) => void
}

export function DateSelector({
  selectedDate,
  onDateChange,
}: DateSelectorProps) {
  const { setOpen } = useTransaction()

  return (
    <div className="lg:col-span-1 space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">
          Select Date
        </label>

        <MonthYearPicker
          date={selectedDate}
          onDateChange={onDateChange}
          className="w-full"
        />
      </div>

      {/* Mobile Create Button */}
      {/* <Sheet open={isFormOpen} onOpenChange={setIsFormOpen}>
        <SheetTrigger asChild>
          <Button className="w-full h-12 lg:hidden" size="lg">
            <PlusIcon className="h-5 w-5 mr-2" />
            Add Transaction
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="h-[90vh] p-0">
          <div className="p-6 h-full overflow-y-auto">
          
          </div>
        </SheetContent>
      </Sheet> */}

      <Button
        className="w-full h-12 hidden lg:flex lg:items-center lg:justify-center lg:gap-2"
        size="lg"
        onClick={() => setOpen('create')}
      >
        <PlusIcon className="h-5 w-5 mr-2" />
        Add Transaction
      </Button>
    </div>
  )
}
