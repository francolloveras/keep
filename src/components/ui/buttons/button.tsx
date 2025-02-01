'use client'

import Icon, { type Icons } from '@/components/ui/icon'
import { cx } from '@/lib/utils'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: Icons | { icon: Icons; className?: string }
  variant?: 'default' | 'transparent' | 'outline' | 'none'
  isDisabled?: boolean
  className?: string
}

export default function Button({
  icon,
  className,
  variant = 'default',
  children,
  isDisabled,
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      disabled={isDisabled}
      className={cx(
        {
          'rounded-md bg-primary px-3 py-2 text-sm/6 font-medium text-white hover:brightness-110 transition-colors disabled:pointer-events-none disabled:brightness-90':
            variant === 'default',
          'rounded-md hover:bg-current-shadow border border-outline px-3 py-2 text-sm/6 font-medium':
            variant === 'outline',
          'rounded-md hover:bg-current-shadow px-3.5 py-2 text-sm/6 font-medium':
            variant === 'transparent',
          'pointer-events-none opacity-50': isDisabled
        },
        [className]
      )}
    >
      {icon &&
        (typeof icon === 'object' ? (
          <Icon icon={icon.icon} className={cx('mr-2', icon.className)} />
        ) : (
          <Icon icon={icon} className={typeof children !== 'undefined' ? 'mr-2' : undefined} />
        ))}
      {children}
    </button>
  )
}
