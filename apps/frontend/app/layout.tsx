import type { Metadata } from 'next'

import { Outfit } from 'next/font/google'

import { Header } from '@/components/custom/header/header'
import { Toaster } from '@/components/ui/sonner'

import { AuthProvider } from '@/providers/auth-provider'
import { QueryProvider } from '@/providers/query-provider'
import { ThemeProvider } from '@/providers/theme-provider'

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
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Toaster position="top-center" />

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
        </ThemeProvider>
      </body>
    </html>
  )
}
