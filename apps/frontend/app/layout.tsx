import type { Metadata } from 'next'
import { Outfit } from 'next/font/google'
import './globals.css'

import { QueryProvider } from '@/providers/query-provider'
import { AuthProvider } from '@/providers/auth-provider'

const outfitSans = Outfit({
  variable: '--font-outfit-sans',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'On mange quoooi ?',
  description: '',
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="fr" className={`${outfitSans.variable} h-full antialiased`}>
      <body className="mx-auto max-w-[1920px]">
        <QueryProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
