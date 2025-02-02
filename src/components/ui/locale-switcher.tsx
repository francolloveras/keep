'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import Icon from '@/components/ui/icon'
import Menu from '@/components/ui/menu'
import { LOCALES, LOCALES_FLAGS, LOCALES_LONG } from '@/lib/const'
import { Locale } from '@/lib/dictionaries'
import { type Methods, type Positions } from '@/lib/hooks/useModal'
import { cx } from '@/lib/utils'

interface LocaleSwitcherProps {
  lang: Locale
  label?: React.ReactNode
  className?: string
  position?: Positions
  method?: Methods
}

export default function LocaleSwitcher({
  lang,
  label,
  className,
  position,
  method
}: LocaleSwitcherProps) {
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
        label ?? (
          <>
            <Icon icon="faEarthAmericas" className="mr-3" />
            <span className="inline-block w-16 text-left">{longLocale}</span>
            <Icon icon="faChevronDown" className="ml-2 size-2.5" />
          </>
        )
      }
      className={cx('rounded-md px-3 py-1.5 hover:bg-current-shadow', className)}
      position={position}
      method={method}
    >
      <ul className="rounded-md border border-outline bg-background px-1 py-1.5">
        {LOCALES.map((locale) => (
          <li key={locale}>
            <Link
              href={redirectedPathname(locale)}
              className="flex cursor-pointer items-center gap-x-3 rounded p-1.5 hover:bg-current-shadow"
            >
              <Image
                src={LOCALES_FLAGS[locale]}
                alt={longLocale}
                width={16}
                height={12}
                className="rounded-sm"
              />
              {LOCALES_LONG[locale]}
              {locale === lang && (
                <span className="ml-auto inline-block size-2 rounded-full bg-primary" />
              )}
            </Link>
          </li>
        ))}
      </ul>
    </Menu>
  )
}
