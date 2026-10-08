import type { Meta, StoryObj } from '@storybook/react';
import { Avatar, AvatarImage, AvatarFallback, AvatarBadge, AvatarGroup, AvatarGroupCount } from '@/components/ui/avatar';

import { Blobatar } from '@/components/ui/blobatar';
import { love, thinking, surprised, wink, unsure, scared, shy, sick } from "blobatar/expression";

// Define a type for the Storybook args that includes our custom preview controls
type AvatarStoryArgs = React.ComponentProps<typeof Avatar> & {
  showBadge?: boolean;
  showImage?: boolean;
};

const meta: Meta<AvatarStoryArgs> = {
  title: 'UI/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg'],
    },
    showBadge: {
      control: 'boolean',
      description: 'Afficher l\'état de connection',
      table: { category: 'Test' },
    },
    showImage: {
      control: 'boolean',
      description: 'Afficher l\'image de la personne',
      table: { category: 'Test' },
    },
  },
  render: (args) => {
    const { showBadge, showImage, ...avatarArgs } = args;

    return (
    <Avatar {...avatarArgs}>
      { showImage && (
        <AvatarImage src="https://github.com/shadcn.png" alt="User" />
      )}
      <AvatarFallback>CN</AvatarFallback>
      {showBadge && (
        <AvatarBadge />
      )}
    </Avatar>
    )
  }
};

export default meta;
type Story = StoryObj<AvatarStoryArgs>;

export const Default: Story = {
  args: {
    size: 'default',
    showBadge: false,
    showImage: false
  }
};

export const WithBadge: Story = {
  args: {
    size: 'default',
    showBadge: true,
    showImage: true
  }
};

export const Group: Story = {
  args: {
    size: 'default',
    showBadge: false,
    showImage: false
  },
  render: () => (
    <AvatarGroup>
      <Blobatar name='yohannimation' blobatar={{background: "circle", animate: "always", expression: thinking}} />
      <Blobatar name='louise' blobatar={{background: "circle", animate: "always"}} />
      <Avatar>
        <AvatarImage src="https://github.com/vercel.png" />
        <AvatarFallback>V</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="https://github.com/nextjs.png" />
        <AvatarFallback>N</AvatarFallback>
      </Avatar>
      <AvatarGroupCount>+2</AvatarGroupCount>
    </AvatarGroup>
  ),
};
