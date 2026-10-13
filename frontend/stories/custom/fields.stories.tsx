import type { Meta, StoryObj } from '@storybook/react';

import { Field } from '@/components/ui/field';

// Custom fields
import { NumberField } from '@/components/custom/number-field';
import { PasswordField } from '@/components/custom/password-field';
import { FileField } from '@/components/custom/file-field';
import { SelectField } from '@/components/custom/select-field';
import { ComboboxField } from '@/components/custom/combobox-field';
import { TextField } from '@/components/custom/text-field';


import { Mail } from 'lucide-react';
import { TextareaField } from '@/components/custom/textarea-field';


const triggerLog = (componentName: string, value: unknown) => {
  console.log(componentName, value)
}


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

export const Text: Story = {
  render: () => (
    <TextField
      label='Text field'
      placeholder='Text'
      onValueChange={(value: unknown) => triggerLog("TextField", value)}
    />
  ),
};
export const TextTypeEmail: Story = {
  render: () => (
    <TextField
      label='Text type email field'
      type='email'
      placeholder='Text email'
      startAddon={<Mail />}
      onValueChange={(value: unknown) => triggerLog("TextField", value)}
    />
  )
}
export const TextSingleInvalid: Story = {
  render: () => (
    <TextField
      label='Text field error'
      error={'Text incorrect'}
      placeholder='Text'
      onValueChange={(value: unknown) => triggerLog("TextField", value)}
    />
  )
}
export const TextMultipleInvalid: Story = {
  render: () => (
    <TextField
      label='Text field multi error'
      error={[
        {message: 'minimum 8 char'},
        {message: 'minimum 1 special char'}
      ]}
      placeholder='Text'
      onValueChange={(value: unknown) => triggerLog("TextField", value)}
    />
  )
}
export const TextDisabled: Story = {
  render: () => (
    <TextField
      label='Text field disabled'
      disabled
      placeholder='Text'
      onValueChange={(value: unknown) => triggerLog("TextField", value)}
    />
  )
}


/* -------------------------------------------------------------------- */
/*  Password                                                            */
/* -------------------------------------------------------------------- */
export const Password: Story = {
  render: () => (
    <PasswordField
      label='Password field'
      placeholder='MotDePasse123!'
      onValueChange={(value: unknown) => triggerLog("PasswordField", value)}
    />
  )
}
export const PasswordSingleInvalid: Story = {
  render: () => (
    <PasswordField
      label='Password field error'
      error={'Password incorrect'}
      placeholder='MotDePasse123!'
      onValueChange={(value: unknown) => triggerLog("PasswordField", value)}
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
      onValueChange={(value: unknown) => triggerLog("PasswordField", value)}
    />
  )
}
export const PasswordDisabled: Story = {
  render: () => (
    <PasswordField
      label='Password field disabled'
      disabled
      placeholder='MotDePasse123!'
      onValueChange={(value: unknown) => triggerLog("PasswordField", value)}
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
      onValueChange={(value: unknown) => triggerLog("NumberField", value)}
    />
  )
}
export const NumberSingleInvalid: Story = {
  render: () => (
    <NumberField
      label="Number field error"
      defaultValue={100000}
      error={'Range incorrect'}
      onValueChange={(value: unknown) => triggerLog("NumberField", value)}
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
      onValueChange={(value: unknown) => triggerLog("NumberField", value)}
    />
  )
}
export const NumberDisabled: Story = {
  render: () => (
    <NumberField
      label="Number field disabled"
      value={5}
      disabled
      onValueChange={(value: unknown) => triggerLog("NumberField", value)}
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
      onValueChange={(value: unknown) => triggerLog("FileField", value)}
    />
  )
}
export const FileSingleInvalid: Story = {
  render: () => (
    <FileField
      label="File field error"
      error="Format not accepted"
      onValueChange={(value: unknown) => triggerLog("FileField", value)}
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
      onValueChange={(value: unknown) => triggerLog("FileField", value)}
    />
  )
}
export const FileDisabled: Story = {
  render: () => (
    <FileField
      label="File field disabled"
      disabled
      onValueChange={(value: unknown) => triggerLog("FileField", value)}
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
      onValueChange={(value: unknown) => triggerLog("SelectField", value)}
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
      onValueChange={(value: unknown) => triggerLog("SelectField", value)}
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
      onValueChange={(value: unknown) => triggerLog("SelectField", value)}
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
      onValueChange={(value: unknown) => triggerLog("SelectField", value)}
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
      onValueChange={(value: unknown) => triggerLog("ComboboxField", value)}
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
      onValueChange={(value: unknown) => triggerLog("ComboboxField", value)}
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
      onValueChange={(value: unknown) => triggerLog("ComboboxField", value)}
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
      onValueChange={(value: unknown) => triggerLog("ComboboxField", value)}
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
      onValueChange={(value: unknown) => triggerLog("ComboboxField", value)}
    />
  )
}


/* -------------------------------------------------------------------- */
/*  Textarea                                                            */
/* -------------------------------------------------------------------- */
export const Textarea: Story = {
  render: () => (
    <TextareaField
      label="Textarea field"
      placeholder="Textarea"
      description="Soyez le plus précis"
      onValueChange={(value: unknown) => triggerLog("TextareaField", value)}
    />
  )
}
export const TextareaSingleInvalid: Story = {
  render: () => (
    <TextareaField
      label="Textarea field error"
      placeholder="Textarea"
      defaultValue={"Voici une valeur par défaut"}
      error="Length excessive"
      showCount
      maxLength={5}
      onValueChange={(value: unknown) => triggerLog("TextareaField", value)}
    />
  )
}
export const TextareaMultipleInvalid: Story = {
  render: () => (
    <TextareaField
      label="Textarea field multi error"
      placeholder="Textarea"
      defaultValue={"Voici une valeur par défaut"}
      error={[
        {message: 'Length excessive'},
        {message: 'Error 2'}
      ]}
      showCount
      maxLength={5}
      onValueChange={(value: unknown) => triggerLog("TextareaField", value)}
    />
  )
}
export const TextareaDisabled: Story = {
  render: () => (
    <TextareaField
      label="Textarea field disabled"
      placeholder="Textarea"
      description="Soyez le plus précis"
      disabled
      onValueChange={(value: unknown) => triggerLog("TextareaField", value)}
    />
  )
}