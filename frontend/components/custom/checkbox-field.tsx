"use client"

import { ReactNode, useId } from "react"

import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"

type CheckboxFieldProps = Omit<
  React.ComponentProps<typeof Checkbox>,
  "onCheckedChange"
> & {
  /** Text ou JSX (ex: text with link) */
  label: ReactNode
  error?: string | { message: string }[]
  description?: string
  onCheckedChange?: (checked: boolean) => void
}

function CheckboxField({
  label,
  error,
  description,
  id,
  disabled,
  onCheckedChange,
  ...props
}: CheckboxFieldProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId

  const hasError = Array.isArray(error) ? error.length > 0 : !!error

  return (
    <Field
      orientation="horizontal"
      data-invalid={hasError}
      data-disabled={disabled}
    >
      <Checkbox
        id={inputId}
        aria-invalid={hasError}
        disabled={disabled}
        {...props}
        onCheckedChange={(checked: boolean | "indeterminate") =>
          onCheckedChange?.(checked === true)
        }
      />

      <FieldContent>
        <FieldLabel htmlFor={inputId}>{label}</FieldLabel>

        {hasError && Array.isArray(error) ? (
          <FieldError errors={error} />
        ) : hasError ? (
          <FieldError>{error as string}</FieldError>
        ) : description ? (
          <FieldDescription>{description}</FieldDescription>
        ) : null}
      </FieldContent>
    </Field>
  )
}

export { CheckboxField }
export type { CheckboxFieldProps }
