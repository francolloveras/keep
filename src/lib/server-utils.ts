'use server'

import { cookies } from 'next/headers'
import { redirect, type RedirectType } from 'next/navigation'

import { Locale } from '@/lib/dictionaries'

export async function localeRedirect(url: string, type?: RedirectType) {
  const cookieStore = await cookies()
  const locale = cookieStore.get('locale')?.value || 'en'

  // Ensure the path starts with the locale
  const URL = url.startsWith(`/${locale}`) ? url : `/${locale}${url}`

  return redirect(URL, type)
}

export async function setLocaleCookie(locale: Locale) {
  const cookieStore = await cookies()

  cookieStore.set({
    name: 'locale',
    value: locale,
    path: '/'
  })
}
