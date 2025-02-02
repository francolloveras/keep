'use client'

import { usePathname as importedUsePathname } from 'next/navigation'

import { LOCALES } from '@/lib/const'

export function usePathname() {
  const pathname = importedUsePathname()

  const localePattern = new RegExp(`^/(${LOCALES.join('|')})`)

  return pathname.replace(localePattern, '/')
}
