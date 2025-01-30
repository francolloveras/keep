'use client'

import Button, { ButtonProps } from '@/components/ui/buttons/button'
import { useDialog } from '@/lib/hooks/useDialog'

interface DialogButtonProps extends Omit<ButtonProps, 'content' | 'children'> {
  label: React.ReactNode
  title: string
  children: React.ReactNode
}

export default function DialogButton({ label, title, children, ...rest }: DialogButtonProps) {
  const { openDialog } = useDialog()

  const handleDialog = () => {
    openDialog({ title, content: children })
  }

  return (
    <Button {...rest} onClick={handleDialog}>
      {label}
    </Button>
  )
}
