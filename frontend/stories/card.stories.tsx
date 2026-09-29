import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, CardAction } from '@/components/ui/card';

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['default', 'sm'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const FullCard: Story = {
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>This is a description for the card.</CardDescription>
        <CardAction>
          <button className="text-xs underline">Action</button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p>Main content of the card goes here. You can put anything inside.</p>
      </CardContent>
      <CardFooter>
        <span className="text-xs text-muted-foreground">Footer info</span>
      </CardFooter>
    </Card>
  ),
  args: {
    size: 'default',
  },
};

export const SmallCard: Story = {
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>Small Card</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Content for a smaller card layout.</p>
      </CardContent>
    </Card>
  ),
  args: {
    size: 'sm',
  },
};
