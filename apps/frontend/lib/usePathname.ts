'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'

export function useRedirectToLogin() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  return ({ returnToOrigin = true }: { returnToOrigin?: boolean } = {}) => {
    let loginUrl = '/auth/login'

    if (returnToOrigin) {
      const query = searchParams.toString()
      const next = query ? `${pathname}?${query}` : pathname

      loginUrl += `?next=${encodeURIComponent(next)}`
    }

    router.replace(loginUrl)
  }
}
