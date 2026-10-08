import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from '@/components/ui/field';

// NB : tous les `id` sont uniques à travers le fichier, car la page autodocs
// affiche toutes les stories en même temps dans le même document.

const meta = {
  title: 'UI/Field',
  component: Field,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          "Associe un label, un contrôle de formulaire, une description et un message d'erreur. S'utilise avec `FieldGroup` / `FieldSet` pour structurer un formulaire. Pour l'état d'erreur, ajoute `data-invalid` sur `Field` et `aria-invalid` sur le contrôle.",
      },
    },
  },
  argTypes: {
    orientation: {
      control: 'inline-radio',
      options: ['vertical', 'horizontal', 'responsive'],
      description: 'Disposition du label et du contrôle',
    },
  },
  decorators: [
    (Story) => (
      <div className="w-[420px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Field>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { orientation: 'vertical' },
  render: (args) => (
    <Field {...args}>
      <FieldLabel htmlFor="field-default">Nom</FieldLabel>
      <Input id="field-default" placeholder="Jean Dupont" />
    </Field>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <Field>
      <FieldLabel htmlFor="field-username">Nom d'utilisateur</FieldLabel>
      <Input id="field-username" placeholder="jdupont" />
      <FieldDescription>
        Visible publiquement. Entre 3 et 20 caractères.
      </FieldDescription>
    </Field>
  ),
};

export const WithTextarea: Story = {
  render: () => (
    <Field>
      <FieldLabel htmlFor="field-bio">Bio</FieldLabel>
      <Textarea id="field-bio" placeholder="Parle-nous de toi…" rows={4} />
      <FieldDescription>Quelques lignes suffisent.</FieldDescription>
    </Field>
  ),
};

export const WithSelect: Story = {
  render: () => (
    <Field>
      <FieldLabel htmlFor="field-country">Pays</FieldLabel>
      <Select>
        <SelectTrigger id="field-country" className="w-full">
          <SelectValue placeholder="Choisir un pays" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="fr">France</SelectItem>
          <SelectItem value="be">Belgique</SelectItem>
          <SelectItem value="ch">Suisse</SelectItem>
        </SelectContent>
      </Select>
    </Field>
  ),
};

export const WithCheckbox: Story = {
  render: () => (
    <Field orientation="horizontal">
      <Checkbox id="field-terms" />
      <FieldContent>
        <FieldLabel htmlFor="field-terms">Accepter les conditions</FieldLabel>
        <FieldDescription>
          Tu acceptes nos conditions d'utilisation et notre politique de
          confidentialité.
        </FieldDescription>
      </FieldContent>
    </Field>
  ),
};

export const WithCheckboxGroup: Story = {
  render: () => (
    <FieldSet>
      <FieldLegend variant="label">Centres d'intérêt</FieldLegend>
      <FieldGroup>
        {['Design', 'Développement', 'Marketing'].map((label) => {
          const id = `field-interest-${label.toLowerCase()}`;
          return (
            <Field key={id} orientation="horizontal">
              <Checkbox id={id} />
              <FieldLabel htmlFor={id} className="font-normal">
                {label}
              </FieldLabel>
            </Field>
          );
        })}
      </FieldGroup>
    </FieldSet>
  ),
};

/* -------------------------------------------------------------------------- */
/*  États                                                                      */
/* -------------------------------------------------------------------------- */

export const Invalid: Story = {
  render: () => (
    <Field data-invalid="true">
      <FieldLabel htmlFor="field-invalid-email">E-mail</FieldLabel>
      <Input
        id="field-invalid-email"
        type="email"
        defaultValue="email-invalide"
        aria-invalid="true"
      />
      <FieldError>Adresse e-mail invalide.</FieldError>
    </Field>
  ),
};

export const WithMultipleErrors: Story = {
  render: () => (
    <Field data-invalid="true">
      <FieldLabel htmlFor="field-invalid-password">Mot de passe</FieldLabel>
      <Input
        id="field-invalid-password"
        type="password"
        defaultValue="abc"
        aria-invalid="true"
      />
      <FieldError
        errors={[
          { message: 'Au moins 8 caractères.' },
          { message: 'Au moins un chiffre.' },
        ]}
      />
    </Field>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Field data-disabled="true">
      <FieldLabel htmlFor="field-disabled">Identifiant</FieldLabel>
      <Input id="field-disabled" defaultValue="usr_123456" disabled />
      <FieldDescription>Ce champ ne peut pas être modifié.</FieldDescription>
    </Field>
  ),
};

/* -------------------------------------------------------------------------- */
/*  Formulaire complet                                                         */
/* -------------------------------------------------------------------------- */

export const FullForm: Story = {
  parameters: { layout: 'padded' },
  render: function FormRender() {
    const [submitted, setSubmitted] = React.useState(false);

    return (
      <form
        className="mx-auto w-full max-w-md"
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
        }}
      >
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Profil</FieldLegend>
            <FieldDescription>
              Ces informations apparaissent sur ta page publique.
            </FieldDescription>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="field-form-name">Nom complet</FieldLabel>
                <Input id="field-form-name" placeholder="Jean Dupont" required />
              </Field>
              <Field>
                <FieldLabel htmlFor="field-form-email">E-mail</FieldLabel>
                <Input
                  id="field-form-email"
                  type="email"
                  placeholder="email@exemple.com"
                  required
                />
                <FieldDescription>Nous ne le partagerons jamais.</FieldDescription>
              </Field>
            </FieldGroup>
          </FieldSet>

          <FieldSeparator>Préférences</FieldSeparator>


          <Field orientation="horizontal">
            <Button type="submit">Enregistrer</Button>
            <Button type="reset" variant="outline" onClick={() => setSubmitted(false)}>
              Annuler
            </Button>
          </Field>

          {submitted && (
            <p className="text-muted-foreground text-sm">Formulaire envoyé ✅</p>
          )}
        </FieldGroup>
      </form>
    );
  },
};
