'use client'
import clsx from 'clsx'

import Icon, { type Icons } from '@/components/ui/icon'
import { useToast } from '@/lib/hooks/useToast'

export default function ToastWrapper() {
  const { toasts, deleteToast } = useToast()

  const defaultIcons: Record<string, Icons> = {
    success: 'faCircleCheck',
    error: 'faExclamationCircle',
    info: 'faInfoCircle',
    warning: 'faExclamationTriangle'
  }

  return (
    <div className="fixed bottom-5 left-2/4 z-50 flex -translate-x-2/4 flex-col items-center justify-center gap-2">
      {toasts.map(({ id, type, message, icon, isVisible, action }) => (
        <div
          key={id}
          className={clsx(
            'flex w-fit items-center justify-between gap-8 rounded-md px-5 py-2 shadow-md transition-all duration-300 ease-in-out',
            {
              'bg-green-400 text-green-900': type === 'success',
              'bg-red-400 text-red-900': type === 'error',
              'bg-blue-400 text-blue-900': type === 'info',
              'bg-yellow-400 text-yellow-900': type === 'warning',
              'translate-y-0 opacity-100': isVisible,
              'translate-y-5 opacity-0': !isVisible
            }
          )}
        >
          <p className="space-x-1 text-nowrap">
            <Icon icon={icon ?? defaultIcons[type]} />
            <span>{message}</span>
          </p>
          <div className="space-x-px">
            {action && (
              <button className="px-2 text-xs uppercase" onClick={action.function}>
                {action.label}
              </button>
            )}
            <button onClick={() => deleteToast(id)}>
              <Icon icon="faXmark" />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
