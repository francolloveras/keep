'use client'

import Icon, { type Icons } from '@/components/ui/icon'
import { useLocale } from '@/lib/hooks/useLocale'
import { useToast } from '@/lib/hooks/useToast'
import { cx } from '@/lib/utils'

export default function ToastWrapper() {
  const { dict } = useLocale()
  const { toasts, deleteToast } = useToast()

  const defaultIcons: Record<string, Icons> = {
    success: 'faCircleCheck',
    error: 'faExclamationCircle',
    info: 'faInfoCircle',
    warning: 'faExclamationTriangle'
  }

  return (
    <div
      role="alert"
      className="fixed bottom-5 left-2/4 z-50 flex -translate-x-2/4 flex-col items-center justify-center gap-4"
    >
      {toasts.map(({ id, type, message, icon, isVisible, action }) => (
        <div
          key={id}
          className={cx(
            'relative flex w-fit justify-between bg-background border border-outline gap-10 rounded-md px-5 py-2 shadow-lg shadow-black/5 transition-all duration-300 ease-in-out',
            {
              'translate-y-0 opacity-100': isVisible,
              'translate-y-5 opacity-0': !isVisible
            }
          )}
        >
          <div
            className={cx('absolute top-0 rounded-l-md left-0 h-full w-2', {
              'bg-success': type === 'success',
              'bg-error': type === 'error',
              'bg-info': type === 'info',
              'bg-warning': type === 'warning'
            })}
          />
          <div className="flex flex-1 gap-x-2">
            <div>
              <Icon
                className={cx('mb-0', {
                  'text-success': type === 'success',
                  'text-error': type === 'error',
                  'text-info': type === 'info',
                  'text-warning': type === 'warning'
                })}
                icon={icon ?? defaultIcons[type]}
              />
            </div>
            <div className="space-y-1">
              <h3>{dict.general.accents[type]}</h3>
              <p className="text-nowrap text-text/80">{message}</p>
            </div>
          </div>
          <div className="space-x-px">
            {action && (
              <button
                className={cx('rounded-md px-2 py-1.5 text-xs uppercase hover:bg-current-shadow', {
                  'text-success': type === 'success',
                  'text-error': type === 'error',
                  'text-info': type === 'info',
                  'text-warning': type === 'warning'
                })}
                onClick={action.function}
              >
                {action.label}
              </button>
            )}
            <button
              className={cx('rounded-md p-1 px-1.5 hover:bg-current-shadow', {
                'text-success': type === 'success',
                'text-error': type === 'error',
                'text-info': type === 'info',
                'text-warning': type === 'warning'
              })}
              onClick={() => deleteToast(id)}
            >
              <Icon icon="faXmark" />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
