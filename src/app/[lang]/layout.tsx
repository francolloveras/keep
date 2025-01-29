import './globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { getDictionary, Locale } from '@/lib/dictionaries'
import { DialogProvider } from '@/lib/hooks/useDialog'
import { LocaleProvider } from '@/lib/hooks/useLocale'
import { ModalProvider } from '@/lib/hooks/useModal'
import { ToastProvider } from '@/lib/hooks/useToast'

const inter = Inter({
  variable: '--font-inter',
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
  const dict = await getDictionary(lang)

  return (
    <html lang={lang}>
      <body className={`${inter.className} antialiased`} style={{ scrollbarGutter: 'stable' }}>
        <LocaleProvider lang={lang} dict={dict}>
          <ToastProvider>
            <DialogProvider>
              <ModalProvider>{children}</ModalProvider>
            </DialogProvider>
          </ToastProvider>
        </LocaleProvider>
      </body>
    </html>
  )
}
