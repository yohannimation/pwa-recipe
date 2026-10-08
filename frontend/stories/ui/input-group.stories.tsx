import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  AtSign,
  Check,
  Copy,
  Eye,
  EyeOff,
  Loader2,
  Mail,
  Search,
} from 'lucide-react';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from '@/components/ui/input-group';

const meta = {
  title: 'UI/InputGroup',
  component: InputGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          "Regroupe un champ (`InputGroupInput` ou `InputGroupTextarea`) avec des éléments additionnels (`InputGroupAddon`) : icônes, texte, boutons… L'addon se place avec la prop `align` : `inline-start`, `inline-end`, `block-start` ou `block-end`.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="w-[360px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof InputGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

/* -------------------------------------------------------------------------- */
/*  Addons simples                                                             */
/* -------------------------------------------------------------------------- */

export const Default: Story = {
  render: () => (
    <InputGroup>
      <InputGroupAddon>
        <Mail />
      </InputGroupAddon>
      <InputGroupInput type="email" placeholder="email@exemple.com" />
    </InputGroup>
  ),
};

export const IconAtEnd: Story = {
  render: () => (
    <InputGroup>
      <InputGroupInput placeholder="Rechercher…" />
      <InputGroupAddon align="inline-end">
        <Search />
      </InputGroupAddon>
    </InputGroup>
  ),
};

export const WithTextPrefixAndSuffix: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <InputGroup>
        <InputGroupAddon>
          <InputGroupText>https://</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput placeholder="exemple" />
        <InputGroupAddon align="inline-end">
          <InputGroupText>.com</InputGroupText>
        </InputGroupAddon>
      </InputGroup>

      <InputGroup>
        <InputGroupAddon>
          <InputGroupText>€</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput type="number" placeholder="0,00" />
        <InputGroupAddon align="inline-end">
          <InputGroupText>EUR</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
    </div>
  ),
};

export const Username: Story = {
  render: () => (
    <InputGroup>
      <InputGroupAddon>
        <AtSign />
      </InputGroupAddon>
      <InputGroupInput placeholder="nom_utilisateur" />
    </InputGroup>
  ),
};

/* -------------------------------------------------------------------------- */
/*  Avec boutons                                                               */
/* -------------------------------------------------------------------------- */

export const WithButton: Story = {
  render: () => (
    <InputGroup>
      <InputGroupInput placeholder="Rechercher…" />
      <InputGroupAddon align="inline-end">
        <InputGroupButton variant="default">Rechercher</InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  ),
};

export const CopyToClipboard: Story = {
  render: function CopyRender() {
    const [copied, setCopied] = React.useState(false);
    const value = 'https://exemple.com/invitation/abc123';

    const handleCopy = async () => {
      try {
        await navigator.clipboard.writeText(value);
      } catch {
        // clipboard indisponible (iframe, permissions…) : on garde le feedback visuel
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    };

    return (
      <InputGroup>
        <InputGroupInput value={value} readOnly />
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            aria-label="Copier le lien"
            title="Copier le lien"
            size="icon-sm"
            onClick={handleCopy}
          >
            {copied ? <Check /> : <Copy />}
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    );
  },
};

export const PasswordToggle: Story = {
  render: function PasswordRender() {
    const [visible, setVisible] = React.useState(false);

    return (
      <InputGroup>
        <InputGroupInput
          type={visible ? 'text' : 'password'}
          placeholder="Mot de passe"
          defaultValue="secret1234"
        />
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            aria-label={visible ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
            size="icon-sm"
            onClick={() => setVisible((v) => !v)}
          >
            {visible ? <EyeOff /> : <Eye />}
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    );
  },
};

export const Loading: Story = {
  render: () => (
    <InputGroup>
      <InputGroupInput placeholder="Recherche en cours…" defaultValue="storybook" />
      <InputGroupAddon align="inline-end">
        <Loader2 className="animate-spin" />
      </InputGroupAddon>
    </InputGroup>
  ),
};

/* -------------------------------------------------------------------------- */
/*  Textarea et addons en bloc                                                 */
/* -------------------------------------------------------------------------- */

export const WithTextarea: Story = {
  render: function TextareaRender() {
    const [text, setText] = React.useState('');
    const max = 200;

    return (
      <InputGroup>
        <InputGroupTextarea
          placeholder="Écris ton message…"
          rows={4}
          maxLength={max}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <InputGroupAddon align="block-end">
          <InputGroupText className="text-muted-foreground text-xs">
            {text.length}/{max}
          </InputGroupText>
          <InputGroupButton variant="default" size="sm" className="ml-auto">
            Envoyer
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    );
  },
};

export const BlockStartAddon: Story = {
  render: () => (
    <InputGroup>
      <InputGroupAddon align="block-start" className="border-b">
        <InputGroupText>Commentaire</InputGroupText>
      </InputGroupAddon>
      <InputGroupTextarea placeholder="Ajoute un commentaire…" rows={3} />
    </InputGroup>
  ),
};

/* -------------------------------------------------------------------------- */
/*  États                                                                      */
/* -------------------------------------------------------------------------- */

export const Disabled: Story = {
  render: () => (
    <InputGroup data-disabled="true">
      <InputGroupAddon>
        <Mail />
      </InputGroupAddon>
      <InputGroupInput placeholder="Désactivé" disabled />
    </InputGroup>
  ),
};

export const Invalid: Story = {
  render: () => (
    <div className="flex flex-col gap-1.5">
      <InputGroup>
        <InputGroupAddon>
          <Mail />
        </InputGroupAddon>
        <InputGroupInput
          type="email"
          aria-invalid="true"
          defaultValue="email-invalide"
        />
      </InputGroup>
      <p className="text-destructive text-sm">Adresse e-mail invalide.</p>
    </div>
  ),
};

/* -------------------------------------------------------------------------- */
/*  Vue d'ensemble                                                             */
/* -------------------------------------------------------------------------- */

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <InputGroup>
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
        <InputGroupInput placeholder="Icône au début" />
      </InputGroup>

      <InputGroup>
        <InputGroupInput placeholder="Icône à la fin" />
        <InputGroupAddon align="inline-end">
          <Search />
        </InputGroupAddon>
      </InputGroup>

      <InputGroup>
        <InputGroupAddon>
          <InputGroupText>https://</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput placeholder="Texte" />
      </InputGroup>

      <InputGroup>
        <InputGroupInput placeholder="Avec bouton" />
        <InputGroupAddon align="inline-end">
          <InputGroupButton variant="secondary">OK</InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  ),
};
