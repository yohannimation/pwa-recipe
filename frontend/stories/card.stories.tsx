import type { Meta, StoryObj } from '@storybook/react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Heart, MapPin } from 'lucide-react';

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['default', 'sm'],
    },
  },
  args: {
    size: 'default',
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

// Common width to be legible
const base = 'w-full max-w-sm';

// Images
const img = (seed: string, w = 800, h = 450) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

/* -------------------------------------------------------------------- */
/*  Basics                                                              */
/* -------------------------------------------------------------------- */

export const FullCard: Story = {
  render: (args) => (
    <Card {...args} className={base}>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>This is a description for the card.</CardDescription>
        <CardAction>
          <Button variant={"ghost"} size={"xs"}>Action</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p>Main content of the card goes here. You can put anything inside.</p>
      </CardContent>
      <CardFooter>
        <span className="text-xs text-muted-foreground">Footer info</span>
      </CardFooter>
    </Card>
  ),
};

export const SmallCard: Story = {
  args: { size: 'sm' },
  render: (args) => (
    <Card {...args} className={base}>
      <CardHeader>
        <CardTitle>Small Card</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Content for a smaller card layout.</p>
      </CardContent>
    </Card>
  ),
};

export const ContentOnly: Story = {
  render: (args) => (
    <Card {...args} className={base}>
      <CardContent>
        <p>Content for a minimalist card layout, without header nor footer.</p>
      </CardContent>
    </Card>
  ),
};

/* -------------------------------------------------------------------------- */
/*  With images                                                               */
/* -------------------------------------------------------------------------- */

export const WithImageHeader: Story = {
  render: (args) => (
    <Card {...args} className={`${base} pt-0 overflow-hidden`}>
      <img
        src={img('mountain')}
        alt="Paysage de montagne"
        className="aspect-video w-full object-cover"
      />
      <CardHeader>
        <CardTitle>Aventure en montagne</CardTitle>
        <CardDescription>Une randonnée de 3 jours dans les Pyrénées.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Découvrez des sentiers préservés, des lacs d'altitude et des panoramas à couper le souffle.</p>
      </CardContent>
      <CardFooter className="justify-between">
        <span className="text-xs text-muted-foreground">3 jours · Niveau moyen</span>
        <Button size="sm">Réserver</Button>
      </CardFooter>
    </Card>
  ),
};

export const ImageWithBadge: Story = {
  render: (args) => (
    <Card {...args} className={`${base} pt-0 overflow-hidden`}>
      <div className="relative">
        <img
          src={img('coast')}
          alt="Côte rocheuse"
          className="aspect-video w-full object-cover"
        />
        <Badge className="absolute top-3 left-3">Nouveau</Badge>
        <Button
          variant="secondary"
          size="icon"
          className="absolute top-3 right-3 rounded-full"
          aria-label="Ajouter aux favoris"
        >
          <Heart />
        </Button>
      </div>
      <CardHeader>
        <CardTitle>Week-end sur la côte</CardTitle>
        <CardDescription className="flex items-center gap-1">
          <MapPin className="size-3.5" /> Biarritz, France
        </CardDescription>
      </CardHeader>
      <CardFooter className="justify-between">
        <span className="text-lg font-semibold">249 €</span>
        <Button size="sm">Voir l'offre</Button>
      </CardFooter>
    </Card>
  ),
};

export const ImageFooter: Story = {
  render: (args) => (
    <Card {...args} className={`${base} pb-0 overflow-hidden`}>
      <CardHeader>
        <CardTitle>Galerie</CardTitle>
        <CardDescription>L'image se place en bas de la carte.</CardDescription>
      </CardHeader>
      <img
        src={img('gallery')}
        alt="Illustration"
        className="aspect-video w-full object-cover"
      />
    </Card>
  ),
};

export const ImageOverlay: Story = {
  render: (args) => (
    <Card
      {...args}
      className={`${base} relative overflow-hidden border-0 p-0 text-white`}
    >
      <img
        src={img('night', 800, 600)}
        alt="Ville de nuit"
        className="aspect-[4/3] w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-5">
        <CardTitle>Ville de nuit</CardTitle>
        <CardDescription className="text-white/80">
          Texte superposé à l'image avec un dégradé pour garder la lisibilité.
        </CardDescription>
      </div>
    </Card>
  ),
};

export const HorizontalWithImage: Story = {
  render: (args) => (
    <Card {...args} className="w-full max-w-xl flex-row gap-0 overflow-hidden py-0">
      <img
        src={img('forest', 400, 400)}
        alt="Forêt"
        className="w-40 shrink-0 object-cover"
      />
      <div className="flex flex-1 flex-col gap-4 py-4">
        <CardHeader>
          <CardTitle>Forêt de Fontainebleau</CardTitle>
          <CardDescription>Escalade et randonnée</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm">Un terrain de jeu unique à une heure de Paris.</p>
        </CardContent>
        <CardFooter>
          <Button size="sm" variant="outline">En savoir plus</Button>
        </CardFooter>
      </div>
    </Card>
  ),
};

/* -------------------------------------------------------------------------- */
/*  Cas d'usage                                                               */
/* -------------------------------------------------------------------------- */

export const CardGrid: Story = {
  parameters: { layout: 'padded' },
  render: (args) => (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {['alpha', 'bravo', 'charlie'].map((seed, i) => (
        <Card key={seed} {...args} className="pt-0 overflow-hidden">
          <img
            src={img(seed)}
            alt={`Illustration ${i + 1}`}
            className="aspect-video w-full object-cover"
          />
          <CardHeader>
            <CardTitle>Carte {i + 1}</CardTitle>
            <CardDescription>Description courte de la carte.</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button size="sm" variant="outline">Voir</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  ),
};
