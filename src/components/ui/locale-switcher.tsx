'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { LOCALES, LOCALES_LONG } from '@/lib/const'
import { Locale } from '@/lib/dictionaries/get-dictionaries'
import { useModal } from '@/lib/hooks/useModal'
import Icon from './icon'

export default function LocaleSwitcher({ lang }: { lang: Locale }) {
  const { isOpen, modalRef, toggleModal } = useModal(false)
  const pathname = usePathname()

  const redirectedPathname = (locale: Locale) => {
    if (!pathname) return '/'

    const segments = pathname.split('/')
    segments[1] = locale

    return segments.join('/')
  }

  return (
    <div className="relative">
      <button
        onClick={toggleModal}
        className="hover:bg-zinc-800 hover:text-white rounded-lg px-3 py-1.5"
      >
        <Icon icon="faGlobe" className="mr-3 size-3.5" />
        {LOCALES_LONG[lang]}
        <Icon icon="faChevronDown" className="ml-2 size-2.5" />
      </button>
      {isOpen && (
        <ul
          ref={modalRef}
          className="absolute mt-1 overflow-hidden w-full border-zinc-600 border rounded-lg bg-zinc-900"
        >
          {LOCALES.map((locale) => {
            return (
              <li key={locale}>
                <Link
                  href={redirectedPathname(locale)}
                  className="block py-1.5 px-3 cursor-pointer hover:text-white hover:bg-zinc-800"
                >
                  {LOCALES_LONG[locale]}
                </Link>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
