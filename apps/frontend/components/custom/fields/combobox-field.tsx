'use client'

import { ReactNode, useId } from 'react'

import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from '@/components/ui/combobox'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field'

type ComboboxFieldOption = {
  value: string
  label: string
  disabled?: boolean
}

type ComboboxFieldBaseProps = {
  label: string
  options: ComboboxFieldOption[]
  placeholder?: string
  emptyText?: string
  showClear?: boolean
  error?: string | { message: string }[]
  description?: string
  name?: string
  id?: string
  disabled?: boolean
  className?: string
}

type ComboboxFieldSingleProps = ComboboxFieldBaseProps & {
  multiple?: false
  value?: string | null
  defaultValue?: string | null
  onValueChange?: (value: string | null) => void
}

type ComboboxFieldMultipleProps = ComboboxFieldBaseProps & {
  multiple: true
  value?: string[]
  defaultValue?: string[]
  onValueChange?: (value: string[]) => void
}

type ComboboxFieldProps = ComboboxFieldSingleProps | ComboboxFieldMultipleProps

function ComboboxField(props: ComboboxFieldProps) {
  const {
    label,
    options,
    placeholder = 'Rechercher une option',
    emptyText = 'Aucun résultat',
    showClear = false,
    error,
    description,
    name,
    id,
    disabled,
    className,
  } = props

  const generatedId = useId()
  const inputId = id ?? generatedId
  const anchor = useComboboxAnchor()

  const hasError = Array.isArray(error) ? error.length > 0 : !!error

  // Le Combobox travaille avec l'objet option complet, pas seulement sa valeur
  const findOption = (value: string | null | undefined) =>
    options.find((option) => option.value === value) ?? null
  const findOptions = (values: string[] | undefined) =>
    (values ?? []).flatMap((value) => {
      const option = findOption(value)
      return option ? [option] : []
    })

  const sharedProps = {
    items: options,
    name,
    disabled,
    isItemEqualToValue: (a: ComboboxFieldOption, b: ComboboxFieldOption) =>
      a.value === b.value,
    itemToStringValue: (item: ComboboxFieldOption) => item.value,
  }

  const list = (
    <>
      <ComboboxEmpty>{emptyText}</ComboboxEmpty>
      <ComboboxList>
        {(option: ComboboxFieldOption) => (
          <ComboboxItem
            key={option.value}
            value={option}
            disabled={option.disabled}
          >
            {option.label}
          </ComboboxItem>
        )}
      </ComboboxList>
    </>
  )

  let control: ReactNode

  if (props.multiple) {
    const { value, defaultValue, onValueChange } = props
    const valueProps =
      value !== undefined
        ? { value: findOptions(value) }
        : { defaultValue: findOptions(defaultValue) }

    control = (
      <Combobox
        multiple
        {...sharedProps}
        onValueChange={(selected: ComboboxFieldOption[]) => {
          onValueChange?.(selected.map((option) => option.value))
        }}
        {...valueProps}
      >
        <ComboboxChips
          ref={anchor}
          aria-invalid={hasError}
          className={className}
        >
          <ComboboxValue>
            {(selected: ComboboxFieldOption[]) => (
              <>
                {selected.map((option) => (
                  <ComboboxChip key={option.value}>{option.label}</ComboboxChip>
                ))}
                <ComboboxChipsInput
                  id={inputId}
                  placeholder={selected.length === 0 ? placeholder : undefined}
                  aria-invalid={hasError}
                  disabled={disabled}
                />
              </>
            )}
          </ComboboxValue>
        </ComboboxChips>
        <ComboboxContent anchor={anchor}>{list}</ComboboxContent>
      </Combobox>
    )
  } else {
    const { value, defaultValue, onValueChange } = props
    const valueProps =
      value !== undefined
        ? { value: findOption(value) }
        : { defaultValue: findOption(defaultValue) }

    control = (
      <Combobox
        {...sharedProps}
        onValueChange={(option: ComboboxFieldOption | null) => {
          onValueChange?.(option?.value ?? null)
        }}
        {...valueProps}
      >
        <ComboboxInput
          id={inputId}
          placeholder={placeholder}
          showClear={showClear}
          aria-invalid={hasError}
          disabled={disabled}
          className={className}
        />
        <ComboboxContent>{list}</ComboboxContent>
      </Combobox>
    )
  }

  return (
    <Field data-invalid={hasError} data-disabled={disabled}>
      <FieldLabel htmlFor={inputId}>{label}</FieldLabel>

      {control}

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

export { ComboboxField }
export type {
  ComboboxFieldOption,
  ComboboxFieldProps,
  ComboboxFieldSingleProps,
  ComboboxFieldMultipleProps,
}
