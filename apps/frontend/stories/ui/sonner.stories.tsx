import type { Meta, StoryObj } from '@storybook/react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Toaster } from '@/components/ui/sonner'

type ToastType = 'message' | 'success' | 'error' | 'warning' | 'info' | 'loading' | 'promise'

// Define a type for the Storybook args that includes our custom preview controls
type SonnerStoryArgs = React.ComponentProps<typeof Toaster> & {
  toastType?: ToastType
  message?: string
  showDescription?: boolean
  showAction?: boolean
  buttonLabel?: string
}

const meta: Meta<SonnerStoryArgs> = {
  title: 'UI/Sonner',
  component: Toaster,
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: 'select',
      options: [
        'top-left',
        'top-center',
        'top-right',
        'bottom-left',
        'bottom-center',
        'bottom-right',
      ],
    },
    theme: {
      control: 'select',
      options: ['light', 'dark', 'system'],
    },
    richColors: {
      control: 'boolean',
    },
    closeButton: {
      control: 'boolean',
    },
    expand: {
      control: 'boolean',
    },
    duration: {
      control: 'number',
    },
    toastType: {
      control: 'select',
      options: ['message', 'success', 'error', 'warning', 'info', 'loading', 'promise'],
      description: 'Type de toast déclenché',
      table: { category: 'Test' },
    },
    message: {
      control: 'text',
      description: 'Message du toast',
      table: { category: 'Test' },
    },
    showDescription: {
      control: 'boolean',
      description: 'Afficher la description',
      table: { category: 'Test' },
    },
    showAction: {
      control: 'boolean',
      description: "Afficher le bouton d'action",
      table: { category: 'Test' },
    },
    buttonLabel: {
      control: 'text',
      description: 'Texte du bouton déclencheur',
      table: { category: 'Test' },
    },
  },
  render: (args) => {
    const { toastType, message, showDescription, showAction, buttonLabel, ...toasterArgs } = args

    const handleClick = () => {
      const text = message || 'Toast message'
      const options = {
        description: showDescription ? 'Ceci est une description du toast.' : undefined,
        action: showAction
          ? { label: 'Annuler', onClick: () => console.log('Action clicked') }
          : undefined,
      }

      switch (toastType) {
        case 'success':
          toast.success(text, options)
          break
        case 'error':
          toast.error(text, options)
          break
        case 'warning':
          toast.warning(text, options)
          break
        case 'info':
          toast.info(text, options)
          break
        case 'loading':
          toast.loading(text, options)
          break
        case 'promise':
          toast.promise(
            new Promise<{ name: string }>((resolve) =>
              setTimeout(() => resolve({ name: 'Projet' }), 2000)
            ),
            {
              loading: 'Chargement...',
              success: (data) => `${data.name} a été créé`,
              error: 'Une erreur est survenue',
            }
          )
          break
        default:
          toast(text, options)
      }
    }

    return (
      <>
        <Toaster {...toasterArgs} />
        <Button variant="outline" onClick={handleClick}>
          {buttonLabel || 'Afficher le toast'}
        </Button>
      </>
    )
  },
}

export default meta
type Story = StoryObj<SonnerStoryArgs>

export const Default: Story = {
  args: {
    position: 'bottom-right',
    richColors: false,
    closeButton: false,
    toastType: 'message',
    message: 'Événement créé',
    showDescription: false,
    showAction: false,
    buttonLabel: 'Afficher le toast',
  },
}

export const Success: Story = {
  args: {
    toastType: 'success',
    message: 'Enregistrement réussi',
    buttonLabel: 'Toast succès',
  },
}

export const Error: Story = {
  args: {
    toastType: 'error',
    message: 'Une erreur est survenue',
    buttonLabel: 'Toast erreur',
  },
}

export const Warning: Story = {
  args: {
    toastType: 'warning',
    message: 'Attention, action sensible',
    buttonLabel: 'Toast avertissement',
  },
}

export const Info: Story = {
  args: {
    toastType: 'info',
    message: 'Une nouvelle version est disponible',
    buttonLabel: 'Toast info',
  },
}

export const WithDescription: Story = {
  args: {
    toastType: 'message',
    message: 'Événement créé',
    showDescription: true,
    buttonLabel: 'Toast avec description',
  },
}

export const WithAction: Story = {
  args: {
    toastType: 'message',
    message: 'Fichier supprimé',
    showAction: true,
    buttonLabel: 'Toast avec action',
  },
}

export const WithCloseButton: Story = {
  args: {
    toastType: 'message',
    message: 'Toast avec bouton de fermeture',
    closeButton: true,
    duration: Infinity,
    buttonLabel: 'Toast avec fermeture',
  },
}

export const RichColors: Story = {
  args: {
    toastType: 'success',
    message: 'Toast avec couleurs enrichies',
    richColors: true,
    buttonLabel: 'Toast rich colors',
  },
}

export const Loading: Story = {
  args: {
    toastType: 'loading',
    message: 'Chargement...',
    buttonLabel: 'Toast chargement',
  },
}

export const Promise: Story = {
  args: {
    toastType: 'promise',
    buttonLabel: 'Toast promise',
  },
}

export const TopCenter: Story = {
  args: {
    position: 'top-center',
    toastType: 'message',
    message: 'Toast en haut au centre',
    buttonLabel: 'Toast top-center',
  },
}

export const Dark: Story = {
  args: {
    theme: 'dark',
    toastType: 'message',
    message: 'Toast en thème sombre',
    buttonLabel: 'Toast dark',
  },
}
