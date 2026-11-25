'use client'

import { useEffect } from 'react'

import { useAuth } from '@/providers/auth-provider'
import { useRedirectToLogin } from '@/lib/usePathname'

export function RequireAuth({ role, children }: { role?: string; children: React.ReactNode }) {
  const { user, isLoading } = useAuth()

  const redirectToLogin = useRedirectToLogin()

  useEffect(() => {
    if (!isLoading && !user) redirectToLogin()
  }, [isLoading, user, redirectToLogin])

  if (isLoading || !user) return <p>Chargement</p>
  if (role && user.role !== role) return <p>Accès refusé</p>
  return <>{children}</>
}
