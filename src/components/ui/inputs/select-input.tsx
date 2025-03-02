'use client'

import { useState } from 'react'

import Button from '@/components/ui/buttons/button'
import Icon from '@/components/ui/icon'
import InputWrapper, { InputWrapperProps } from '@/components/ui/inputs/wrapper'
import { useModal } from '@/lib/hooks/NEW_useModal'
import { useLocale } from '@/lib/hooks/useLocale'
import { cx } from '@/lib/utils'

type OthersProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onSelect'>
interface SelectInputProps extends OthersProps {
  name: string
  options: string[]
  placeholder?: string
  error?: string
  label?: string
  isRequired?: boolean
  isDisabled?: boolean
  wrapper?: Omit<InputWrapperProps, 'children' | 'name'>
  onSelect?: (option: string | undefined) => void
}

export default function SelectInput({
  name,
  options,
  defaultValue,
  error,
  label,
  isRequired,
  isDisabled,
  wrapper,
  onSelect,
  ...rest
}: SelectInputProps) {
  const [selectedOption, setSelectedOption] = useState(defaultValue)
  const { dict } = useLocale()
  const { isOpen, modalRef, toggleModal, closeModal } = useModal()

  const handleSelectedOption = (option: string) => {
    setSelectedOption(option)
    setTimeout(() => closeModal(), 0)

    if (onSelect) {
      onSelect(option)
    }
  }

  return (
    <InputWrapper
      name={name}
      error={error}
      label={label}
      isRequired={isRequired}
      isDisabled={isDisabled}
      {...wrapper}
    >
      <input type="hidden" name={name} value={selectedOption || ''} disabled={isDisabled} />
      <div className="relative">
        <button
          type="button"
          onClick={toggleModal}
          className={cx(
            'flex justify-between items-center w-full rounded-md border border-outline px-3 py-1.5 text-text outline-none focus:outline-2 focus:-outline-offset-2 focus:outline-primary',
            {
              '-outline-offset-2 outline-error': error !== undefined
            },
            rest.className
          )}
        >
          <p
            className={cx('text-sm/6', {
              'opacity-60': !selectedOption
            })}
          >
            {selectedOption ?? dict.components.selectInput}
          </p>
          <Icon icon="faAngleDown" className="opacity-40" />
        </button>
        {isOpen && (
          <div
            ref={modalRef}
            className="absolute z-30 mt-1 min-w-full rounded-md border border-outline bg-background p-1"
          >
            {options.map((value) => (
              <Button
                key={value}
                onClick={() => handleSelectedOption(value)}
                variant="transparent"
                className="flex w-full items-center justify-between text-left"
              >
                {value}
                {value === selectedOption && <Icon icon="faCheck" />}
              </Button>
            ))}
          </div>
        )}
      </div>
    </InputWrapper>
  )
}
