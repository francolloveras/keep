import './globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { cookies } from 'next/headers'

import { getDictionary, Locale } from '@/lib/dictionaries'
import { DialogProvider } from '@/lib/hooks/useDialog'
import { LocaleProvider } from '@/lib/hooks/useLocale'
import { ModalProvider } from '@/lib/hooks/useModal'
import { Theme, ThemeProvider } from '@/lib/hooks/useTheme'
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
  const cookieStore = await cookies()
  const theme = (cookieStore.get('theme')?.value as Theme | undefined) || 'light'

  const { lang } = await params
  const dict = await getDictionary(lang)

  return (
    <html lang={lang} className={theme}>
      <body className={`${inter.className} antialiased`} style={{ scrollbarGutter: 'stable' }}>
        <LocaleProvider lang={lang} dict={dict}>
          <ThemeProvider theme={theme}>
            <ToastProvider>
              <DialogProvider>
                <ModalProvider>{children}</ModalProvider>
              </DialogProvider>
            </ToastProvider>
          </ThemeProvider>
        </LocaleProvider>
      </body>
    </html>
  )
}
