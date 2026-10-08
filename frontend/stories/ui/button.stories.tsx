import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@/components/ui/button';

import { Mail } from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';

// Define a type for the Storybook args that includes our custom preview controls
type ButtonStoryArgs = React.ComponentProps<typeof Button> & {
  showIcon?: boolean;
  showText?: boolean;
  isLoading?: boolean;
};

const meta: Meta<ButtonStoryArgs> = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outline', 'secondary', 'ghost', 'destructive', 'link'],
    },
    size: {
      control: 'select',
      options: ['default', 'xs', 'sm', 'lg', 'icon', 'icon-xs', 'icon-sm', 'icon-lg'],
    },
    disabled: {
      control: 'boolean',
    },
    showIcon: {
      control: 'boolean',
      description: 'Afficher l\'icône',
      table: { category: 'Test' },
    },
    showText: {
      control: 'boolean',
      description: 'Afficher le texte',
      table: { category: 'Test' },
    },
    isLoading: {
      control: 'boolean',
      description: 'État de chargement',
      table: { category: 'Test' },
    },
  },
  render: (args) => {
    const { showIcon, showText, isLoading, ...buttonArgs } = args;

    return (
      <Button {...buttonArgs} disabled={args.disabled || isLoading}>
        {isLoading && (
          <Spinner data-icon="inline-start" />
        )}
        {showText && <span className="truncate">{buttonArgs.children || 'Button'}</span>}
        {!isLoading && showIcon && (
          <Mail data-icon="inline-end" />
        )}
      </Button>
    );
  },
};

export default meta;
type Story = StoryObj<ButtonStoryArgs>;

export const Default: Story = {
  args: {
    children: 'Button',
    variant: 'default',
    size: 'default',
    showIcon: false,
    showText: true,
    isLoading: false,
  },
};

export const Outline: Story = {
  args: {
    children: 'Outline Button',
    variant: 'outline',
    showText: true,
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary',
    showText: true,
  },
};

export const Ghost: Story = {
  args: {
    children: 'Ghost Button',
    variant: 'ghost',
    showText: true,
  },
};

export const Destructive: Story = {
  args: {
    children: 'Destructive Button',
    variant: 'destructive',
    showText: true,
  },
};

export const Link: Story = {
  args: {
    children: 'Link Button',
    variant: 'link',
    showText: true,
  },
};

export const Small: Story = {
  args: {
    children: 'Small Button',
    size: 'sm',
    showText: true,
  },
};

export const ExtraSmall: Story = {
  args: {
    children: 'XS Button',
    size: 'xs',
    showText: true,
  },
};

export const Large: Story = {
  args: {
    children: 'Large Button',
    size: 'lg',
    showText: true,
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    disabled: true,
    showText: true,
  },
};

export const WithIcon: Story = {
  args: {
    showIcon: true,
    showText: true,
    children: 'Email Me',
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
    showText: true,
    children: 'Chargement...',
  },
};
