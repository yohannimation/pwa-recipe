import type { Meta, StoryObj } from '@storybook/react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { useState } from 'react'

/* -------------------------------------------------------------------------- */
/*  Data                                                                      */
/* -------------------------------------------------------------------------- */
const faq = [
  {
    value: 'item-1',
    question: 'Est-ce accessible ?',
    answer:
      'Oui. Il respecte le pattern WAI-ARIA et gère la navigation au clavier (flèches, Home, End, Espace/Entrée).',
  },
  {
    value: 'item-2',
    question: 'Est-ce stylisé ?',
    answer:
      'Oui. Il utilise le style par défaut de shadcn/ui, personnalisable via les classes Tailwind.',
  },
  {
    value: 'item-3',
    question: 'Est-ce animé ?',
    answer:
      "Oui. L'ouverture et la fermeture sont animées par défaut, et l'animation peut être désactivée.",
  },
]

/* -------------------------------------------------------------------------- */
/*  Helpers de rendu                                                          */
/* -------------------------------------------------------------------------- */

/** Liste d'items standard réutilisée par la plupart des stories. */
function FaqItems({ disabledValue }: { disabledValue?: string }) {
  return (
    <>
      {faq.map((item) => (
        <AccordionItem
          key={item.value}
          value={item.value}
          disabled={item.value === disabledValue}
        >
          <AccordionTrigger>{item.question}</AccordionTrigger>
          <AccordionContent>{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </>
  )
}

/* -------------------------------------------------------------------------- */
/*  Composants dédiés (nécessaires pour utiliser des hooks)                   */
/* -------------------------------------------------------------------------- */

function ControlledExample() {
  const [value, setValue] = useState<string>('item-2')

  return (
    <div className="flex flex-col gap-3">
      <Accordion
        type="single"
        collapsible
        value={value}
        onValueChange={setValue}
        className="w-full"
      >
        <FaqItems />
      </Accordion>
      <p className="text-muted-foreground text-sm">
        Valeur : <code>{value || '""'}</code>
      </p>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  Meta                                                                      */
/* -------------------------------------------------------------------------- */

const meta = {
  title: 'UI/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Panneaux empilés qui se déplient pour afficher leur contenu. Basé sur Radix UI Accordion. Se compose de `Accordion`, `AccordionItem`, `AccordionTrigger` et `AccordionContent`.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="w-[420px]">
        <Story />
      </div>
    ),
  ],
  args: {
    type: 'single',
    collapsible: true,
  },
  argTypes: {
    type: {
      control: 'inline-radio',
      options: ['single', 'multiple'],
      description: 'Un seul ou plusieurs items ouverts en même temps',
    },
    collapsible: {
      control: 'boolean',
      description:
        "Autorise la fermeture de l'item ouvert (uniquement en mode `single`)",
    },
    disabled: {
      control: 'boolean',
      description: "Désactive l'ensemble de l'accordéon",
    },
    defaultValue: {
      control: 'text',
      description: 'Valeur initiale (mode non contrôlé)',
    },
    value: {
      control: false,
      description: 'Valeur courante (mode contrôlé)',
    },
    onValueChange: {
      action: 'valueChanged',
      description: "Appelé quand l'utilisateur ouvre ou ferme un item",
    },
  },
} satisfies Meta<typeof Accordion>

export default meta
type Story = StoryObj<typeof meta>

/* -------------------------------------------------------------------------- */
/*  Basique                                                                   */
/* -------------------------------------------------------------------------- */

export const Default: Story = {
  render: (args) => (
    <Accordion {...args} className="w-full">
      <FaqItems />
    </Accordion>
  ),
}

export const WithDefaultValue: Story = {
  args: { type: 'single', defaultValue: 'item-2' },
  render: (args) => (
    <Accordion {...args} className="w-full">
      <FaqItems />
    </Accordion>
  ),
}

export const NotCollapsible: Story = {
  args: { type: 'single', collapsible: false, defaultValue: 'item-1' },
  render: (args) => (
    <Accordion {...args} className="w-full">
      <FaqItems />
    </Accordion>
  ),
}

export const Multiple: Story = {
  args: { type: 'multiple', defaultValue: ['item-1', 'item-3'] },
  render: (args) => (
    <Accordion {...args} className="w-full">
      <FaqItems />
    </Accordion>
  ),
}

export const Controlled: Story = {
  render: () => <ControlledExample />,
}

/* -------------------------------------------------------------------------- */
/*  États                                                                     */
/* -------------------------------------------------------------------------- */

export const Disabled: Story = {
  args: { type: 'single', disabled: true, defaultValue: 'item-1' },
  render: (args) => (
    <Accordion {...args} className="w-full">
      <FaqItems />
    </Accordion>
  ),
}

export const WithDisabledItem: Story = {
  render: (args) => (
    <Accordion {...args} className="w-full">
      <FaqItems disabledValue="item-2" />
    </Accordion>
  ),
}

/* -------------------------------------------------------------------------- */
/*  Contenu                                                                   */
/* -------------------------------------------------------------------------- */

export const WithRichContent: Story = {
  args: { type: 'single', defaultValue: 'shipping' },
  render: (args) => (
    <Accordion {...args} className="w-full">
      <AccordionItem value="shipping">
        <AccordionTrigger>Livraison</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-2">
          <p>Nous livrons partout en France métropolitaine.</p>
          <ul className="list-disc pl-5">
            <li>Standard : 3 à 5 jours ouvrés</li>
            <li>Express : 24 à 48 h</li>
          </ul>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="returns">
        <AccordionTrigger>Retours</AccordionTrigger>
        <AccordionContent>
          Vous disposez de 30 jours pour retourner un article non utilisé.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}
