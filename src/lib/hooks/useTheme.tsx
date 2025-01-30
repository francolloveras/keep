'use client'

import { useRouter } from 'next/navigation'
import { createContext, useEffect, useState } from 'react'

import { useContext } from '@/lib/hooks/useContext'

export type Theme = 'light' | 'dark'
export type HandleTheme = (theme: Theme) => void

interface ThemeContextValues {
  theme: Theme
  handleTheme: HandleTheme
}
export const ThemeContext = createContext<ThemeContextValues | null>(null)

export function ThemeProvider({
  theme: initialTheme,
  children
}: Readonly<{
  theme: Theme
  children: React.ReactNode
}>) {
  const router = useRouter()
  const [theme, setTheme] = useState(initialTheme)

  const handleTheme: HandleTheme = (theme) => {
    setTheme(theme)

    document.cookie = `theme=${theme};path=/;`
    document.querySelector('html')?.classList.toggle(theme)
  }

  useEffect(() => {
    router.refresh()
  }, [theme])

  return <ThemeContext.Provider value={{ theme, handleTheme }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)

  return context
}
