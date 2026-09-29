import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxGroup,
  ComboboxLabel,
  ComboboxSeparator,
  ComboboxEmpty,
  ComboboxChips,
  ComboboxChip,
} from '@/components/ui/combobox';

const meta: Meta<typeof Combobox> = {
  title: 'UI/Combobox',
  component: Combobox,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Combobox>;

export const Default: Story = {
  render: () => (
    <Combobox>
      <ComboboxInput showTrigger showClear />
      <ComboboxContent>
        <ComboboxList>
          <ComboboxGroup>
            <ComboboxLabel>Frameworks</ComboboxLabel>
            <ComboboxItem value="nextjs">Next.js</ComboboxItem>
            <ComboboxItem value="react">React</ComboboxItem>
            <ComboboxItem value="vue">Vue</ComboboxItem>
            <ComboboxSeparator />
            <ComboboxItem value="svelte">Svelte</ComboboxItem>
          </ComboboxGroup>
          <ComboboxEmpty>No results found.</ComboboxEmpty>
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  ),
};

export const Multiple: Story = {
  render: () => {
    const [value, setValue] = useState(['nextjs', 'react']);
    return (
      <Combobox
        multiple
        value={value}
        onValueChange={setValue}
      >
        <ComboboxInput showTrigger showClear />
        <ComboboxChips>
          {value.map((v) => (
            <ComboboxChip key={v}>{v}</ComboboxChip>
          ))}
        </ComboboxChips>
        <ComboboxContent>
          <ComboboxList>
            <ComboboxGroup>
              <ComboboxLabel>Frameworks</ComboboxLabel>
              <ComboboxItem value="nextjs">Next.js</ComboboxItem>
              <ComboboxItem value="react">React</ComboboxItem>
              <ComboboxItem value="vue">Vue</ComboboxItem>
              <ComboboxItem value="svelte">Svelte</ComboboxItem>
            </ComboboxGroup>
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    );
  },
};
