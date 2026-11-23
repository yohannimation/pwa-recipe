'use client'

import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/navigation'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'

import { FileField } from '@/components/custom/fields/file-field'
import { NumberField } from '@/components/custom/fields/number-field'
import { TextField } from '@/components/custom/fields/text-field'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { FieldError, FieldGroup } from '@/components/ui/field'
import { Spinner } from '@/components/ui/spinner'

import { api } from '@/lib/api/client'

import { CategoryInterface } from '@/types/categories'
import { RecipeInterface } from '@/types/recipes'

import { ComboboxField } from '../../fields/combobox-field'

const MAX_SIZE = 2 * 1024 * 1024
const positiveInt = (label: string) =>
  yup
    .number()
    .typeError(`${label} doit être un nombre`)
    .integer(`${label} doit être un nombre entier`)
    .min(0, `${label} ne peut pas être négatif`)
    .required(`${label} est requis`)

const recipeSchema = yup.object({
  name: yup.string().trim().required('Le nom est requis'),
  image: yup
    .mixed<File>()
    .nullable()
    .optional()
    .test(
      'fileType',
      'Le fichier doit être une image',
      (file) => !file || file.type.startsWith('image/')
    )
    .test(
      'fileSize',
      "L'image ne doit pas dépasser 5 Mo",
      (file) => !file || file.size <= MAX_SIZE
    ),
  preparationTime: positiveInt('Le temps de préparation'),
  cookTime: positiveInt('Le temps de cuisson'),
  numberPeople: positiveInt('Le nombre de personnes').min(1, 'Il faut au moins 1 personne'),
  categoryIds: yup.array().of(yup.number().integer().required()).optional(),
})

type RecipeFormValues = yup.InferType<typeof recipeSchema>
type RecipeFormProps =
  | {
      edit: true
      recipe: RecipeInterface
      categories: CategoryInterface[]
    }
  | {
      edit?: false
      recipe?: never
      categories: CategoryInterface[]
    }

function RecipeForm({ edit, recipe, categories }: RecipeFormProps) {
  const router = useRouter()
  const form = useForm<RecipeFormValues>({
    resolver: yupResolver(recipeSchema),
    defaultValues: {
      name: edit ? recipe.name : '',
      image: edit ? null : null,
      preparationTime: edit ? recipe.preparationTime : 10,
      cookTime: edit ? recipe.cookTime : 25,
      numberPeople: edit ? recipe.numberPeople : 4,
      categoryIds: edit ? [] : [],
    },
  })

  const categoriesOptions = categories.map((category) => ({
    value: category.name, // en-tête du groupe
    items: category.children.map((childCategory) => ({
      value: String(childCategory.id), // Selectable value
      label: childCategory.name,
    })),
  }))

  async function onSubmit(values: RecipeFormValues) {
    const { image, ...recipeData } = values

    try {
      if (edit) {
        // Update API call
      } else {
        const created = await api<RecipeInterface>('/recipes', {
          method: 'POST',
          body: recipeData,
        })

        if (image instanceof File) {
          const formData = new FormData()
          formData.append('file', image)

          await api(`/recipes/${created.id}/image`, {
            method: 'POST',
            body: formData,
          })
        }

        router.replace('/')
      }
    } catch {
      form.setError('root', { message: "La création de recette s'est mal passé" })
    }
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex w-full flex-col items-center justify-center gap-8"
      noValidate
    >
      <Card className="w-full max-w-[800px] md:w-[80%] lg:w-[75%]">
        <CardHeader>
          <CardTitle>
            {edit ? `Modification de recette : ${recipe.name}` : 'Ajouter une recette'}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <FieldGroup className="grid grid-cols-1 grid-rows-1 gap-3 sm:grid-cols-6">
            <Controller
              control={form.control}
              name="name"
              render={({ field, fieldState }) => (
                <TextField
                  ref={field.ref}
                  name={field.name}
                  value={field.value}
                  onBlur={field.onBlur}
                  onValueChange={field.onChange}
                  label="Nom"
                  type="text"
                  placeholder="Crêpes"
                  error={fieldState.error?.message}
                  className="sm:col-span-3"
                />
              )}
            />

            <Controller
              control={form.control}
              name="image"
              render={({ field, fieldState }) => (
                <FileField
                  ref={field.ref}
                  name={field.name}
                  value={field.value ?? null}
                  onBlur={field.onBlur}
                  onValueChange={field.onChange}
                  label="Photo de la recette"
                  accept="image/*"
                  error={fieldState.error?.message}
                  className="row-span-2 sm:col-span-3"
                />
              )}
            />

            <Controller
              control={form.control}
              name="categoryIds"
              render={({ field, fieldState }) => (
                <ComboboxField
                  name={field.name}
                  value={(field.value ?? []).map(String)}
                  multiple
                  groups={categoriesOptions}
                  onValueChange={(values) => field.onChange(values.map(Number))}
                  label="Catégories"
                  placeholder="Rechercher une catégorie"
                  error={fieldState.error?.message}
                  className="sm:col-span-3"
                />
              )}
            />

            <Controller
              control={form.control}
              name="preparationTime"
              render={({ field, fieldState }) => (
                <NumberField
                  ref={field.ref}
                  name={field.name}
                  value={field.value}
                  onBlur={field.onBlur}
                  onValueChange={field.onChange}
                  label="Temps de préparation"
                  placeholder="5"
                  error={fieldState.error?.message}
                  className="sm:col-span-2"
                />
              )}
            />

            <Controller
              control={form.control}
              name="cookTime"
              render={({ field, fieldState }) => (
                <NumberField
                  ref={field.ref}
                  name={field.name}
                  value={field.value}
                  onBlur={field.onBlur}
                  onValueChange={field.onChange}
                  label="Temps de cuisson"
                  placeholder="25"
                  error={fieldState.error?.message}
                  className="sm:col-span-2"
                />
              )}
            />

            <Controller
              control={form.control}
              name="numberPeople"
              render={({ field, fieldState }) => (
                <NumberField
                  ref={field.ref}
                  name={field.name}
                  value={field.value}
                  onBlur={field.onBlur}
                  onValueChange={field.onChange}
                  label="Nombre de personne"
                  placeholder="8"
                  error={fieldState.error?.message}
                  className="sm:col-span-2"
                />
              )}
            />
          </FieldGroup>

          <FieldGroup>{/* Ingredients */}</FieldGroup>

          <FieldGroup>{/* Steps */}</FieldGroup>

          {form.formState.errors.root && (
            <FieldError>{form.formState.errors.root.message}</FieldError>
          )}
        </CardContent>

        <CardFooter className="flex justify-end gap-2">
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting && <Spinner data-icon="inline-start" />}
            <span className="truncate">{edit ? 'Mettre à jour' : 'Créer la recette'}</span>
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}

export { RecipeForm }
