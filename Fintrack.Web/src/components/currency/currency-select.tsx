import { currencies } from '@/lib/currencies' // You'd need to define this
import type { Control } from 'react-hook-form'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'

interface CurrencySelectProps {
  control: Control<any>
  name: string
  label: string
  description?: string
  className?: string
}

export function CurrencySelect({
  control,
  name,
  label,
  description,
  className,
}: CurrencySelectProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>{label}</FormLabel>
          <Select onValueChange={field.onChange} value={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {Object.entries(currencies).map(([code, { name, symbol }]) => (
                <SelectItem key={code} value={code}>
                  {code} - {name} ({symbol})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
