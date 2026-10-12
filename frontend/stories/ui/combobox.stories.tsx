import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxSeparator,
  ComboboxValue,
  useComboboxAnchor,
} from '@/components/ui/combobox';

/* -------------------------------------------------------------------------- */
/*  Données                                                                   */
/* -------------------------------------------------------------------------- */

const frameworks = ['Next.js', 'SvelteKit', 'Nuxt.js', 'Remix', 'Astro'];

const groupedFrameworks = [
  { value: 'React', items: ['Next.js', 'Remix', 'Gatsby'] },
  { value: 'Vue', items: ['Nuxt.js', 'VitePress'] },
  { value: 'Autres', items: ['SvelteKit', 'Astro', 'Qwik'] },
];

type Country = { code: string; label: string; continent: string };

const countries: Country[] = [
  { code: 'fr', label: 'France', continent: 'Europe' },
  { code: 'de', label: 'Allemagne', continent: 'Europe' },
  { code: 'es', label: 'Espagne', continent: 'Europe' },
  { code: 'jp', label: 'Japon', continent: 'Asie' },
  { code: 'br', label: 'Brésil', continent: 'Amérique du Sud' },
  { code: 'ca', label: 'Canada', continent: 'Amérique du Nord' },
];

/* -------------------------------------------------------------------------- */
/*  Meta                                                                      */
/* -------------------------------------------------------------------------- */

const meta = {
  title: 'UI/Combobox',
  component: Combobox,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          "Champ de recherche avec liste d'options filtrable. Se compose de `ComboboxInput`, `ComboboxContent`, `ComboboxList`, `ComboboxItem`, `ComboboxEmpty`, ainsi que de `ComboboxGroup`, `ComboboxLabel` et `ComboboxSeparator` pour les groupes, et de `ComboboxChips` pour la sélection multiple.",
      },
    },
  },
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'Désactive entièrement le combobox',
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
      description: "Appelé quand l'utilisateur choisit une option",
    },
  },
} satisfies Meta<typeof Combobox>;

export default meta;
type Story = StoryObj<typeof meta>;

/* -------------------------------------------------------------------------- */
/*  Basique                                                                   */
/* -------------------------------------------------------------------------- */

