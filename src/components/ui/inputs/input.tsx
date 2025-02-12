import InputWrapper, { type InputWrapperProps } from '@/components/ui/inputs/wrapper'
import { cx } from '@/lib/utils'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string
  placeholder?: string
  error?: string
  label?: string
  isRequired?: boolean
  isDisabled?: boolean
  wrapper?: Omit<InputWrapperProps, 'children' | 'name'>
}

export default function Input({
  name,
  defaultValue,
  error,
  label,
  isRequired,
  isDisabled,
  wrapper,
  ...rest
}: InputProps) {
  return (
    <InputWrapper
      name={name}
      error={error}
      label={label}
      isRequired={isRequired}
      isDisabled={isDisabled}
      {...wrapper}
    >
      <input
        {...rest}
        name={name}
        disabled={isDisabled}
        defaultValue={defaultValue}
        className={cx(
          'block w-full text-sm/6 rounded-md border border-outline bg-transparent px-3 py-1.5 text-text outline-none placeholder:text-text/40 focus:outline-2 focus:-outline-offset-2 focus:outline-primary',
          {
            '-outline-offset-2 outline-error': error !== undefined
          }
        )}
      />
    </InputWrapper>
  )
}
