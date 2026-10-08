import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '@/components/ui/badge';

import { Mail } from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';

// Define a type for the Storybook args that includes our custom preview controls
type BadgeStoryArgs = React.ComponentProps<typeof Badge> & {
  showIcon?: boolean;
  isLoading?: boolean;
};

const meta: Meta<BadgeStoryArgs> = {
  title: 'UI/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outline', 'secondary', 'ghost', 'destructive', 'link'],
    },
    showIcon: {
      control: 'boolean',
      description: 'Afficher l\'icône',
      table: { category: 'Test' },
    },
    isLoading: {
      control: 'boolean',
      description: 'État de chargement',
      table: { category: 'Test' },
    },
  },
  render: (args) => {
    const { showIcon, isLoading, ...badgeArgs } = args;

    return (
      <Badge {...badgeArgs}>
        {isLoading && (
          <Spinner data-icon="inline-start" />
        )}
        {badgeArgs.children}
        {!isLoading && showIcon && (
          <Mail data-icon="inline-end" />
        )}
      </Badge>
    );
  },
};

export default meta;
type Story = StoryObj<BadgeStoryArgs>;

export const Default: Story = {
  args: {
    children: 'Badge',
    variant: 'default',
    showIcon: false,
    isLoading: false
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary Badge',
    variant: 'secondary',
    showIcon: false,
    isLoading: false
  },
};

export const Destructive: Story = {
  args: {
    children: 'Destructive Badge',
    variant: 'destructive',
    showIcon: false,
    isLoading: false
  },
};

export const Outline: Story = {
  args: {
    children: 'Outline Badge',
    variant: 'outline',
    showIcon: false,
    isLoading: false
  },
};

export const Ghost: Story = {
  args: {
    children: 'Ghost Badge',
    variant: 'ghost',
    showIcon: false,
    isLoading: false
  },
};

export const Link: Story = {
  args: {
    children: 'Link Badge',
    variant: 'link',
    showIcon: true,
    isLoading: false,
  },
  render: (args) => {
    const { showIcon, isLoading, children, ...badgeArgs } = args;

    return (
      <Badge
        {...badgeArgs}
        asChild
      >
        <a href="#">
          {isLoading && <Spinner data-icon="inline-start" />}
          {children}
          {!isLoading && showIcon && <Mail data-icon="inline-end" />}
        </a>
      </Badge>
    );
  },
};
