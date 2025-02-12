import { cx } from '@/lib/utils'

export interface InputWrapperProps {
  name: string
  label?: string
  error?: string
  isRequired?: boolean
  isDisabled?: boolean
  className?: string
  supportingText?:
    | string
    | {
        value: string
        className?: string
      }
  supportingTextSpace?: boolean
  children: React.ReactNode
}

export default function InputWrapper({
  name,
  label,
  error,
  isRequired,
  isDisabled,
  className,
  supportingText,
  supportingTextSpace = true,
  children
}: InputWrapperProps) {
  return (
    <div className={cx('w-full', className)}>
      {label && (
        <label
          htmlFor={name}
          className={cx('mb-1 text-sm/6 block', {
            "after:ml-1 after:text-error after:content-['*']": isRequired,
            'pointer-events-none opacity-50': isDisabled
          })}
        >
          {label}
        </label>
      )}
      {children}
      {supportingTextSpace && (
        <p
          className={cx(
            'mt-1 h-5 text-right text-xs text-text/60 mx-1',
            {
              'text-error': error !== undefined
            },
            [typeof supportingText !== 'string' && supportingText?.className]
          )}
        >
          {error || (typeof supportingText === 'string' ? supportingText : supportingText?.value)}
        </p>
      )}
    </div>
  )
}
