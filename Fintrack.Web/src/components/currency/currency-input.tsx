import { useWatch, type Control } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

interface CurrencyInputProps {
  control: Control<any>
  name: string
  label: string
  description?: string
  currencyCode: string
  className?: string
}

export function CurrencyInput({
  control,
  name,
  label,
  description,
  currencyCode,
  className,
}: CurrencyInputProps) {
  const value = useWatch({
    control,
    name,
    defaultValue: 0,
  })

  const formattedValue = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: currencyCode,
  }).format(value || 0)

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                type="number"
                placeholder="0.00"
                className="pl-12"
                {...field}
                onChange={(e) => {
                  const value = parseFloat(e.target.value)
                  field.onChange(isNaN(value) ? 0 : value)
                }}
              />
              <span className="absolute left-3 top-2 text-sm text-muted-foreground">
                {currencyCode}
              </span>
            </div>
          </FormControl>
          {description && (
            <FormDescription>
              {description}: {formattedValue}
            </FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
