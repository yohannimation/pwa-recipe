import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const meta = {
  title: 'UI/Select',
  component: Select,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          "Liste déroulante basée sur Radix UI Select. Se compose de `SelectTrigger`, `SelectValue`, `SelectContent`, `SelectItem`, `SelectGroup`, `SelectLabel` et `SelectSeparator`.",
      },
    },
  },
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'Désactive entièrement le select',
    },
    defaultValue: {
      control: 'text',
      description: 'Valeur initiale (mode non contrôlé)',
    },
    value: {
      control: false,
      description: 'Valeur courante (mode contrôlé)',
    },
    onValueChange: {
      action: 'valueChanged',
      description: "Appelé quand l'utilisateur choisit une option",
    },
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

/* -------------------------------------------------------------------------- */
/*  Basique                                                                    */
/* -------------------------------------------------------------------------- */

export const Default: Story = {
  render: (args) => (
    <Select {...args}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Choisir un fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="apple">Pomme</SelectItem>
          <SelectItem value="banana">Banane</SelectItem>
          <SelectItem value="blueberry">Myrtille</SelectItem>
          <SelectSeparator />
          <SelectItem value="orange">Orange</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
};

export const WithDefaultValue: Story = {
  args: { defaultValue: 'banana' },
  render: (args) => (
    <Select {...args}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Choisir un fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Pomme</SelectItem>
        <SelectItem value="banana">Banane</SelectItem>
        <SelectItem value="blueberry">Myrtille</SelectItem>
      </SelectContent>
    </Select>
  ),
};

/* -------------------------------------------------------------------------- */
/*  Tailles                                                                    */
/* -------------------------------------------------------------------------- */

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      {(['sm', 'default'] as const).map((size) => (
        <Select key={size} {...args}>
          <SelectTrigger className="w-[200px]" size={size}>
            <SelectValue placeholder={`Taille : ${size}`} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">Option 1</SelectItem>
            <SelectItem value="2">Option 2</SelectItem>
          </SelectContent>
        </Select>
      ))}
    </div>
  ),
};

/* -------------------------------------------------------------------------- */
/*  États                                                                      */
/* -------------------------------------------------------------------------- */

export const Disabled: Story = {
  args: { disabled: true, defaultValue: 'apple' },
  render: (args) => (
    <Select {...args}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Désactivé" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Pomme</SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const WithDisabledItems: Story = {
  render: (args) => (
    <Select {...args}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Choisir un plan" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="free">Gratuit</SelectItem>
        <SelectItem value="pro">Pro</SelectItem>
        <SelectItem value="enterprise" disabled>
          Entreprise (bientôt)
        </SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const Invalid: Story = {
  render: (args) => (
    <Select {...args}>
      <SelectTrigger aria-invalid="true" className="w-[240px]">
        <SelectValue placeholder="Choisir un pays" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="fr">France</SelectItem>
        <SelectItem value="be">Belgique</SelectItem>
      </SelectContent>
    </Select>
  ),
};

/* -------------------------------------------------------------------------- */
/*  Contenu                                                                    */
/* -------------------------------------------------------------------------- */

export const WithGroups: Story = {
  render: (args) => (
    <Select {...args}>
      <SelectTrigger className="w-[240px]">
        <SelectValue placeholder="Choisir un aliment" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="apple">Pomme</SelectItem>
          <SelectItem value="banana">Banane</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Légumes</SelectLabel>
          <SelectItem value="carrot">Carotte</SelectItem>
          <SelectItem value="broccoli">Brocoli</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
};

const TIMEZONES = [
  'Europe/Paris',
  'Europe/London',
  'Europe/Berlin',
  'Europe/Madrid',
  'Europe/Rome',
  'America/New_York',
  'America/Chicago',
  'America/Denver',
  'America/Los_Angeles',
  'Asia/Tokyo',
  'Asia/Shanghai',
  'Asia/Dubai',
  'Australia/Sydney',
  'Pacific/Auckland',
];

export const LongList: Story = {
  render: (args) => (
    <Select {...args}>
      <SelectTrigger className="w-[240px]">
        <SelectValue placeholder="Fuseau horaire" />
      </SelectTrigger>
      <SelectContent>
        {TIMEZONES.map((tz) => (
          <SelectItem key={tz} value={tz}>
            {tz}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  ),
};
