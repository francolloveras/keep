'use client'

import Icon, { type Icons } from '@/components/ui/icon'
import { cx } from '@/lib/utils'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: Icons | { icon: Icons; className?: string }
  variant?: 'default' | 'none'
  className?: string
}

export default function Button({
  icon,
  className,
  variant = 'default',
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      className={cx(
        {
          'rounded-md bg-primary px-3 py-2 text-sm/6 font-medium text-white hover:brightness-110 transition-colors disabled:pointer-events-none disabled:brightness-90':
            variant === 'default'
        },
        [className]
      )}
    >
      {icon &&
        (typeof icon === 'object' ? (
          <Icon icon={icon.icon} className={cx('mr-2', icon.className)} />
        ) : (
          <Icon icon={icon} className="mr-2" />
        ))}
      {children}
    </button>
  )
}
