import type { Metadata } from 'next'
import { Outfit } from 'next/font/google'
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
      <body className="mx-auto max-w-[1920px]">{children}</body>
    </html>
  )
}
