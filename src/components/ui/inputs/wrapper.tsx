import { cx } from '@/lib/utils'

export interface InputWrapperProps {
  name: string
  label?: string
  error?: string
  isRequired?: boolean
  isDisabled?: boolean
  supportingText?: string
  supportingTextSpace?: boolean
  children: React.ReactNode
}

export default function InputWrapper({
  name,
  label,
  error,
  isRequired,
  isDisabled,
  supportingText,
  supportingTextSpace = true,
  children
}: InputWrapperProps) {
  return (
    <div className="w-full">
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
          className={cx('mt-1 h-5 text-right text-xs text-text/60', {
            'text-error': error !== undefined
          })}
        >
          {error || supportingText}
        </p>
      )}
    </div>
  )
}
