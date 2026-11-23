'use client'

import { BookBookmark, ChefHat, LogIn, LogOut, User, UserPlus } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { useAuth } from '@/providers/auth-provider'

import { Spinner } from '../../ui/spinner'

function HeaderCtaProfile() {
  const { user, isLoading, logout } = useAuth()

  const triggerLogout = () => logout()

  const loadingContent = (
    <>
      <DropdownMenuGroup>
        <DropdownMenuItem className="p-2 focus:bg-white focus:text-foreground not-data-[variant=destructive]:focus:**:text-foreground">
          <Spinner /> Chargement
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </>
  )

  const loggedOutContent = (
    <>
      <DropdownMenuGroup>
        <Link href={'/auth/login'}>
          <DropdownMenuItem className="p-2">
            <LogIn /> Connexion
          </DropdownMenuItem>
        </Link>
        <Link href={'/auth/register'}>
          <DropdownMenuItem className="p-2">
            <UserPlus /> Inscription
          </DropdownMenuItem>
        </Link>
      </DropdownMenuGroup>
    </>
  )

  const loggedContent = (
    <>
      <DropdownMenuGroup>
        <Link href={'/chief/recipes'}>
          <DropdownMenuItem className="p-2">
            <BookBookmark /> Mes recettes
          </DropdownMenuItem>
        </Link>
        <Link href={'/chief/profile'}>
          <DropdownMenuItem className="p-2">
            <User /> Mon profil
          </DropdownMenuItem>
        </Link>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem variant="destructive" className="p-2" onClick={triggerLogout}>
          <LogOut /> Deconnexion
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </>
  )

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={'icon'} size={'icon'}>
          <ChefHat />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center">
        {isLoading ? loadingContent : user ? loggedContent : loggedOutContent}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export { HeaderCtaProfile }
