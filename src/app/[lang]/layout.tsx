import './globals.css'

import type { Metadata } from 'next'
import { Rubik } from 'next/font/google'

import { Locale } from '@/lib/dictionaries/get-dictionaries'
import { DialogProvider } from '@/lib/hooks/useDialog'
import { ToastProvider } from '@/lib/hooks/useToast'

const rubik = Rubik({
  variable: '--font-rubik',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'Keep your money controlled',
  description: 'Keep your money controlled recording your daily movements'
}

export default async function RootLayout({
  params,
  children
}: Readonly<{
  params: Promise<{ lang: Locale }>
  children: React.ReactNode
}>) {
  const { lang } = await params

  return (
    <html lang={lang}>
      <body className={`${rubik.className} antialiased`}>
        <ToastProvider>
          <DialogProvider>{children}</DialogProvider>
        </ToastProvider>
      </body>
    </html>
  )
}
