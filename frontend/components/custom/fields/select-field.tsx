'use client'

import * as React from 'react'

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'

type SelectFieldOption = {
  value: string
  label: string
  disabled?: boolean
}

type SelectFieldProps = Omit<
  React.ComponentProps<typeof Select>,
  'children'
> & {
  label?: string
  options: SelectFieldOption[]
  placeholder?: string
  error?: string | { message: string }[]
  description?: string
  id?: string
  className?: string
  onValueChange?: (value: string) => void
}

function SelectField({
  label,
  options,
  placeholder = 'Sélectionner une option',
  error,
  description,
  id,
  className,
  onValueChange,
  disabled,
  ...props
}: SelectFieldProps) {
  const generatedId = React.useId()
  const triggerId = id ?? generatedId

  const hasError = Array.isArray(error) ? error.length > 0 : !!error

  return (
    <Field data-invalid={hasError} data-disabled={disabled}>
      { label && (
        <FieldLabel htmlFor={triggerId}>{label}</FieldLabel>
      )}

      <Select
        disabled={disabled}
        onValueChange={(value) => {
          onValueChange?.(value)
        }}
        {...props}
      >
        <SelectTrigger
          id={triggerId}
          aria-invalid={hasError}
          className={className}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {hasError && Array.isArray(error) ? (
        <FieldError errors={error} />
      ) : hasError ? (
        <FieldError>{error as string}</FieldError>
      ) : description ? (
        <FieldDescription>{description}</FieldDescription>
      ) : null}
    </Field>
  )
}

export { SelectField }
export type { SelectFieldOption, SelectFieldProps }
