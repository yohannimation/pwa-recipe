'use client'

import { useEffect, useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as yup from 'yup'

import { PasswordField } from '@/components/custom/fields/password-field'
import { TextField } from '@/components/custom/fields/text-field'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { FieldError, FieldGroup } from '@/components/ui/field'
import { Spinner } from '@/components/ui/spinner'

import { useRegister } from '@/lib/api/auth'

import { UserInterface } from '@/types/users'

const registerSchema = yup.object({
  username: yup
    .string()
    .min(3, 'Le username doit contenir au moins 3 caractères')
    .required('Le username est requis'),
  password: yup
    .string()
    .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
    .matches(/[A-Z]/, 'Le mot de passe doit contenir au moins une majuscule')
    .matches(/[0-9]/, 'Le mot de passe doit contenir au moins un chiffre')
    .matches(
      /[!@#$%^&*(),.?":{}|<>_\-+=/\\[\]~`;' ]/,
      'Le mot de passe doit contenir au moins un caractère spécial'
    )
    .required('Le mot de passe est requis'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Le mot de passe ne correspond pas')
    .required('La confirmation de mot de passe est requise'),
})

type RegisterFormValues = yup.InferType<typeof registerSchema>

function RegisterForm() {
  const router = useRouter()
  const register = useRegister()
  const form = useForm<RegisterFormValues>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
  })
  const [user, setUser] = useState<UserInterface | null>(null)

  useEffect(() => {
    if (user) {
      toast.success('Inscription réussi', {
        description: 'Veuillez vous connecter',
        duration: 6000,
      })

      router.push('/auth/login')
    }
  }, [user, router])

  async function onSubmit(values: RegisterFormValues) {
    try {
      setUser(
        await register.mutateAsync({
          username: values.username,
          password: values.password,
        })
      )
    } catch {
      form.setError('root', { message: 'Une erreur est survenue' })
    }
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex w-full flex-col items-center justify-center gap-8"
      noValidate
    >
      <Card className="w-full max-w-[600px] md:w-[75%] lg:w-[50%]">
        <CardHeader>
          <CardTitle>Inscription</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <FieldGroup>
            <Controller
              control={form.control}
              name="username"
              render={({ field, fieldState }) => (
                <TextField
                  ref={field.ref}
                  name={field.name}
                  value={field.value}
                  onBlur={field.onBlur}
                  onValueChange={field.onChange}
                  label="Username"
                  type="text"
                  placeholder="Username"
                  error={fieldState.error?.message}
                />
              )}
            />
          </FieldGroup>

          <Controller
            control={form.control}
            name="password"
            render={({ field, fieldState }) => (
              <PasswordField
                ref={field.ref}
                name={field.name}
                description="Doit contenir au minimum : 8 caractères, 1 majuscule, 1 chiffre, 1 caractère spécial"
                value={field.value}
                onBlur={field.onBlur}
                onValueChange={field.onChange}
                label="Mot de passe"
                error={fieldState.error?.message}
              />
            )}
          />

          <Controller
            control={form.control}
            name="confirmPassword"
            render={({ field, fieldState }) => (
              <PasswordField
                ref={field.ref}
                name={field.name}
                value={field.value}
                onBlur={field.onBlur}
                onValueChange={field.onChange}
                label="Confirmation de mot de passe"
                error={fieldState.error?.message}
              />
            )}
          />

          {form.formState.errors.root && (
            <FieldError>{form.formState.errors.root.message}</FieldError>
          )}
        </CardContent>

        <CardFooter className="flex justify-end gap-2">
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting && <Spinner data-icon="inline-start" />}
            <span className="truncate">Inscription</span>
          </Button>
        </CardFooter>
      </Card>

      <p className="text-center">
        Vous avez déjà une toque ?<br />
        <Button variant={'link'} className="p-0 text-foreground" asChild>
          <Link href={'/auth/login'}>Connectez-vous</Link>
        </Button>
        , on a besoin de vous en cuisine !
      </p>
    </form>
  )
}

export { RegisterForm }
