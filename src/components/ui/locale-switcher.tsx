'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import Icon from '@/components/ui/icon'
import Menu from '@/components/ui/menu'
import { LOCALES, LOCALES_FLAGS, LOCALES_LONG } from '@/lib/const'
import { Locale } from '@/lib/dictionaries/get-dictionaries'

export default function LocaleSwitcher({ lang }: { lang: Locale }) {
  const pathname = usePathname()

  const redirectedPathname = (locale: Locale) => {
    if (!pathname) return '/'

    const segments = pathname.split('/')
    segments[1] = locale

    return segments.join('/')
  }

  const longLocale = LOCALES_LONG[lang]

  return (
    <Menu
      id="locale-switcher"
      label={
        <>
          <Icon icon="faEarthAmericas" className="mr-3" />
          <span className="inline-block w-16 text-left">{longLocale}</span>
          <Icon icon="faChevronDown" className="ml-2 size-2.5" />
        </>
      }
      className="rounded-md px-3 py-1.5 hover:bg-current-shadow"
    >
      <ul className="mt-1 w-full overflow-hidden rounded-md border border-outline bg-background shadow-sm">
        {LOCALES.map((locale) => {
          return (
            <li key={locale}>
              <Link
                href={redirectedPathname(locale)}
                className="flex cursor-pointer items-center gap-x-3 px-3 py-1.5 hover:bg-current-shadow"
              >
                <Image
                  src={LOCALES_FLAGS[locale]}
                  alt={longLocale}
                  width={16}
                  height={12}
                  className="rounded-sm"
                />
                {LOCALES_LONG[locale]}
              </Link>
            </li>
          )
        })}
      </ul>
    </Menu>
  )
}