export const Default: Story = {
  render: (args) => (
    <Combobox {...args} items={frameworks}>
      <ComboboxInput placeholder="Choisir un framework" />
      <ComboboxContent>
        <ComboboxEmpty>Aucun résultat.</ComboboxEmpty>
        <ComboboxList>
          {(item: string) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  ),
};

export const WithDefaultValue: Story = {
  args: { defaultValue: 'Remix' },
  render: (args) => (
    <Combobox {...args} items={frameworks}>
      <ComboboxInput placeholder="Choisir un framework" showClear />
      <ComboboxContent>
        <ComboboxEmpty>Aucun résultat.</ComboboxEmpty>
        <ComboboxList>
          {(item: string) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  ),
};

/* -------------------------------------------------------------------------- */
/*  États                                                                     */
/* -------------------------------------------------------------------------- */

export const Disabled: Story = {
  args: { disabled: true, defaultValue: 'Next.js' },
  render: (args) => (
    <Combobox {...args} items={frameworks}>
      <ComboboxInput placeholder="Choisir un framework" />
      <ComboboxContent>
        <ComboboxEmpty>Aucun résultat.</ComboboxEmpty>
        <ComboboxList>
          {(item: string) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  ),
};

export const Invalid: Story = {
  render: (args) => (
    <Combobox {...args} items={frameworks}>
      <ComboboxInput placeholder="Choisir un framework" aria-invalid />
      <ComboboxContent>
        <ComboboxEmpty>Aucun résultat.</ComboboxEmpty>
        <ComboboxList>
          {(item: string) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  ),
};

/* -------------------------------------------------------------------------- */
/*  Spécifiques                                                               */
/* -------------------------------------------------------------------------- */

export const Multiple: Story = {
  render: () => {
    const anchor = useComboboxAnchor();
    return (
      <Combobox
        multiple
        autoHighlight
        items={frameworks}
        defaultValue={['Next.js', 'Astro']}
      >
        <ComboboxChips ref={anchor}>
          <ComboboxValue>
            {(values: string[]) => (
              <React.Fragment>
                {values.map((value) => (
                  <ComboboxChip key={value}>{value}</ComboboxChip>
                ))}
                <ComboboxChipsInput placeholder="Ajouter..." />
              </React.Fragment>
            )}
          </ComboboxValue>
        </ComboboxChips>
        <ComboboxContent anchor={anchor}>
          <ComboboxEmpty>Aucun résultat.</ComboboxEmpty>
          <ComboboxList>
            {(item: string) => (
              <ComboboxItem key={item} value={item}>
                {item}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    );
  },
};

export const MultipleDisabled: Story = {
  render: () => {
    const anchor = useComboboxAnchor();
    return (
      <Combobox
        multiple
        disabled
        items={frameworks}
        defaultValue={['Next.js', 'Astro']}
      >
        <ComboboxChips ref={anchor}>
          <ComboboxValue>
            {(values: string[]) => (
              <React.Fragment>
                {values.map((value) => (
                  <ComboboxChip key={value}>{value}</ComboboxChip>
                ))}
                <ComboboxChipsInput placeholder="Ajouter..." />
              </React.Fragment>
            )}
          </ComboboxValue>
        </ComboboxChips>
        <ComboboxContent anchor={anchor}>
          <ComboboxEmpty>Aucun résultat.</ComboboxEmpty>
          <ComboboxList>
            {(item: string) => (
              <ComboboxItem key={item} value={item}>
                {item}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    );
  },
};

export const MultipleInvalid: Story = {
  render: () => {
    const anchor = useComboboxAnchor();
    return (
      <Combobox
        multiple
        items={frameworks}
        defaultValue={['Next.js', 'Astro']}
      >
        <ComboboxChips ref={anchor} aria-invalid>
          <ComboboxValue>
            {(values: string[]) => (
              <React.Fragment>
                {values.map((value) => (
                  <ComboboxChip key={value}>{value}</ComboboxChip>
                ))}
                <ComboboxChipsInput placeholder="Ajouter..." />
              </React.Fragment>
            )}
          </ComboboxValue>
        </ComboboxChips>
        <ComboboxContent anchor={anchor}>
          <ComboboxEmpty>Aucun résultat.</ComboboxEmpty>
          <ComboboxList>
            {(item: string) => (
              <ComboboxItem key={item} value={item}>
                {item}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    );
  },
};

export const WithGroups: Story = {
  render: (args) => (
    <Combobox {...args} items={groupedFrameworks}>
      <ComboboxInput placeholder="Choisir un framework" />
      <ComboboxContent>
        <ComboboxEmpty>Aucun résultat.</ComboboxEmpty>
        <ComboboxList>
          {(group: (typeof groupedFrameworks)[number]) => (
            <ComboboxGroup key={group.value} items={group.items}>
              <ComboboxLabel>{group.value}</ComboboxLabel>
              <ComboboxCollection>
                {(item: string) => (
                  <ComboboxItem key={item} value={item}>
                    {item}
                  </ComboboxItem>
                )}
              </ComboboxCollection>
              <ComboboxSeparator />
            </ComboboxGroup>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  ),
};

export const WithObjects: Story = {
  render: (args) => (
    <Combobox
      {...args}
      items={countries}
      itemToStringValue={(country: any) => country.label}
    >
      <ComboboxInput placeholder="Choisir un pays" showClear />
      <ComboboxContent>
        <ComboboxEmpty>Aucun pays trouvé.</ComboboxEmpty>
        <ComboboxList>
          {(country: Country) => (
            <ComboboxItem key={country.code} value={country}>
              <div className="flex flex-col">
                <span>{country.label}</span>
                <span className="text-xs text-muted-foreground">
                  {country.continent}
                </span>
              </div>
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  ),
};
