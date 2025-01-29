'use client'

import { createContext } from 'react'

import type { Dict, Locale } from '@/lib/dictionaries'
import { useContext } from '@/lib/hooks/useContext'

interface LocaleContextValues {
  lang: Locale
  dict: Dict
}
export const LocaleContext = createContext<LocaleContextValues | null>(null)

export function LocaleProvider({
  lang,
  dict,
  children
}: Readonly<{
  lang: Locale
  dict: Dict
  children: React.ReactNode
}>) {
  return <LocaleContext.Provider value={{ lang, dict }}>{children}</LocaleContext.Provider>
}

export function useLocale() {
  const context = useContext(LocaleContext)

  return context
}
