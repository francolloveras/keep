'use client'

import { Session, User } from '@prisma/client'

import Menu from '@/components/nav-menu'
import Link from '@/components/ui/link'
import { useLocale } from '@/lib/hooks/useLocale'
import { usePathname } from '@/lib/hooks/usePathname'
import { cx } from '@/lib/utils'

interface NavProps {
  user: User & { sessions: Session[] }
}

export default function Nav({ user }: NavProps) {
  const { dict } = useLocale()
  const pathname = usePathname()
  const links = [
    { href: '/', label: dict.layout.nav.home },
    { href: '/cards', label: dict.layout.nav.cards },
    { href: '/bills', label: dict.layout.nav.bills },
    { href: '/subscriptions', label: dict.layout.nav.subscriptions },
    { href: '/settings', label: dict.layout.nav.settings }
  ]

  return (
    <header className="flex items-end justify-between border-b border-outline px-6 pt-1">
      <nav className="flex text-sm/6">
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={cx(
              'group block border-b-2 border-transparent font-medium pb-1 transition-colors hover:text-text text-text/80 hover:border-outline',
              {
                'border-primary text-primary hover:text-primary hover:border-primary':
                  pathname === href
              }
            )}
          >
            <span className="block rounded px-3.5 py-1 group-hover:bg-current-shadow">{label}</span>
          </Link>
        ))}
      </nav>
      <Menu user={user} />
    </header>
  )
}
