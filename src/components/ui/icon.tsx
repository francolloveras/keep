import * as icons from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { cx } from '@/lib/utils'

export type Icons = keyof typeof icons

export interface IconProps {
  icon: Icons
  className?: string
}

export default function Icon({ icon, className }: IconProps) {
  const selectedIcon = icons[icon]

  if (!selectedIcon) {
    throw Error(`Icon "${icon}" not found.`)
  }

  return (
    <FontAwesomeIcon
      icon={selectedIcon as icons.IconDefinition}
      className={cx('mb-0.5 inline-block size-4 align-middle', [className])}
    />
  )
}
