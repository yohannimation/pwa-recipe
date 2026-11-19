'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

import { useAuth } from '@/providers/auth-provider'

import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { Button } from '@/components/ui/button'
import { FieldError, FieldGroup } from '@/components/ui/field'
import { PasswordField } from '@/components/custom/fields/password-field'
import { TextField } from '@/components/custom/fields/text-field'
import { Spinner } from '@/components/ui/spinner'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

const loginSchema = yup.object({
  username: yup
    .string()
    .min(3, 'Le username doit contenir au moins 3 caractères')
    .required("Le username est requis"),
  password: yup
    .string()
    .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
    .required('Le mot de passe est requis'),
})

type LoginFormValues = yup.InferType<typeof loginSchema>

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const nextPage = searchParams.get('next')

  const { user, isLoading, login } = useAuth()
  const form = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  useEffect(() => {
    if (user) router.replace(nextPage ?? '/')
  }, [user, router, nextPage])

  async function onSubmit(values: LoginFormValues) {
    try {
      await login(values)
    } catch {
      form.setError('root', { message: 'Identifiants incorrects' })
    }
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className='flex justify-center items-center flex-col gap-8 w-full'
      noValidate
    >
      <Card className='w-full md:w-[75%] lg:w-[50%] max-w-[600px]'>
        <CardHeader>
          <CardTitle>Connexion</CardTitle>
        </CardHeader>
        <CardContent className='flex flex-col gap-4'>
          <FieldGroup>
            <Controller
              control={form.control}
              name='username'
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
                value={field.value}
                onBlur={field.onBlur}
                onValueChange={field.onChange}
                label="Mot de passe"
                error={fieldState.error?.message}
              />
            )}
          />

          {form.formState.errors.root && (
            <FieldError>{form.formState.errors.root.message}</FieldError>
          )}
        </CardContent>

        <CardFooter className='flex justify-end gap-2'>
          <Button
            type='submit'
            disabled={form.formState.isSubmitting || !!isLoading}
          >
            {form.formState.isSubmitting && <Spinner data-icon="inline-start" />}
              <span className="truncate">Connexion</span>
          </Button>
        </CardFooter>
      </Card>

      <p className='text-center'>
        Pas encore de toque et vous souhaitez rejoindre nos cuisines ?<br />
        <Button variant={'link'} className='p-0 text-foreground' asChild><Link href={'/auth/register'}>Créer un compte</Link></Button> pour cuisiner avec nous !
      </p>
    </form>
  )
}

export { LoginForm }