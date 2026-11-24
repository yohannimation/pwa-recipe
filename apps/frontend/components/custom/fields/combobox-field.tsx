'use client'

import { useId } from 'react'

import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from '@/components/ui/combobox'
import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field'

type ComboboxFieldOption = {
  value: string
  label: string
  disabled?: boolean
}

type ComboboxFieldGroup = {
  value: string
  items: ComboboxFieldOption[]
}

type ComboboxFieldError = string | { message: string }[]

type ComboboxFieldBaseProps = {
  label: string
  options?: ComboboxFieldOption[]
  groups?: ComboboxFieldGroup[]
  placeholder?: string
  emptyText?: string
  showClear?: boolean
  error?: ComboboxFieldError
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

/* -------------------------------------------------------------------------- */
/*  Helpers purs (hors composant : pas recréés à chaque rendu)                */
/* -------------------------------------------------------------------------- */

const hasErrors = (error: ComboboxFieldError | undefined) =>
  Array.isArray(error) ? error.length > 0 : Boolean(error)

const isSameOption = (a: ComboboxFieldOption, b: ComboboxFieldOption) => a.value === b.value
const optionToString = (option: ComboboxFieldOption) => option.value

/**
 * Le Combobox travaille avec l'objet option complet, pas seulement sa valeur.
 * Ce lookup convertit les valeurs (string) du formulaire en objets option.
 */
function createOptionLookup(options: ComboboxFieldOption[], groups?: ComboboxFieldGroup[]) {
  const flat = groups ? groups.flatMap((group) => group.items) : options
  const byValue = new Map(flat.map((option) => [option.value, option]))

  return {
    one: (value: string | null | undefined) =>
      value == null ? null : (byValue.get(value) ?? null),
    many: (values: string[] | undefined) =>
      (values ?? []).flatMap((value) => {
        const option = byValue.get(value)
        return option ? [option] : []
      }),
  }
}

type OptionLookup = ReturnType<typeof createOptionLookup>

/* -------------------------------------------------------------------------- */
/*  Sous-composants internes                                                  */
/* -------------------------------------------------------------------------- */

function renderItem(option: ComboboxFieldOption) {
  return (
    <ComboboxItem key={option.value} value={option} disabled={option.disabled}>
      {option.label}
    </ComboboxItem>
  )
}

function renderGroup(group: ComboboxFieldGroup) {
  return (
    <ComboboxGroup key={group.value} items={group.items}>
      <ComboboxLabel>{group.value}</ComboboxLabel>
      <ComboboxCollection>{renderItem}</ComboboxCollection>
    </ComboboxGroup>
  )
}

function ComboboxFieldList({ grouped, emptyText }: { grouped: boolean; emptyText: string }) {
  return (
    <>
      <ComboboxEmpty>{emptyText}</ComboboxEmpty>
      <ComboboxList>{grouped ? renderGroup : renderItem}</ComboboxList>
    </>
  )
}

/** Props communes aux deux modes (single / multiple). */
type ControlProps = {
  inputId: string
  items: ComboboxFieldOption[] | ComboboxFieldGroup[]
  grouped: boolean
  lookup: OptionLookup
  name?: string
  disabled?: boolean
  placeholder: string
  emptyText: string
  hasError: boolean
}

function SingleControl({
  value,
  defaultValue,
  onValueChange,
  showClear,
  inputId,
  items,
  grouped,
  lookup,
  name,
  disabled,
  placeholder,
  emptyText,
  hasError,
}: ControlProps &
  Pick<ComboboxFieldSingleProps, 'value' | 'defaultValue' | 'onValueChange'> & {
    showClear: boolean
  }) {
  const valueProps =
    value !== undefined ? { value: lookup.one(value) } : { defaultValue: lookup.one(defaultValue) }

  return (
    <Combobox
      items={items}
      name={name}
      disabled={disabled}
      isItemEqualToValue={isSameOption}
      itemToStringValue={optionToString}
      onValueChange={(option: ComboboxFieldOption | null) => onValueChange?.(option?.value ?? null)}
      {...valueProps}
    >
      <ComboboxInput
        id={inputId}
        placeholder={placeholder}
        showClear={showClear}
        aria-invalid={hasError}
        disabled={disabled}
      />
      <ComboboxContent>
        <ComboboxFieldList grouped={grouped} emptyText={emptyText} />
      </ComboboxContent>
    </Combobox>
  )
}

function MultipleControl({
  value,
  defaultValue,
  onValueChange,
  inputId,
  items,
  grouped,
  lookup,
  name,
  disabled,
  placeholder,
  emptyText,
  hasError,
}: ControlProps & Pick<ComboboxFieldMultipleProps, 'value' | 'defaultValue' | 'onValueChange'>) {
  // Le hook n'est appelé que dans le mode qui en a besoin.
  const anchor = useComboboxAnchor()

  const valueProps =
    value !== undefined
      ? { value: lookup.many(value) }
      : { defaultValue: lookup.many(defaultValue) }

  return (
    <Combobox
      multiple
      items={items}
      name={name}
      disabled={disabled}
      isItemEqualToValue={isSameOption}
      itemToStringValue={optionToString}
      onValueChange={(selected: ComboboxFieldOption[]) =>
        onValueChange?.(selected.map(optionToString))
      }
      {...valueProps}
    >
      <ComboboxChips ref={anchor} aria-invalid={hasError}>
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
      <ComboboxContent anchor={anchor}>
        <ComboboxFieldList grouped={grouped} emptyText={emptyText} />
      </ComboboxContent>
    </Combobox>
  )
}

function ComboboxFieldFooter({
  error,
  description,
  hasError,
}: {
  error?: ComboboxFieldError
  description?: string
  hasError: boolean
}) {
  if (hasError && error) {
    return Array.isArray(error) ? <FieldError errors={error} /> : <FieldError>{error}</FieldError>
  }
  return description ? <FieldDescription>{description}</FieldDescription> : null
}

/* -------------------------------------------------------------------------- */
/*  Composant public                                                          */
/* -------------------------------------------------------------------------- */

function ComboboxField(props: ComboboxFieldProps) {
  const {
    label,
    options = [],
    groups,
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
  const hasError = hasErrors(error)

  const controlProps: ControlProps = {
    inputId,
    items: groups ?? options,
    grouped: Boolean(groups),
    lookup: createOptionLookup(options, groups),
    name,
    disabled,
    placeholder,
    emptyText,
    hasError,
  }

  return (
    <Field data-invalid={hasError} data-disabled={disabled} className={className}>
      <FieldLabel htmlFor={inputId}>{label}</FieldLabel>

      {props.multiple ? (
        <MultipleControl
          {...controlProps}
          value={props.value}
          defaultValue={props.defaultValue}
          onValueChange={props.onValueChange}
        />
      ) : (
        <SingleControl
          {...controlProps}
          showClear={showClear}
          value={props.value}
          defaultValue={props.defaultValue}
          onValueChange={props.onValueChange}
        />
      )}

      <ComboboxFieldFooter error={error} description={description} hasError={hasError} />
    </Field>
  )
}

export { ComboboxField }
export type {
  ComboboxFieldOption,
  ComboboxFieldGroup,
  ComboboxFieldError,
  ComboboxFieldProps,
  ComboboxFieldSingleProps,
  ComboboxFieldMultipleProps,
}
