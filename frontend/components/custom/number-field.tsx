"use client"

import { useId, useState } from "react"
import { cn } from "@/lib/utils"

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"

import { Minus, Plus } from "lucide-react"

type NumberFieldProps = Omit<
  React.ComponentProps<typeof InputGroupInput>,
  "type" | "value" | "defaultValue" | "onChange" | "min" | "max" | "step"
> & {
  label: string
  error?: string | { message: string }[]
  description?: string
  value?: number | null
  defaultValue?: number
  onValueChange?: (value: number | undefined) => void
  min?: number
  max?: number
  step?: number
}

function getPrecision(number: number) {
  const [, decimals = ""] = String(number).split(".")
  return decimals.length
}

function NumberField({
  label,
  error,
  description,
  id,
  disabled,
  value,
  defaultValue,
  onValueChange,
  min,
  max = 99999,
  step = 1,
  className,
  onBlur,
  ...props
}: NumberFieldProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId

  const [internalValue, setInternalValue] = useState<number | undefined>(
    defaultValue
  )
  const isControlled = value !== undefined
  const current = isControlled ? (value ?? undefined) : internalValue

  const hasError = Array.isArray(error) ? error.length > 0 : !!error

  const clamp = (number: number) => {
    let result = number
    if (min !== undefined) result = Math.max(min, result)
    if (max !== undefined) result = Math.min(max, result)
    return result
  }

  const update = (next: number | undefined) => {
    if (!isControlled) setInternalValue(next)
      onValueChange?.(next)
  }

  const stepBy = (direction: 1 | -1) => {
    const precision = Math.max(getPrecision(step), getPrecision(current ?? 0))
    const next = (current ?? 0) + direction * step
    update(clamp(Number(next.toFixed(precision))))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value
    if (raw === "") return update(undefined)
    const parsed = Number(raw)
    if (!Number.isNaN(parsed)) update(parsed)
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (current !== undefined && clamp(current) !== current) {
      update(clamp(current))
    }
    onBlur?.(e)
  }

  return (
    <Field data-invalid={hasError} data-disabled={disabled} className="max-w-[12rem]">
      <FieldLabel htmlFor={inputId}>{label}</FieldLabel>

      <InputGroup>
        <InputGroupAddon align="inline-start">
          <InputGroupButton
            type="button"
            size="icon-sm"
            variant={hasError ? "destructive" : "ghost"}
            aria-label="Diminuer"
            disabled={disabled}
            onClick={() => stepBy(-1)}
          >
            <Minus />
          </InputGroupButton>
        </InputGroupAddon>

        <InputGroupInput
          id={inputId}
          type="number"
          inputMode="decimal"
          value={current ?? ""}
          min={min}
          max={max}
          step={step}
          aria-invalid={hasError}
          disabled={disabled}
          onChange={handleChange}
          onBlur={handleBlur}
          className={cn(
            "text-center",
            className
          )}
          {...props}
        />

        <InputGroupAddon align="inline-end">
          <InputGroupButton
            type="button"
            size="icon-sm"
            variant={hasError ? "destructive" : "ghost"}
            aria-label="Augmenter"
            disabled={disabled}
            onClick={() => stepBy(1)}
          >
            <Plus />
          </InputGroupButton>
        </InputGroupAddon>
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

export { NumberField }
export type { NumberFieldProps }
