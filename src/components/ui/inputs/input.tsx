import InputWrapper, { type InputWrapperProps } from '@/components/ui/inputs/wrapper'
import { cx } from '@/lib/utils'

type OthersProps = React.InputHTMLAttributes<HTMLInputElement> & Omit<InputWrapperProps, 'children'>
interface InputProps extends OthersProps {
  name: string
  placeholder?: string
}

export default function Input({
  name,
  defaultValue,
  placeholder,
  type,
  error,
  ...wrapperProps
}: InputProps) {
  return (
    <InputWrapper name={name} error={error} {...wrapperProps}>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
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
