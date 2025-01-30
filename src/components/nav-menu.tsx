'use client'

import { User } from '@prisma/client'

import Icon from '@/components/ui/icon'
import Menu from '@/components/ui/menu'
import { useLocale } from '@/lib/hooks/useLocale'

import LocaleSwitcher from './ui/locale-switcher'
import ThemeSwitcher from './ui/theme-switcher'

interface MenuProps {
  user: User
}

export default function NavMenu({ user }: MenuProps) {
  const { dict, lang } = useLocale()

  return (
    <div>
      <Menu
        id="nav-menu"
        label={
          <>
            <span className="flex size-8 items-center justify-center rounded-full border border-outline bg-background uppercase">
              {user.name.at(0)}
            </span>
            <span className="block w-32 truncate text-left text-sm/6">{user.name}</span>
            <Icon icon="faEllipsisVertical" />
          </>
        }
        className="flex items-center gap-x-3 rounded-md px-3 py-1.5 focus-within:bg-current-shadow hover:bg-current-shadow"
      >
        <ul className="rounded-md border border-outline bg-background px-1 py-1.5">
          <li>
            <button className="w-full rounded p-1.5 text-left hover:bg-current-shadow">
              <Icon icon="faUser" className="mr-2 size-3.5" />
              {dict.menu.options.account}
            </button>
          </li>
          <div role="separator" className="-mx-1 my-1 h-px border-t border-outline" />
          <li>
            <LocaleSwitcher
              lang={lang}
              position="left"
              label={
                <>
                  <span className="flex-1 text-left">
                    <Icon icon="faEarthAmericas" className="mr-2 size-3.5" />
                    {dict.menu.options.language}
                  </span>
                  <Icon icon="faAngleRight" className="mt-0.5 size-3" />
                </>
              }
              method="hover"
              className="flex items-center rounded p-1.5"
            />
          </li>
          <li>
            <ThemeSwitcher />
          </li>
          <div role="separator" className="-mx-1 my-1 h-px border-t border-outline" />
          <li>
            <button className="w-full rounded p-1.5 text-left hover:bg-error hover:text-white">
              <Icon icon="faArrowRightFromBracket" className="mr-2 mt-0.5 size-3.5" />
              {dict.menu.options.signout}
            </button>
          </li>
        </ul>
      </Menu>
    </div>
  )
}
