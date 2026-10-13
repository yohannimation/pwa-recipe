"use client"

import { ChangeEventHandler, useId, useState } from "react"

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"

type TextareaFieldProps = React.ComponentProps<typeof InputGroupTextarea> & {
  label: string
  error?: string | { message: string }[]
  description?: string
  // Display a count "n / maxLength" below the field (`maxLength required`)
  showCount?: boolean
  onValueChange?: (value: string) => void
}

function TextareaField({
  label,
  error,
  description,
  id,
  disabled,
  maxLength,
  showCount = false,
  value,
  defaultValue,
  onValueChange,
  ...props
}: TextareaFieldProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId

  const hasError = Array.isArray(error) ? error.length > 0 : !!error

  const [internalLength, setInternalLength] = useState(
    String(defaultValue ?? "").length
  )
  const length = value !== undefined ? String(value).length : internalLength

  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    setInternalLength(event.target.value.length)
    onValueChange?.(event.target.value)
  }

  const counterVisible = showCount && maxLength !== undefined

  return (
    <Field data-invalid={hasError} data-disabled={disabled}>
      <FieldLabel htmlFor={inputId}>{label}</FieldLabel>

      <InputGroup>
        <InputGroupTextarea
          id={inputId}
          aria-invalid={hasError}
          disabled={disabled}
          maxLength={maxLength}
          value={value}
          defaultValue={defaultValue}
          {...props}
          onChange={handleChange}
        />

        {counterVisible ? (
          <InputGroupAddon align="block-end">
            <InputGroupText className="ml-auto tabular-nums" aria-live="polite">
              {length} / {maxLength}
            </InputGroupText>
          </InputGroupAddon>
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

export { TextareaField }
export type { TextareaFieldProps }
