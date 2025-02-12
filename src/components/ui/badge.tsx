import { cx } from '@/lib/utils'

interface BadgeProps {
  type: 'error' | 'success' | 'info' | 'warning'
  children: React.ReactNode
}

export default function Badge({ type, children }: BadgeProps) {
  return (
    <span
      className={cx('text-nowrap rounded-md ring-1 ring-inset px-2 py-1 text-xs font-medium', {
        'bg-error/10 text-error ring-error/40': type === 'error',
        'bg-success/10 text-success ring-success/40': type === 'success',
        'bg-info/10 text-info ring-info/40': type === 'info',
        'bg-warning/10 text-warning ring-warning/40': type === 'warning'
      })}
    >
      {children}
    </span>
  )
}
