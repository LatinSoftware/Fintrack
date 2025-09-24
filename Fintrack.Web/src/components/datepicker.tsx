import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Portal } from '@radix-ui/react-popover'

interface DatePickerProps {
  date: Date
  onDateChange: (date: Date) => void
  className?: string
}

export function DatePicker({ date, onDateChange, className }: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'w-full justify-start text-left font-medium h-12 px-4 rounded-xl border-2 border-border/60 bg-background/80 backdrop-blur-sm hover:bg-accent/80 hover:border-primary/30 transition-all duration-300',
            className,
          )}
        >
          <CalendarIcon className="mr-3 h-4 w-4 text-primary" />
          <span className="text-foreground">{format(date, 'PPP')}</span>
        </Button>
      </PopoverTrigger>
      <Portal>
        <PopoverContent
          className="w-auto p-0 border-border/60 bg-background/95 backdrop-blur-sm z-[999]"
          align="start"
        >
          <Calendar
            mode="single"
            selected={date}
            onSelect={(selectedDate) =>
              selectedDate && onDateChange(selectedDate)
            }
            className="p-4 rounded-xl"
          />
        </PopoverContent>
      </Portal>
    </Popover>
  )
}
