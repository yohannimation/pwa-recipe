"use client"

import { useId, useState } from "react"

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

import { Eye, EyeOff } from "lucide-react"

type PasswordFieldProps = Omit<
  React.ComponentProps<typeof InputGroupInput>,
  "type"
> & {
  label: string
  error?: string | { message: string }[]
  description?: string
}

function PasswordField({
  label,
  error,
  description,
  id,
  disabled,
  ...props
}: PasswordFieldProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const [visible, setVisible] = useState(false)

  const hasError = Array.isArray(error) ? error.length > 0 : !!error

  return (
    <Field data-invalid={!!error} data-disabled={disabled}>
      <FieldLabel htmlFor={inputId}>{label}</FieldLabel>

      <InputGroup>
        <InputGroupInput
          id={inputId}
          type={visible ? "text" : "password"}
          autoComplete="current-password"
          aria-invalid={!!error}
          disabled={disabled}
          {...props}
        />
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            type="button"
            size="icon-sm"
            variant="ghost"
            disabled={disabled}
            aria-label={
              visible ? "Masquer le mot de passe" : "Afficher le mot de passe"
            }
            aria-pressed={visible}
            onClick={() => setVisible((v) => !v)}
          >
            { visible ? <EyeOff /> : <Eye /> }
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>

      { hasError && Array.isArray(error) ? (
        <FieldError errors={error} />
      ) : hasError ? (
        <FieldError>{error as string}</FieldError>
      ) : description ? (
        <FieldDescription>{description}</FieldDescription>
      ) : null }
    </Field>
  )
}

export { PasswordField }
export type { PasswordFieldProps }
