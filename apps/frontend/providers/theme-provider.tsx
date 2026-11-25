'use client'

import type { ComponentProps } from 'react'

import { ThemeProvider as NextThemesProvider } from 'next-themes'

export function ThemeProvider({
  children,
  ...props
}: ComponentProps<typeof NextThemesProvider> & { children: React.ReactNode }) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
