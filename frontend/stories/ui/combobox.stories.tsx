import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react"

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
} from "@/components/ui/combobox"

/* ----------------------------------------------------------------------- */
/*  Data                                                                   */
/* ----------------------------------------------------------------------- */

const frameworks = ["Next.js", "SvelteKit", "Nuxt.js", "Remix", "Astro"]

const groupedFrameworks = [
  { value: "React", items: ["Next.js", "Remix", "Gatsby"] },
  { value: "Vue", items: ["Nuxt.js", "VitePress"] },
  { value: "Autres", items: ["SvelteKit", "Astro", "Qwik"] },
]

type Country = { code: string; label: string; continent: string }

const countries: Country[] = [
  { code: "fr", label: "France", continent: "Europe" },
  { code: "de", label: "Allemagne", continent: "Europe" },
  { code: "es", label: "Espagne", continent: "Europe" },
  { code: "jp", label: "Japon", continent: "Asie" },
  { code: "br", label: "Brésil", continent: "Amérique du Sud" },
  { code: "ca", label: "Canada", continent: "Amérique du Nord" },
]

/* -------------------------------------------------------------------------- */
/*  Helpers de rendu                                                          */
/* -------------------------------------------------------------------------- */

function FrameworkList() {
  return (
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
  )
}

/* -------------------------------------------------------------------------- */
/*  Composants dédiés (nécessaires pour utiliser des hooks)                   */
/* -------------------------------------------------------------------------- */

function ControlledExample() {
  const [value, setValue] = React.useState<string | null>("Next.js")

  return (
    <div className="flex flex-col gap-3">
      <Combobox items={frameworks} value={value} onValueChange={setValue}>
        <ComboboxInput placeholder="Choisir un framework" showClear />
        <FrameworkList />
      </Combobox>
      <p className="text-sm text-muted-foreground">
        Valeur : <code>{value ?? "null"}</code>
      </p>
    </div>
  )
}

function MultipleExample({
  defaultValue = ["Next.js", "Astro"],
}: {
  defaultValue?: string[]
}) {
  const anchor = useComboboxAnchor()

  return (
    <Combobox multiple autoHighlight items={frameworks} defaultValue={defaultValue}>
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
  )
}

/* -------------------------------------------------------------------------- */
/*  Meta                                                                      */
/* -------------------------------------------------------------------------- */

const meta: Meta<typeof Combobox> = {
  title: "UI/Combobox",
  component: Combobox,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: { story: { inline: false, iframeHeight: 360 } },
  },
  decorators: [
    (Story) => (
      <div className="w-72">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof Combobox>

/* -------------------------------------------------------------------------- */
/*  Stories                                                                   */
/* -------------------------------------------------------------------------- */

export const Default: Story = {
  render: () => (
    <Combobox items={frameworks}>
      <ComboboxInput placeholder="Choisir un framework" />
      <FrameworkList />
    </Combobox>
  ),
}

/** Popup ouvert d'office : pratique pour itérer sur le style du contenu. */
export const Open: Story = {
  parameters: { docs: { story: { inline: false, iframeHeight: 360 } } },
  render: () => (
    <Combobox items={frameworks} defaultOpen>
      <ComboboxInput placeholder="Choisir un framework" />
      <FrameworkList />
    </Combobox>
  ),
}

export const WithClearButton: Story = {
  render: () => (
    <Combobox items={frameworks} defaultValue="Remix">
      <ComboboxInput placeholder="Choisir un framework" showClear />
      <FrameworkList />
    </Combobox>
  ),
}

export const WithoutTrigger: Story = {
  render: () => (
    <Combobox items={frameworks}>
      <ComboboxInput placeholder="Rechercher..." showTrigger={false} />
      <FrameworkList />
    </Combobox>
  ),
}

export const Controlled: Story = {
  render: () => <ControlledExample />,
}

export const Groups: Story = {
  render: () => (
    <Combobox items={groupedFrameworks}>
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
}

export const WithObjects: Story = {
  render: () => (
    <Combobox
      items={countries}
      itemToStringValue={(country: Country) => country.label}
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
}

export const Multiple: Story = {
  render: () => <MultipleExample />,
}

export const MultipleEmpty: Story = {
  render: () => <MultipleExample defaultValue={[]} />,
}

export const Disabled: Story = {
  render: () => (
    <Combobox items={frameworks} defaultValue="Next.js">
      <ComboboxInput placeholder="Choisir un framework" disabled />
      <FrameworkList />
    </Combobox>
  ),
}

export const Invalid: Story = {
  render: () => (
    <Combobox items={frameworks}>
      <ComboboxInput placeholder="Choisir un framework" aria-invalid />
      <FrameworkList />
    </Combobox>
  ),
}
