import type { Metadata } from 'next'

import { Outfit } from 'next/font/google'

import { Header } from '@/components/custom/header/header'

import { AuthProvider } from '@/providers/auth-provider'
import { QueryProvider } from '@/providers/query-provider'

import './globals.css'

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
      <body>
        <div className="mx-auto max-w-[1920px]">
          <div className="relative mx-5 flex min-h-screen flex-col md:mx-10 lg:mx-15">
            <QueryProvider>
              <AuthProvider>
                <Header />
                <main className="flex flex-1 flex-col">{children}</main>
              </AuthProvider>
            </QueryProvider>
          </div>
        </div>
      </body>
    </html>
  )
}
