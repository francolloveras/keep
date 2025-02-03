'use client'

import { Session, User } from '@prisma/client'

import AccountDialog from '@/components/account-dialog'
import SignoutForm from '@/components/signout-form'
import DialogButton from '@/components/ui/buttons/dialog-button'
import Icon from '@/components/ui/icon'
import LocaleSwitcher from '@/components/ui/locale-switcher'
import Menu from '@/components/ui/menu'
import ThemeSwitcher from '@/components/ui/theme-switcher'
import { useLocale } from '@/lib/hooks/useLocale'

interface MenuProps {
  user: User & { sessions: Session[] }
  session: Session
}

export default function NavMenu({ user, session }: MenuProps) {
  const { dict, lang } = useLocale()

  return (
    <div className="mb-1">
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
            <DialogButton
              variant="none"
              label={
                <>
                  <Icon icon="faUser" className="mr-2 size-3.5" />
                  {dict.layout.menu.account}
                </>
              }
              className="w-full rounded p-1.5 text-left hover:bg-current-shadow"
            >
              <AccountDialog user={user} />
            </DialogButton>
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
                    {dict.layout.menu.language}
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
            <SignoutForm session={session} />
          </li>
        </ul>
      </Menu>
    </div>
  )
}
