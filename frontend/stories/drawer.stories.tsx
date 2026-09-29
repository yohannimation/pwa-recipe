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
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Drawer Title</DrawerTitle>
            <DrawerDescription>
              This is a drawer that slides up from the bottom. Check its background
              color and rounded top corners.
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 py-6">
            <p className="text-sm text-muted-foreground">
              Drawer content goes here. You can verify the popover styles
              and spacing.
            </p>
          </div>
          <DrawerFooter>
            <Button>Confirm</Button>
            <Button variant="outline">Cancel</Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  ),
};
