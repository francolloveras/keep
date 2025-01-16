import './globals.css'

import type { Metadata } from 'next'
import { Rubik } from 'next/font/google'

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

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${rubik.className} antialiased`}>
        <ToastProvider>
          <DialogProvider>{children}</DialogProvider>
        </ToastProvider>
      </body>
    </html>
  )
}
