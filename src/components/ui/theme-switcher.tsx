'use client'

import Icon from '@/components/ui/icon'
import Menu from '@/components/ui/menu'
import { useLocale } from '@/lib/hooks/useLocale'
import { useTheme } from '@/lib/hooks/useTheme'

export default function ThemeSwitcher() {
  const { dict } = useLocale()
  const { theme, handleTheme } = useTheme()

  return (
    <Menu
      id="nav-theme"
      label={
        <>
          <span className="flex-1 text-left">
            <Icon icon="faCircleHalfStroke" className="mr-2 size-3.5" />
            {dict.menu.options.theme}
          </span>
          <Icon icon="faAngleRight" className="mt-0.5 size-3" />
        </>
      }
      method="hover"
      position="left"
      className="flex items-center rounded p-1.5 hover:bg-current-shadow"
    >
      <ul className="rounded-md border border-outline bg-background px-1 py-1.5">
        <li>
          <button
            onClick={() => handleTheme('light')}
            className="flex w-full cursor-pointer items-center gap-x-3 rounded p-1.5 hover:bg-current-shadow"
          >
            <Icon icon="faSun" className="size-3.5" />
            {dict.themes.light}
            {theme === 'light' && (
              <span className="ml-auto inline-block size-2 rounded-full bg-primary" />
            )}
          </button>
        </li>
        <li>
          <button
            onClick={() => handleTheme('dark')}
            className="flex w-full cursor-pointer items-center gap-x-3 rounded p-1.5 hover:bg-current-shadow"
          >
            <Icon icon="faMoon" className="size-3.5" />
            {dict.themes.dark}
            {theme === 'dark' && (
              <span className="ml-auto inline-block size-2 rounded-full bg-primary" />
            )}
          </button>
        </li>
      </ul>
    </Menu>
  )
}
