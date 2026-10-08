import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from '@/components/ui/skeleton';

const meta: Meta<typeof Skeleton> = {
  title: 'UI/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Circle: Story = {
  args: {
    className: 'size-12 rounded-full',
  },
};

export const Text: Story = {
  args: {
    className: 'h-4 w-[250px]',
  },
};

export const Card: Story = {
  render: () => (
    <div className="flex flex-col gap-2 w-full max-w-[300px]">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
    </div>
  ),
};
