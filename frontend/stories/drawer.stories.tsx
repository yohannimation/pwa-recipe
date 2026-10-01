import type { Meta, StoryObj } from '@storybook/react';
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';

const meta: Meta<typeof Drawer> = {
  title: 'UI/Drawer',
  component: Drawer,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Drawer>;

export const Default: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Drawer Title</DrawerTitle>
            <DrawerDescription>
              This is a drawer that slides up from the bottom. Check its background
              color and rounded top corners.
            </DrawerDescription>
          </DrawerHeader>
          <p>
            Drawer content goes here. You can verify the popover styles
            and spacing.
          </p>
          <DrawerFooter>
            <Button>Confirm</Button>
            <Button variant="outline">Cancel</Button>
          </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};
