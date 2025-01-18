import 'server-only'

import { type LOCALES } from '@/lib/const'

const dictionaries = {
  en: () => import('./en.json').then((module) => module.default),
  es: () => import('./es.json').then((module) => module.default)
}

export type Locale = (typeof LOCALES)[number]
export type Dict = Awaited<ReturnType<typeof getDictionary>>

export const getDictionary = async (locale: Locale) => dictionaries[locale]?.() ?? dictionaries.en()
