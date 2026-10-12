import type { Meta, StoryObj } from '@storybook/react';

import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

// Custom fields
import { NumberField } from '@/components/custom/number-field';
import { PasswordField } from '@/components/custom/password-field';
import { FileField } from '@/components/custom/file-field';
import { SelectField } from '@/components/custom/select-field';
import { ComboboxField } from '@/components/custom/combobox-field';

const meta = {
  title: 'Custom/Field',
  component: Field,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className='w-80'>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Field>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Field>
      <FieldLabel htmlFor="field-default">Nom</FieldLabel>
      <Input id="field-default" placeholder="Jean Dupont" />
    </Field>
  ),
};


/* -------------------------------------------------------------------- */
/*  Password                                                            */
/* -------------------------------------------------------------------- */
export const Password: Story = {
  render: () => (
    <PasswordField
      label='Password field'
      placeholder='MotDePasse123!'
    />
  )
}
export const PasswordSingleInvalid: Story = {
  render: () => (
    <PasswordField
      label='Password field error'
      error={'Password incorrect'}
      placeholder='MotDePasse123!'
    />
  )
}
export const PasswordMultipleInvalid: Story = {
  render: () => (
    <PasswordField
      label='Password field multi error'
      error={[
        {message: 'minimum 8 char'},
        {message: 'minimum 1 special char'}
      ]}
      placeholder='MotDePasse123!'
    />
  )
}
export const PasswordDisabled: Story = {
  render: () => (
    <PasswordField
      label='Password field disabled'
      disabled
      placeholder='MotDePasse123!'
    />
  )
}


/* -------------------------------------------------------------------- */
/*  Number                                                              */
/* -------------------------------------------------------------------- */
export const Number: Story = {
  render: () => (
    <NumberField
      label="Number field"
      defaultValue={8}
      description="With default value"
    />
  )
}
export const NumberSingleInvalid: Story = {
  render: () => (
    <NumberField
      label="Number field error"
      defaultValue={100000}
      error={'Range incorrect'}
    />
  )
}
export const NumberMultipleInvalid: Story = {
  render: () => (
    <NumberField
      label="Number field multi error"
      defaultValue={100000}
      error={[
        {message: 'minimum 0'},
        {message: 'maximum 99999'}
      ]}
    />
  )
}
export const NumberDisabled: Story = {
  render: () => (
    <NumberField
      label="Number field disabled"
      value={5}
      disabled
    />
  )
}


/* -------------------------------------------------------------------- */
/*  File                                                                */
/* -------------------------------------------------------------------- */
export const File: Story = {
  render: () => (
    <FileField
      label="File"
    />
  )
}
export const FileSingleInvalid: Story = {
  render: () => (
    <FileField
      label="File field error"
      error="Format not accepted"
    />
  )
}
export const FileMultipleInvalid: Story = {
  render: () => (
    <FileField
      label="File field multi error"
      error={[
        {message: 'Format not accepted'},
        {message: 'Size too excessive'}
      ]}
    />
  )
}
export const FileDisabled: Story = {
  render: () => (
    <FileField
      label="File field disabled"
      disabled
    />
  )
}


/* -------------------------------------------------------------------- */
/*  Select                                                              */
/* -------------------------------------------------------------------- */
export const Select: Story = {
  render: () => (
    <SelectField
      label="Select"
      placeholder="Choisir un pays"
      description="Utilisé pour la facturation"
      options={[
        { value: "fr", label: "France" },
        { value: "be", label: "Belgique" },
        { value: "us", label: "USA" },
        { value: "en", label: "Angleterre" },
        { value: "ch", label: "Suisse", disabled: true },
      ]}
    />
  )
}
export const SelectSingleInvalid: Story = {
  render: () => (
    <SelectField
      label="Select field error"
      placeholder="Choisir un pays"
      description="Utilisé pour la facturation"
      options={[
        { value: "fr", label: "France" },
        { value: "be", label: "Belgique" },
        { value: "us", label: "USA" },
        { value: "en", label: "Angleterre" },
        { value: "ch", label: "Suisse", disabled: true },
      ]}
      defaultValue='us'
      error="Value not accepted"
    />
  )
}
export const SelectMultipleInvalid: Story = {
  render: () => (
    <SelectField
      label="Select field multi error"
      placeholder="Choisir un pays"
      description="Utilisé pour la facturation"
      options={[
        { value: "fr", label: "France" },
        { value: "be", label: "Belgique" },
        { value: "us", label: "USA" },
        { value: "en", label: "Angleterre" },
        { value: "ch", label: "Suisse", disabled: true },
      ]}
      defaultValue='us'
      error={[
        {message: 'Value not accepted'},
        {message: 'Error 2'}
      ]}
    />
  )
}
export const SelectDisabled: Story = {
  render: () => (
    <SelectField
      label="Select field disabled"
      placeholder="Choisir un pays"
      description="Utilisé pour la facturation"
      options={[
        { value: "fr", label: "France" },
        { value: "be", label: "Belgique" },
        { value: "us", label: "USA" },
        { value: "en", label: "Angleterre" },
        { value: "ch", label: "Suisse", disabled: true },
      ]}
      defaultValue='us'
      disabled
    />
  )
}


/* -------------------------------------------------------------------- */
/*  Combobox                                                            */
/* -------------------------------------------------------------------- */
export const Combobox: Story = {
  render: () => (
    <ComboboxField
      label='Combobox field'
      showClear
      options={[
        { value: "fr", label: "France" },
        { value: "be", label: "Belgique" },
        { value: "ch", label: "Suisse", disabled: true },
      ]}
    />
  )
}
export const ComboboxMultiple: Story = {
  render: () => (
    <ComboboxField
      label='Combobox multiple value field'
      showClear
      multiple
      options={[
        { value: "fr", label: "France" },
        { value: "be", label: "Belgique" },
        { value: "ch", label: "Suisse", disabled: true },
      ]}
    />
  )
}
export const ComboboxSingleInvalid: Story = {
  render: () => (
    <ComboboxField
      label='Combobox field error'
      showClear
      options={[
        { value: "fr", label: "France" },
        { value: "be", label: "Belgique" },
        { value: "ch", label: "Suisse", disabled: true },
      ]}
      error="Value not accepted"
    />
  )
}
export const ComboboxMultipleInvalid: Story = {
  render: () => (
    <ComboboxField
      label='Combobox field multi error'
      showClear
      options={[
        { value: "fr", label: "France" },
        { value: "be", label: "Belgique" },
        { value: "ch", label: "Suisse", disabled: true },
      ]}
      error={[
        {message: 'Value not accepted'},
        {message: 'Error 2'}
      ]}
    />
  )
}
export const ComboboxDisabled: Story = {
  render: () => (
    <ComboboxField
      label='Combobox field disabled'
      showClear
      multiple
      options={[
        { value: "fr", label: "France" },
        { value: "be", label: "Belgique" },
        { value: "ch", label: "Suisse", disabled: true },
      ]}
      disabled
    />
  )
}