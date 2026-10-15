import type { Meta, StoryObj } from '@storybook/react';

// Custom fields
import { Cta } from '@/components/custom/cta';

import { ArrowRight, Mail } from 'lucide-react';

const meta = {
  title: 'Custom/Cta',
  component: Cta,
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
} satisfies Meta<typeof Cta>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: "More",
    icon: <ArrowRight />,
    href: 'https://google.com'
  },
};
export const OnClick: Story = {
  args: {
    text: "Contact me",
    icon: <Mail />,
    onClick: () => { console.log("clicked") },
  },
};