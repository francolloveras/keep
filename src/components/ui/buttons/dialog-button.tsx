'use client'

import Button, { ButtonProps } from '@/components/ui/buttons/button'
import { useDialog } from '@/lib/hooks/useDialog'

interface DialogButtonProps extends Omit<ButtonProps, 'content' | 'children'> {
  label: React.ReactNode
  children: React.ReactNode
}

export default function DialogButton({ label, children, ...rest }: DialogButtonProps) {
  const { openDialog } = useDialog()

  const handleDialog = () => {
    openDialog({ content: children })
  }

  return (
    <Button {...rest} onClick={handleDialog}>
      {label}
    </Button>
  )
}
