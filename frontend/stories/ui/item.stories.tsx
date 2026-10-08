import type { Meta, StoryObj } from '@storybook/react';
import { Item, ItemMedia, ItemContent, ItemTitle, ItemDescription, ItemActions, ItemGroup, ItemSeparator } from '@/components/ui/item';
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';

const meta: Meta<typeof Item> = {
  title: 'UI/Item',
  component: Item,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outline', 'muted'],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'xs'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Item>;

export const Default: Story = {
  render: (args) => (
    <Item {...args}>
      <ItemMedia variant="icon">
        <User className="size-4" />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>User Profile</ItemTitle>
        <ItemDescription>Manage your account settings and preferences.</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button size="sm" variant="ghost">Edit</Button>
      </ItemActions>
    </Item>
  ),
  args: {
    variant: 'default',
    size: 'default',
  },
};

export const ImageItem: Story = {
  render: (args) => (
    <Item {...args}>
      <ItemMedia variant="image">
        <img src="https://github.com/shadcn.png" alt="Avatar" />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Shadcn</ItemTitle>
        <ItemDescription>Creator of the UI library.</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button size="sm" variant="outline">View</Button>
      </ItemActions>
    </Item>
  ),
  args: {
    variant: 'outline',
    size: 'default',
  },
};

export const List: Story = {
  render: () => (
    <ItemGroup>
      <Item variant="muted">
        <ItemMedia variant="icon"><User className="size-4" /></ItemMedia>
        <ItemContent>
          <ItemTitle>Item 1</ItemTitle>
          <ItemDescription>Description 1</ItemDescription>
        </ItemContent>
      </Item>
      <ItemSeparator />
      <Item>
        <ItemMedia variant="icon"><User className="size-4" /></ItemMedia>
        <ItemContent>
          <ItemTitle>Item 2</ItemTitle>
          <ItemDescription>Description 2</ItemDescription>
        </ItemContent>
      </Item>
    </ItemGroup>
  ),
};
