import { format } from 'date-fns'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'

interface Props {
  date: Date
  onDateChange: (date: Date) => void
  className?: string
}

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export function MonthYearPicker({ date, onDateChange, className }: Props) {
  const [selectedMonth, setSelectedMonth] = useState(date.getMonth())
  const [selectedYear, setSelectedYear] = useState(date.getFullYear())

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 20 }, (_, i) => currentYear - 10 + i)

  const handleMonthChange = (month: string) => {
    const monthIndex = parseInt(month)
    setSelectedMonth(monthIndex)
    const newDate = new Date(selectedYear, monthIndex, 1)
    onDateChange(newDate)
  }

  const handleYearChange = (year: string) => {
    const yearValue = parseInt(year)
    setSelectedYear(yearValue)
    const newDate = new Date(yearValue, selectedMonth, 1)
    onDateChange(newDate)
  }

  const goToPreviousMonth = () => {
    let newMonth = selectedMonth - 1
    let newYear = selectedYear

    if (newMonth < 0) {
      newMonth = 11
      newYear -= 1
    }

    setSelectedMonth(newMonth)
    setSelectedYear(newYear)
    const newDate = new Date(newYear, newMonth, 1)
    onDateChange(newDate)
  }

  const goToNextMonth = () => {
    let newMonth = selectedMonth + 1
    let newYear = selectedYear

    if (newMonth > 11) {
      newMonth = 0
      newYear += 1
    }

    setSelectedMonth(newMonth)
    setSelectedYear(newYear)
    const newDate = new Date(newYear, newMonth, 1)
    onDateChange(newDate)
  }

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
          <span className="text-foreground">{format(date, 'MMMM yyyy')}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto p-4 border-border/60 bg-background/95 backdrop-blur-sm"
        align="start"
      >
        <div className="space-y-4">
          {/* Month/Year Navigation */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="icon"
              onClick={goToPreviousMonth}
              className="h-8 w-8"
            >
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>
            <div className="text-sm font-medium">
              {months[selectedMonth]} {selectedYear}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={goToNextMonth}
              className="h-8 w-8"
            >
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
          </div>

          {/* Month Selection */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">
              Month
            </label>
            <Select
              value={selectedMonth.toString()}
              onValueChange={handleMonthChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {months.map((month, index) => (
                  <SelectItem key={index} value={index.toString()}>
                    {month}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Year Selection */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">
              Year
            </label>
            <Select
              value={selectedYear.toString()}
              onValueChange={handleYearChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {years.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
