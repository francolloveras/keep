import { cx } from '@/lib/utils'

export interface InputWrapperProps {
  name: string
  label?: string
  error?: string
  isRequired?: boolean
  supportingText?: string
  children: React.ReactNode
}

export default function InputWrapper({
  name,
  label,
  error,
  isRequired,
  supportingText,
  children
}: InputWrapperProps) {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={name}
          className={cx('mb-1 text-sm/6 block', {
            "after:ml-1 after:text-error after:content-['*']": isRequired
          })}
        >
          {label}
        </label>
      )}
      {children}
      <p
        className={cx('mt-1 h-5 text-right text-sm', {
          'text-error': error !== undefined
        })}
      >
        {error || supportingText}
      </p>
    </div>
  )
}
