'use client'

import { ReactNode, useId } from 'react'

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group'

type TextFieldProps = Omit<
  React.ComponentProps<typeof InputGroupInput>,
  'type'
> & {
  label: string
  error?: string | { message: string }[]
  description?: string
  type?: 'text' | 'email' | 'tel' | 'url' | 'search'
  startAddon?: ReactNode
  endAddon?: ReactNode
  onValueChange?: (value: string) => void
}

function TextField({
  label,
  error,
  description,
  id,
  disabled,
  type = 'text',
  startAddon,
  endAddon,
  onValueChange,
  ...props
}: TextFieldProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId

  const hasError = Array.isArray(error) ? error.length > 0 : !!error

  return (
    <Field data-invalid={hasError} data-disabled={disabled}>
      <FieldLabel htmlFor={inputId}>{label}</FieldLabel>

      <InputGroup>
        {startAddon ? (
          <InputGroupAddon align="inline-start">{startAddon}</InputGroupAddon>
        ) : null}

        <InputGroupInput
          id={inputId}
          type={type}
          aria-invalid={hasError}
          disabled={disabled}
          {...props}
          onChange={(e) => onValueChange?.(e.target.value)}
        />

        {endAddon ? (
          <InputGroupAddon align="inline-end">{endAddon}</InputGroupAddon>
        ) : null}
      </InputGroup>

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

export { TextField }
export type { TextFieldProps }
