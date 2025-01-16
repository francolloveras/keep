import * as icons from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import clsx from 'clsx'

export type Icons = keyof typeof icons

interface IconProps {
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
      className={clsx('mb-px inline-block size-4 align-middle', [className])}
    />
  )
}
